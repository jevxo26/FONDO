import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import prisma from "../lib/prisma";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import AppError from "../utils/AppError";

const INVOICE_DIR = path.join(process.cwd(), "public", "uploads", "invoices");

function ensureInvoiceDir() {
  if (!fs.existsSync(INVOICE_DIR)) {
    fs.mkdirSync(INVOICE_DIR, { recursive: true });
  }
}

function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return "৳0.00";
  return `৳${Number(amount).toFixed(2)}`;
}

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const generateInvoicePdf = catchServiceAsync(async (orderId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: { include: { food: { select: { name: true } } } },
      customer: { select: { firstName: true, lastName: true, email: true, phone: true } },
      vendor: { select: { businessName: true, phone: true, email: true } },
      invoice: true,
    },
  });

  if (!order) throw new AppError(404, "Order not found");

  const invoiceNumber = order.invoice?.invoiceNumber ?? `INV-${order.orderNumber}`;
  const fileName = `${invoiceNumber}.pdf`;
  const filePath = path.join(INVOICE_DIR, fileName);
  ensureInvoiceDir();

  return new Promise<{ pdfUrl: string; invoiceNumber: string }>((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: "A4" });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Header
    doc.fontSize(28).fillColor("#ce9d59").font("Helvetica-Bold").text("FONDO", 50, 50);
    doc.fontSize(10).fillColor("#666666").font("Helvetica").text("Subscription Food Delivery Platform", 50, 80);
    doc.fontSize(20).fillColor("#000000").font("Helvetica-Bold").text("INVOICE", 400, 50);
    doc.fontSize(10).fillColor("#666666").font("Helvetica")
      .text(`Invoice #: ${invoiceNumber}`, 400, 75)
      .text(`Date: ${formatDate(order.placedAt)}`, 400, 90)
      .text(`Order #: ${order.orderNumber}`, 400, 105);

    doc.moveTo(50, 130).lineTo(545, 130).strokeColor("#cccccc").lineWidth(1).stroke();

    // Customer & Vendor info
    doc.fontSize(10).fillColor("#999999").font("Helvetica-Bold").text("BILL TO", 50, 150);
    doc.fillColor("#000000").font("Helvetica")
      .text(`${order.customer.firstName} ${order.customer.lastName}`, 50, 168)
      .text(order.customer.phone, 50, 183)
      .text(order.customer.email, 50, 198);

    doc.fontSize(10).fillColor("#999999").font("Helvetica-Bold").text("VENDOR", 300, 150);
    doc.fillColor("#000000").font("Helvetica")
      .text(order.vendor?.businessName ?? "Not assigned", 300, 168)
      .text(order.vendor?.phone ?? "N/A", 300, 183)
      .text(order.vendor?.email ?? "N/A", 300, 198);

    // Items table header
    const tableTop = 230;
    doc.fontSize(9).fillColor("#999999").font("Helvetica-Bold")
      .text("ITEM", 50, tableTop)
      .text("QTY", 300, tableTop)
      .text("UNIT PRICE", 370, tableTop)
      .text("TOTAL", 470, tableTop);

    doc.moveTo(50, tableTop + 15).lineTo(545, tableTop + 15).strokeColor("#cccccc").lineWidth(1).stroke();

    // Items
    let y = tableTop + 30;
    order.items.forEach((item) => {
      doc.fontSize(10).fillColor("#000000").font("Helvetica")
        .text(item.food?.name ?? "Unknown item", 50, y)
        .text(String(item.quantity), 300, y)
        .text(formatCurrency(Number(item.unitPrice)), 370, y)
        .text(formatCurrency(Number(item.totalPrice)), 470, y);
      y += 25;
    });
    // Totals
    y += 20;
    doc.moveTo(350, y).lineTo(545, y).strokeColor("#cccccc").lineWidth(0.5).stroke();
    y += 15;

    const subtotal = Number(order.subtotal);
    const discount = Number(order.discount);
    const deliveryCharge = Number(order.deliveryCharge);
    const vat = Number(order.vat);
    const grandTotal = Number(order.totalAmount);

    doc.fontSize(10).fillColor("#666666").font("Helvetica").text("Subtotal", 350, y);
    doc.fillColor("#000000").text(formatCurrency(subtotal), 470, y);
    y += 20;

    if (discount > 0) {
      doc.fillColor("#666666").text("Discount", 350, y);
      doc.fillColor("#008000").text(`-${formatCurrency(discount)}`, 470, y);
      y += 20;
    }

    doc.fillColor("#666666").text("Delivery Charge", 350, y);
    doc.fillColor("#000000").text(formatCurrency(deliveryCharge), 470, y);
    y += 20;

    doc.fillColor("#666666").text("VAT", 350, y);
    doc.fillColor("#000000").text(formatCurrency(vat), 470, y);
    y += 25;

    doc.moveTo(350, y).lineTo(545, y).strokeColor("#000000").lineWidth(1.5).stroke();
    y += 15;

    doc.fontSize(14).fillColor("#ce9d59").font("Helvetica-Bold").text("GRAND TOTAL", 350, y);
    doc.fillColor("#000000").text(formatCurrency(grandTotal), 470, y);
    y += 40;

    doc.fontSize(10).fillColor("#666666").font("Helvetica").text(`Payment Status: ${order.paymentStatus}`, 50, y);
    y += 20;
    doc.text(`Order Status: ${order.orderStatus}`, 50, y);

    doc.fontSize(8).fillColor("#999999").text("This is a computer-generated invoice and does not require a signature.", 50, 780, { align: "center", width: 500 });

    doc.end();

    stream.on("finish", () => {
      const pdfUrl = `/uploads/invoices/${fileName}`;
      resolve({ pdfUrl, invoiceNumber });
    });
    stream.on("error", reject);
  });
});

export const getInvoicePdfPath = catchServiceAsync(async (orderId: string) => {
  const invoice = await prisma.orderInvoice.findUnique({ where: { orderId } });
  if (!invoice?.pdfUrl) throw new AppError(404, "Invoice PDF not generated yet");

  const fileName = path.basename(invoice.pdfUrl);
  const filePath = path.join(INVOICE_DIR, fileName);

  if (!fs.existsSync(filePath)) throw new AppError(404, "Invoice PDF file not found");

  return filePath;
});



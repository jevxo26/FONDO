import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { env } from "../config/env";
import { renderEmail } from "../emails/renderEmail";
import prisma from "../lib/prisma";

let transporter: Transporter | null = null;
let isTestAccount = false;

async function getTransporter(): Promise<Transporter> {
  if (transporter) return transporter;

  if (env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    });
    await transporter.verify();
    return transporter;
  }

  const testAccount = await nodemailer.createTestAccount();
  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: { user: testAccount.user, pass: testAccount.pass },
  });
  isTestAccount = true;
  return transporter;
}

interface SendMailParams {
  to: string;
  subject: string;
  templateName: string;
  data: Record<string, unknown>;
}

async function sendMail({ to, subject, templateName, data }: SendMailParams) {
  const html = renderEmail(templateName, { ...data, unsubscribeUrl: "#", supportUrl: "#" });
  const transport = await getTransporter();
  const info = await transport.sendMail({
    from: env.SMTP_FROM,
    to,
    subject,
    html,
  });

  if (isTestAccount) {
    console.log("[Email Dev Preview URL]", nodemailer.getTestMessageUrl(info));
  }

  return info;
}

export async function sendWelcomeEmail(user: { id: string; firstName: string; email: string }) {
  return sendMail({
    to: user.email,
    subject: "Welcome to FONDO — Let's get started!",
    templateName: "welcome",
    data: {
      firstName: user.firstName,
      dashboardUrl: `${env.BASE_URL}/dashboard`,
    },
  });
}

export async function sendOrderConfirmation(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      customer: { select: { id: true, firstName: true, email: true } },
      items: {
        include: { food: { select: { name: true } } },
      },
      schedules: { take: 1, orderBy: { deliveryDate: "asc" } },
    },
  });

  if (!order || !order.customer.email) return;

  const itemsData = order.items.map((item) => ({
    name: item.food.name,
    quantity: item.quantity,
    totalPrice: `৳${Number(item.totalPrice).toFixed(2)}`,
  }));

  const deliveryDate = order.schedules[0]
    ? new Date(order.schedules[0].deliveryDate).toLocaleDateString("en-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "To be confirmed";

  return sendMail({
    to: order.customer.email,
    subject: `Order Confirmed — ${order.orderNumber}`,
    templateName: "order-confirmation",
    data: {
      firstName: order.customer.firstName,
      orderNumber: order.orderNumber,
      placedAt: new Date(order.placedAt).toLocaleDateString("en-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      deliveryDate,
      items: itemsData,
      totalAmount: `৳${Number(order.totalAmount).toFixed(2)}`,
      orderUrl: `${env.BASE_URL}/orders/${order.id}`,
    },
  });
}

export async function sendPaymentReceipt(paymentId: string) {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: {
      customer: { select: { id: true, firstName: true, email: true } },
      order: { select: { orderNumber: true, id: true } },
    },
  });

  if (!payment || !payment.customer.email) return;

  const method = payment.paymentMethodId
    ? await prisma.paymentMethod.findUnique({ where: { id: payment.paymentMethodId } })
    : null;

  return sendMail({
    to: payment.customer.email,
    subject: `Payment Receipt — ৳${Number(payment.amount).toFixed(2)}`,
    templateName: "payment-receipt",
    data: {
      firstName: payment.customer.firstName,
      amount: `৳${Number(payment.amount).toFixed(2)}`,
      method: method?.name || "N/A",
      transactionId: payment.transactionId || "N/A",
      date: (payment.paymentDate ?? payment.createdAt).toLocaleDateString("en-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      orderNumber: payment.order.orderNumber,
      orderUrl: `${env.BASE_URL}/orders/${payment.order.id}`,
    },
  });
}

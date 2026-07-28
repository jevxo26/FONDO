const SSLCommerzPayment = require("sslcommerz-lts");

interface SslcInitRequest {
  totalAmount: number;
  tranId: string;
  currency?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  successUrl: string;
  failUrl: string;
  cancelUrl: string;
}

interface SslcInitResponse {
  status: string;
  GatewayPageURL?: string;
  failedreason?: string;
  tran_id?: string;
}

interface SslcValidateResponse {
  status: string;
  validated: boolean;
}

export async function initPayment(
  gateway: { storeId: string; secretKey: string; sandboxMode: boolean },
  data: SslcInitRequest,
): Promise<SslcInitResponse> {
  const sslcz = new SSLCommerzPayment(gateway.storeId, gateway.secretKey, !gateway.sandboxMode);

  const response = await sslcz.init({
    total_amount: data.totalAmount.toFixed(2),
    currency: data.currency ?? "BDT",
    tran_id: data.tranId,
    success_url: data.successUrl,
    fail_url: data.failUrl,
    cancel_url: data.cancelUrl,
    cus_name: data.customerName,
    cus_phone: data.customerPhone,
    cus_email: data.customerEmail,
    cus_add1: data.customerAddress || "N/A",
    cus_add2: "N/A",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    shipping_method: "NO",
    num_of_item: "1",
    product_name: "Food Order",
    product_category: "General",
    product_profile: "general",
    productcategory: "general",
    emi_option: "0",
  });

  return {
    status: response.status === "SUCCESS" ? "success" : (response.status as string)?.toLowerCase() || "fail",
    GatewayPageURL: response.GatewayPageURL,
    failedreason: response.failedreason,
    tran_id: response.tran_id,
  };
}

export async function validatePayment(
  gateway: { storeId: string; secretKey: string; sandboxMode: boolean },
  valId: string,
): Promise<SslcValidateResponse> {
  const sslcz = new SSLCommerzPayment(gateway.storeId, gateway.secretKey, !gateway.sandboxMode);
  const response = await sslcz.validate({ val_id: valId });
  return {
    status: response.status,
    validated: response.status === "VALID" || response.status === "VALIDATED",
  };
}

export async function initRefund(
  gateway: { storeId: string; secretKey: string; sandboxMode: boolean },
  bankTranId: string,
  refundAmount: number,
  refundRemarks: string,
): Promise<{ status: string; refundRefId?: string; errorReason?: string }> {
  const sslcz = new SSLCommerzPayment(gateway.storeId, gateway.secretKey, !gateway.sandboxMode);
  const response = await sslcz.initiateRefund({
    refund_amount: refundAmount.toFixed(2),
    refund_remarks: refundRemarks,
    bank_tran_id: bankTranId,
    refe_id: "",
  });
  return {
    status: (response.status as string)?.toLowerCase() || "fail",
    refundRefId: response.refund_ref_id,
    errorReason: response.errorReason,
  };
}

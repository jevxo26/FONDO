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
  const baseUrl = gateway.sandboxMode
    ? "https://sandbox.sslcommerz.com/gwprocess/v4/api.php"
    : "https://secure.sslcommerz.com/gwprocess/v4/api.php";

  const body = new URLSearchParams({
    store_id: gateway.storeId,
    store_passwd: gateway.secretKey,
    total_amount: data.totalAmount.toFixed(2),
    currency: data.currency ?? "BDT",
    tran_id: data.tranId,
    success_url: data.successUrl,
    fail_url: data.failUrl,
    cancel_url: data.cancelUrl,
    cus_name: data.customerName,
    cus_phone: data.customerPhone,
    cus_email: data.customerEmail,
    cus_add1: data.customerAddress,
  });

  const res = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  return res.json();
}

export async function validatePayment(
  gateway: { storeId: string; secretKey: string; sandboxMode: boolean },
  valId: string,
): Promise<SslcValidateResponse> {
  const baseUrl = gateway.sandboxMode
    ? "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php"
    : "https://secure.sslcommerz.com/validator/api/validationserverAPI.php";

  const url = `${baseUrl}?val_id=${valId}&store_id=${gateway.storeId}&store_passwd=${gateway.secretKey}&v=1&format=json`;

  const res = await fetch(url);
  const data = await res.json();

  return { status: data.status, validated: data.status === "VALID" || data.status === "VALIDATED" };
}

export async function initRefund(
  gateway: { storeId: string; secretKey: string; sandboxMode: boolean },
  bankTranId: string,
  refundAmount: number,
  refundRemarks: string,
): Promise<{ status: string; refundRefId?: string; errorReason?: string }> {
  const baseUrl = gateway.sandboxMode
    ? "https://sandbox.sslcommerz.com/refund/api/refund.php"
    : "https://secure.sslcommerz.com/refund/api/refund.php";

  const body = new URLSearchParams({
    store_id: gateway.storeId,
    store_passwd: gateway.secretKey,
    bank_tran_id: bankTranId,
    refund_amount: refundAmount.toFixed(2),
    refund_remarks: refundRemarks,
  });

  const res = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  return res.json();
}

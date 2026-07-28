declare module "sslcommerz-lts" {
  interface SslcInitResponse {
    status: string;
    GatewayPageURL?: string;
    failedreason?: string;
    tran_id?: string;
  }

  interface SslcValidateResponse {
    status: string;
  }

  interface SslcRefundResponse {
    status: string;
    refund_ref_id?: string;
    errorReason?: string;
  }

  class SSLCommerzPayment {
    constructor(storeId: string, secretKey: string, isLive: boolean);
    init(data: Record<string, string>): Promise<SslcInitResponse>;
    validate(data: { val_id: string }): Promise<SslcValidateResponse>;
    initiateRefund(data: Record<string, string>): Promise<SslcRefundResponse>;
  }

  export default SSLCommerzPayment;
}

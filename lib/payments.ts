// ─── Payment URL generators ────────────────────────────────

const CLICK_MERCHANT_ID = process.env.CLICK_MERCHANT_ID || "";
const CLICK_SERVICE_ID = process.env.CLICK_SERVICE_ID || "";
const PAYME_MERCHANT_ID = process.env.PAYME_MERCHANT_ID || "";

// ─── Click.uz Payment URL ───────────────────────────────────
export function generateClickPaymentUrl(params: {
    amount: number; // in so'm
    merchantTransId: string;
    returnUrl?: string;
}) {
    const baseUrl = "https://my.click.uz/services/pay";
    const url = new URL(baseUrl);
    url.searchParams.set("service_id", CLICK_SERVICE_ID);
    url.searchParams.set("merchant_id", CLICK_MERCHANT_ID);
    url.searchParams.set("amount", params.amount.toString());
    url.searchParams.set("transaction_param", params.merchantTransId);
    if (params.returnUrl) {
        url.searchParams.set("return_url", params.returnUrl);
    }
    return url.toString();
}

// ─── Payme Payment URL ─────────────────────────────────────
export function generatePaymePaymentUrl(params: {
    amount: number; // in tiyin (1 so'm = 100 tiyin)
    orderId: string;
}) {
    const encoded = Buffer.from(
        `m=${PAYME_MERCHANT_ID};ac.order_id=${params.orderId};a=${params.amount}`
    ).toString("base64");
    return `https://checkout.paycom.uz/${encoded}`;
}

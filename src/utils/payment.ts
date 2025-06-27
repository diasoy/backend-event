import axios from "axios";
import {
  MIDTRANS_SERVER_KEY,
  MIDTRANS_TRANSACTION_URL,
  CLIENT_HOST,
} from "./env";

export interface Payment {
  transaction_details: {
    order_id: string;
    gross_amount: number;
  };
  callbacks?: {
    finish: string;
    error: string;
    pending: string;
  };
  notification_url?: string;
}

export type TypeResponseMidtrans = {
  token: string;
  redirect_url: string;
};

export default {
  async createLink(payload: Payment): Promise<TypeResponseMidtrans> {
    // Add callback URLs for proper redirect handling
    const paymentPayload = {
      ...payload,
      callbacks: {
        finish: `${CLIENT_HOST}/payment?order_id=${payload.transaction_details.order_id}&status=success`,
        error: `${CLIENT_HOST}/payment?order_id=${payload.transaction_details.order_id}&status=failed`,
        pending: `${CLIENT_HOST}/payment?order_id=${payload.transaction_details.order_id}&status=pending`,
      },
      notification_url: `${
        process.env.BACKEND_URL || "http://localhost:3000"
      }/api/payment/webhook`,
    };

    const result = await axios.post<TypeResponseMidtrans>(
      `${MIDTRANS_TRANSACTION_URL}`,
      paymentPayload,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Basic ${Buffer.from(
            `${MIDTRANS_SERVER_KEY}:`
          ).toString("base64")}`,
        },
      }
    );
    if (result.status !== 201) {
      throw new Error("payment failed");
    }
    return result?.data;
  },
};

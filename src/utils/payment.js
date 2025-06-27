"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const env_1 = require("./env");
exports.default = {
    createLink(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // Add callback URLs for proper redirect handling
            const paymentPayload = Object.assign(Object.assign({}, payload), { callbacks: {
                    finish: `${env_1.CLIENT_HOST}/payment?order_id=${payload.transaction_details.order_id}&status=success`,
                    error: `${env_1.CLIENT_HOST}/payment?order_id=${payload.transaction_details.order_id}&status=failed`,
                    pending: `${env_1.CLIENT_HOST}/payment?order_id=${payload.transaction_details.order_id}&status=pending`,
                }, notification_url: `${process.env.BACKEND_URL || "http://localhost:3000"}/api/payment/webhook` });
            const result = yield axios_1.default.post(`${env_1.MIDTRANS_TRANSACTION_URL}`, paymentPayload, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Basic ${Buffer.from(`${env_1.MIDTRANS_SERVER_KEY}:`).toString("base64")}`,
                },
            });
            if (result.status !== 201) {
                throw new Error("payment failed");
            }
            return result === null || result === void 0 ? void 0 : result.data;
        });
    },
};

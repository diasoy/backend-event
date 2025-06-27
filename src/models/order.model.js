"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.OrderStatus = exports.orderDTO = exports.ORDER_MODEL_NAME = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const Yup = __importStar(require("yup"));
const event_model_1 = require("./event.model");
const user_model_1 = require("./user.model");
const ticket_model_1 = require("./ticket.model");
const id_1 = require("../utils/id");
const payment_1 = __importDefault(require("../utils/payment"));
exports.ORDER_MODEL_NAME = "Order";
exports.orderDTO = Yup.object({
    createdBy: Yup.string().required(),
    events: Yup.string().required(),
    ticket: Yup.string().required(),
    quantity: Yup.number().required(),
});
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "pending";
    OrderStatus["COMPLETED"] = "completed";
    OrderStatus["CANCELLED"] = "cancelled";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
const OrderSchema = new mongoose_1.Schema({
    orderId: {
        type: mongoose_1.Schema.Types.String,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: user_model_1.USER_MODEL_NAME,
        required: true,
    },
    events: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: event_model_1.EVENT_MODEL_NAME,
        required: true,
    },
    total: {
        type: mongoose_1.Schema.Types.Number,
        required: true,
    },
    payment: {
        type: {
            token: {
                type: mongoose_1.Schema.Types.String,
                required: true,
            },
            redirect_url: {
                type: mongoose_1.Schema.Types.String,
                required: true,
            },
        },
    },
    status: {
        type: mongoose_1.Schema.Types.String,
        enum: [OrderStatus.PENDING, OrderStatus.COMPLETED, OrderStatus.CANCELLED],
        default: OrderStatus.PENDING,
    },
    ticket: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: ticket_model_1.TICKET_MODEL_NAME,
        required: true,
    },
    quantity: {
        type: mongoose_1.Schema.Types.Number,
        required: true,
    },
    vouchers: {
        type: [
            {
                voucherId: {
                    type: mongoose_1.Schema.Types.String,
                },
                isPrint: {
                    type: mongoose_1.Schema.Types.Boolean,
                    default: false,
                },
            },
        ],
    },
}, {
    timestamps: true,
}).index({ orderId: "text" });
OrderSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const order = this;
        order.orderId = (0, id_1.getId)();
        order.payment = yield payment_1.default.createLink({
            transaction_details: {
                gross_amount: order.total,
                order_id: order.orderId,
            },
        });
    });
});
const OrderModel = mongoose_1.default.model(exports.ORDER_MODEL_NAME, OrderSchema);
exports.default = OrderModel;

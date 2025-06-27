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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketDTO = exports.TICKET_MODEL_NAME = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const Yup = __importStar(require("yup"));
const event_model_1 = require("./event.model");
exports.TICKET_MODEL_NAME = "Ticket";
exports.ticketDTO = Yup.object({
    price: Yup.number().required(),
    name: Yup.string().required(),
    events: Yup.string().required(),
    description: Yup.string().required(),
    quantity: Yup.number().required(),
});
const TicketSchema = new mongoose_1.Schema({
    price: {
        type: mongoose_1.Schema.Types.Number,
        required: true,
    },
    name: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    description: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    events: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: event_model_1.EVENT_MODEL_NAME,
    },
    quantity: {
        type: mongoose_1.Schema.Types.Number,
        required: true,
    },
}, {
    timestamps: true,
}).index({ name: "text" });
const TicketModel = mongoose_1.default.model(exports.TICKET_MODEL_NAME, TicketSchema);
exports.default = TicketModel;

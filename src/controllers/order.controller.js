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
const response_1 = __importDefault(require("../utils/response"));
const order_model_1 = __importStar(require("../models/order.model"));
const ticket_model_1 = __importDefault(require("../models/ticket.model"));
const id_1 = require("../utils/id");
exports.default = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const payload = Object.assign(Object.assign({}, req.body), { createdBy: userId });
                yield order_model_1.orderDTO.validate(payload);
                const ticket = yield ticket_model_1.default.findById(payload.ticket);
                if (!ticket)
                    return response_1.default.notFound(res, "ticket not found");
                if (ticket.quantity < payload.quantity) {
                    return response_1.default.error(res, null, "ticket quantity is not enough");
                }
                const total = +(ticket === null || ticket === void 0 ? void 0 : ticket.price) * +payload.quantity;
                Object.assign(payload, Object.assign(Object.assign({}, payload), { total }));
                const result = yield order_model_1.default.create(payload);
                response_1.default.success(res, result, "success to create an order");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to create an order");
            }
        });
    },
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const buildQuery = (filter) => {
                    let query = {};
                    if (filter.search)
                        query.$text = { $search: filter.search };
                    return query;
                };
                const { limit = 10, page = 1, search } = req.query;
                const query = buildQuery({
                    search,
                });
                const result = yield order_model_1.default.find(query)
                    .limit(+limit)
                    .skip((+page - 1) * +limit)
                    .sort({ createdAt: -1 })
                    .lean()
                    .exec();
                const count = yield order_model_1.default.countDocuments(query);
                response_1.default.pagination(res, result, {
                    current: +page,
                    total: count,
                    totalPages: Math.ceil(count / +limit),
                }, "success find all orders");
            }
            catch (error) {
                response_1.default.error(res, error, "failed find all orders");
            }
        });
    },
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { orderId } = req.params;
                const result = yield order_model_1.default.findOne({
                    orderId,
                });
                if (!result)
                    return response_1.default.notFound(res, "order not found");
                response_1.default.success(res, result, "success to find one an order");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to find one an order");
            }
        });
    },
    findAllByMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const buildQuery = (filter) => {
                    let query = {
                        createdBy: userId,
                    };
                    if (filter.search)
                        query.$text = { $search: filter.search };
                    return query;
                };
                const { limit = 10, page = 1, search } = req.query;
                const query = buildQuery({
                    search,
                });
                const result = yield order_model_1.default.find(query)
                    .limit(+limit)
                    .skip((+page - 1) * +limit)
                    .sort({ createdAt: -1 })
                    .lean()
                    .exec();
                const count = yield order_model_1.default.countDocuments(query);
                response_1.default.pagination(res, result, {
                    current: +page,
                    total: count,
                    totalPages: Math.ceil(count / +limit),
                }, "success find all orders");
            }
            catch (error) {
                response_1.default.error(res, error, "failed find all orders");
            }
        });
    },
    complete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { orderId } = req.params;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const order = yield order_model_1.default.findOne({
                    orderId,
                    createdBy: userId,
                });
                if (!order)
                    return response_1.default.notFound(res, "order not found");
                if (order.status === order_model_1.OrderStatus.COMPLETED)
                    return response_1.default.error(res, null, "you have been completed this order");
                const vouchers = Array.from({ length: order.quantity }, () => {
                    return {
                        isPrint: false,
                        voucherId: (0, id_1.getId)(),
                    };
                });
                const result = yield order_model_1.default.findOneAndUpdate({
                    orderId,
                    createdBy: userId,
                }, {
                    vouchers,
                    status: order_model_1.OrderStatus.COMPLETED,
                }, {
                    new: true,
                });
                const ticket = yield ticket_model_1.default.findById(order.ticket);
                if (!ticket)
                    return response_1.default.notFound(res, "ticket and order not found");
                yield ticket_model_1.default.updateOne({
                    _id: ticket._id,
                }, {
                    quantity: ticket.quantity - order.quantity,
                });
                response_1.default.success(res, result, "success to complete an order");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to complete an order");
            }
        });
    },
    pending(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { orderId } = req.params;
                const order = yield order_model_1.default.findOne({
                    orderId,
                });
                if (!order)
                    return response_1.default.notFound(res, "order not found");
                if (order.status === order_model_1.OrderStatus.COMPLETED) {
                    return response_1.default.error(res, null, "this order has been completed");
                }
                if (order.status === order_model_1.OrderStatus.PENDING) {
                    return response_1.default.error(res, null, "this order currently in payment pending");
                }
                const result = yield order_model_1.default.findOneAndUpdate({ orderId }, {
                    status: order_model_1.OrderStatus.PENDING,
                }, {
                    new: true,
                });
                response_1.default.success(res, result, "success to pending an order");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to pending an order");
            }
        });
    },
    cancelled(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { orderId } = req.params;
                const order = yield order_model_1.default.findOne({
                    orderId,
                });
                if (!order)
                    return response_1.default.notFound(res, "order not found");
                if (order.status === order_model_1.OrderStatus.COMPLETED) {
                    return response_1.default.error(res, null, "this order has been completed");
                }
                if (order.status === order_model_1.OrderStatus.CANCELLED) {
                    return response_1.default.error(res, null, "this order currently in payment cancelled");
                }
                const result = yield order_model_1.default.findOneAndUpdate({ orderId }, {
                    status: order_model_1.OrderStatus.CANCELLED,
                }, {
                    new: true,
                });
                response_1.default.success(res, result, "success to cancelled an order");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to cancelled an order");
            }
        });
    },
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { orderId } = req.params;
                const result = yield order_model_1.default.findOneAndDelete({
                    orderId,
                }, {
                    new: true,
                });
                if (!result) {
                    return response_1.default.notFound(res, "order not found");
                }
                response_1.default.success(res, result, "success to remove an order");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to remove an order");
            }
        });
    },
    webhook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { order_id, transaction_status, fraud_status } = req.body;
                if (!order_id) {
                    return response_1.default.error(res, null, "Missing order_id in webhook");
                }
                let newStatus;
                // Map Midtrans transaction status to our order status
                if (transaction_status === "settlement" ||
                    transaction_status === "capture") {
                    if (fraud_status === "challenge") {
                        newStatus = order_model_1.OrderStatus.PENDING;
                    }
                    else {
                        newStatus = order_model_1.OrderStatus.COMPLETED;
                    }
                }
                else if (transaction_status === "pending") {
                    newStatus = order_model_1.OrderStatus.PENDING;
                }
                else if (transaction_status === "deny" ||
                    transaction_status === "cancel" ||
                    transaction_status === "expire") {
                    newStatus = order_model_1.OrderStatus.CANCELLED;
                }
                else {
                    return response_1.default.error(res, null, `Unknown transaction status: ${transaction_status}`);
                }
                const order = yield order_model_1.default.findOne({ orderId: order_id });
                if (!order) {
                    return response_1.default.notFound(res, "Order not found");
                }
                // Update order status
                if (newStatus === order_model_1.OrderStatus.COMPLETED &&
                    order.status !== order_model_1.OrderStatus.COMPLETED) {
                    // Generate vouchers for completed orders
                    const vouchers = Array.from({ length: order.quantity }, () => {
                        return {
                            isPrint: false,
                            voucherId: (0, id_1.getId)(),
                        };
                    });
                    yield order_model_1.default.findOneAndUpdate({ orderId: order_id }, {
                        vouchers,
                        status: newStatus,
                    }, { new: true });
                    // Update ticket quantity
                    const ticket = yield ticket_model_1.default.findById(order.ticket);
                    if (ticket) {
                        yield ticket_model_1.default.updateOne({ _id: ticket._id }, { quantity: ticket.quantity - order.quantity });
                    }
                }
                else {
                    // Just update status for other cases
                    yield order_model_1.default.findOneAndUpdate({ orderId: order_id }, { status: newStatus }, { new: true });
                }
                response_1.default.success(res, { status: newStatus }, "Webhook processed successfully");
            }
            catch (error) {
                response_1.default.error(res, error, "Failed to process webhook");
            }
        });
    },
};

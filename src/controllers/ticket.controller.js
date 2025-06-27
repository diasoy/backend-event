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
const ticket_model_1 = __importStar(require("../models/ticket.model"));
const mongoose_1 = require("mongoose");
exports.default = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ticket_model_1.ticketDTO.validate(req.body);
                const result = yield ticket_model_1.default.create(req.body);
                response_1.default.success(res, result, "success create a ticket");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to create a ticket");
            }
        });
    },
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit = 10, page = 1, search, } = req.query;
                const query = {};
                if (search) {
                    Object.assign(query, Object.assign(Object.assign({}, query), { $text: {
                            $search: search,
                        } }));
                }
                const result = yield ticket_model_1.default.find(query)
                    .populate("events")
                    .limit(limit)
                    .skip((page - 1) * limit)
                    .sort({ createdAt: -1 })
                    .exec();
                const count = yield ticket_model_1.default.countDocuments(query);
                response_1.default.pagination(res, result, {
                    total: count,
                    current: page,
                    totalPages: Math.ceil(count / limit),
                }, "success find all tickets");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to find all ticket");
            }
        });
    },
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!(0, mongoose_1.isValidObjectId)(id)) {
                    return response_1.default.notFound(res, "failed find one a ticket");
                }
                const result = yield ticket_model_1.default.findById(id);
                if (!result) {
                    return response_1.default.notFound(res, "failed find one a ticket");
                }
                response_1.default.success(res, result, "success find one a ticket");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to find one a ticket");
            }
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!(0, mongoose_1.isValidObjectId)(id)) {
                    return response_1.default.notFound(res, "failed update a ticket");
                }
                const result = yield ticket_model_1.default.findByIdAndUpdate(id, req.body, {
                    new: true,
                });
                response_1.default.success(res, result, "success update a ticket");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to update ticket");
            }
        });
    },
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!(0, mongoose_1.isValidObjectId)(id)) {
                    return response_1.default.notFound(res, "failed remove a ticket");
                }
                const result = yield ticket_model_1.default.findByIdAndDelete(id, {
                    new: true,
                });
                response_1.default.success(res, result, "success remove a ticket");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to remove ticket");
            }
        });
    },
    findAllByEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { eventId } = req.params;
                if (!(0, mongoose_1.isValidObjectId)(eventId)) {
                    return response_1.default.error(res, null, "tickets not found");
                }
                const result = yield ticket_model_1.default.find({ events: eventId }).exec();
                response_1.default.success(res, result, "success find all tickets by an event");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to find all ticket by event");
            }
        });
    },
};

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
const event_model_1 = __importStar(require("../models/event.model"));
const mongoose_1 = require("mongoose");
const uploader_1 = __importDefault(require("../utils/uploader"));
exports.default = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const payload = Object.assign(Object.assign({}, req.body), { createdBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
                yield event_model_1.eventDTO.validate(payload);
                const result = yield event_model_1.default.create(payload);
                response_1.default.success(res, result, "success create an event");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to create an event");
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
                    if (filter.category)
                        query.category = filter.category;
                    if (filter.isOnline)
                        query.isOnline = filter.isOnline;
                    if (filter.isPublish)
                        query.isPublish = filter.isPublish;
                    if (filter.isFeatured)
                        query.isFeatured = filter.isFeatured;
                    return query;
                };
                const { limit = 10, page = 1, search, category, isOnline, isFeatured, isPublish, } = req.query;
                const query = buildQuery({
                    search,
                    category,
                    isPublish,
                    isFeatured,
                    isOnline,
                });
                const result = yield event_model_1.default.find(query)
                    .limit(+limit)
                    .skip((+page - 1) * +limit)
                    .sort({ createdAt: -1 })
                    .lean()
                    .exec();
                const count = yield event_model_1.default.countDocuments(query);
                response_1.default.pagination(res, result, {
                    current: +page,
                    total: count,
                    totalPages: Math.ceil(count / +limit),
                }, "success find all events");
            }
            catch (error) {
                response_1.default.error(res, error, "failed find all events");
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
                const result = yield event_model_1.default.findById(id);
                if (!result) {
                    return response_1.default.notFound(res, "failed find one a event");
                }
                response_1.default.success(res, result, "success find one event");
            }
            catch (error) {
                response_1.default.error(res, error, "failed find one event");
            }
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield event_model_1.default.findByIdAndUpdate(id, req.body, {
                    new: true,
                });
                if (!result)
                    return response_1.default.notFound(res, "event not found");
                response_1.default.success(res, result, "success update an event");
            }
            catch (error) {
                response_1.default.error(res, error, "failed update an event");
            }
        });
    },
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield event_model_1.default.findByIdAndDelete(id, {
                    new: true,
                });
                if (!result)
                    return response_1.default.notFound(res, "event not found");
                yield uploader_1.default.remove(result.banner);
                response_1.default.success(res, result, "success remove an event");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to remove an event");
            }
        });
    },
    findOneBySlug(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { slug } = req.params;
                const result = yield event_model_1.default.findOne({
                    slug,
                });
                if (!result)
                    return response_1.default.notFound(res, "event not found");
                response_1.default.success(res, result, "success find one by slug an event");
            }
            catch (error) {
                response_1.default.error(res, error, "failed find one by slug an event");
            }
        });
    },
};

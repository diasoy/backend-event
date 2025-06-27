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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Yup = __importStar(require("yup"));
exports.default = {
    success(res, data, message) {
        res.status(200).json({
            meta: {
                status: 200,
                message,
            },
            data,
        });
    },
    error(res, error, message) {
        var _a;
        if (error instanceof Yup.ValidationError) {
            return res.status(400).json({
                meta: {
                    status: 400,
                    message,
                },
                data: {
                    [`${error.path}`]: error.errors[0],
                },
            });
        }
        if (error instanceof mongoose_1.default.Error) {
            return res.status(500).json({
                meta: {
                    status: 500,
                    message: error.message,
                },
                data: error.name,
            });
        }
        if (error === null || error === void 0 ? void 0 : error.code) {
            const _err = error;
            return res.status(500).json({
                meta: {
                    status: 500,
                    message: ((_a = _err === null || _err === void 0 ? void 0 : _err.errorResponse) === null || _a === void 0 ? void 0 : _a.errmsg) || "server error",
                },
                data: _err,
            });
        }
        res.status(500).json({
            meta: {
                status: 500,
                message,
            },
            data: error,
        });
    },
    notFound(res, message = "not found") {
        res.status(404).json({
            meta: {
                status: 404,
                message,
            },
            data: null,
        });
    },
    unauthorized(res, message = "unauthorized") {
        res.status(403).json({
            meta: {
                status: 403,
                message,
            },
            data: null,
        });
    },
    pagination(res, data, pagination, message) {
        res.status(200).json({
            meta: {
                status: 200,
                message,
            },
            data,
            pagination,
        });
    },
};

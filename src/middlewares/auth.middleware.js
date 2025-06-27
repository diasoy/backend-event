"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../utils/jwt");
const response_1 = __importDefault(require("../utils/response"));
exports.default = (req, res, next) => {
    var _a;
    const authorization = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    if (!authorization) {
        return response_1.default.unauthorized(res);
    }
    const [prefix, token] = authorization.split(" ");
    if (!(prefix === "Bearer" && token)) {
        return response_1.default.unauthorized(res);
    }
    const user = (0, jwt_1.getUserData)(token);
    if (!user) {
        return response_1.default.unauthorized(res);
    }
    req.user = user;
    next();
};

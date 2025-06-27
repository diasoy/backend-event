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
const user_model_1 = __importStar(require("../models/user.model"));
const encryption_1 = require("../utils/encryption");
const jwt_1 = require("../utils/jwt");
const response_1 = __importDefault(require("../utils/response"));
exports.default = {
    updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const { fullName, profilePicture } = req.body;
                const result = yield user_model_1.default.findByIdAndUpdate(userId, {
                    fullName,
                    profilePicture,
                }, {
                    new: true,
                });
                if (!result)
                    return response_1.default.notFound(res, "user not found");
                response_1.default.success(res, result, "success to update profile");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to update profile");
            }
        });
    },
    updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const { oldPassword, password, confirmPassword } = req.body;
                yield user_model_1.userUpdatePasswordDTO.validate({
                    oldPassword,
                    password,
                    confirmPassword,
                });
                const user = yield user_model_1.default.findById(userId);
                if (!user || user.password !== (0, encryption_1.encrypt)(oldPassword))
                    return response_1.default.notFound(res, "user not found");
                const result = yield user_model_1.default.findByIdAndUpdate(userId, {
                    password: (0, encryption_1.encrypt)(password),
                }, {
                    new: true,
                });
                response_1.default.success(res, result, "success to update password");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to update password");
            }
        });
    },
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fullName, userName, email, password, confirmPassword } = req.body;
            try {
                yield user_model_1.userDTO.validate({
                    fullName,
                    userName,
                    email,
                    password,
                    confirmPassword,
                });
                const result = yield user_model_1.default.create({
                    fullName,
                    email,
                    userName,
                    password,
                });
                response_1.default.success(res, result, "success registration!");
            }
            catch (error) {
                response_1.default.error(res, error, "failed registration");
            }
        });
    },
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { identifier, password } = req.body;
                yield user_model_1.userLoginDTO.validate({
                    identifier,
                    password,
                });
                const userByIdentifier = yield user_model_1.default.findOne({
                    $or: [
                        {
                            email: identifier,
                        },
                        {
                            userName: identifier,
                        },
                    ],
                    isActive: true,
                });
                if (!userByIdentifier) {
                    return response_1.default.unauthorized(res, "user not found");
                }
                // validasi password
                const validatePassword = (0, encryption_1.encrypt)(password) === userByIdentifier.password;
                if (!validatePassword) {
                    return response_1.default.unauthorized(res, "user not found");
                }
                const token = (0, jwt_1.generateToken)({
                    id: userByIdentifier._id,
                    role: userByIdentifier.role,
                });
                response_1.default.success(res, token, "login success");
            }
            catch (error) {
                response_1.default.error(res, error, "login failed");
            }
        });
    },
    me(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const result = yield user_model_1.default.findById(user === null || user === void 0 ? void 0 : user.id);
                response_1.default.success(res, result, "success get user profile");
            }
            catch (error) {
                response_1.default.error(res, error, "failed get user profile");
            }
        });
    },
    activation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { code } = req.body;
                const user = yield user_model_1.default.findOneAndUpdate({
                    activationCode: code,
                }, {
                    isActive: true,
                }, {
                    new: true,
                });
                response_1.default.success(res, user, "user successfully activated");
            }
            catch (error) {
                response_1.default.error(res, error, "user is failed activated");
            }
        });
    },
};

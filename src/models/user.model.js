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
exports.userDTO = exports.userUpdatePasswordDTO = exports.userLoginDTO = exports.USER_MODEL_NAME = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const encryption_1 = require("../utils/encryption");
const mail_1 = require("../utils/mail/mail");
const env_1 = require("../utils/env");
const constant_1 = require("../utils/constant");
const Yup = __importStar(require("yup"));
const validatePassword = Yup.string()
    .required()
    .min(6, "Password must be at least 6 characters")
    .test("at-least-one-uppercase-letter", "Contains at least one uppercase letter", (value) => {
    if (!value)
        return false;
    const regex = /^(?=.*[A-Z])/;
    return regex.test(value);
})
    .test("at-least-one-number", "Contains at least one uppercase letter", (value) => {
    if (!value)
        return false;
    const regex = /^(?=.*\d)/;
    return regex.test(value);
});
const validateConfirmPassword = Yup.string()
    .required()
    .oneOf([Yup.ref("password"), ""], "Password not match");
exports.USER_MODEL_NAME = "User";
exports.userLoginDTO = Yup.object({
    identifier: Yup.string().required(),
    password: validatePassword,
});
exports.userUpdatePasswordDTO = Yup.object({
    oldPassword: validatePassword,
    password: validatePassword,
    confirmPassword: validateConfirmPassword,
});
exports.userDTO = Yup.object({
    fullName: Yup.string().required(),
    userName: Yup.string().required(),
    email: Yup.string().email().required(),
    password: validatePassword,
    confirmPassword: validateConfirmPassword,
});
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    fullName: {
        type: Schema.Types.String,
        required: true,
    },
    userName: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    password: {
        type: Schema.Types.String,
        required: true,
    },
    role: {
        type: Schema.Types.String,
        enum: [constant_1.ROLES.ADMIN, constant_1.ROLES.MEMBER],
        default: constant_1.ROLES.MEMBER,
    },
    profilePicture: {
        type: Schema.Types.String,
        default: "user.jpg",
    },
    isActive: {
        type: Schema.Types.Boolean,
        default: false,
    },
    activationCode: {
        type: Schema.Types.String,
    },
}, {
    timestamps: true,
});
UserSchema.pre("save", function (next) {
    const user = this;
    user.password = (0, encryption_1.encrypt)(user.password);
    user.activationCode = (0, encryption_1.encrypt)(user.id);
    next();
});
UserSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = doc;
            console.log("Send Email to: ", user);
            const contentMail = yield (0, mail_1.renderMailHtml)("registration-success.ejs", {
                username: user.userName,
                fullName: user.fullName,
                email: user.email,
                createdAt: user.createdAt,
                activationLink: `${env_1.CLIENT_HOST}/auth/activation?code=${user.activationCode}`,
            });
            yield (0, mail_1.sendMail)({
                from: env_1.EMAIL_SMTP_USER,
                to: user.email,
                subject: "Aktivasi Akun Anda",
                html: contentMail,
            });
        }
        catch (error) {
            console.log(error);
        }
        finally {
            next();
        }
    });
});
UserSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.activationCode;
    return user;
};
const UserModel = mongoose_1.default.model(exports.USER_MODEL_NAME, UserSchema);
exports.default = UserModel;

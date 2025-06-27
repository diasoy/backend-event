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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderMailHtml = exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const env_1 = require("../env");
const transporter = nodemailer_1.default.createTransport({
    // service: EMAIL_SMTP_SERVICE_NAME,
    host: env_1.EMAIL_SMTP_HOST,
    port: env_1.EMAIL_SMTP_PORT,
    secure: env_1.EMAIL_SMTP_SECURE,
    auth: {
        user: env_1.EMAIL_SMTP_USER,
        pass: env_1.EMAIL_SMTP_PASS,
    },
    requireTLS: true,
});
const sendMail = (_a) => __awaiter(void 0, void 0, void 0, function* () {
    var mailParams = __rest(_a, []);
    const result = yield transporter.sendMail(Object.assign({}, mailParams));
    return result;
});
exports.sendMail = sendMail;
const renderMailHtml = (template, data) => __awaiter(void 0, void 0, void 0, function* () {
    const content = yield ejs_1.default.renderFile(path_1.default.join(__dirname, `templates/${template}`), data);
    return content;
});
exports.renderMailHtml = renderMailHtml;

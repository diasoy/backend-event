"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getId = void 0;
const nanoid_1 = require("nanoid");
const getId = () => {
    const nanoid = (0, nanoid_1.customAlphabet)("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 10);
    return nanoid(5);
};
exports.getId = getId;

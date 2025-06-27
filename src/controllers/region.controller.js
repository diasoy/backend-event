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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("../utils/response"));
const region_model_1 = __importDefault(require("../models/region.model"));
exports.default = {
    findByCity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.query;
                const result = yield region_model_1.default.findByCity(`${name}`);
                response_1.default.success(res, result, "success get region by city name");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to get region by city name");
            }
        });
    },
    getAllProvinces(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield region_model_1.default.getAllProvinces();
                response_1.default.success(res, result, "success get all provinces");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to get all provinces");
            }
        });
    },
    getProvince(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield region_model_1.default.getProvince(Number(id));
                response_1.default.success(res, result, "success get a province");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to get province");
            }
        });
    },
    getRegency(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield region_model_1.default.getRegency(Number(id));
                response_1.default.success(res, result, "success get regencies");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to get regency");
            }
        });
    },
    getDistrict(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield region_model_1.default.getDistrict(Number(id));
                response_1.default.success(res, result, "success get districts");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to get district");
            }
        });
    },
    getVillage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield region_model_1.default.getVillage(Number(id));
                response_1.default.success(res, result, "success get villages");
            }
            catch (error) {
                response_1.default.error(res, error, "failed to get village");
            }
        });
    },
};

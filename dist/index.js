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
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
class LicardAPI {
    constructor(_options) {
        this._options = _options;
        this._instance = axios_1.default.create({
            httpsAgent: new https_1.default.Agent({
                passphrase: this._options.pass,
                pfx: this._options.key,
                rejectUnauthorized: false,
            }),
            baseURL: "https://91.234.16.57:443/solar-bridge-ext/ext/json-services",
        });
    }
    /**
     * Получение информации по договору.
     * @param contractId Идентификатор договора
     */
    getContractInfo(contractId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield this._instance.post("/getContractInfo", {
                    contractId,
                });
                return Promise.resolve(data.getContractInfoRs);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    /**
     * Получение данных о балансе по договору
     * @param contractId Идентификатор договора/карты
     */
    getContractBalance(contractId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield this._instance.post("/getContractBalance", {
                    contractId,
                });
                return Promise.resolve(data.getContractBalanceRs);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    /**
     * Получение идентификатора карты/контракта по номеру
     * @param contractNumber Номер карты/контракта
     */
    getContractIdByNumber(contractNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield this._instance.post("/getContractIdByNumber", {
                    contractNumber,
                });
                return Promise.resolve(data.getContractIdByNumberRs);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    blockCard(contractId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield this._instance.post("/blockCard", {
                    contractId,
                });
                return Promise.resolve(data.blockCardRs);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    unblockCard(contractId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield this._instance.post("/unblockCard", {
                    contractId,
                });
                return Promise.resolve(data.unblockCardRs);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
}
exports.default = LicardAPI;

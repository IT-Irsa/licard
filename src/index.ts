import axios from "axios";
import https from "https";
import { PxfObject } from "tls";

class LicardAPI {
    constructor(private _options: APIOptions) {}

    private _instance = axios.create({
        httpsAgent: new https.Agent({
            passphrase: this._options.pass,
            pfx: this._options.key,
            rejectUnauthorized: false,
        }),
        baseURL: "https://91.234.16.57:443/solar-bridge-ext/ext/json-services",
    });

    /**
     * Получение данных о балансе по контракту
     */
    public async getContractBalance(): Promise<GetContractBalanceResponse> {
        try {
            const { data } = await this._instance.post("/getContractBalance", {
                contactId: this._options.contractId,
            });
            return Promise.resolve(data.getContractBalanceRs);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default LicardAPI;

export type APIOptions = {
    /** Файл-ключ *.p12 */
    key: string | Buffer | (string | Buffer | PxfObject)[];
    /** Пароль от ключа */
    pass: string;
    /** ID контракта Ликард */
    contractId: string;
};

export type BalancePayload = {
    /**
     * Код типа баланса
     * @example 'AVAILABLE' | 'VOLUME'
     */
    balanceTypeCode: string;
    /** Состояние баланса */
    balanceValue: number;
    /** Код валюты баланса */
    balanceCurr: string;
};

export type GetContractBalanceResponse = {
    /** Код ответа */
    resultCode: number;
    /** Сообщение от сервера */
    resultMessage: string;
    /** Массив информации по балансам */
    getContractBalancePayload: BalancePayload[];
};

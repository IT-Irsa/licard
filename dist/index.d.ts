/// <reference types="node" />
/// <reference types="node" />
import { PxfObject } from "tls";
declare class LicardAPI {
    private _options;
    constructor(_options: APIOptions);
    private _instance;
    /**
     * Получение данных о балансе по контракту
     */
    getContractBalance(): Promise<GetContractBalanceResponse>;
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

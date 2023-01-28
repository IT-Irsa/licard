/// <reference types="node" />
/// <reference types="node" />
import { PxfObject } from "tls";
declare class LicardAPI {
    private _options;
    constructor(_options: APIOptions);
    private _instance;
    /**
     * Получение информации по договору.
     * @param contractId Идентификатор договора
     */
    getContractInfo(contractId: number): Promise<APIResponse & {
        getContractInfoPayload: ContractInfo;
    }>;
    /**
     * Получение данных о балансе по договору
     * @param contractId Идентификатор договора/карты
     */
    getContractBalance(contractId: number): Promise<APIResponse & {
        getContractBalancePayload: BalancePayload[];
    }>;
    /**
     * Получение идентификатора карты/контракта по номеру
     * @param contractNumber Номер карты/контракта
     */
    getContractIdByNumber(contractNumber: string): Promise<APIResponse & {
        getContractIdByNumberPayload: {
            contractId: number;
        };
    }>;
    blockCard(contractId: number): Promise<APIResponse>;
    unblockCard(contractId: number): Promise<APIResponse>;
}
export default LicardAPI;
export type APIOptions = {
    /** Файл-ключ *.p12 */
    key: string | Buffer | (string | Buffer | PxfObject)[];
    /** Пароль от ключа */
    pass: string;
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
export type ContractInfo = {
    /** Идентификатор клиента */
    clientId: number;
    /** Короткое имя клиента */
    clientShortName: string;
    /** Номер договора */
    contractNumber: string;
    /** Дата вступления контракта в силу */
    openDate: Date;
    /** Дата окончания договора */
    closeDate: Date;
    /** Текущий баланс договора */
    amountAvailable: number;
    /** Суммарный баланс по картам договора */
    totalBalance: number;
    /** Расход литров за предыдущий месяц */
    volumePrev: number;
    /** Расход литров за текущий месяц */
    volume: number;
    /** Кредитный лимит */
    creditLimit: number;
    /** Код статуса договора */
    statusId: number;
    /** Статус договора */
    status: string;
    /** Код статуса договора по потреблению */
    discountStatusCode: string;
    /** Значение для отображения статуса договора по потреблению */
    discountStatus: string;
    /** Код схемы оплаты */
    addInfo01Code: string;
    /** Значение для отображения схемы оплаты */
    addInfo01: string;
    /** Код региона заключения договора */
    addInfo02Code: string;
    /** Регион заключения договора */
    addInfo02: string;
    /** Схема определения статуса по объему потребления */
    addInfo03Code: string;
    /** Имя схемы определения статуса по объему потребления */
    addInfo03: string;
    /** Дополнительная информация.
     *
     * Возвращаемые данные зависят от типа договора.
     *
     * Возвращаемое значение не подвергается дополнительной обработке.
     */
    addInfo04Code: string;
    /** Дополнительная информация.
     *
     * Возвращаемые данные зависят от типа договора.
     *
     * Возвращаемое значение не подвергается дополнительной обработке
     */
    addInfo04: string;
};
export type APIResponse = {
    /** Код ответа */
    resultCode: number;
    /** Сообщение от сервера */
    resultMessage: string;
};

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
     * Получение информации по договору.
     * @param contractId Идентификатор договора
     */
    public async getContractInfo(
        contractId: number
    ): Promise<APIResponse & { getContractInfoPayload: [ContractInfo] }> {
        try {
            const { data } = await this._instance.post("/getContractInfo", {
                contractId,
            });
            const response = data.getContractInfoRs;

            if (response.getContractInfoPayload[0].openDate)
                response.getContractInfoPayload[0].openDate = new Date(
                    response.getContractInfoPayload[0].openDate
                );
            if (response.getContractInfoPayload[0].closeDate)
                response.getContractInfoPayload[0].closeDate = new Date(
                    response.getContractInfoPayload[0].closeDate
                );

            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * Получение данных о балансе по договору
     * @param contractId Идентификатор договора/карты
     */
    public async getContractBalance(
        contractId: number
    ): Promise<APIResponse & { getContractBalancePayload: BalancePayload[] }> {
        try {
            const { data } = await this._instance.post("/getContractBalance", {
                contractId,
            });
            return Promise.resolve(data.getContractBalanceRs);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * Получение идентификатора карты/контракта по номеру
     * @param contractNumber Номер карты/контракта
     */
    public async getContractIdByNumber(
        contractNumber: string
    ): Promise<
        APIResponse & { getContractIdByNumberPayload: { contractId: number } }
    > {
        try {
            const { data } = await this._instance.post(
                "/getContractIdByNumber",
                {
                    contractNumber,
                }
            );
            return Promise.resolve(data.getContractIdByNumberRs);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * Блокировка карты
     * @param contractId Идентификатор карты
     */
    public async blockCard(contractId: number): Promise<APIResponse> {
        try {
            const { data } = await this._instance.post("/blockCard", {
                contractId,
            });
            return Promise.resolve(data.blockCardRs);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * Разблокировка карты
     * @param contractId Идентификатор карты
     */
    public async unblockCard(contractId: number): Promise<APIResponse> {
        try {
            const { data } = await this._instance.post("/unblockCard", {
                contractId,
            });
            return Promise.resolve(data.unblockCardRs);
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

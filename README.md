# Licard API

<center>Библиотека для TS/JS приложений, упрощающая взаимодействие с API сервисами личного кабинета системы <a href="https://licard.ru/ru/">Ликард</a></center>

## Установка

Создайте в вашем проекте файл `.npmrc` или дополните его, если он есть следующим содержанием

```properties
@tk-irsa:registry=https://npm.pkg.github.com
```

Затем, установите библиотеку в проект

```
npm i -S @tk-irsa/licard
```

## Простой пример

```ts
import LicardAPI from "@tk-irsa/licard";
import fs from "fs";

const api = new LicardAPI({
    key: fs.readFileSync("path/to/your/pfx/key"),
    pass: "pfx_key_password",
});

const getBalance = async () => await api.getContractBalance(1111111);
```

Описания всех доступных методов вы найдёте в нашем [вики](https://github.com/TK-Irsa/licard/wiki).

## Зависимости

[axios](https://github.com/axios/axios)@1.2.5

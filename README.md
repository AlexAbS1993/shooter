# 📌 PostgreSQL Query Initiator

Небольшая программа для инициации постоянных запросов к серверу с базой данных PostgreSQL.

## ⚙️ Конфигурация `.env`-файла

Перед запуском программы необходимо настроить конфигурацию окружения через `.env`-файл.

  - Конфигурация .env - файла Обязательное поле - SHOOTING_POINT. Здесь необходимо указать адрес сервера, работающего с базой данных postgreSQL.
  - Уровень конфигурации необходимо задать отдельно в зависимости от нагрузки.
  - Можно указать либо в отдельном `.env`-файле, либо в самой строке скрипта при запуске с использованием `cross-env`.

### 📌 Пример `.env`-файла:

```ini
SHOOTING_POINT=http://localhost:3000
```

### 📝 Конфигурация `.env.*`-файлов

Обязательные параметры:

```ini
PORT=номер_порта
SELECT_ACT=количество_секунд_для_SELECT
INSERT_ACT=количество_секунд_для_INSERT
DELETE_ACT=количество_секунд_для_DELETE
ERROR_ACT=количество_секунд_для_симуляции_ошибки
```

### 📌 Пример `.env.*`-файла:

```ini
PORT=5432
SELECT_ACT=10
INSERT_ACT=15
DELETE_ACT=20
ERROR_ACT=30
```

## 🚀 Запуск программы
```sh
git clone https://github.com/AlexAbS1993/shooter.git
npm install
```
Пример конфигурации скриптов:
```sh
"scripts": {
"start_min": "cross-env LEVEL=min node --env-file=.env index.js",
"start_mid": "cross-env LEVEL=middle node --env-file=.env index.js",
"start_h": "cross-env LEVEL=high node --env-file=.env index.js"
}
```

## 🛠️ Зависимости

- PostgreSQL
- Node.js
- `dotenv` для работы с переменными окружения
- `cross-env` (опционально) для управления переменными окружения в разных ОС

---

✨ **Программа позволяет гибко управлять частотой запросов к базе данных, имитируя разное поведение нагрузки.**

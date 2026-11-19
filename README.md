# SampleShop API (ЛР №28, вариант 3)

REST API для интернет-магазина цифровых товаров: Node.js, Express, MongoDB (Mongoose).

## Запуск

Требуется Node.js 18+ и MongoDB (локально или MongoDB Atlas).

```bash
npm install
cp .env.example .env     # и при необходимости поменять MONGODB_URI
npm run seed             # (по желанию) тестовые товары
npm run dev              # разработка (nodemon), либо npm start
```

Сервер: http://localhost:5000

## Эндпоинты

| Метод | URL | Описание | Успех | Ошибки |
|---|---|---|---|---|
| GET | `/api/products` | список товаров | 200 | 500 |
| GET | `/api/products/:id` | один товар | 200 | 400, 404, 500 |
| POST | `/api/products` | создать товар | 201 | 400, 500 |
| PUT | `/api/products/:id` | обновить товар | 200 | 400, 404, 500 |
| DELETE | `/api/products/:id` | удалить товар | 200 | 400, 404, 500 |

Тело запроса (JSON): `{ "name": "Товар", "price": 10, "imageUrl": "/images/x.svg" }`.
Поля `name` и `price` обязательны.

## Примеры

```bash
curl -X POST http://localhost:5000/api/products -H "Content-Type: application/json" \
  -d '{"name":"Icon Pack","price":12.5,"imageUrl":"/images/icons.svg"}'
curl http://localhost:5000/api/products
curl -X PUT http://localhost:5000/api/products/<id> -H "Content-Type: application/json" -d '{"name":"Icon Pack","price":9}'
curl -X DELETE http://localhost:5000/api/products/<id>
```

require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')

const app = express()
const PORT = process.env.PORT || 5000

// Разбор JSON в теле запроса
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'SampleShop API работает' })
})

app.use('/api/products', productRoutes)

// Несуществующий маршрут
app.use((req, res) => {
  res.status(404).json({ message: 'Маршрут не найден' })
})

// Ошибки уровня приложения (например, некорректный JSON в теле запроса)
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Некорректный JSON в теле запроса' })
  }
  console.error(err)
  res.status(500).json({ message: 'Внутренняя ошибка сервера' })
})

async function start() {
  try {
    await connectDB()
    app.listen(PORT, () => console.log(`Сервер запущен: http://localhost:${PORT}`))
  } catch (error) {
    console.error('Не удалось запустить сервер:', error.message)
    process.exit(1)
  }
}

start()

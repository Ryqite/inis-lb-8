const mongoose = require('mongoose')

// Подключение к MongoDB. Строка подключения берётся из переменной окружения MONGODB_URI (.env)
async function connectDB() {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    throw new Error('Не задана переменная окружения MONGODB_URI')
  }

  await mongoose.connect(uri)
  console.log(`MongoDB подключена: ${mongoose.connection.host}/${mongoose.connection.name}`)
}

module.exports = connectDB

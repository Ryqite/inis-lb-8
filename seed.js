// Заполнение базы тестовыми товарами: npm run seed
require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const Product = require('./models/Product')

const products = [
  { name: 'Modern UI Kit', price: 29, imageUrl: '/images/ui-kit.svg' },
  { name: 'Landing Page Template', price: 49, imageUrl: '/images/template.svg' },
  { name: 'Inter Display Font Pack', price: 19.5, imageUrl: '/images/font.svg' },
  { name: 'Design Systems E-book', price: 15, imageUrl: '/images/ebook.svg' },
]

async function seed() {
  try {
    await connectDB()
    await Product.deleteMany()
    const created = await Product.insertMany(products)
    console.log(`Добавлено товаров: ${created.length}`)
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
}

seed()

const Product = require('../models/Product')

// Из тела запроса берутся только разрешённые поля, отсутствующие поля отбрасываются
const ALLOWED_FIELDS = ['name', 'price', 'imageUrl']
const pickFields = (body = {}) =>
  Object.fromEntries(ALLOWED_FIELDS.filter((field) => body[field] !== undefined).map((field) => [field, body[field]]))

// Единая обработка ошибок: 400 для неверных данных, 500 для остальных
function handleError(res, error) {
  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map((e) => e.message)
    return res.status(400).json({ message: 'Ошибка валидации', errors: messages })
  }
  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Некорректный идентификатор товара' })
  }
  console.error(error)
  return res.status(500).json({ message: 'Внутренняя ошибка сервера' })
}

// GET /api/products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (error) {
    handleError(res, error)
  }
}

// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' })
    }
    res.status(200).json(product)
  } catch (error) {
    handleError(res, error)
  }
}

// POST /api/products
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(pickFields(req.body))
    res.status(201).json(product)
  } catch (error) {
    handleError(res, error)
  }
}

// PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, pickFields(req.body), {
      new: true, // вернуть обновлённый документ
      runValidators: true, // применить правила схемы при обновлении
    })
    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' })
    }
    res.status(200).json(product)
  } catch (error) {
    handleError(res, error)
  }
}

// DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' })
    }
    res.status(200).json({ message: 'Товар удалён' })
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct }

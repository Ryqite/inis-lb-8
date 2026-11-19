const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Название товара обязательно'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Цена товара обязательна'],
      min: [0, 'Цена не может быть отрицательной'],
    },
    imageUrl: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Product', productSchema)

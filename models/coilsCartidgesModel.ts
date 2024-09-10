import { Schema, models, model } from 'mongoose'

const CoilsCartidgeShema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  price: {
    type: Number,
    required: true,
  },
  resistance: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
})

const CoilsCartidge =
  models.CoilsCartidge || model('CoilsCartidge', CoilsCartidgeShema)

export default CoilsCartidge

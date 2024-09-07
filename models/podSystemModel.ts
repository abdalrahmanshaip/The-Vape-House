import { Schema, model, models } from 'mongoose'

const podSchema = new Schema({
  productName: {
    type: String,
    require: true,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  price: {
    type: Number,
    require: true,
  },
  colors: {
    type: String,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
    default: 1,
  },
})

const podSystem = models.PodSystem || model('PodSystem', podSchema)

export default podSystem

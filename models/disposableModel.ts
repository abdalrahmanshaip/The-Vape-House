import { Schema, model, models } from 'mongoose'

const disposableSchema = new Schema({
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
  flavor: {
    type: String,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
    default: 1,
  },
  topDispo: {
    type: String,
  },
})

const Disposable = models.Disposable || model('Disposable', disposableSchema)
export default Disposable

import { Schema, model, models } from 'mongoose'

const modSchema = new Schema({
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

const Mods = models.Mod || model('Mod', modSchema)
export default Mods

import { Schema, model, models } from 'mongoose'

const tanksSchema = new Schema({
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
  quantity: {
    type: Number,
    require: true,
    default: 1,
  },
})

const Tanks = models.Tank || model('Tank', tanksSchema)

export default Tanks

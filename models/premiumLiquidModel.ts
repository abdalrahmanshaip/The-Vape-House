import { Schema, model, models } from 'mongoose'

const premiumLiquidSchema = new Schema({
  productName: {
    type: String,
    require: true,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  variations: [
    {
      size: { type: String, required: true },
      nicotineType: { type: String, required: true },
      nicotine: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, require: true, default: 1 },
    },
  ],
  line: {
    type: String,
    require: true,
  },
})

const PremiumLiquid = models.PremiumLiquid || model('PremiumLiquid', premiumLiquidSchema)

export default PremiumLiquid

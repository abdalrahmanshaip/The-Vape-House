import mongoose from 'mongoose'

const url = process.env.MONGODB_URL

const connectDB = async () => {
  if (mongoose.connection.readyState) {
    console.log('MongoDB is already connected')
    return
  }
  try {
    await mongoose.connect(url!)
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

export default connectDB

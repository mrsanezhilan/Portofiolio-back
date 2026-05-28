import mongoose from 'mongoose'

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  period: { type: String, required: true },
  detail: { type: String, required: true }
}, { timestamps: true })

export default mongoose.model('Experience', experienceSchema)

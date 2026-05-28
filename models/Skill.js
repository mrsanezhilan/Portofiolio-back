import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  level: { type: Number, min: 0, max: 100, default: 70 },
  icon: { type: String, default: '' },
  image: { type: String, default: '' }
}, { timestamps: true })

export default mongoose.model('Skill', skillSchema)

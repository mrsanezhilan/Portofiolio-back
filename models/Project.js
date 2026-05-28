import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: { type: String, default: 'Featured' },
  description: { type: String, required: true },
  image: { type: String, default: '' },
  tech: [{ type: String }],
  live: { type: String, default: '#' },
  github: { type: String, default: '#' },
  featured: { type: Boolean, default: true }
}, { timestamps: true })

export default mongoose.model('Project', projectSchema)

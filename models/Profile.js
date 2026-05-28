import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  name: { type: String, default: 'Nexus Dev', trim: true },
  role: { type: String, default: 'Full Stack Developer', trim: true },
  email: { type: String, default: '', trim: true },
  location: { type: String, default: '', trim: true },
  summary: { type: String, default: '' },
  resume: { type: String, default: '' },
  avatar: { type: String, default: '' },
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  roles: [{ type: String }]
}, { timestamps: true })

export default mongoose.model('Profile', profileSchema)

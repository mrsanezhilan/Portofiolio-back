import mongoose from 'mongoose'

const certificationSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  issuer: { type: String, default: '', trim: true },
  date: { type: String, default: '', trim: true },
  credentialUrl: { type: String, default: '' },
  image: { type: String, default: '' },
  description: { type: String, default: '' }
}, { timestamps: true })

export default mongoose.model('Certification', certificationSchema)

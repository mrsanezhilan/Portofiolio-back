import Certification from '../models/Certification.js'

export async function getCertifications(req, res, next) {
  try {
    res.json(await Certification.find().sort({ createdAt: -1 }))
  } catch (error) {
    next(error)
  }
}

export async function upsertCertification(req, res, next) {
  try {
    const payload = { ...req.body }
    if (req.file) payload.image = `/uploads/${req.file.filename}`
    const certification = req.params.id
      ? await Certification.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })
      : await Certification.create(payload)
    if (!certification) return res.status(404).json({ message: 'Certification not found.' })
    res.status(req.params.id ? 200 : 201).json(certification)
  } catch (error) {
    next(error)
  }
}

export async function deleteCertification(req, res, next) {
  try {
    const certification = await Certification.findByIdAndDelete(req.params.id)
    if (!certification) return res.status(404).json({ message: 'Certification not found.' })
    res.json({ message: 'Deleted.' })
  } catch (error) {
    next(error)
  }
}

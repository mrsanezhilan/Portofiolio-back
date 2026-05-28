import Profile from '../models/Profile.js'

const fallback = {
  name: 'Nexus Dev',
  role: 'Full Stack Developer',
  email: 'hello@nexus.dev',
  location: 'India',
  summary: 'I build intelligent, high-performance web products with immersive interfaces, clean APIs, and production-grade architecture.',
  resume: '/resume.pdf',
  roles: ['Full Stack Developer', 'AI Enthusiast', 'Creative React Developer']
}

export async function getProfile(req, res, next) {
  try {
    const profile = await Profile.findOne().sort({ createdAt: 1 })
    res.json(profile || fallback)
  } catch (error) {
    next(error)
  }
}

export async function updateProfile(req, res, next) {
  try {
    const payload = { ...req.body }
    if (typeof payload.roles === 'string') {
      payload.roles = payload.roles.split(',').map((item) => item.trim()).filter(Boolean)
    }
    if (req.file) payload.avatar = `/uploads/${req.file.filename}`
    const existing = await Profile.findOne().sort({ createdAt: 1 })
    const profile = existing
      ? await Profile.findByIdAndUpdate(existing._id, payload, { new: true, runValidators: true })
      : await Profile.create(payload)
    res.json(profile)
  } catch (error) {
    next(error)
  }
}

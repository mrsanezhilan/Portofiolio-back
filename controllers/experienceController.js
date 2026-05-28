import Experience from '../models/Experience.js'

export async function getExperiences(req, res, next) {
  try {
    res.json(await Experience.find().sort({ createdAt: -1 }))
  } catch (error) {
    next(error)
  }
}

export async function upsertExperience(req, res, next) {
  try {
    const experience = req.params.id
      ? await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      : await Experience.create(req.body)
    res.status(req.params.id ? 200 : 201).json(experience)
  } catch (error) {
    next(error)
  }
}

export async function deleteExperience(req, res, next) {
  try {
    await Experience.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted.' })
  } catch (error) {
    next(error)
  }
}

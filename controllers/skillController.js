import Skill from '../models/Skill.js'

export async function getSkills(req, res, next) {
  try {
    res.json(await Skill.find().sort({ category: 1 }))
  } catch (error) {
    next(error)
  }
}

export async function upsertSkill(req, res, next) {
  try {
    const payload = { ...req.body }
    if (req.file) payload.image = `/uploads/${req.file.filename}`
    const skill = req.params.id
      ? await Skill.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })
      : await Skill.create(payload)
    if (!skill) return res.status(404).json({ message: 'Skill not found.' })
    res.status(req.params.id ? 200 : 201).json(skill)
  } catch (error) {
    next(error)
  }
}

export async function deleteSkill(req, res, next) {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id)
    if (!skill) return res.status(404).json({ message: 'Skill not found.' })
    res.json({ message: 'Deleted.' })
  } catch (error) {
    next(error)
  }
}

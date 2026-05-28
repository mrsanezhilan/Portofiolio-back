import Project from '../models/Project.js'

export async function getProjects(req, res, next) {
  try {
    res.json(await Project.find().sort({ createdAt: -1 }))
  } catch (error) {
    next(error)
  }
}

export async function createProject(req, res, next) {
  try {
    const payload = { ...req.body }
    if (typeof payload.tech === 'string') payload.tech = payload.tech.split(',').map((item) => item.trim()).filter(Boolean)
    if (req.file) payload.image = `/uploads/${req.file.filename}`
    const project = await Project.create(payload)
    res.status(201).json(project)
  } catch (error) {
    next(error)
  }
}

export async function updateProject(req, res, next) {
  try {
    const payload = { ...req.body }
    if (req.file) payload.image = `/uploads/${req.file.filename}`
    const project = await Project.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })
    if (!project) return res.status(404).json({ message: 'Project not found.' })
    res.json(project)
  } catch (error) {
    next(error)
  }
}

export async function deleteProject(req, res, next) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) return res.status(404).json({ message: 'Project not found.' })
    res.json({ message: 'Deleted.' })
  } catch (error) {
    next(error)
  }
}

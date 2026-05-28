import express from 'express'
import { createProject, deleteProject, getProjects, updateProject } from '../controllers/projectController.js'
import { adminOnly, protect } from '../middleware/authMiddleware.js'
import { upload } from '../middleware/uploadMiddleware.js'

const router = express.Router()

router.get('/', getProjects)
router.post('/', protect, adminOnly, upload.single('image'), createProject)
router.put('/:id', protect, adminOnly, upload.single('image'), updateProject)
router.delete('/:id', protect, adminOnly, deleteProject)

export default router

import express from 'express'
import { deleteExperience, getExperiences, upsertExperience } from '../controllers/experienceController.js'
import { adminOnly, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getExperiences)
router.post('/', protect, adminOnly, upsertExperience)
router.put('/:id', protect, adminOnly, upsertExperience)
router.delete('/:id', protect, adminOnly, deleteExperience)

export default router

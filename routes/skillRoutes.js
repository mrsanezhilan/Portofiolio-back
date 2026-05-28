import express from 'express'
import { deleteSkill, getSkills, upsertSkill } from '../controllers/skillController.js'
import { adminOnly, protect } from '../middleware/authMiddleware.js'
import { upload } from '../middleware/uploadMiddleware.js'

const router = express.Router()

router.get('/', getSkills)
router.post('/', protect, adminOnly, upload.single('image'), upsertSkill)
router.put('/:id', protect, adminOnly, upload.single('image'), upsertSkill)
router.delete('/:id', protect, adminOnly, deleteSkill)

export default router

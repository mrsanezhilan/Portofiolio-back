import express from 'express'
import { getProfile, updateProfile } from '../controllers/profileController.js'
import { adminOnly, protect } from '../middleware/authMiddleware.js'
import { upload } from '../middleware/uploadMiddleware.js'

const router = express.Router()

router.get('/', getProfile)
router.put('/', protect, adminOnly, upload.single('avatar'), updateProfile)

export default router

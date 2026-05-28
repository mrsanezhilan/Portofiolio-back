import express from 'express'
import { deleteCertification, getCertifications, upsertCertification } from '../controllers/certificationController.js'
import { adminOnly, protect } from '../middleware/authMiddleware.js'
import { upload } from '../middleware/uploadMiddleware.js'

const router = express.Router()

router.get('/', getCertifications)
router.post('/', protect, adminOnly, upload.single('image'), upsertCertification)
router.put('/:id', protect, adminOnly, upload.single('image'), upsertCertification)
router.delete('/:id', protect, adminOnly, deleteCertification)

export default router

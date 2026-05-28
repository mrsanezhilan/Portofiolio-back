import express from 'express'
import { createContact, deleteContact, getContacts } from '../controllers/contactController.js'
import { adminOnly, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', createContact)
router.get('/', protect, adminOnly, getContacts)
router.delete('/:id', protect, adminOnly, deleteContact)

export default router

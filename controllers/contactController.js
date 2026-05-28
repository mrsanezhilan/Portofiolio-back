import Contact from '../models/Contact.js'

export async function createContact(req, res, next) {
  try {
    const { name, email, message } = req.body
    if (!name || !email || !message || message.length < 10) return res.status(400).json({ message: 'Valid name, email, and message are required.' })
    const contact = await Contact.create({ name, email, message })
    res.status(201).json(contact)
  } catch (error) {
    next(error)
  }
}

export async function getContacts(req, res, next) {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    res.json(contacts)
  } catch (error) {
    next(error)
  }
}

export async function deleteContact(req, res, next) {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id)
    if (!contact) return res.status(404).json({ message: 'Message not found.' })
    res.json({ message: 'Deleted.' })
  } catch (error) {
    next(error)
  }
}

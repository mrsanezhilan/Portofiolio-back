import jwt from 'jsonwebtoken'
import User from '../models/User.js'

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' })
    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: 'Invalid credentials.' })
    res.json({ token: signToken(user._id), user: { id: user._id, name: user.name, email: user.email, role: user.role } })
  } catch (error) {
    next(error)
  }
}

export async function getMe(req, res) {
  res.json(req.user)
}

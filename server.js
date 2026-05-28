import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import skillRoutes from './routes/skillRoutes.js'
import experienceRoutes from './routes/experienceRoutes.js'
import certificationRoutes from './routes/certificationRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

dotenv.config()

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

connectDB()

const defaultOrigins = ['http://localhost:5173', 'http://localhost:5174']
const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || defaultOrigins.join(','))
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(cors({
  origin(origin, callback) {
    // Allow all origins to bypass CORS issues for the portfolio
    return callback(null, true)
  },
  credentials: true
}))
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 250 }))

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'nexus-portfolio-api' }))
app.use('/api/auth', authRoutes)
app.use('/api/contacts', contactRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/experiences', experienceRoutes)
app.use('/api/certifications', certificationRoutes)
app.use('/api/profile', profileRoutes)
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`API running on port ${port}`))

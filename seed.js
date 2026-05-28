import dotenv from 'dotenv'
import mongoose from 'mongoose'
import User from './models/User.js'
import Project from './models/Project.js'
import Skill from './models/Skill.js'
import Experience from './models/Experience.js'

dotenv.config()

const projects = [
  { title: 'AI Complaint Box', category: 'AI', description: 'AI-powered complaint triage with sentiment detection.', tech: ['React', 'Node', 'MongoDB'], live: '#', github: '#' },
  { title: 'MERN Ecommerce', category: 'MERN', description: 'Production storefront with checkout and admin inventory.', tech: ['React', 'Express', 'Stripe'], live: '#', github: '#' }
]

const skills = [
  { category: 'Frontend', name: 'React', level: 94 },
  { category: 'Backend', name: 'Node.js', level: 90 },
  { category: 'Database', name: 'MongoDB', level: 87 }
]

const experiences = [
  { company: 'Freelance Studio', role: 'Full Stack Developer', period: '2024 - Present', detail: 'Built MERN apps, dashboards, and AI workflows.' }
]

async function seed() {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is required for seeding.')
  await mongoose.connect(process.env.MONGO_URI)
  await User.deleteMany({})
  await Project.deleteMany({})
  await Skill.deleteMany({})
  await Experience.deleteMany({})
  await User.create({ name: process.env.ADMIN_NAME || 'Nexus Admin', email: process.env.ADMIN_EMAIL || 'admin@nexus.dev', password: process.env.ADMIN_PASSWORD || 'Admin@12345', role: 'admin' })
  await Project.insertMany(projects)
  await Skill.insertMany(skills)
  await Experience.insertMany(experiences)
  console.log('Seed complete.')
  await mongoose.disconnect()
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})

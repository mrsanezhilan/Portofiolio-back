import dns from 'node:dns'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import User from '../models/User.js'

dotenv.config()
dns.setDefaultResultOrder('ipv4first')
dns.setServers(['8.8.8.8', '1.1.1.1'])

async function syncAdmin() {
  const { MONGO_URI, ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env
  if (!MONGO_URI) throw new Error('MONGO_URI is required.')
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required.')

  await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 10000 })

  let user = await User.findOne({ email: ADMIN_EMAIL }).select('+password')
  if (!user) {
    user = await User.create({
      name: ADMIN_NAME || 'Nexus Admin',
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: 'admin'
    })
    console.log(`Admin created: ${user.email}`)
  } else {
    user.name = ADMIN_NAME || user.name
    user.password = ADMIN_PASSWORD
    user.role = 'admin'
    await user.save()
    console.log(`Admin password synced: ${user.email}`)
  }

  await mongoose.disconnect()
}

syncAdmin().catch((error) => {
  console.error(error.message)
  process.exit(1)
})

import dns from 'node:dns'
import mongoose from 'mongoose'

dns.setDefaultResultOrder('ipv4first')

async function connect(uri) {
  return mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000
  })
}

export default async function connectDB() {
  try {
    const uri = process.env.MONGO_URI
    const isPlaceholder = !uri || uri.includes('username:password') || uri.includes('cluster.mongodb.net')
    if (isPlaceholder) {
      console.warn('MONGO_URI is not configured. API will start, but database operations require MongoDB Atlas.')
      return
    }
    const conn = await connect(uri)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    if (error.code === 'ECONNREFUSED' && error.message.includes('querySrv')) {
      try {
        dns.setServers(['8.8.8.8', '1.1.1.1'])
        const conn = await connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`)
        return
      } catch (retryError) {
        console.error(`MongoDB DNS retry failed: ${retryError.message}`)
      }
    }
    console.error(`MongoDB connection error: ${error.message}`)
    if (process.env.NODE_ENV === 'production') process.exit(1)
  }
}

import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local')
}

let client: MongoClient

const connectToMongo = async () => {
  try {
    client = new MongoClient(uri, {})
    await client.connect()
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message)
    throw error
  }
}

const disconnectFromMongo = async () => {
  try {
    await client.close()
    console.log('Disconnected from MongoDB')
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error.message)
    throw error
  }
}

connectToMongo()

const mydatabase = client.db()
const exercises = mydatabase.collection('exercises')
const categories = mydatabase.collection('categories')
const subcategories = mydatabase.collection('subcategories')
const users = mydatabase.collection('users')

// Process will exit if there's an unhandled promise rejection
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  // Close MongoDB connection on unhandled rejection
  disconnectFromMongo().finally(() => process.exit(1))
})

export {
  client,
  connectToMongo,
  disconnectFromMongo,
  mydatabase,
  exercises,
  categories,
  subcategories,
  users
}

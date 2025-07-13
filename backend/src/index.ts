import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { todosRoute } from './routes/todos'

const app = new Hono()

// CORS middleware
app.use('*', cors({
  origin: ['http://localhost:3000'], // Frontend URL
  credentials: true
}))

// Health check
app.get('/', (c) => {
  return c.json({ message: 'TODO API Server is running!' })
})

// Mount routes
app.route('/api/todos', todosRoute)

const port = process.env.PORT || 3001

export default {
  port,
  fetch: app.fetch
}

console.log(`🚀 Server running on http://localhost:${port}`)
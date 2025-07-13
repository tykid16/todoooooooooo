import { describe, test, expect } from 'bun:test'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

describe('Server Setup', () => {
  test('should create Hono app', () => {
    const app = new Hono()
    expect(app).toBeDefined()
  })

  test('should handle health check route', async () => {
    const app = new Hono()
    
    app.get('/', (c) => {
      return c.json({ message: 'TODO API Server is running!' })
    })
    
    const res = await app.request('/')
    expect(res.status).toBe(200)
    
    const data = await res.json()
    expect(data.message).toBe('TODO API Server is running!')
  })

  test('should support CORS middleware', async () => {
    const app = new Hono()
    
    app.use('*', cors({
      origin: ['http://localhost:3000'],
      credentials: true
    }))
    
    app.get('/test', (c) => c.json({ ok: true }))
    
    const res = await app.request('/test', {
      headers: {
        'Origin': 'http://localhost:3000'
      }
    })
    
    expect(res.status).toBe(200)
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('http://localhost:3000')
  })
})
import { Hono } from 'hono'
import { db } from '../db'
import { todos, type NewTodo } from '../db/schema'
import { eq } from 'drizzle-orm'

export const todosRoute = new Hono()

// GET /api/todos - List all todos
todosRoute.get('/', async (c) => {
  try {
    const allTodos = await db.select().from(todos)
    return c.json(allTodos)
  } catch (error) {
    return c.json({ error: 'Failed to fetch todos' }, 500)
  }
})

// POST /api/todos - Create new todo
todosRoute.post('/', async (c) => {
  try {
    const body = await c.req.json()
    const { title } = body
    
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return c.json({ error: 'Title is required' }, 400)
    }
    
    const newTodo: NewTodo = {
      title: title.trim(),
      completed: false
    }
    
    const [createdTodo] = await db.insert(todos).values(newTodo).returning()
    return c.json(createdTodo, 201)
  } catch (error) {
    return c.json({ error: 'Failed to create todo' }, 500)
  }
})

// PATCH /api/todos/:id - Update todo completion status
todosRoute.patch('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'))
    const body = await c.req.json()
    const { completed } = body
    
    if (isNaN(id)) {
      return c.json({ error: 'Invalid todo ID' }, 400)
    }
    
    if (typeof completed !== 'boolean') {
      return c.json({ error: 'Completed must be a boolean' }, 400)
    }
    
    const [updatedTodo] = await db
      .update(todos)
      .set({ 
        completed,
        updatedAt: new Date().toISOString()
      })
      .where(eq(todos.id, id))
      .returning()
    
    if (!updatedTodo) {
      return c.json({ error: 'Todo not found' }, 404)
    }
    
    return c.json(updatedTodo)
  } catch (error) {
    return c.json({ error: 'Failed to update todo' }, 500)
  }
})

// DELETE /api/todos/:id - Delete todo
todosRoute.delete('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'))
    
    if (isNaN(id)) {
      return c.json({ error: 'Invalid todo ID' }, 400)
    }
    
    const [deletedTodo] = await db
      .delete(todos)
      .where(eq(todos.id, id))
      .returning()
    
    if (!deletedTodo) {
      return c.json({ error: 'Todo not found' }, 404)
    }
    
    return c.json({ message: 'Todo deleted successfully' })
  } catch (error) {
    return c.json({ error: 'Failed to delete todo' }, 500)
  }
})
import { Todo, CreateTodoInput, UpdateTodoInput } from './types'

const API_BASE_URL = 'http://localhost:3001/api'

export const api = {
  // Get all todos
  async getTodos(): Promise<Todo[]> {
    const response = await fetch(`${API_BASE_URL}/todos`)
    if (!response.ok) {
      throw new Error('Failed to fetch todos')
    }
    return response.json()
  },

  // Create a new todo
  async createTodo(input: CreateTodoInput): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })
    if (!response.ok) {
      throw new Error('Failed to create todo')
    }
    return response.json()
  },

  // Update todo completion status
  async updateTodo(id: number, input: UpdateTodoInput): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })
    if (!response.ok) {
      throw new Error('Failed to update todo')
    }
    return response.json()
  },

  // Delete a todo
  async deleteTodo(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete todo')
    }
  },
}
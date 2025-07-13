import { test, expect } from 'bun:test'
import { todos, type Todo, type NewTodo } from '../src/db/schema'

test('schema types should be correct', () => {
  // Test that schema exports the right types
  expect(todos).toBeDefined()
  
  // Test type inference
  const newTodo: NewTodo = {
    title: 'Test todo'
  }
  expect(newTodo.title).toBe('Test todo')
  
  // Test that optional fields work
  const newTodoWithCompleted: NewTodo = {
    title: 'Another todo',
    completed: true
  }
  expect(newTodoWithCompleted.completed).toBe(true)
  
  // Test that types are properly inferred
  expect(typeof newTodo.title).toBe('string')
  expect(typeof newTodoWithCompleted.completed).toBe('boolean')
})
'use client'

import { useState, useEffect } from 'react'
import TodoForm from '@/components/TodoForm'
import TodoList from '@/components/TodoList'
import { api } from '@/lib/api'
import { Todo } from '@/lib/types'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load todos on mount
  useEffect(() => {
    loadTodos()
  }, [])

  const loadTodos = async () => {
    try {
      setIsLoading(true)
      const data = await api.getTodos()
      setTodos(data)
      setError(null)
    } catch (err) {
      setError('TODOの読み込みに失敗しました')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTodo = async (title: string) => {
    try {
      const newTodo = await api.createTodo({ title })
      setTodos([...todos, newTodo])
    } catch (err) {
      setError('TODOの追加に失敗しました')
      console.error(err)
    }
  }

  const handleToggleTodo = async (id: number, completed: boolean) => {
    try {
      const updatedTodo = await api.updateTodo(id, { completed })
      setTodos(todos.map(todo => 
        todo.id === id ? updatedTodo : todo
      ))
    } catch (err) {
      setError('TODOの更新に失敗しました')
      console.error(err)
    }
  }

  const handleDeleteTodo = async (id: number) => {
    try {
      await api.deleteTodo(id)
      setTodos(todos.filter(todo => todo.id !== id))
    } catch (err) {
      setError('TODOの削除に失敗しました')
      console.error(err)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          TODO アプリ
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="mb-8">
          <TodoForm onSubmit={handleAddTodo} />
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <TodoList
            todos={todos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        )}
      </div>
    </main>
  )
}
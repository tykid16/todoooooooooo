export interface Todo {
  id: number
  title: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateTodoInput {
  title: string
}

export interface UpdateTodoInput {
  completed: boolean
}
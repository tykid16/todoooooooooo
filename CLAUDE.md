# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TODO application with a planned full-stack architecture:
- **Frontend**: Next.js with TypeScript (App Router)
- **Backend**: Hono API server
- **Database**: SQLite with Drizzle ORM
- **Runtime**: Bun
- **Package Manager**: pnpm (frontend), bun (backend)

The project follows a monorepo structure with separate `frontend/` and `backend/` directories (to be created).

## Development Commands

### Backend (Bun + Hono)
```bash
cd backend
bun run dev                    # Start development server
bun run drizzle-kit generate:sqlite  # Generate migrations
bun run drizzle-kit push:sqlite      # Apply migrations
```

### Frontend (Next.js)
```bash
cd frontend
pnpm dev                      # Start development server
```

## Project Structure

The planned directory structure:
```
frontend/               # Next.js app (port 3000)
├── app/
│   ├── page.tsx
│   └── layout.tsx
├── components/
│   ├── TodoList.tsx
│   ├── TodoItem.tsx
│   └── TodoForm.tsx
└── lib/
    └── api.ts         # API communication

backend/               # Hono app (port 3001)
├── src/
│   ├── index.ts       # Entry point
│   ├── routes/
│   │   └── todos.ts   # TODO routes
│   └── db/
│       ├── schema.ts  # Drizzle schema
│       └── index.ts   # DB connection
├── drizzle/
│   └── migrations/    # Migration files
└── drizzle.config.ts  # Drizzle configuration
```

## API Specification

RESTful API endpoints:
- `GET /api/todos` - List all todos
- `POST /api/todos` - Create new todo
- `PATCH /api/todos/:id` - Update todo completion status
- `DELETE /api/todos/:id` - Delete todo

## Data Model

TODO entity:
```typescript
{
  id: number,          // Primary key, auto-increment
  title: string,       // Required
  completed: boolean,  // Default: false
  createdAt: Date,
  updatedAt: Date
}
```

## Development Setup

When implementing this project:
1. Start with backend setup (Hono + Drizzle + SQLite)
2. Implement CRUD API endpoints
3. Create Next.js frontend with component structure
4. Connect frontend to backend API
5. Test full functionality

The backend runs on port 3001, frontend on port 3000.
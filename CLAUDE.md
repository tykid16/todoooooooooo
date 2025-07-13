# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TODO application with a full-stack architecture:
- **Frontend**: Next.js with TypeScript (App Router) - **IMPLEMENTED**
- **Backend**: Hono API server - **IMPLEMENTED**
- **Database**: SQLite with Drizzle ORM - **IMPLEMENTED**
- **Runtime**: Bun
- **Package Manager**: pnpm (frontend), bun (backend)

The project follows a monorepo structure with separate `frontend/` and `backend/` directories.

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

The current directory structure:
```
frontend/               # Next.js app (port 3000)
├── app/
│   ├── page.tsx       # Main page with TODO app
│   ├── layout.tsx     # Root layout
│   └── globals.css    # Global styles
├── components/
│   ├── TodoList.tsx   # List component
│   ├── TodoItem.tsx   # Individual todo item
│   └── TodoForm.tsx   # Add todo form
└── lib/
    ├── api.ts         # API client
    └── types.ts       # TypeScript types

backend/               # Hono app (port 3001)
├── src/
│   ├── index.ts       # Entry point & server setup
│   ├── routes/
│   │   └── todos.ts   # TODO API routes
│   └── db/
│       ├── schema.ts  # Drizzle schema definition
│       └── index.ts   # Database connection
├── drizzle/
│   └── migrations/    # Generated migration files
├── tests/             # Test files
├── sqlite.db          # SQLite database file
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

## Current Status

The project is fully implemented with:
- ✅ Backend API with all CRUD operations
- ✅ SQLite database with Drizzle ORM
- ✅ Frontend UI with Next.js and Tailwind CSS
- ✅ Full integration between frontend and backend
- ✅ Type-safe API communication
- ✅ Test suite for backend

## Development Notes

- The backend runs on port 3001, frontend on port 3000
- CORS is configured to allow frontend-backend communication
- API uses JSON for request/response bodies
- Database migrations are managed by Drizzle Kit
- Frontend uses server-side rendering with Next.js App Router

## Testing

Backend tests are available in the `backend/tests/` directory:
```bash
cd backend
bun test
```
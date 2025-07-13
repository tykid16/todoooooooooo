# TODO Application

A full-stack TODO application built with modern web technologies.

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript (App Router)
- **Backend**: Hono API server
- **Database**: SQLite with Drizzle ORM
- **Runtime**: Bun (backend), Node.js (frontend)
- **Package Manager**: pnpm (frontend), bun (backend)
- **Styling**: Tailwind CSS

## Project Structure

```
todo/
├── frontend/               # Next.js application
│   ├── app/               # App router pages
│   ├── components/        # React components
│   └── lib/              # Utilities and API client
├── backend/               # Hono API server
│   ├── src/              # Source code
│   │   ├── db/          # Database configuration
│   │   └── routes/      # API routes
│   └── drizzle/         # Database migrations
└── docs/                  # Documentation
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (latest version)
- [Node.js](https://nodejs.org/) (v18 or later)
- [pnpm](https://pnpm.io/) (v8 or later)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up the database:
   ```bash
   bun run drizzle-kit push:sqlite
   ```

4. Start the development server:
   ```bash
   bun run dev
   ```

The backend API will be available at `http://localhost:3001`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

The frontend application will be available at `http://localhost:3000`.

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/todos` - Retrieve all todos
- `POST /api/todos` - Create a new todo
- `PATCH /api/todos/:id` - Update todo completion status
- `DELETE /api/todos/:id` - Delete a todo

## Features

- Create, read, update, and delete todos
- Mark todos as completed/incomplete
- Clean and modern UI with Tailwind CSS
- Type-safe API communication
- Persistent data storage with SQLite

## Development

For detailed development instructions and project conventions, see [CLAUDE.md](./CLAUDE.md).

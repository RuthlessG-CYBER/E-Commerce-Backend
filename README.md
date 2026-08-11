# Backend Setup

## Prerequisites

Make sure these are installed on your system:

- Node.js
- pnpm
- PostgreSQL

## Install Dependencies

From the project root, run:

```bash
pnpm install
```

## Environment Setup

Create a `.env` file in the project root and add:

```env
DATABASE_URL=your_postgresql_connection_string
PORT=5000
```

Example:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/your_database
PORT=5000
```

## Prisma Setup

Generate the Prisma client:

```bash
pnpm exec prisma generate
```

If you need to apply database schema changes, run:

```bash
pnpm exec prisma db push
```

## Run the Server

Start the server with:

```bash
pnpm run server
```

Or run it directly with Node:

```bash
node src/server.js
```

## Verify Startup

If setup is correct, the server should start on:

```text
http://localhost:5000
```

If you set a different `PORT` in `.env`, the server will use that port instead.

## API Base Route

The user routes are available under:

```text
/api/v1/user
```

## Endpoints

```text
POST   /api/v1/user/register
GET    /api/v1/user/users
GET    /api/v1/user/users/:id
POST   /api/v1/user/login
PUT    /api/v1/user/users/:id
DELETE /api/v1/user/users/:id
```

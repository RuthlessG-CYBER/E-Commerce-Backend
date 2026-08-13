# Backend Setup

Express + Prisma API with PostgreSQL, JWT auth, and Argon2 password hashing.

## Prerequisites

- Node.js
- pnpm
- PostgreSQL

## Install Dependencies

```bash
pnpm install
```

## Environment Setup

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/your_database
PORT=5000
JWT_SECRET=your_jwt_secret
```

## Prisma Setup

Generate the Prisma client:

```bash
pnpm exec prisma generate
```

Apply the schema to the database:

```bash
pnpm exec prisma db push
```

## Run the Server

```bash
pnpm run server
```

The server starts at `http://localhost:5000` (or the `PORT` from `.env`).

Health check:

```text
GET /
```

## API Routes

### User — `/api/v1/user`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/register` | No | Create a user |
| POST | `/login` | No | Login and get JWT |
| GET | `/users` | Yes | List all users |
| GET | `/users/:id` | Yes | Get user by ID |
| PUT | `/users/:id` | Yes | Update user |
| DELETE | `/users/:id` | Yes | Delete user |

**Register body:** `username`, `email`, `password`

**Login body:** `email`, `password`

**Update body:** `username`, `email`, and optional `password`

Protected routes expect:

```text
Authorization: Bearer <token>
```

### Product — `/api/v1/product`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/create-product` | No | Create a product |
| DELETE | `/delete-product/:id` | No | Delete a product by ID |

**Create body:** `name`, `slug`, `description`, `price`, `stock`

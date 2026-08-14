# Backend Setup

Express + Prisma API with PostgreSQL, JWT auth, Argon2 password hashing, and role-based access control (RBAC).

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

## Roles (RBAC)

| Role | Access |
|------|--------|
| `USER` | Default for new accounts. Can view own profile and update own user data. |
| `ADMIN` | Create, update, and delete products; list and delete users. |
| `SUPERADMIN` | Same as `ADMIN`. |

Protected routes expect:

```text
Authorization: Bearer <token>
```

Promote a user (example):

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'you@example.com';
```

Or via API:

```text
PATCH /api/v1/user/users/:id/role
Body: { "role": "ADMIN" }
```

Valid roles: `USER`, `ADMIN`, `SUPERADMIN`.

## API Routes

### User — `/api/v1/user`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/register` | No | Create a user (role defaults to `USER`) |
| POST | `/login` | No | Login and get JWT |
| GET | `/users` | Admin | List all users |
| GET | `/users/:id` | Yes | Get user by ID |
| PUT | `/users/:id` | Yes | Update user |
| DELETE | `/users/:id` | Admin | Delete user |
| PATCH | `/users/:id/role` | No | Update user role |

**Register body:** `username`, `email`, `password`

**Login body:** `email`, `password`

**Update body:** `username`, `email`, and optional `password`

**Role update body:** `role` (`USER` \| `ADMIN` \| `SUPERADMIN`)

### Product — `/api/v1/product`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/get-all-products` | No | List all products |
| POST | `/create-product` | Admin | Create a product |
| PATCH | `/update-product/:id` | Admin | Update a product |
| DELETE | `/delete-product/:id` | Admin | Delete a product by ID |

**Create / update body:** `name`, `slug`, `description`, `price`, `stock`, `image`, and optional `category`

Required on create: `name`, `description`, `price`, `stock`, `slug`, `image`

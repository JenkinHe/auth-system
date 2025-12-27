# API Backend Stack Summary

## 1️⃣ Language & Runtime
- **TypeScript** (`typescript`, `ts-node`, `ts-node-dev`) – strongly-typed JS compiled to Node.js
- **Node.js** – runtime environment for the backend

## 2️⃣ Server
- **Express** (`express`) – web server framework
- **routing-controllers** – decorator-based abstraction for controllers, routing, and middleware
- **reflect-metadata** – required for decorators used by routing-controllers and TypeORM

## 3️⃣ Database
- **PostgreSQL** (`pg`) – relational database
- **TypeORM** (`typeorm`) – ORM for PostgreSQL with TypeScript support

## 4️⃣ Authentication & Security
- **jsonwebtoken** (`jsonwebtoken`) + **@types/jsonwebtoken** – JWT creation & verification
- **bcrypt** (`bcrypt`) + **@types/bcrypt** – password hashing

## 5️⃣ Validation
- **class-validator** – DTO and input validation (e.g., required fields, type checks)

## 6️⃣ Environment & Config
- **dotenv** – environment variables management

## 7️⃣ Dev Tools / Scripts
- **nodemon / ts-node-dev** – hot-reloading for development
- **ts-node** – run TypeScript without pre-compilation
- **jiti** – runtime ESM import support
- **eslint / prettier** – linting and code formatting
- **@typescript-eslint/parser & plugin** – TypeScript linting support
- **Docker** - Backend, PGADMIN, PostgreSQL db

## 8️⃣ Build & Run Scripts
- `npm run dev` – start development server with hot reload
- `npm run build` – compile TypeScript to JS
- `npm run start` – run compiled JS
- `npm run lint` / `npm run lint:fix` – linting
- `npm run format` – format code with Prettier

---

### 💡 Summary
This is a **TypeScript + Node.js backend** using **Express with routing-controllers**, **TypeORM + PostgreSQL** for the database, **JWT + bcrypt** for authentication, and **class-validator** for input validation. Development workflow includes **hot reload, linting, and formatting** for a smooth developer experience.

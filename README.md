# Node.js Authentication Backend

A secure, production-ready authentication backend built with **Node.js**, **Express**, **TypeScript**, **TypeORM**, and **PostgreSQL**, following a **mid-level auth checklist** with JWT access tokens, refresh tokens, and role-based access control (RBAC).

---

## 🛠 Tech Stack

- **Node.js + Express** – Backend framework  
- **TypeScript** – Typed JavaScript  
- **Routing-controllers** – Declarative controllers & routing  
- **TypeORM** – Database modeling & ORM  
- **PostgreSQL** – Relational database  
- **Docker** – Containerized environment  
- **bcrypt** – Password hashing  
- **jsonwebtoken** – JWT access & refresh tokens  
- **Helmet** – Security headers  
- **Redis** (optional hybrid) – Token/session caching  

---

## 🚀 Features

### 1. Project Setup
- Structured project with `controllers`, `services`, `repositories`
- Environment variables for secrets & configs
- TypeScript support with `ts-node` / build step
- Linting and formatting: ESLint + Prettier

### 2. Database & Models
- PostgreSQL with Docker + pgAdmin
- User table and RefreshToken table
- Indexed fields: email, refresh token
- User fields: `id`, `email`, `passwordHash`, `roles`, `createdAt`, `updatedAt`

### 3. Password Security
- Passwords hashed with bcrypt
- Validation for password strength
- No plaintext passwords stored

### 4. Authentication
- **Register** and **Login** endpoints
- Input validation via DTOs
- JWT access token + refresh token returned on login

### 5. JWT Access Tokens
- Signed with HS256
- Includes `userId`, `roles`, `issuedAt`
- Short expiry (5–15 minutes)
- Middleware for token validation

### 6. Refresh Tokens
- Refresh endpoint to renew access tokens
- Tokens stored in DB or Redis (hybrid setup recommended)
- Token rotation and old token invalidation
- Prevents reuse of old tokens

### 7. Role-Based Access Control (RBAC)
- Defined enum roles (`ADMIN`, `USER`, etc.)
- Middleware to check roles/permissions
- Example: `admin-only` route

### 8. Security Hardening
- Rate limiting for login endpoint
- IP/user throttling
- Security headers via **Helmet**
- HTTPS recommended in production

### 9. Error Handling
- Centralized error handling middleware
- Typed errors: `ValidationError`, `AuthError`, `ForbiddenError`
- Standardized error response format

### 10. Redis Integration (Hybrid DB + Redis)
- Token/session caching (optional)
- Expiry-based cleanup for refresh tokens
- Fast revocation checks

### 11. Docker Setup
- Dockerfile + docker-compose for backend + DB (+ Redis optional)
- Hot-reload during development via `nodemon`
- Separate environment configs for dev/prod

### 12. Testing
- Unit tests for services (planned)
- Integration tests for login and token refresh endpoints

### 13. Documentation
- README includes high-level architecture
- Swagger / API reference (optional)

---

## ⚡ Advanced Features (Senior-Level, Optional)
- Refresh token replay protection
- Per-device session management (track device, IP, userAgent)
- Email verification flow
- Password reset flow with one-time tokens
- Structured logging (Pino/Winston) for security events

---

## 🔑 Security Highlights
- JWT short-lived access tokens + rotating refresh tokens
- Password hashing & validation
- Rate limiting & throttling
- Security headers (Helmet)
- Transactional operations to prevent race conditions
- RBAC for fine-grained access control

---

## 📦 Getting Started

```bash
# Clone repository
git clone <repo-url>
cd api-backend

# Install dependencies
npm install

# Start with Docker (Postgres + backend)
docker-compose up

# Development mode
npm run dev

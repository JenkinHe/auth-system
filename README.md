# Mid-Level Auth Checklist (Backend)

## 1. Project Setup
- [X] Set up project structure with controllers/services/repositories
- [X] Environment variables system for secrets
- [X] Use TypeScript and ts-node / build step
- [X] Set up linting + formatting (ESLint + Prettier)
- [X] Basic node_modeule , git ignore

## 2. Database & Models
- [X] Postgres in docker and pgadmin in docker
- [X] User table
- [X] Session or RefreshToken table
- [X] Indexes on email and refresh tokens
- [X] User fields: id, email, passwordHash, roles, createdAt, updatedAt

## 3. Password Security
- [X] Hash passwords with bcrypt/argon2
- [X] Validate password strength
- [X] Never store plaintext passwords

## 4. Login & Registration
- [X] Register endpoint
- [X] Login endpoint
- [X] Validate input with DTOs
- [X] Return JWT access token + refresh token

## 5. JWT Access Token
- [ ] HS256/RS256 signing
- [ ] Include userId, roles, issuedAt
- [ ] 5–15 min expiry
- [ ] Middleware to validate tokens

## 6. Refresh Tokens
- [ ] Refresh endpoint for access token renewal
- [ ] Store refresh tokens in DB or Redis
- [ ] Rotate refresh tokens on each request
- [ ] Invalidate old refresh tokens on use

## 7. Basic Role-Based Access Control (RBAC)
- [ ] Define enum roles
- [ ] Middleware to check roles/permissions
- [ ] Example: `admin-only` route

## 8. Security Hardening
- [ ] Rate-limiting for login
- [ ] IP throttling or user-based throttling
- [ ] Helmet or security headers
- [ ] Use HTTPS in production

## 9. Error Handling
- [ ] Central error handler middleware
- [ ] Typed errors: ValidationError, AuthError, ForbiddenError
- [ ] Standard error response format

## 10. Redis Integration
- [ ] Cache token invalidations
- [ ] Store sessions or refresh tokens
- [ ] Use Redis expiry to auto-clean old tokens

## 11. Docker Setup
- [X] docker hot-reload nodemon
- [X] Dockerfile
- [X] docker-compose with DB + Redis (No Redis)
- [X] containerise the api-backend
- [ ] Environment handling for dev/prod

## 12. Tests
- [ ] Unit tests for services
- [ ] Integration test for login
- [ ] Integration test for refreshing tokens

## 13. Documentation
- [ ] Swagger or API Reference
- [ ] High-level architecture (README)


# Minimal Senior-Level Auth Checklist

## 1. Refresh Token Replay Protection
- [ ] Detect old refresh token reuse
- [ ] Invalidate entire device session on replay
- [ ] Log suspicious event

## 2. Per-Device Session Management
- [ ] Store deviceId, IP, userAgent per session
- [ ] Allow users to revoke sessions individually
- [ ] Track login timestamps per device

## 3. Email Verification Flow
- [ ] Signed, expiring verification token
- [ ] Create `/auth/verify-email` route
- [ ] Mark `isVerified` and block login if not verified (optional)

## 4. Password Reset Flow
- [ ] One-time, short-lived reset token
- [ ] Create `/auth/request-password-reset`
- [ ] Create `/auth/reset-password`
- [ ] Invalidate reset token after use

## 5. Structured Logging (Pino or Winston)
- [ ] Log login success/fail
- [ ] Log refresh rotations
- [ ] Log session revocations
- [ ] Log security-related events

# Backend Quality Test Checklist

## 1️⃣ Correctness & Basic Functionality
- [ ] All endpoints respond correctly for happy paths
- [ ] Handles multiple users simultaneously without crashing
- [ ] Restarting the server doesn’t break functionality
- [ ] Invalid routes return meaningful 404s or errors

## 2️⃣ Error Handling
- [ ] Invalid payloads return proper error messages (400/422)
- [ ] Expired or invalid tokens return proper authentication errors (401/403)
- [ ] Duplicate data entries are handled gracefully
- [ ] Database failures / disconnections are handled without crashing

## 3️⃣ Data Integrity
- [ ] Database constraints prevent impossible states (uniques, foreign keys, etc.)
- [ ] Race conditions don’t create inconsistent data
- [ ] Deleting / updating records doesn’t break related entities

## 4️⃣ Code Structure & Maintainability
- [ ] Controllers are thin; business logic is in services
- [ ] DB access is abstracted in repositories / models
- [ ] DTOs or schema validation separates input from internal logic
- [ ] Code is modular enough to swap frameworks / DB with minimal changes

## 5️⃣ Tests
- [ ] Unit tests cover core business logic
- [ ] Integration tests cover critical flows (auth, create/read/update/delete)
- [ ] Tests include failure cases (invalid input, expired tokens, DB errors)
- [ ] Tests pass consistently without manual setup

## 6️⃣ Observability
- [ ] Logs are structured and readable
- [ ] Errors are logged with enough context to debug
- [ ] There’s a consistent way to track failures or unexpected events

## 7️⃣ Performance & Efficiency
- [ ] Endpoints respond reasonably under moderate load (100–1000 requests/min locally)
- [ ] No obvious N+1 queries or unnecessary DB calls
- [ ] Async operations are properly handled; no blocking operations

## 8️⃣ Optional: Decoupling & Swap Tests
- [ ] Framework swap (Express → Fastify) works with minimal changes
- [ ] DB swap or schema refactor works without touching services
- [ ] Auth / caching / other layers can be replaced independently


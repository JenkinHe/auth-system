# Mid-Level Auth Checklist (Backend)

## 1. Project Setup
- [X] Set up project structure with controllers/services/repositories
- [X] Environment variables system for secrets
- [X] Use TypeScript and ts-node / build step
- [X] Set up linting + formatting (ESLint + Prettier) linting didnt work but auto format did
- [X] Basic node_modeule , git ignore

## 2. Database & Models
- [ ] User table
- [ ] Session or RefreshToken table
- [ ] Indexes on email and refresh tokens
- [ ] User fields: id, email, passwordHash, roles, createdAt, updatedAt

## 3. Password Security
- [ ] Hash passwords with bcrypt/argon2
- [ ] Validate password strength
- [ ] Never store plaintext passwords

## 4. Login & Registration
- [ ] Register endpoint
- [ ] Login endpoint
- [ ] Validate input with DTOs
- [ ] Return JWT access token + refresh token

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
- [ ] Dockerfile
- [ ] docker-compose with DB + Redis
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

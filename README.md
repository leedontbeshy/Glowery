# 🌸 Glowery - E-commerce Backend API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.1+-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Status](https://img.shields.io/badge/Status-In%20Development-yellow?style=for-the-badge)

**Backend API system for a modern e-commerce platform**

[API Documentation](#-api-documentation) • [Installation](#-installation) • [Architecture](#-project-architecture) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Introduction](#-introduction)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Requirements](#-system-requirements)
- [Installation](#-installation)
- [Folder Structure](#-folder-structure)
- [Project Architecture](#-project-architecture)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Development Guide](#-development-guide)
- [Scripts](#-scripts)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)

---

## 🎯 Introduction

**Glowery** is a RESTful backend API system built for an e-commerce platform, focusing on performance, security, and scalability. The project is developed with TypeScript and PostgreSQL, adhering to best practices in modern API development.

### 🎨 Project Goals

- ✅ Build a robust and secure API backend
- ✅ Implement Clean Architecture
- ✅ Optimize performance and scalability
- ✅ Comprehensive and easy-to-use API documentation
- ✅ Type-safe with TypeScript
- ✅ Complete Authentication & Authorization

---

## ⚡ Features

### ✅ Completed

#### 🔐 Authentication & Authorization
- [x] User Registration
- [x] Login with JWT
- [x] Logout
- [x] Email Verification
- [x] Forgot Password & Reset Password
- [x] Refresh Token
- [x] Role-based Access Control (RBAC)
- [x] Authentication & Authorization Middleware

### 🚧 In Development

- [ ] **Product Management**
- [ ] **Order Management**
- [ ] **Payment Integration**
- [ ] **User Management**
- [ ] **Reviews & Ratings**
- [ ] **Notifications**
- [ ] **Analytics & Reports**

---

## 🛠 Tech Stack

### Backend
- **Runtime:** Node.js 20+
- **Language:** TypeScript 5.9+
- **Framework:** Express 5.1+
- **Database:** PostgreSQL 16+
- **Authentication:** JWT (jsonwebtoken)
- **Password Hash:** Argon2
- **Validation:** Zod
- **Email Service:** Resend
- **API Documentation:** Swagger UI

### Development Tools
- **Dev Server:** ts-node-dev
- **Path Mapping:** tsconfig-paths
- **Environment:** dotenv
- **File Upload:** Multer

---

## 💻 System Requirements

Before installation, ensure you have the following installed:

- **Node.js** >= 20.0.0
- **npm** >= 10.0.0 or **yarn** >= 1.22.0
- **PostgreSQL** >= 16.0
- **Git**

---

## 🚀 Installation

### 1. Clone Repository

```bash
git clone https://github.com/leedontbeshy/Glowery.git
cd Glowery
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Update environment variables in `.env` file:

```env
# Server
PORT=8000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=glowery_db

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRES_IN=30d

# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=noreply@yourdomain.com

# Client URL
CLIENT_URL=http://localhost:3000
```

### 4. Setup Database

Create database and run schema:

```bash
# Create database
createdb glowery_db

# Run schema
psql -U postgres -d glowery_db -f database/glowery_db_schema.sql

# (Optional) Run seed data
psql -U postgres -d glowery_db -f database/seedData.sql
```

### 5. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Server will run at: `http://localhost:8000`

API Documentation: `http://localhost:8000/api-docs`

---

## 📁 Folder Structure

```
src
 ┣ common
 ┃ ┣ constants
 ┃ ┃ ┣ error-codes.ts
 ┃ ┃ ┣ http-status.ts
 ┃ ┃ ┗ user.enums.ts
 ┃ ┣ errors
 ┃ ┃ ┣ ApiError.ts
 ┃ ┃ ┣ BadRequestError.ts
 ┃ ┃ ┣ databaseErrorHandler.ts
 ┃ ┃ ┗ UnauthorizedError.ts
 ┃ ┣ middlewares
 ┃ ┃ ┣ auth.middleware.ts
 ┃ ┃ ┣ authorize.middleware.ts
 ┃ ┃ ┣ authorizeResourceOwner.middleware.ts
 ┃ ┃ ┣ error.middleware.ts
 ┃ ┃ ┗ validate.middleware.ts
 ┃ ┣ schemas
 ┃ ┃ ┗ common.schema.ts
 ┃ ┣ types
 ┃ ┃ ┣ express.d.ts
 ┃ ┃ ┣ jwt.type.ts
 ┃ ┃ ┗ pagination.type.ts
 ┃ ┗ utils
 ┃ ┃ ┣ email.ts
 ┃ ┃ ┣ hash.ts
 ┃ ┃ ┣ jwt.ts
 ┃ ┃ ┗ logger.ts
 ┣ config
 ┃ ┣ database.ts
 ┃ ┗ swagger.config.ts
 ┣ features
 ┃ ┣ admin
 ┃ ┃ ┣ admin.controller.ts
 ┃ ┃ ┣ admin.repository.ts
 ┃ ┃ ┣ admin.route.ts
 ┃ ┃ ┣ admin.service.ts
 ┃ ┃ ┗ admin.type.ts
 ┃ ┣ auth
 ┃ ┃ ┣ token
 ┃ ┃ ┃ ┣ token.repository.ts
 ┃ ┃ ┃ ┗ token.service.ts
 ┃ ┃ ┣ auth.controller.ts
 ┃ ┃ ┣ auth.dto.ts
 ┃ ┃ ┣ auth.route.ts
 ┃ ┃ ┣ auth.schema.ts
 ┃ ┃ ┗ auth.service.ts
 ┃ ┣ orders
 ┃ ┣ products
 ┃ ┣ search
 ┃ ┃ ┣ search.repository.ts
 ┃ ┃ ┣ search.service.ts
 ┃ ┃ ┗ search.type.ts
 ┃ ┣ users
 ┃ ┃ ┣ user.controller.ts
 ┃ ┃ ┣ user.dto.ts
 ┃ ┃ ┣ user.model.ts
 ┃ ┃ ┣ user.repository.ts
 ┃ ┃ ┣ user.route.ts
 ┃ ┃ ┣ user.schema.ts
 ┃ ┃ ┣ user.service.ts
 ┃ ┃ ┗ user.type.ts
 ┃ ┗ index.ts
 ┣ app.ts
 ┗ server.ts

```

---

## 🏗 Project Architecture

### Architecture Overview

The project uses **Layered Architecture** combined with **Feature-based Structure**:

```
┌─────────────────────────────────────────┐
│         API Layer (Routes)              │
│   ┌──────────────────────────────┐      │
│   │  Controllers (HTTP Handlers) │      │
│   └──────────────────────────────┘      │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│       Business Logic Layer              │
│   ┌──────────────────────────────┐      │
│   │   Services (Business Logic)  │      │
│   └──────────────────────────────┘      │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         Data Access Layer               │
│   ┌──────────────────────────────┐      │
│   │  Repositories (DB Queries)   │      │
│   │  Models (Domain Entities)    │      │
│   └──────────────────────────────┘      │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│          Database (PostgreSQL)          │
└─────────────────────────────────────────┘
```

### Layer Details

#### 1️⃣ **API Layer** (`features/`)
- **Routes**: Define endpoints and HTTP methods
- **Controllers**: Handle HTTP requests/responses
- **Validation**: Validate input with Zod schemas
- **Middlewares**: Auth, error handling, validation

#### 2️⃣ **Business Logic Layer** (`features/*/service.ts`)
- Contains business logic and workflows
- Orchestrates complex operations
- Handles authentication, authorization
- Calls repositories to access data

#### 3️⃣ **Data Access Layer** (`core/`)
- **Repositories**: Database queries
- **Models**: Domain entities and type definitions
- **Schemas**: Zod schemas for validation
- Separates database logic from business logic

#### 4️⃣ **Common/Shared Layer** (`common/`)
- **Utilities**: Helper functions (hash, jwt, logger)
- **Errors**: Custom error classes
- **Middlewares**: Global middlewares
- **Constants**: Enums, error codes, HTTP status
- **Types**: Shared TypeScript types

### Request Processing Flow

```
Client Request
    │
    ▼
[Route] → [Middleware] → [Controller]
                              │
                              ▼
                        [Service] ←→ [External APIs]
                              │
                              ▼
                        [Repository]
                              │
                              ▼
                         [Database]
                              │
                              ▼
                        Response JSON
```

### Example: Authentication Flow

```typescript
// 1. Route defines endpoint
POST /api/auth/login
    │
    ▼
// 2. Validation middleware (Zod)
validateRequest(loginSchema)
    │
    ▼
// 3. Controller receives request
authController.login(req, res)
    │
    ▼
// 4. Service processes business logic
authService.login(email, password)
    │
    ├──▶ userRepository.findByEmail()
    ├──▶ hash.verify(password)
    └──▶ jwt.generateToken()
    │
    ▼
// 5. Return response
{ token, user }
```

### Design Patterns Used

- ✅ **Repository Pattern**: Separates data access logic
- ✅ **Service Pattern**: Business logic layer
- ✅ **Middleware Pattern**: Request processing pipeline
- ✅ **Factory Pattern**: Error classes creation
- ✅ **Singleton Pattern**: Database connection
- ✅ **Dependency Injection**: Service dependencies

### Design Principles

- **Separation of Concerns**: Each layer has distinct responsibilities
- **Single Responsibility**: Each module does one thing
- **DRY (Don't Repeat Yourself)**: Code reuse through utils
- **Type Safety**: TypeScript for type checking
- **Error Handling**: Centralized error handling
- **Validation**: Schema-based validation with Zod

---

## 📚 API Documentation

### Swagger UI

API documentation available at: **http://localhost:8000/api-docs**

### Authentication Endpoints

#### 🔐 Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "full_name": "John Doe",
  "phone": "0123456789"
}
```

#### 🔐 Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

#### 🔐 Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

#### 🔐 Forgot Password
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### 🔐 Reset Password
```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset_token_here",
  "new_password": "NewSecurePassword123!"
}
```

#### 🔐 Verify Email
```http
GET /api/auth/verify-email?token=<verification_token>
```

### Learn More

- 📖 [API Documentation](./docs/APIs-docs.md)
- 🔄 [Authentication Flow](./docs/flow/Register_Login_Logout.md)
- 🔑 [Password Reset Flow](./docs/flow/ResetPassword.flow.md)

---

## 🗄 Database Schema

### Core Tables

The system includes **13 main tables**:

1. **users** - User management
2. **tokens** - Refresh tokens & verification tokens
3. **addresses** - Shipping addresses
4. **categories** - Product categories
5. **products** - Products
6. **product_variants** - Product variants
7. **product_images** - Product images
8. **carts** - Shopping carts
9. **cart_items** - Cart items
10. **orders** - Orders
11. **order_items** - Order items
12. **payments** - Payments
13. **reviews** - Product reviews

### ENUMs (Type Safety)

```sql
-- User
user_role: 'user' | 'seller' | 'admin'
user_status: 'active' | 'inactive' | 'suspended'

-- Product
product_status: 'active' | 'inactive' | 'out_of_stock'

-- Order
order_status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
payment_method: 'cod' | 'bank_transfer' | 'vnpay' | 'momo' | 'zalopay' | 'credit_card'

-- Payment
payment_status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'cancelled'

-- Coupon
discount_type: 'percentage' | 'fixed'

-- Notification
notification_type: 'order' | 'promotion' | 'review' | 'system' | 'payment'
```

### Schema File

Full details: [database/glowery_db_schema.sql](./database/glowery_db_schema.sql)

---

## 👨‍💻 Development Guide

### Branching Strategy

The project uses **Git Flow**:

- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches
- `hotfix/*` - Hotfix branches
- `release/*` - Release branches

Details: [docs/Branching_Rules.md](./docs/Branching_Rules.md)

### Commit Convention

Follow **Conventional Commits**:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style
- `refactor`: Code refactoring
- `test`: Tests
- `chore`: Maintenance

**Example:**
```bash
feat(auth): implement JWT refresh token

- Add refresh token generation
- Add refresh token validation
- Update login response with refresh token

Closes #123
```

Details: [docs/Commit-Guide.md](./docs/Commit-Guide.md)

### Code Style

- Use **TypeScript strict mode**
- Follow **ESLint** rules (coming soon)
- Use **Prettier** for formatting (coming soon)
- Naming conventions:
  - `camelCase` for variables/functions
  - `PascalCase` for classes/interfaces
  - `UPPER_CASE` for constants
  - `kebab-case` for file names

---

## 📜 Scripts

```bash
# Development
npm run dev          # Run dev server with hot reload

# Production
npm run build        # Build TypeScript → JavaScript
npm run start        # Run production server

# Database
psql -U postgres -d glowery_db -f database/glowery_db_schema.sql  # Setup schema
psql -U postgres -d glowery_db -f database/seedData.sql           # Seed data

# Testing (Coming soon)
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

---

## 🔐 Environment Variables

### Required Variables

```env
# Server Configuration
PORT=8000                          # Server port
NODE_ENV=development               # Environment: development | production

# Database Configuration
DB_HOST=localhost                  # Database host
DB_PORT=5432                       # Database port
DB_USER=postgres                   # Database username
DB_PASSWORD=your_password          # Database password
DB_NAME=glowery_db                 # Database name

# JWT Configuration
JWT_SECRET=your_jwt_secret         # JWT signing secret
JWT_EXPIRES_IN=7d                  # Access token expiry
JWT_REFRESH_SECRET=refresh_secret  # Refresh token secret
JWT_REFRESH_EXPIRES_IN=30d         # Refresh token expiry

# Email Service (Resend)
RESEND_API_KEY=your_resend_key    # Resend API key
FROM_EMAIL=noreply@domain.com      # Sender email

# Client Configuration
CLIENT_URL=http://localhost:3000   # Frontend URL
```

### Optional Variables

```env
# File Upload
MAX_FILE_SIZE=5242880              # 5MB in bytes
UPLOAD_DIR=./uploads               # Upload directory

# Rate Limiting (Coming soon)
RATE_LIMIT_WINDOW=15               # Minutes
RATE_LIMIT_MAX_REQUESTS=100        # Max requests per window

# Logging (Coming soon)
LOG_LEVEL=info                     # error | warn | info | debug
```

---

## 🤝 Contributing

We welcome all contributions! Please follow these steps:

### 1. Fork the Repository

```bash
# Fork repo from GitHub UI
# Clone your fork
git clone https://github.com/leedontbeshy/Glowery.git
```

### 2. Create a New Branch

```bash
git checkout develop
git checkout -b feature/your-feature-name
```

### 3. Commit Changes

```bash
git add .
git commit -m "feat(scope): your feature description"
```

### 4. Push & Create Pull Request

```bash
git push origin feature/your-feature-name
# Create PR from GitHub UI
```

### Guidelines

- ✅ Follow coding conventions
- ✅ Write meaningful commit messages
- ✅ Add tests for new features (when available)
- ✅ Update documentation
- ✅ Ensure code passes linting

---

## 📞 Contact & Support

- **GitHub Issues**: [Report bugs](https://github.com/leedontbeshy/Glowery/issues)
- **Pull Requests**: [Contribute code](https://github.com/leedontbeshy/Glowery/pulls)
- **Discussions**: [Ask questions](https://github.com/leedontbeshy/Glowery/discussions)
- **Email**:[Email](duyphucle.0510@gmail.com)

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 🙏 Acknowledgments


- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Zod](https://zod.dev/)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)

---

<div align="center">

⭐ Star this repo if you find it helpful!

</div>
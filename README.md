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
- [x] Token Blacklisting
- [x] Role-based Access Control (RBAC)
- [x] Authentication & Authorization Middleware
- [x] Resource Owner Authorization

#### 👥 User Management
- [x] User Profile Management
- [x] User CRUD Operations
- [x] Role Management (User, Seller, Admin)
- [x] User Status Management

#### 🔍 Search & Filter
- [x] Search Service Implementation
- [x] Advanced Search Repository

#### � Admin Features
- [x] Admin Dashboard
- [x] User Management
- [x] System Administration

### �🚧 In Development

- [ ] **Product Management**
  - [ ] Product CRUD Operations
  - [ ] Product Categories
  - [ ] Product Variants
  - [ ] Product Images
  - [ ] Stock Management
- [ ] **Order Management**
  - [ ] Shopping Cart
  - [ ] Checkout Process
  - [ ] Order Tracking
  - [ ] Order History
- [ ] **Payment Integration**
  - [ ] VNPay Integration
  - [ ] Momo Integration
  - [ ] ZaloPay Integration
  - [ ] COD (Cash on Delivery)
- [ ] **Reviews & Ratings**
  - [ ] Product Reviews
  - [ ] Rating System
- [ ] **Notifications**
  - [ ] Order Notifications
  - [ ] Promotion Notifications
  - [ ] System Notifications
- [ ] **Analytics & Reports**
  - [ ] Sales Reports
  - [ ] User Analytics

---

## 🛠 Tech Stack

### Backend
- **Runtime:** Node.js 20+
- **Language:** TypeScript 5.9+
- **Framework:** Express 5.1+
- **Database:** PostgreSQL 16+
- **ORM:** Prisma 6.17+
- **Authentication:** JWT (jsonwebtoken)
- **Password Hash:** Argon2
- **Validation:** Zod
- **Email Service:** Resend
- **API Documentation:** Swagger UI
- **Security:** Helmet

### Development Tools
- **Dev Server:** ts-node-dev
- **Path Mapping:** tsconfig-paths
- **Environment:** dotenv, cross-env
- **File Upload:** Multer
- **Logging:** Morgan
- **Code Quality:** ESLint, Prettier

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

Create `.env` file in the root directory:

```bash
# Copy from .env.example if available
# Or create a new .env file with the following content
```

Update environment variables in `.env` file:

```env
# Server
PORT=8000
NODE_ENV=development

# Database (Prisma)
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/glowery_db?schema=public"

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

#### Option 1: Using Prisma (Recommended)

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# (Optional) Seed database
# npx prisma db seed
```

#### Option 2: Using SQL Scripts

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
Glowery/
├── database/                         # Database scripts
│   ├── glowery_db_schema.sql        # SQL schema
│   └── seedData.sql                 # Seed data
├── docs/                            # Documentation
│   └── api-docs/                    # API documentation
│       ├── auth.yaml
│       └── user.yaml
├── prisma/                          # Prisma ORM
│   ├── schema.prisma                # Prisma schema
│   └── migrations/                  # Database migrations
├── src/
│   ├── app.ts                       # Express app configuration
│   ├── server.ts                    # Server entry point
│   ├── common/                      # Shared utilities
│   │   ├── constants/               # Constants & enums
│   │   │   ├── error-codes.ts
│   │   │   ├── http-status.ts
│   │   │   └── user.enums.ts
│   │   ├── db/                      # Database connection
│   │   │   └── prisma.ts
│   │   ├── errors/                  # Error classes
│   │   │   ├── ApiError.ts
│   │   │   ├── BadRequestError.ts
│   │   │   ├── databaseErrorHandler.ts
│   │   │   └── UnauthorizedError.ts
│   │   ├── middlewares/             # Global middlewares
│   │   │   ├── auth.middleware.ts
│   │   │   ├── authorize.middleware.ts
│   │   │   ├── authorizeResourceOwner.middleware.ts
│   │   │   ├── error.middleware.ts
│   │   │   └── validate.middleware.ts
│   │   ├── schemas/                 # Zod schemas
│   │   │   └── common.schema.ts
│   │   ├── types/                   # TypeScript types
│   │   │   ├── express.d.ts
│   │   │   ├── jwt.type.ts
│   │   │   └── pagination.type.ts
│   │   └── utils/                   # Helper functions
│   │       ├── controllerHelper.ts
│   │       ├── email.ts
│   │       ├── hash.ts
│   │       ├── jwt.ts
│   │       └── logger.ts
│   ├── config/                      # Configuration files
│   │   ├── database.ts
│   │   └── swagger.config.ts
│   ├── features/                    # Feature modules
│   │   ├── index.ts                 # Routes aggregator
│   │   ├── admin/                   # Admin module
│   │   │   ├── admin.controller.ts
│   │   │   ├── admin.repository.ts
│   │   │   ├── admin.route.ts
│   │   │   ├── admin.service.ts
│   │   │   └── admin.type.ts
│   │   ├── auth/                    # Authentication module
│   │   │   ├── token/               # Token management
│   │   │   │   ├── token.dto.ts
│   │   │   │   ├── token.repository.ts
│   │   │   │   └── token.service.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.dto.ts
│   │   │   ├── auth.route.ts
│   │   │   ├── auth.schema.ts
│   │   │   └── auth.service.ts
│   │   ├── search/                  # Search module
│   │   │   ├── search.repository.ts
│   │   │   ├── search.service.ts
│   │   │   └── search.type.ts
│   │   └── users/                   # User module
│   │       ├── user.controller.ts
│   │       ├── user.dto.ts
│   │       ├── user.model.ts
│   │       ├── user.repository.ts
│   │       ├── user.route.ts
│   │       ├── user.schema.ts
│   │       ├── user.service.ts
│   │       └── user.type.ts
│   └── generated/                   # Generated files
│       └── prisma/                  # Prisma client
├── test/                            # Test files
│   ├── db.test.ts
│   ├── prisma.test.ts
│   └── user.test/
│       └── user.test.ts
├── .gitignore
├── eslint.config.js                 # ESLint configuration
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── tsconfig.test.json              # Test TypeScript config
└── README.md
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

#### 1️⃣ **API Layer** (`features/*/route.ts`, `features/*/controller.ts`)
- **Routes**: Define endpoints and HTTP methods for each feature
- **Controllers**: Handle HTTP requests/responses
- **Validation**: Validate input with Zod schemas
- **Middlewares**: Apply authentication, authorization, and validation

#### 2️⃣ **Business Logic Layer** (`features/*/service.ts`)
- Contains business logic and workflows for each feature
- Orchestrates complex operations
- Handles authentication, authorization logic
- Calls repositories to access data
- Communicates with external services (email, etc.)

#### 3️⃣ **Data Access Layer** (`features/*/repository.ts`, `features/*/model.ts`)
- **Repositories**: Database queries using Prisma Client
- **Models**: Domain entities and type definitions
- **DTOs**: Data Transfer Objects for API contracts
- Separates database logic from business logic
- Handles data transformation and mapping

#### 4️⃣ **Common/Shared Layer** (`common/`)
- **Utilities**: Helper functions (hash, jwt, logger, email)
- **Errors**: Custom error classes (ApiError, BadRequestError, etc.)
- **Middlewares**: Global middlewares (auth, error handling, validation)
- **Constants**: Enums, error codes, HTTP status codes
- **Types**: Shared TypeScript types and interfaces
- **Database**: Prisma client instance (`common/db/prisma.ts`)

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
// 1. Route defines endpoint (features/auth/auth.route.ts)
POST /api/v1/auth/login
    │
    ▼
// 2. Validation middleware (Zod schema)
validateRequest(loginSchema) // features/auth/auth.schema.ts
    │
    ▼
// 3. Controller receives request (features/auth/auth.controller.ts)
authController.login(req, res)
    │
    ▼
// 4. Service processes business logic (features/auth/auth.service.ts)
authService.login(email, password)
    │
    ├──▶ userRepository.findByEmail() // features/users/user.repository.ts
    ├──▶ hash.verify(password) // common/utils/hash.ts
    ├──▶ jwt.generateToken() // common/utils/jwt.ts
    └──▶ tokenService.createRefreshToken() // features/auth/token/token.service.ts
    │
    ▼
// 5. Return response
{ accessToken, refreshToken, user }
```

### Feature Module Structure

Each feature follows a consistent structure:

```
features/
├── auth/                    # Authentication feature
│   ├── auth.route.ts       # API routes
│   ├── auth.controller.ts  # HTTP handlers
│   ├── auth.service.ts     # Business logic
│   ├── auth.schema.ts      # Zod validation schemas
│   ├── auth.dto.ts         # Data Transfer Objects
│   └── token/              # Sub-feature
│       ├── token.service.ts
│       ├── token.repository.ts
│       └── token.dto.ts
├── users/                   # User feature
│   ├── user.route.ts
│   ├── user.controller.ts
│   ├── user.service.ts
│   ├── user.repository.ts  # Database queries
│   ├── user.model.ts       # Domain model
│   ├── user.schema.ts
│   ├── user.dto.ts
│   └── user.type.ts        # TypeScript types
└── admin/                   # Admin feature
    ├── admin.route.ts
    ├── admin.controller.ts
    ├── admin.service.ts
    ├── admin.repository.ts
    └── admin.type.ts
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

All API endpoints are prefixed with `/api/v1`

#### 🔐 Register
```http
POST /api/v1/auth/register
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
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

#### 🔐 Logout
```http
POST /api/v1/auth/logout
Authorization: Bearer <token>
```

#### 🔐 Refresh Token
```http
POST /api/v1/auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "your_refresh_token_here"
}
```

#### 🔐 Forgot Password
```http
POST /api/v1/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### 🔐 Reset Password
```http
POST /api/v1/auth/reset-password
Content-Type: application/json

{
  "token": "reset_token_here",
  "new_password": "NewSecurePassword123!"
}
```

#### 🔐 Verify Email
```http
GET /api/v1/auth/verify-email?token=<verification_token>
```

### User Endpoints

#### 👤 Get User Profile
```http
GET /api/v1/users/profile
Authorization: Bearer <token>
```

#### 👤 Update User Profile
```http
PUT /api/v1/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "full_name": "Updated Name",
  "phone": "0987654321"
}
```

### Admin Endpoints

#### 👑 Get All Users
```http
GET /api/v1/admin/users
Authorization: Bearer <admin_token>
```

### Learn More

- 📖 Full API Documentation available at: `http://localhost:8000/api-docs`
- � All protected endpoints require JWT Bearer token
- � Request/Response examples in Swagger UI

---

## 🗄 Database Schema

### Overview

The system uses **Prisma ORM** with PostgreSQL and includes **15 main tables**:

1. **users** - User accounts & authentication
2. **refresh_tokens** - JWT refresh tokens
3. **reset_tokens** - Password reset tokens
4. **blacklisted_tokens** - Revoked tokens
5. **categories** - Product categories (hierarchical)
6. **products** - Product catalog
7. **product_images** - Product images
8. **cart_items** - Shopping cart items
9. **orders** - Order management
10. **order_items** - Order line items
11. **payments** - Payment transactions
12. **reviews** - Product reviews & ratings
13. **wishlists** - User wishlists
14. **notifications** - User notifications
15. **coupons** - Discount coupons

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

Schema definition: [prisma/schema.prisma](./prisma/schema.prisma)

Database SQL: [database/glowery_db_schema.sql](./database/glowery_db_schema.sql)

### Prisma Commands

```bash
# Generate Prisma Client
npx prisma generate

# Create migration
npx prisma migrate dev --name your_migration_name

# Apply migrations
npx prisma migrate deploy

# Reset database
npx prisma migrate reset

# Open Prisma Studio (Database GUI)
npx prisma studio
```

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
- Follow **ESLint** rules configured in `eslint.config.js`
- Use **Prettier** for code formatting
- Naming conventions:
  - `camelCase` for variables/functions
  - `PascalCase` for classes/interfaces
  - `UPPER_CASE` for constants
  - `kebab-case` for file names
- Run `npm run lint:fix` before committing
- Run `npm run format` to format code

---

## 📜 Scripts

```bash
# Development
npm run dev           # Run dev server with hot reload

# Production
npm run build         # Build TypeScript → JavaScript
npm run start         # Run production server

# Code Quality
npm run lint          # Run ESLint
npm run lint:fix      # Fix ESLint errors
npm run format        # Format code with Prettier

# Prisma
npx prisma generate   # Generate Prisma Client
npx prisma migrate dev # Create and apply migration
npx prisma migrate deploy # Apply migrations (production)
npx prisma studio     # Open Prisma Studio GUI

# Database (SQL Scripts)
# Setup schema
psql -U postgres -d glowery_db -f database/glowery_db_schema.sql
# Seed data
psql -U postgres -d glowery_db -f database/seedData.sql

# Testing (Coming soon)
npm run test          # Run tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

---

## 🔐 Environment Variables

### Required Variables

```env
# Server Configuration
PORT=8000                          # Server port
NODE_ENV=development               # Environment: development | production

# Database Configuration (Prisma)
DATABASE_URL="postgresql://user:password@localhost:5432/glowery_db?schema=public"

# JWT Configuration
JWT_SECRET=your_jwt_secret         # JWT signing secret (min 32 chars)
JWT_EXPIRES_IN=7d                  # Access token expiry
JWT_REFRESH_SECRET=refresh_secret  # Refresh token secret (min 32 chars)
JWT_REFRESH_EXPIRES_IN=30d         # Refresh token expiry

# Email Service (Resend)
RESEND_API_KEY=your_resend_key    # Resend API key
FROM_EMAIL=noreply@domain.com      # Sender email

# Client Configuration
CLIENT_URL=http://localhost:3000   # Frontend URL (for CORS & emails)
```

### Optional Variables

```env
# File Upload
MAX_FILE_SIZE=5242880              # 5MB in bytes
UPLOAD_DIR=./uploads               # Upload directory

# Rate Limiting (Coming soon)
RATE_LIMIT_WINDOW=15               # Minutes
RATE_LIMIT_MAX_REQUESTS=100        # Max requests per window

# Logging
LOG_LEVEL=info                     # error | warn | info | debug

# Prisma
PRISMA_QUERY_LOG=false             # Enable query logging
```

### Notes

- Keep `.env` file secure and never commit it to version control
- Use strong, random secrets for JWT keys (minimum 32 characters)
- Update `CLIENT_URL` to match your frontend URL
- For production, use environment-specific values

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
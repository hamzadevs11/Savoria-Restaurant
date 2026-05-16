# 🍽️ Savoria — Premium Restaurant SaaS Platform

A production-ready, full-stack restaurant web application built with Next.js 14, Prisma, PostgreSQL, Three.js, Framer Motion, and Tailwind CSS.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### 1. Install Dependencies
```bash
cd savoria
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

Required variables:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/savoria_db"
JWT_SECRET="your-min-32-char-secret-here"
JWT_REFRESH_SECRET="your-refresh-secret-here"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Database Setup
```bash
# Create and migrate database
npm run db:push

# Generate Prisma client
npm run db:generate

# Seed with sample data
npm run db:seed
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔐 Default Credentials

| Role    | Email                | Password   |
|---------|----------------------|------------|
| Admin   | admin@savoria.com    | admin123   |
| Customer| demo@savoria.com     | user123    |

---

## 📁 Project Structure

```
savoria/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Sample data seeder
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── page.tsx           # Landing page
│   │   ├── menu/page.tsx      # Menu page
│   │   ├── cart/page.tsx      # Cart page
│   │   ├── checkout/page.tsx  # Checkout page
│   │   ├── tracking/page.tsx  # Order tracking
│   │   ├── reservation/       # Table reservations
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   ├── auth/login/        # Auth page
│   │   ├── admin/             # Admin panel
│   │   │   ├── page.tsx       # Dashboard
│   │   │   ├── orders/        # Order management
│   │   │   ├── menu/          # Menu management
│   │   │   ├── reservations/  # Reservation mgmt
│   │   │   ├── users/         # User management
│   │   │   ├── analytics/     # Analytics & reports
│   │   │   └── theme/         # Theme customization
│   │   └── api/               # REST API routes
│   │       ├── auth/          # Auth endpoints
│   │       ├── menu/          # Menu CRUD
│   │       ├── orders/        # Order management
│   │       └── reservations/  # Reservation management
│   ├── components/
│   │   ├── layout/            # Navbar, Footer
│   │   ├── sections/          # Page sections
│   │   ├── three/             # 3D components (Three.js)
│   │   ├── ui/                # Reusable UI components
│   │   └── providers/         # Context providers
│   ├── lib/
│   │   ├── prisma.ts          # Database client
│   │   ├── auth.ts            # JWT utilities
│   │   ├── api.ts             # API helpers
│   │   └── utils.ts           # Utility functions
│   ├── store/
│   │   ├── useCartStore.ts    # Zustand cart state
│   │   └── useAuthStore.ts    # Zustand auth state
│   ├── types/index.ts         # TypeScript types
│   └── styles/globals.css     # Global styles
├── .env.example
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## 🛠️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | Next.js 14, React 18              |
| 3D         | Three.js, @react-three/fiber      |
| Animations | Framer Motion                     |
| Styling    | Tailwind CSS                      |
| State      | Zustand + React Query             |
| Backend    | Next.js API Routes                |
| ORM        | Prisma                            |
| Database   | PostgreSQL                        |
| Auth       | JWT (access + refresh tokens)     |
| Charts     | Recharts                          |
| AI Chat    | Anthropic Claude API              |

---

## 📋 Features

### Customer
- 🏠 3D animated landing page
- 🍽️ Menu with search, filters, dietary tags
- 🛒 Cart with promo codes
- 💳 Checkout with delivery/pickup options
- 📍 Real-time order tracking
- 📅 Table reservation system
- 🤖 AI-powered chatbot assistant
- 🔐 JWT authentication

### Admin Panel
- 📊 Analytics dashboard with charts
- 📋 Real-time order management
- 🍽️ Menu CRUD operations
- 📅 Reservation management
- 👥 User management
- 🎨 Theme customization
- 📥 Report exports

---

## 🌐 API Endpoints

| Method | Endpoint                   | Description              |
|--------|----------------------------|--------------------------|
| POST   | /api/auth/login            | User login               |
| POST   | /api/auth/register         | User registration        |
| GET    | /api/menu                  | Get menu items           |
| POST   | /api/menu                  | Create item (Admin)      |
| GET    | /api/orders                | Get orders               |
| POST   | /api/orders                | Place order              |
| GET    | /api/reservations          | Get reservations         |
| POST   | /api/reservations          | Create reservation       |

---

## 🚀 Production Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Environment variables needed in production:
- `DATABASE_URL` — Neon/Supabase PostgreSQL URL
- `JWT_SECRET` — Strong random string (32+ chars)
- `JWT_REFRESH_SECRET` — Different strong random string
- `NEXT_PUBLIC_APP_URL` — Your domain

### Docker
```bash
docker build -t savoria .
docker run -p 3000:3000 --env-file .env savoria
```

---

## 🧪 Demo Promo Codes
- `SAVORIA20` — 20% off (min order $30)
- `WELCOME10` — 10% off (no minimum)

---

## 📄 License
MIT — Free to use and modify for commercial projects.

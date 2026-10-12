# 📚 BiblioDrop — Online Book Delivery Management System

<div align="center">

**Your Local Library, Delivered.**

A comprehensive digital platform connecting avid readers and students with local libraries and independent book owners — enabling doorstep book delivery, verified reviews, and a full role-based management ecosystem.

[![Live Site](https://img.shields.io/badge/Live%20Site-bibliodrop.app-1B2A4A?style=for-the-badge&logo=vercel&logoColor=white)](https://bibliodrop-client-two.vercel.app)
[![Server](https://img.shields.io/badge/API%20Server-bibliodrop--api.onrender.com-C9A84C?style=for-the-badge&logo=render&logoColor=white)](https://bibliodrop-api.onrender.com)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/atlas)

</div>

---

## 🌐 Live URLs

| Service | URL |
|---|---|
| 🖥️ Frontend | [https://bibliodrop-client-two.vercel.app](https://bibliodrop-client-two.vercel.app) |
| ⚙️ Backend API | [https://bibliodrop-server-ten.vercel.app](https://bibliodrop-server-ten.vercel.app) |

> **Note:** Replace the above URLs with your actual deployed links before submitting.

---

## 📖 Purpose

Traditional library systems require physical visits — a barrier for busy professionals, remote students, and anyone without easy transport access. **BiblioDrop** democratises access to books by creating an online delivery marketplace where:

- **Readers** browse, request, and review books from home
- **Librarians & Book Owners** list inventory and manage delivery fulfilment
- **Admins** oversee the entire ecosystem — approving listings, managing users, and monitoring platform analytics

---

## ✨ Key Features

### 🔐 Authentication (Better Auth)
- Email + password registration and login
- Google OAuth social login
- Role selection at registration: **Reader** or **Librarian**
- Secure HTTP-only cookie sessions
- Profile avatar upload via **imgBB API**

### 📖 Reader (`user` role)
- Browse, search, filter and sort all published books
- Filter by category, delivery fee range, and availability
- Server-side pagination
- Request doorstep delivery via **Stripe Checkout**
- Track delivery status: `Pending → Dispatched → Delivered`
- Leave **verified reviews** — only unlocked after confirmed delivery
- Personal wishlist (add / remove books)
- Dashboard: charts, delivery history, reading list, reviews

### 🏛️ Librarian (`librarian` role)
- Add book listings with cover image upload via **imgBB**
- New books enter **Pending Approval** — not public until admin approves
- Toggle listings between Published / Unpublished
- Update delivery request status for incoming orders
- Dashboard: earnings chart, delivery status donut, most-requested books, key stats

### 🔑 Admin (`admin` role)
- **Book Approval Queue** — approve or reject pending submissions
- **Manage All Users** — change roles, delete accounts
- **Manage All Books** — force publish, unpublish, or delete any listing
- **All Transactions** — full Stripe payment history
- Dashboard: platform-wide stats, revenue, category breakdown

### 🎨 UI / UX
- Fully responsive: mobile, tablet, desktop
- Dark / Light mode toggle (persistent)
- Animated page transitions and scroll reveals
- Skeleton loading states and toast notifications
- Carousel/slider on the home page hero section

---

## 🛠️ Tech Stack & npm Packages

### Core Framework

| Package | Version | Purpose |
|---|---|---|
| [next](https://nextjs.org) | ^16.2.9 | React framework — App Router, SSR, routing |
| [react](https://react.dev) | 19.2.4 | UI library |
| [react-dom](https://react.dev) | 19.2.4 | React DOM renderer |

### UI & Styling

| Package | Version | Purpose |
|---|---|---|
| [tailwindcss](https://tailwindcss.com) | ^4 | Utility-first CSS framework |
| [@tailwindcss/postcss](https://tailwindcss.com/docs/installation/using-postcss) | ^4 | PostCSS integration for Tailwind v4 |
| [@heroui/react](https://heroui.com) | ^3.2.1 | Component library (Button, Input, Card, etc.) |
| [@heroui/styles](https://heroui.com) | ^3.2.1 | HeroUI base style tokens |
| [framer-motion](https://www.framer.com/motion/) | ^12.40.0 | Page transitions and scroll animations |
| [swiper](https://swiperjs.com) | ^12.2.0 | Hero banner carousel / image slider |
| [react-icons](https://react-icons.github.io/react-icons/) | ^5.6.0 | Icon sets (FaUser, FaLock, FcGoogle, etc.) |
| [react-spinners](https://www.davidhu.io/react-spinners/) | ^0.17.0 | Loading spinner components |
| [next-themes](https://github.com/pacocoursey/next-themes) | ^0.4.6 | Persistent dark / light mode |

### Data & State

| Package | Version | Purpose |
|---|---|---|
| [mongodb](https://www.mongodb.com) | ^7.3.0 | MongoDB native driver (Better Auth adapter) |
| [react-hook-form](https://react-hook-form.com) | ^7.79.0 | Form state and validation |
| [recharts](https://recharts.org) | ^3.8.1 | Dashboard charts (AreaChart, PieChart, BarChart) |

### Authentication

| Package | Version | Purpose |
|---|---|---|
| [better-auth](https://better-auth.com) | ^1.6.19 | Full-stack auth — email/password + Google OAuth |

### Payments

| Package | Version | Purpose |
|---|---|---|
| [@stripe/stripe-js](https://stripe.com/docs/js) | ^9.8.0 | Stripe.js client — redirect to Stripe Checkout |
| [stripe](https://stripe.com/docs/api) | ^22.2.2 | Stripe Node.js SDK — create sessions, handle webhooks |

### Notifications

| Package | Version | Purpose |
|---|---|---|
| [react-hot-toast](https://react-hot-toast.com) | ^2.6.0 | Toast notifications for user feedback |

### Dev Dependencies

| Package | Version | Purpose |
|---|---|---|
| [eslint](https://eslint.org) | ^9 | Code linting |
| [eslint-config-next](https://nextjs.org/docs/app/api-reference/config/eslint) | 16.2.9 | Next.js ESLint ruleset |
| [babel-plugin-react-compiler](https://react.dev/learn/react-compiler) | 1.0.0 | React 19 compiler Babel plugin |

---

## 📁 Project Structure

```
bibliodrop/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/              # Login page
│   │   │   └── register/           # Registration with role selector
│   │   ├── (main)/
│   │   │   ├── page.js             # Home — hero, featured books, categories
│   │   │   ├── books/              # Browse books (search, filter, pagination)
│   │   │   │   └── [id]/           # Book detail + review + Stripe request
│   │   │   └── dashboard/
│   │   │       ├── (user)/         # Reader dashboard
│   │   │       ├── (librarian)/    # Librarian dashboard
│   │   │       └── (admin)/        # Admin dashboard
│   │   ├── api/
│   │   │   └── auth/               # Better Auth API handler
│   │   ├── layout.js               # Root layout — providers, fonts
│   │   ├── providers.js            # HeroUI + ThemeProvider + Toaster
│   │   └── globals.css             # Tailwind base + custom tokens
│   ├── components/
│   │   ├── layout/                 # Navbar, Footer
│   │   ├── book/                   # BookCard, BookCardSkeleton
│   │   ├── dashboard/              # DashboardSidebar, StatCard, tables
│   │   └── auth/                   # ProtectedRoute
│   ├── lib/
│   │   ├── auth.js                 # Better Auth server instance (MongoDB adapter)
│   │   ├── auth-client.js          # Better Auth React client
│   │   └── actions/                # Server Actions (books, users, admin)
│   └── utilities/
│       └── imageUploadInImgBB.js   # imgBB upload helper
├── public/
│   ├── logo.png                    # Light mode logo
│   └── logo-light.png              # Dark mode logo
├── tailwind.config.js
├── next.config.mjs
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas cluster (free tier works)
- Stripe account (test mode keys)
- imgBB account (free API key at [imgbb.com](https://anwar-hossain3.imgbb.com/))
- Google Cloud project with OAuth 2.0 credentials

### Installation

```bash
# Clone the repo
git clone https://github.com/cseanwar/bibliodrop-client.git
cd bibliodrop-client

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/bibliodrop

# Better Auth
BETTER_AUTH_SECRET=your_random_32_char_secret_here
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx

# imgBB
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Role-Based Access

| Feature | Guest | Reader | Librarian | Admin |
|---|:---:|:---:|:---:|:---:|
| Browse & view books | ✅ | ✅ | ✅ | ✅ |
| Request delivery (Stripe) | ❌ | ✅ | ❌ | ❌ |
| Leave verified review | ❌ | ✅ | ❌ | ❌ |
| Manage wishlist | ❌ | ✅ | ❌ | ❌ |
| Add / edit book listings | ❌ | ❌ | ✅ | ✅ |
| Update delivery status | ❌ | ❌ | ✅ | ✅ |
| Approve / reject books | ❌ | ❌ | ❌ | ✅ |
| Manage all users | ❌ | ❌ | ❌ | ✅ |
| View all transactions | ❌ | ❌ | ❌ | ✅ |

---

## 👨‍💻 Author

**Anwar Hossain**
- GitHub: [@cseanwar](https://github.com/cseanwar)
- Email: cseanwar@gmail.com

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  Made with ❤️ and lots of ☕ — Happy reading! 📖
</div>

# 🏕️ The Wild Oasis Website

**The Wild Oasis Website** is a full-stack application built with **Next.js App Router**, developed for **study purposes** while following an advanced Next.js course and applying modern full-stack architecture concepts.

This application represents the **customer-facing platform** of The Wild Oasis, where guests can browse luxury cabins, check availability, create reservations, and manage their bookings.

It integrates seamlessly with the admin dashboard (separate project) that manages cabins, bookings, and guests.

---

🌐 Live Demo  

👉 https://the-wild-oasis-website-ruddy-beta.vercel.app/

---

## 🛠️ Admin Panel Repository

This project connects to the administrator dashboard:

🏨 **The Wild Oasis – Admin Panel**  
👉 https://github.com/DaviRSS1/the-wild-oasis

The admin panel is responsible for managing:

- Cabins (CRUD)
- Guests (CRUD)
- Bookings management
- Dashboard analytics
- Authentication & authorization
- Supabase database control

Together, both applications simulate a real-world SaaS architecture with separated client and admin environments.

---

## 🚀 Features

### 🏡 Cabins & Navigation

- Browse all available cabins
- Dynamic cabin detail pages
- Responsive image rendering
- Optimized images using `next/image`
- Dynamic metadata per cabin
- Nested layouts with App Router

### 📅 Reservations System

- Interactive date range picker
- Availability validation
- Create new reservation
- Update reservation
- Delete reservation
- Optimistic UI updates
- Streaming UI with Suspense

### 👤 Authentication

- NextAuth integration
- Google authentication (if configured)
- Protected routes using Middleware
- Automatic guest creation on first sign-in
- Session handling on the server
- Custom sign-in and sign-out flows

### ⚡ Performance & Rendering

- Server Components by default
- Client Components when interactivity is required
- Streaming with `loading.js`
- Error boundaries (`error.js`)
- Static Site Generation (SSG)
- Dynamic rendering
- Incremental Static Regeneration (ISR)
- Partial Pre-Rendering (PPR)
- Advanced caching strategies
- Manual cache revalidation

### 🎨 UI & UX

- Tailwind CSS styling
- Responsive layout
- Font optimization
- Image optimization
- Clean and scalable folder structure
- Modern server-first architecture

---

## 🧠 Concepts Practiced

This project was built to deeply reinforce modern Next.js and full-stack React patterns:

### ⚙️ Next.js App Router

- Nested layouts
- Route groups
- Dynamic segments
- `generateStaticParams`
- Dynamic metadata generation
- Route Handlers (API endpoints)

### 🧩 React Server Components (RSC)

- Server vs Client Components
- Hydration fundamentals
- Streaming Server Components
- Passing data between Server and Client
- Blurring the server/client boundary

### 📡 Data Fetching & Caching

- Server-side data fetching
- React Suspense
- Streaming UI
- Static vs Dynamic rendering
- Caching strategies
- Manual revalidation
- Partial Pre-Rendering

### 🔐 Authentication & Security

- NextAuth
- Middleware route protection
- Server session handling
- Database user synchronization

### 🧠 Advanced React Patterns

- Server Actions
- `useFormStatus`
- `useTransition`
- `useOptimistic`
- Context API for state management
- URL-based state sharing
- Error boundaries

---

## 🛠️ Built With

- Next.js (App Router)
- React
- NextAuth
- Supabase (Database)
- Tailwind CSS
- date-fns
- Vercel (Deployment)

---

## 🗄️ Backend & Database

The backend is powered by **Supabase**, shared with the Admin Panel project:

- Relational database
- Cabin & booking relationships
- Guest management
- Row Level Security (RLS)
- Authentication
- Secure data policies

---

## 🎯 Purpose of the Project

This application was developed for **advanced full-stack practice**, focusing on:

- Server-first architecture
- Modern rendering strategies
- Authentication flows
- Data consistency between apps
- Real-world SaaS simulation
- Performance optimization
- Clean and scalable project structure

Together with the Admin Panel, this project simulates a production-style booking platform with separated client and management environments.

---

## 👤 Author

Developed by **Davi Reghim**

🔗 LinkedIn:  
https://www.linkedin.com/in/davi-reghim-13b995272/

💻 GitHub:  
https://github.com/DaviRSS1/

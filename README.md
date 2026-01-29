# DemoShop – POS Style Web Application

DemoShop is a full-stack POS (Point of Sale) style web application built to manage products and customer orders efficiently. It includes authentication, protected routes, order queue management, and product administration with a modern tech stack.

---

## Live URLs

**Frontend:**  
https://demoshop-phi.vercel.app

**Backend API:**  
https://demoshop-production-0b12.up.railway.app

---

## Application Overview

DemoShop simulates a small shop POS system where authenticated users can:
- Manage products
- Place orders using a cart
- View and manage an order queue
- Update order status or delete orders

All core pages are protected and require authentication.

---

## Pages & Features

### 1. Authentication Pages
- **Login**
- **Logout**
- JWT authentication is used throughout the application
- Tokens are required to access protected routes

---

### 2. Home Page (Order Queue)
- Displays all placed orders in a queue
- Each order item includes:
  - Customer name
  - Product name
  - Quantity
  - Total price
- Actions:
  - **Deliver** button to update order status
  - **Delete** button to remove an order

---

### 3. Order Page
- Displays a list of available products
- Each product shows:
  - Image
  - Stock
  - Price
- Admin-only actions:
  - Edit product
  - Delete product
- Order cart (left side):
  - Add products to cart
  - Increase / decrease quantity
  - Place order button
- On order placement:
  - The order is sent to the backend
  - It appears in the Home page order queue

---

### 4. Add Product Page
- Add new products to the system
- Upload product images (stored using Cloudinary)
- Accessible only to authenticated users

---

### 5. Edit Product Page
- Edit existing product information
- Update name, price, stock, and image
- Accessible only to authenticated users

---

## Route Protection

- All core pages are **private routes**
- Only logged-in users can access:
  - Home
  - Order
  - Add Product
  - Edit Product
- Backend uses `AuthGuard` to protect sensitive endpoints

---

## Role-Based Authorization

- Role-based access control is implemented in the backend
- Intended behavior:
  - Admin users can edit and delete products
- Current status:
  - Role-based authorization is not fully working due to an unresolved error

---

## Tech Stack

### Frontend
- Vite + React
- React Router
- TanStack Query (React Query)
- Ant Design (UI components)
- Context API
- Fetch API
- Postman (API testing)

---

### Backend
- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication
- AuthGuard for route protection
- Role-based authorization (partially implemented)
- Cloudinary for image storage

---

## Backend Features

- RESTful API architecture
- JWT token validation on protected routes
- Prisma schema for product and order management
- Secure image upload via Cloudinary
- Modular NestJS structure

---

## Project Purpose

This project was built to practice:
- Full-stack application development
- Secure authentication and authorization
- State management with server-side caching
- Real-world POS workflow
- Backend protection using guards and JWT

---

## Future Improvements

- Fix role-based authorization issues
- Add order status filtering
- Improve error handling and validations
- Add user management
- Enhance UI responsiveness

---

## License

This project is for educational and practice purposes.

# Elite Cart

## Project Overview

Elite Cart is a backend application for a modern E-Commerce platform developed using Node.js, Express.js, and MongoDB. The application exposes RESTful APIs that support complete online shopping workflows for Buyers, Sellers, and Administrators.

The project is designed using a layered architecture that separates routing, request handling, business logic, database operations, validations, middleware, and utilities, making the codebase scalable, maintainable, and production-ready.

The backend includes secure authentication, role-based authorization, product management, shopping cart, wishlist, reviews, order processing, Razorpay payment integration, and dashboard analytics for different user roles.

---

# Technology Stack

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose ODM

## Authentication & Security

- JSON Web Token (JWT)
- bcryptjs

## Payment Gateway

- Razorpay

## File Upload

- Multer
- Cloudinary

## Validation

- Custom Validators

## Development & Testing

- Postman
- Nodemon
- dotenv

---

# Project Architecture

The project follows a layered architecture.

```
Client
        │
        ▼
Routes
        │
        ▼
Controllers
        │
        ▼
Services
        │
        ▼
Models
        │
        ▼
MongoDB
```

### Routes

Defines all API endpoints.

### Controllers

Handles HTTP requests and responses.

### Services

Contains all business logic and communicates with database models.

### Models

Defines MongoDB schemas and performs CRUD operations.

### Middleware

Handles authentication, authorization, validation, and centralized error handling.

### Validators

Validates incoming request data before processing.

### Utilities

Contains reusable helper functions and response handlers.

---

# Folder Structure

```
backend
│
├── config
├── constants
├── controllers
├── middleware
├── models
├── routes
├── schemas
├── services
├── uploads
├── utils
├── validators
│
├── app.js
├── server.js
├── package.json
└── README.md
```

---

# Features

## Authentication Module

- User Registration
- User Login
- JWT Authentication
- Password Encryption
- Protected Routes
- Role Based Authorization

---

## User Roles

The application supports three roles.

- Admin
- Seller
- Buyer

Each role has different access permissions.

---

## Category Module

- Create Category
- Update Category
- Delete Category
- Get All Categories
- Get Category Details
- Prevent Duplicate Categories

---

## Product Module

Seller Features

- Add Product
- Update Product
- Delete Product
- View Own Products

Public Features

- View Products
- View Featured Products
- Product Details

Admin Features

- Toggle Featured Products

Product Information

- Name
- Description
- Brand
- Category
- Images
- Price
- Discount Price
- Stock
- Featured Status
- Active Status

---

## Image Upload

Supports

- Multiple Image Upload
- Image Validation
- Cloudinary Integration
- Multer Middleware

---

## Cart Module

Buyer can

- Add Product
- Update Quantity
- Remove Product
- Select / Unselect Products
- Clear Cart
- Fetch Cart

---

## Wishlist Module

Buyer can

- Add Wishlist Item
- Remove Wishlist Item
- View Wishlist
- Prevent Duplicate Entries

---

## Review Module

Buyer can

- Add Review
- Update Review
- Delete Review

Public users can

- View Product Reviews

---

## Order Module

Buyer

- Checkout
- Create Order
- View Orders
- View Order Details
- Cancel Order

Seller

- View Seller Orders
- Update Order Status

Order Features

- Multiple Products
- Shipping Address
- Order Number Generation
- Payment Status
- Order Status

---

## Payment Module

Integrated with Razorpay

Supports

- Create Payment Order
- Verify Payment Signature
- Update Payment Status
- Complete Order
- Stock Reduction After Payment

---

## Buyer Dashboard

Displays

- Cart Count
- Wishlist Count
- Total Orders
- Pending Orders
- Confirmed Orders
- Packed Orders
- Shipped Orders
- Out For Delivery Orders
- Delivered Orders
- Cancelled Orders
- Total Amount Spent
- Recent Orders

---

## Seller Dashboard

Displays

- Total Products
- Active Products
- Out of Stock Products
- Low Stock Products
- Total Orders
- Pending Orders
- Confirmed Orders
- Packed Orders
- Shipped Orders
- Delivered Orders
- Cancelled Orders
- Total Revenue
- Recent Orders
- Top Selling Products

---

## Admin Dashboard

Displays

- Total Users
- Buyers
- Sellers
- Administrators
- Categories
- Products
- Orders
- Revenue
- Active Products
- Out of Stock Products
- Recent Users
- Recent Orders

---

# Security Features

- JWT Authentication
- Password Encryption using bcrypt
- Role Based Authorization
- Protected APIs
- Input Validation
- Centralized Error Handling
- MongoDB ObjectId Validation
- Duplicate Record Prevention

---

# Project Workflow

### User Authentication

```
Register
      │
      ▼
Password Encryption
      │
      ▼
User Stored in Database
      │
      ▼
Login
      │
      ▼
JWT Token Generated
      │
      ▼
Protected APIs
```

---

### Product Creation

```
Seller
      │
      ▼
Upload Product Details
      │
      ▼
Image Validation
      │
      ▼
Cloudinary Upload
      │
      ▼
Product Stored in MongoDB
```

---

### Shopping Flow

```
Browse Products
        │
        ▼
Add to Cart
        │
        ▼
Wishlist (Optional)
        │
        ▼
Checkout
        │
        ▼
Create Order
        │
        ▼
Payment
        │
        ▼
Order Confirmation
```

---

### Payment Flow

```
Create Order
        │
        ▼
Generate Razorpay Order
        │
        ▼
Payment
        │
        ▼
Verify Signature
        │
        ▼
Update Payment Status
        │
        ▼
Reduce Product Stock
        │
        ▼
Complete Order
```

---

# API Endpoints

## Authentication

```
POST    /api/auth/register
POST    /api/auth/login
```

---

## Categories

```
GET     /api/categories
GET     /api/categories/:slug
POST    /api/categories
PUT     /api/categories/:id
DELETE  /api/categories/:id
```

---

## Products

```
GET     /api/products
GET     /api/products/featured
GET     /api/products/:slug

POST    /api/products
PUT     /api/products/:id
DELETE  /api/products/:id

GET     /api/products/seller/my-products

PATCH   /api/products/:id/feature
```

---

## Cart

```
GET     /api/cart

POST    /api/cart/:productId

PATCH   /api/cart/:id

PATCH   /api/cart/:id/select

DELETE  /api/cart/:id

DELETE  /api/cart
```

---

## Wishlist

```
GET     /api/wishlist

POST    /api/wishlist/:productId

DELETE  /api/wishlist/:wishlistId
```

---

## Reviews

```
GET     /api/reviews/:productId

POST    /api/reviews/:productId

PUT     /api/reviews/:reviewId

DELETE  /api/reviews/:reviewId
```

---

## Orders

```
POST    /api/orders/checkout

GET     /api/orders/my-orders

GET     /api/orders/:id

PATCH   /api/orders/:id/cancel

PATCH   /api/orders/:id/payment-success

GET     /api/orders/seller/orders

PATCH   /api/orders/:id/status
```

---

## Payments

```
POST    /api/payment/create-order

POST    /api/payment/verify
```

---

## Buyer Dashboard

```
GET     /api/buyer/dashboard
```

---

## Seller Dashboard

```
GET     /api/seller/dashboard
```

---

## Admin Dashboard

```
GET     /api/admin/dashboard
```

---

# Database Schema Overview

## User

- Authentication Information
- Role
- Profile Details

Relationship

```
User

├── Products (Seller)

├── Orders (Buyer)

├── Cart

├── Wishlist

└── Reviews
```

---

## Category

```
Category

└── Products
```

---

## Product

Contains

- Name
- Description
- Images
- Brand
- Category
- Price
- Discount Price
- Stock
- Seller

Relationships

```
Product

├── Category

├── Seller

├── Reviews

├── Cart

├── Wishlist

└── Order Items
```

---

## Cart

```
User

│

└── Cart

        └── Product
```

---

## Wishlist

```
User

│

└── Wishlist

        └── Product
```

---

## Review

```
User

│

└── Review

        └── Product
```

---

## Order

Contains

- Order Number
- Buyer
- Shipping Address
- Payment Information
- Order Status
- Order Items

Relationships

```
Order

├── Buyer

├── Products

└── Sellers
```

---

# API Testing

The backend APIs were tested using Postman.

Successfully tested modules include

- Authentication
- Categories
- Products
- Cart
- Wishlist
- Reviews
- Orders
- Payment
- Buyer Dashboard
- Seller Dashboard
- Admin Dashboard

---

# Design Principles

The project follows

- RESTful API Design
- Layered Architecture
- Separation of Concerns
- Modular Folder Structure
- Reusable Business Logic
- Centralized Error Handling
- Environment-Based Configuration
- Scalable Code Organization

---

# Future Enhancements

- React Frontend Integration
- Product Search
- Advanced Filters
- Unit and Integration Testing

---

# Author

Nandhini K.S.

MERN Stack Developer
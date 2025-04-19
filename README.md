# 📝 MERN Blog Platform

Welcome to my personal blogging platform!  
This project is built with the **MERN Stack** (MongoDB, Express.js, React, Node.js) and powered by **Docker** for containerization.

---

## 🚀 Features

- 👤 User authentication (Login & Register)
- 📝 Create and edit blog posts with a WYSIWYG editor
- 📋 Post management (View, Edit, Delete)
- 🔐 Protected frontend routes with JWT
- 🐳 Fully containerized with Docker & Docker Compose
- 🌐 SEO-friendly URLs with slug generation
- 🗓️ Posts include created and updated timestamps
- 🧭 Clean and intuitive UI with React & TailwindCSS

---

## 📁 Project Structure

```bash
.
├── backend             # Express API with MongoDB and JWT Auth
│   ├── models          # Mongoose schemas
│   ├── routes          # Express route handlers
│   └── controllers     # Business logic
├── frontend            # React frontend (Vite or CRA)
│   ├── components      # Reusable components (Header, PostCard, etc.)
│   ├── pages           # React Router pages (Login, Register, Dashboard, etc.)
│   └── services        # API calls and private route handling
├── docker-compose.yml  # Docker orchestration for frontend & backend
└── README.md           # This file
```

---

## 🛠️ Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)

### Installation (With Docker)

```bash
# Clone the repo
git clone https://github.com/mohamedabdellhay/blog-post.git
cd blog-post

# Run the app with Docker
docker compose up -d --build
```

The app will be running at:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

---

## 🧪 API Endpoints (Examples)

- `POST /api/auth/login` – User login
- `POST /api/auth/register` – User registration
- `GET /api/posts` – Fetch all posts
- `GET /api/posts/:slug` – Fetch a single post by slug
- `POST /api/posts` – Create a post
- `PUT /api/posts/:id` – Edit a post
- `DELETE /api/posts/:id` – Delete a post

---

## ✍️ Author

Developed with ❤️ by [Mohamed Abdellhay](https://github.com/mohamedabdellhay)

---

## 📜 License

This project is licensed under the MIT License – feel free to use and adapt it!

---

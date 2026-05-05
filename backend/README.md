# Vithara Care Clinic — Backend

Express + MongoDB backend for the Vithara Care Clinic website.

## Stack

| Layer | Tech |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT + bcryptjs |
| Email | Nodemailer + Gmail SMTP |
| Env | dotenv |

## Folder Structure

```
backend/
├── src/
│   ├── config/db.js              ← MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     ← login / logout / me
│   │   ├── blogController.js     ← blog CRUD
│   │   ├── appointmentController.js
│   │   └── adminController.js    ← Care Pulse Dashboard stats
│   ├── middleware/
│   │   ├── authMiddleware.js     ← JWT protect
│   │   └── errorMiddleware.js    ← global error handler
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Blog.js
│   │   └── Appointment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── blogRoutes.js
│   │   ├── appointmentRoutes.js
│   │   └── adminRoutes.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   ├── slugify.js
│   │   ├── readTime.js
│   │   ├── appointmentIntent.js
│   │   └── sendEmail.js
│   ├── seed/seedAdmin.js         ← create first admin
│   └── server.js                 ← entry point
├── .env.example
└── package.json
```

## Setup

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/vithara?retryWrites=true&w=majority
JWT_SECRET=your_strong_random_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=yourStrongPassword123
GMAIL_USER=vidharthacareclinic@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password
ADMIN_EMAIL=vidharthacareclinic@gmail.com
FRONTEND_URL=http://localhost:3000
```

### 3. Create admin account
```bash
npm run seed
```

### 4. Start dev server
```bash
npm run dev
```

Backend runs at: **http://localhost:5000**

---

## API Routes

### Auth
| Method | Route | Access |
|---|---|---|
| POST | `/api/auth/login` | Public |
| POST | `/api/auth/logout` | Public |
| GET | `/api/auth/me` | Admin |

### Appointments
| Method | Route | Access |
|---|---|---|
| POST | `/api/appointments` | Public |
| GET | `/api/appointments` | Admin |
| PATCH | `/api/appointments/:id/status` | Admin |

### Blogs (Care Journal)
| Method | Route | Access |
|---|---|---|
| GET | `/api/blogs` | Public (published only) |
| GET | `/api/blogs/:slug` | Public (published only) |
| POST | `/api/blogs` | Admin |
| PUT | `/api/blogs/:id` | Admin |
| DELETE | `/api/blogs/:id` | Admin |

### Admin
| Method | Route | Access |
|---|---|---|
| GET | `/api/admin/stats` | Admin |

---

## Authentication

Admin routes require a JWT in the `Authorization` header:
```
Authorization: Bearer <token>
```

Token is returned on login and should be stored in `localStorage` on the frontend.

---

## Gmail Setup

1. Enable 2-factor authentication on your Gmail account
2. Go to Google Account → Security → App Passwords
3. Generate an app password for "Mail"
4. Put it in `GMAIL_APP_PASSWORD` in your `.env`

---

## Deploy on Render

1. Push backend folder to a GitHub repo
2. Create a new **Web Service** on Render
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `npm start`
5. Add all environment variables from `.env`
6. Update `FRONTEND_URL` to your Vercel frontend URL

---

## Seed Admin

If you need to reset the admin:
1. Delete the admin document from MongoDB Atlas manually
2. Run `npm run seed` again

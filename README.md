# JERUS Shop — MERN Online Shirt Store

A small e-commerce web app (MongoDB, Express, React, Node.js) with two roles:

- **User**: register/login, browse shirts, choose size, add to cart, checkout, view own orders.
- **Admin**: sales dashboard, add/edit/delete shirts, **change prices**, **change shirt images** (upload or URL), update order status.

## 1. Requirements

- Node.js 18+ (https://nodejs.org)
- MongoDB — either local (MongoDB Community) **or** a free MongoDB Atlas cluster
- Visual Studio Code (recommended)

## 2. Setup (5 steps)

```bash
# 1) install everything
npm run install:all

# 2) create and configure the server config
cp server/.env.example server/.env        # Windows: copy server\.env.example server\.env
# Set MONGO_URI, JWT_SECRET, ADMIN_EMAIL and a unique ADMIN_PASSWORD in server/.env

# 3) (optional) create the client config
cp client/.env.example client/.env

# 4) put sample shirts + the admin account in the database
npm run seed

# 5) run server (port 5000) and client (port 5173) together
npm run dev
```

Open http://localhost:5173

The admin account is created from `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `server/.env` when you seed. Choose a unique password before running the seed command. Anyone who registers on the site is a normal **user**.

## 3. Connecting to MongoDB

Open `server/.env` and change the single `MONGO_URI` line:

| Where | MONGO_URI |
|---|---|
| Local MongoDB | `mongodb://127.0.0.1:27017/dbtk_shop` |
| MongoDB Atlas | `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/dbtk_shop?retryWrites=true&w=majority` |

For Atlas: create a free cluster → Database Access (add a user) → Network Access (allow your IP) → Connect → Drivers → copy the string. Then run `npm run seed` again so the new database gets the admin and sample shirts.

The connection code lives in one file only: `server/config/db.js`.

## 4. GitHub and database configuration

GitHub stores this project's source code, not your live MongoDB database. Keep `server/.env` and `client/.env` private; `.gitignore` excludes them and local uploaded images. Commit the `.env.example` files instead, then configure a local MongoDB or MongoDB Atlas URI and unique secrets in your own `.env` files. To create sample records in a fresh database, run `npm run seed`.

For a deployed site, configure the same environment variables in the hosting provider and use MongoDB Atlas or another hosted MongoDB service. Do not put database credentials, JWT secrets, or real user data in GitHub.

## 5. Project structure

```
dbtk-shop/
├── server/                 Express + Mongoose API
│   ├── config/db.js        MongoDB connection
│   ├── models/             User, Product, Cart, Order
│   ├── controllers/        business logic (one file per feature)
│   ├── routes/             URL → controller (one file per feature)
│   ├── middleware/         auth (JWT + admin check), image upload
│   ├── utils/seed.js       sample data + admin
│   └── uploads/            uploaded shirt images
├── client/                 React (Vite)
│   └── src/
│       ├── api/axios.js    API helper (change API URL in .env)
│       ├── context/        AuthContext, CartContext
│       ├── components/     Navbar, ProductCard, ProtectedRoute
│       └── pages/          Home, ProductDetail, Cart, Checkout, ...
│           └── admin/      Dashboard, ManageProducts, ManageOrders
└── docs/AGILE.md           product backlog + sprint plan
```

## 6. API overview

| Method | Endpoint | Access |
|---|---|---|
| POST | /api/auth/register, /api/auth/login | public |
| GET | /api/auth/me | logged in |
| GET | /api/products, /api/products/:id | public |
| POST/PUT/DELETE | /api/products(/:id) | **admin** |
| GET/POST/PUT/DELETE | /api/cart(/:itemId) | user |
| POST | /api/orders (checkout) | user |
| GET | /api/orders/mine | user |
| GET | /api/orders, PUT /api/orders/:id/status | **admin** |
| GET | /api/stats (sales numbers) | **admin** |

## 7. Easy to update (Agile-friendly design)

- Each feature = its own **model + controller + route** file. A new feature (e.g. reviews) means adding 3 small files and 1 line in `server/server.js`.
- Frontend pages are small and separate; routes are all in `client/src/App.jsx`.
- All config is in `.env` files — no hard-coded URLs or secrets.
- Work is split into sprints in `docs/AGILE.md` — add new user stories to the backlog and build them one sprint at a time.

## 8. Screenshot proof checklist (for the activity)

Capture your **entire desktop** (VS Code + browser + terminal visible) showing:
1. VS Code with this project open and the terminal running `npm run dev`
2. MongoDB (Compass or Atlas) showing the `products`, `users`, `orders` collections
3. The user storefront with a shirt added to cart
4. The admin dashboard (sales) and the Edit shirt form (price/image changed)

## 9. Ideas for next sprints

Real payment gateway (PayMongo/Stripe), email receipts, product reviews, discount codes, image hosting (Cloudinary), pagination.

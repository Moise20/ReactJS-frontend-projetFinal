# E-Commerce Blog — Frontend React

Product catalog and e-commerce storefront built with **React 18** and **React Router v6**.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![React Router](https://img.shields.io/badge/React%20Router-v6-red?logo=reactrouter)
![Axios](https://img.shields.io/badge/Axios-1.x-purple)
![CI](https://github.com/Moise20/ReactJS-frontend-projetFinal/actions/workflows/ci.yml/badge.svg)

---

## About the project

A product catalog presented as a blog. Visitors can browse products, read details, and place orders after creating an account. The UI is connected to a NestJS REST API.

This is a personal portfolio project built to demonstrate full-stack skills with React and NestJS.

**Backend repository:** [NestJS-backEnd-projetReact](https://github.com/Moise20/NestJS-backEnd-projetReact)

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Routing | React Router v6 |
| HTTP client | Axios (with JWT interceptor) |
| State management | Context API (auth + cart) |
| Styling | CSS modules |
| Icons | react-icons |
| CI/CD | GitHub Actions + SonarCloud |
| Hosting | Netlify |

---

## Features

- **Authentication** — register, login, logout with JWT token management
- **Product listing** — browse the full catalog with tags, likes and comments
- **Product detail** — view full description, price, stock and add to cart
- **Cart** — add items, adjust quantities, see total
- **Checkout** — place an order from the cart
- **Account** — view order history with status tracking
- **Protected routes** — cart and account pages require authentication

---

## Getting started

### Prerequisites

- Node.js 18+
- The [backend API](https://github.com/Moise20/NestJS-backEnd-projetReact) running locally or deployed

### Installation

```bash
git clone https://github.com/Moise20/ReactJS-frontend-projetFinal.git
cd ReactJS-frontend-projetFinal
npm install --legacy-peer-deps
```

### Environment variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `REACT_APP_API_URL` | URL of the backend API (e.g. `http://localhost:3301`) |

### Run in development

```bash
npm start
```

The app will open at `http://localhost:3000`.

---

## Project structure

```
src/
├── api/
│   └── axios.js          # Axios instance with JWT interceptor
├── context/
│   ├── AuthContext.jsx   # Global authentication state
│   └── CartContext.jsx   # Global cart state
├── components/
│   ├── blog/             # Product card list
│   ├── category/         # Category carousel
│   ├── create/           # Create / Edit product forms
│   ├── header/           # Navigation bar with user menu
│   ├── footer/           # Footer
│   └── common/
│       └── ProtectedRoute.jsx
└── pages/
    ├── home/             # Home page (product listing)
    ├── login/            # Login and Register pages
    ├── details/          # Product detail page
    ├── cart/             # Cart page
    └── account/          # Account and order history
```

---

## React Router v6 — key changes from v5

| v5 | v6 |
|---|---|
| `<Switch>` | `<Routes>` |
| `<Route component={X}>` | `<Route element={<X />}>` |
| `useHistory()` | `useNavigate()` |
| `match.params.id` | `useParams()` |
| `exact` required | Exact matching by default |

---

## Deployment

This app is designed to be deployed on [Netlify](https://netlify.com).

Set the `REACT_APP_API_URL` environment variable in your Netlify site settings to point to your deployed backend URL.

---

## Screenshots

> Add screenshots here after deployment

---

*Portfolio project — Moïse PANA*

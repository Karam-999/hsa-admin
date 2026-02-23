# HSA — Admin Portal

Admin dashboard built with **Next.js 16**, **MUI v7**, **Zustand v5**, and **NextAuth.js v4**.  
Data source: [DummyJSON API](https://dummyjson.com/)

## Setup

```bash
git clone https://github.com/Karam-999/hsa-admin.git
cd hsa-assignment
npm install
```

Create `.env`:

```
NEXTAUTH_SECRET=generateSECRETusing: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
NEXTAUTH_URL=http://localhost:3000
```

```bash
npm run dev
```

Login: `emilys` / `emilyspass`

## Features

- **Auth** — NextAuth + Zustand with `persist` middleware (localStorage), protected routes
- **Users** — Paginated table, search by name, detail view with contact & company info
- **Products** — Paginated grid, search, category filter, detail view with image carousel
- **Caching** — Key-based in-memory cache with 5-min TTL in Zustand stores; revisited pages load instantly
- **Performance** — `React.memo` on all reusable components, `useCallback`/`useMemo`, debounced search (400ms), API-side pagination (`limit`/`skip`)

## Project Structure

```
src/
├── app/
│   ├── api/auth/[...nextauth]/route.js  # NextAuth credentials provider
│   ├── dashboard/page.js                # Stats overview
│   ├── login/page.js                    # Login form
│   ├── products/page.js & [id]/page.js  # Product list + detail
│   ├── users/page.js & [id]/page.js     # User list + detail
│   ├── Muisetup.js                      # ThemeProvider + SessionProvider
│   └── layout.js
├── components/                          # Navbar, ProductCard, UserTable, SearchBar, Loader, ProtectedRoute
├── store/                               # authStore, userStore, productStore (Zustand)
├── services/api.js                      # Shared fetch helpers
└── utils/constants.js                   # API URL, limits, cache TTL
```

## Why Zustand?

- Zero boilerplate — state + actions in a single `create()` call
- Async actions work natively with `async/await` (no thunk/saga)
- `persist` middleware syncs auth to localStorage automatically
- ~1 KB gzipped, no `<Provider>` wrapper needed

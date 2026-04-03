# Luminous Ledger — Finance Dashboard

A modern, fully responsive personal finance dashboard built with **React 19**, **TypeScript**, and **Tailwind CSS v4**. Track transactions, visualize spending, manage roles, toggle themes with a cinematic ripple effect, and export reports — all from a polished single-page application.

## Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Architecture & Approach](#-architecture--approach)
- [State Management](#-state-management)
- [Theming](#-theming)
- [Role-Based Access Control](#-role-based-access-control)
- [Animations](#-animations)
- [CSV Export](#-csv-export)
- [Responsive Design](#-responsive-design)

---

## Features

| Feature | Description |
| --- | --- |
| **Dashboard Overview** | Total balance, monthly income/expenses computed dynamically from transactions. Area chart for balance trend and pie chart for spending breakdown. |
| **Transactions (CRUD)** | Full create, read, update, and delete operations. Filterable by search, category, and type. Paginated table with animated row transitions. |
| **Financial Insights** | Primary allocation breakdown, monthly comparison bar chart, smart tips, stat cards, and usage limits with progress bars. |
| **Dark / Light Mode** | Theme toggle with a **circular ripple transition** powered by the View Transitions API and `clip-path` animation. Graceful fallback for unsupported browsers. |
| **Role-Based Access** | Admin / User toggle. Admin role enables edit and delete actions on transactions. Role badge in the navbar with animated swap. |
| **Collapsible Sidebar** | Smooth spring-animated sidebar on desktop. Slide-in overlay with backdrop on mobile. |
| **CSV Report Export** | Export financial summary and all transactions as a `.csv` file from both the Dashboard and Transactions pages. |
| **Redux Persistence** | Transactions are persisted to `localStorage` so data survives page refreshes. |
| **Framer Motion Animations** | Staggered page entrances, spring sidebar, animated table rows, layout-animated toggle knob, and role badge transitions. |
| **Fully Responsive** | Every page, card, chart, and table adapts to mobile, tablet, and desktop viewports. |

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | React 19 |
| **Language** | TypeScript 5.9 |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS v4 (via `@tailwindcss/vite` plugin) |
| **UI Components** | shadcn/ui (Radix UI primitives + Tailwind) |
| **Charts** | Recharts (via shadcn chart wrapper) |
| **Routing** | React Router DOM 7 |
| **State Management** | Redux Toolkit + React Redux |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Font** | Geist Variable (`@fontsource-variable/geist`) |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9 (or yarn / pnpm)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/FinanceDashboard.git
cd FinanceDashboard

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**.

### Other Scripts

```bash
npm run build      # Type-check and production build
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint
```

---

## Project Structure

```
src/
├── main.tsx                    # App entry point — mounts React, wraps with providers
├── App.tsx                     # Route definitions and top-level provider wiring
├── index.css                   # Global styles, Tailwind imports, View Transition CSS
├── App.css                     # App-specific global styles
│
├── layouts/
│   └── DashboardLayout.tsx     # Shell layout — sidebar + navbar + <Outlet />
│
├── pages/
│   ├── Dashboard.tsx           # Home page — balance overview, charts, stats
│   ├── Transactions.tsx        # Transactions page — CRUD table, filters, export
│   └── FinancialInsights.tsx   # Insights page — allocations, charts, tips
│
├── components/
│   ├── Navbar.tsx              # Top navigation bar — search, role badge, theme toggle
│   ├── Sidebar.tsx             # Side navigation — links, collapsible toggle knob
│   ├── mode-toggle.tsx         # Dark/light theme toggle with ripple effect
│   │
│   ├── ui/                     # shadcn/ui primitives (auto-generated)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── chart.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── pagination.tsx
│   │   ├── progress.tsx
│   │   ├── select.tsx
│   │   └── table.tsx
│   │
│   ├── dashboard/              # Dashboard page components
│   │   ├── BalanceOverview.tsx  # Hero card — balance, income, expenses, export button
│   │   ├── StatCard.tsx        # Reusable metric card with icon and change indicator
│   │   ├── BalanceTrendChart.tsx# Area chart showing balance over time
│   │   ├── SpendingPieChart.tsx # Donut chart for expense category breakdown
│   │   ├── AdminPanel.tsx      # Admin-only panel (visible when role = admin)
│   │   └── index.ts            # Barrel export
│   │
│   ├── transactions/           # Transactions page components
│   │   ├── TransactionTable.tsx # Animated table with edit/delete actions
│   │   ├── TransactionFilters.tsx # Search, category, and type filter controls
│   │   ├── TransactionPagination.tsx # Page navigation
│   │   ├── MonthlyOutflowCard.tsx   # Summary card showing monthly outflow
│   │   ├── AddTransactionDialog.tsx # Modal form to create a transaction
│   │   ├── EditTransactionDialog.tsx# Modal form to edit a transaction
│   │   ├── data.ts             # Seed/mock transaction data
│   │   ├── types.ts            # Transaction type definitions
│   │   └── index.ts            # Barrel export
│   │
│   └── insights/               # Financial Insights page components
│       ├── PrimaryAllocation.tsx    # Allocation breakdown card with watermark
│       ├── MonthlyComparisonChart.tsx # Responsive bar chart (income vs expenses)
│       ├── SmartTipCard.tsx         # Actionable financial tip card
│       ├── InsightStatCard.tsx      # Stat card with trend indicator
│       ├── UsageLimitCard.tsx       # Progress bar usage/limit card
│       └── index.ts                # Barrel export
│
├── context/
│   ├── theme-provider.tsx      # ThemeProvider — dark/light mode context + localStorage
│   └── role-context.tsx        # RoleProvider — admin/user role context
│
├── redux/
│   ├── store.ts                # Redux store configuration
│   ├── transactionsSlice.ts    # Transactions slice — async thunks + localStorage sync
│   └── hooks.ts                # Typed useAppDispatch & useAppSelector hooks
│
├── hooks/
│   └── useMobile.tsx           # useIsMobile() hook — true when viewport < 768px
│
├── lib/
│   ├── utils.ts                # cn() utility (clsx + tailwind-merge)
│   └── exportReport.ts         # CSV export utility function
│
├── types/
│   └── view-transitions.d.ts   # TypeScript declarations for View Transitions API
│
└── assets/
    ├── hero.png
    ├── react.svg
    └── vite.svg
```

### Why this structure?

| Directory | Purpose | Rationale |
| --- | --- | --- |
| **`pages/`** | Route-level page components | Each file maps 1:1 to a route. Pages orchestrate data fetching, state, and compose feature components. Keeps routing concerns separate from UI. |
| **`layouts/`** | Shared page shells | `DashboardLayout` wraps all pages with the sidebar, navbar, and main content area via React Router's `<Outlet />`. Adding a new layout (e.g. auth pages) requires just one file. |
| **`components/ui/`** | Primitive UI building blocks | Auto-generated by shadcn. These are generic, unstyled-by-default primitives (Button, Card, Dialog, etc.) that never contain business logic. Kept separate so they can be upgraded independently. |
| **`components/dashboard/`** | Dashboard-specific components | Grouped by the page they serve. Each component is self-contained (own styles, own props). This colocation makes it easy to find, modify, or delete features without hunting across folders. |
| **`components/transactions/`** | Transactions-specific components | Same colocation principle. Also contains `types.ts` and `data.ts` because they're only used by transaction components — no need to hoist them to a global folder. |
| **`components/insights/`** | Insights-specific components | Same pattern — feature-scoped grouping. |
| **`context/`** | React Context providers | Theme and Role are global concerns that need to be accessible anywhere in the tree. Context is the right tool here — lightweight, no external dependency, and both values change infrequently. |
| **`redux/`** | Redux Toolkit state | Transactions are the only entity with complex CRUD + persistence needs. Redux provides a structured, predictable way to manage this with async thunks and middleware. Simpler states (theme, role, sidebar) stay in Context/local state. |
| **`hooks/`** | Custom React hooks | Reusable hooks like `useIsMobile` that are shared across multiple components. |
| **`lib/`** | Pure utility functions | Non-React helpers — `cn()` for class merging, `exportReportCSV()` for file generation. No JSX, no hooks, easily testable. |
| **`types/`** | TypeScript declarations | Houses `.d.ts` files for APIs not covered by existing type packages (e.g. View Transitions API). |

---

## Architecture & Approach

### Component Design

The app follows a **page → feature component → primitive** hierarchy:

```
Page (Transactions.tsx)
  └── Feature Component (TransactionTable.tsx)
        └── UI Primitive (Table from shadcn)
```

- **Pages** handle routing, data fetching (Redux dispatch), and state orchestration.
- **Feature components** are self-contained units with their own props interface. They receive data and callbacks — they don't fetch or dispatch directly (with the exception of components that read from Redux for computed values).
- **UI primitives** (shadcn) are stateless, unstyled building blocks.

### Barrel Exports

Each feature folder has an `index.ts` that re-exports all components:

```ts
// components/transactions/index.ts
export { default as TransactionTable } from './TransactionTable'
export { default as TransactionFilters } from './TransactionFilters'
// ...
```

This enables clean imports in pages:

```ts
import { TransactionTable, TransactionFilters } from '@/components/transactions'
```

### Lazy Loading

The Transactions and Financial Insights pages are **lazily loaded** with `React.lazy()` to reduce the initial bundle size. Only the Dashboard is eagerly loaded as the landing page.

### Path Aliases

The `@` alias maps to `src/`, configured in both `tsconfig.json` and `vite.config.ts`:

```ts
import { Button } from '@/components/ui/button'  // instead of '../../../components/ui/button'
```

---

## State Management

The app uses a **hybrid approach** — Redux for complex entity state, React Context for lightweight global state, and local `useState` for UI-only state:

| State | Tool | Why |
| --- | --- | --- |
| Transactions (CRUD) | **Redux Toolkit** | Complex async operations, multiple consumers, localStorage persistence. Async thunks handle the read/write cycle. |
| Theme (dark/light) | **React Context** | Simple boolean toggle, infrequent updates, only consumed by the toggle and the `<html>` class. |
| Role (admin/user) | **React Context** | Simple toggle, consumed by Navbar (badge) and TransactionTable (action buttons). |
| Sidebar open/close | **Local state** | UI-only, scoped to `DashboardLayout`. No other component needs to know. |
| Filters, pagination | **Local state** | Scoped to the Transactions page. Resetting on navigation is the desired behavior. |

### localStorage Persistence

The `transactionsSlice` syncs with `localStorage` under the key `luminous-ledger-transactions`. On first load, if no data exists, it seeds from the mock data in `data.ts`. Every add, update, or delete writes back to storage.

---

## Theming

### Dark / Light Mode

Managed by `ThemeProvider` in `src/context/theme-provider.tsx`. The theme class (`dark` or `light`) is applied to the `<html>` element and persisted in `localStorage` under `vite-ui-theme`.

### Ripple Transition Effect

The theme toggle in `mode-toggle.tsx` uses the **View Transitions API** to create a circular ripple:

1. On click, the `(x, y)` coordinates are captured.
2. CSS custom properties `--ripple-x`, `--ripple-y`, and `--ripple-radius` are set on `:root`.
3. `document.startViewTransition()` swaps the theme.
4. A CSS `clip-path: circle()` animation expands from the click point to fill the screen.
5. Light-to-dark expands outward; dark-to-light plays in reverse.
6. Browsers without View Transitions API fall back to an instant swap.

---

## Role-Based Access Control

The `RoleProvider` in `src/context/role-context.tsx` exposes `isAdmin` and `toggleRole()`. The role badge in the Navbar allows toggling between **Admin** and **User**.

| Feature | Admin | User |
| --- | --- | --- |
| View transactions | ✅ | ✅ |
| Search / filter transactions | ✅ | ✅ |
| Export CSV report | ✅ | ✅ |
| Add transactions | ✅ | ❌ |
| Edit transactions | ✅ | ❌ |
| Delete transactions | ✅ | ❌ |

---

## Animations

Powered by **Framer Motion**:

| Element | Animation |
| --- | --- |
| Desktop sidebar | Spring-based width collapse/expand |
| Mobile sidebar | Slide-in from left (`x: -288 → 0`) with backdrop fade |
| Sidebar toggle knob | `layout` animation for smooth sliding |
| Page content | Staggered fade-up entrance (`opacity: 0, y: 20 → 1, 0`) |
| Transaction rows | Sequenced fade-in on mount, slide-left on delete |
| Admin action buttons | Spring scale-in with `AnimatePresence` |
| Role badge text | `AnimatePresence mode="wait"` swap animation |
| Theme toggle icon | Spin + scale swap between sun and moon |

---

## CSV Export

Available from both the **Dashboard** (BalanceOverview card) and the **Transactions** page (Export button).

The exported `.csv` includes:

1. **Summary section** — Total Balance, Monthly Income, Monthly Expenses
2. **Transactions section** — Date (DD/MM/YYYY), Description, Merchant, Category, Type, Amount

All values containing commas are properly quoted to prevent CSV column bleeding.

File naming: `luminous-ledger-report-YYYY-MM-DD.csv`

---

## Responsive Design

Every component is designed mobile-first with Tailwind responsive breakpoints:

- **Sidebar**: Collapsible overlay on mobile, persistent panel on desktop (`lg` breakpoint).
- **Dashboard grid**: Single column on mobile, multi-column on `md` / `xl`.
- **Transaction table**: Horizontally scrollable with `overflow-x-auto` and `min-w-150` to show all columns.
- **Charts**: Responsive heights (`h-52 sm:h-64 md:h-84`), dynamic Recharts props based on `useIsMobile()`.
- **Typography**: Scaled sizes (`text-2xl sm:text-4xl`) for headings across all pages.
- **Buttons & padding**: Compact on mobile, spacious on desktop (`px-4 py-2.5 sm:px-6 sm:py-3`).
- **Navbar**: Search and help icons hidden on mobile (`hidden sm:flex`).

---

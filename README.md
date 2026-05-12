# Room Booking Management System

A mini booking management system for a co-working space. Users can view available time slots for rooms. Admins can create and delete bookings.

**Live demo:** https://room-booking-beta.vercel.app/

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 13, PHP 8.3 |
| Database | PostgreSQL 16 (Docker) |
| Auth | Laravel Sanctum (Bearer token) |
| Architecture | Controller → Service → Repository |
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS v3 + styled-components |
| Icons | lucide-react |
| Fonts | @fontsource/inter (self-hosted) |
| i18n | react-i18next (English + Vietnamese) |
| State | React Context + useReducer |
| Forms | React Hook Form |
| Lists | react-virtuoso (virtualized room list) |
| Date picker | react-day-picker |
| Data fetching | ahooks `useInfiniteScroll` |
| HTTP | Fetch API (custom wrapper) |
| Infra | Docker Compose (DB only) |

## Prerequisites

- PHP 8.3+, Composer
- Docker + Docker Compose
- Node 22+, pnpm

## Running the Project

### 1. Start the database

```bash
cd backend
docker compose up -d
# PostgreSQL available at localhost:5433
```

### 2. Start the backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
# Seeder prints an admin Sanctum token — copy it
php artisan serve
# Running at http://localhost:8000
```

### 3. Start the frontend

```bash
cd frontend
pnpm install
cp .env.example .env
```

`.env.example` ships with a pre-seeded admin token that matches the database seeder. If you re-ran the seeder (which generates a new token), update `VITE_API_TOKEN` with the token printed to the console.

```
VITE_API_URL=http://localhost:8000/api
VITE_API_TOKEN=<token from seeder output>
```

```bash
pnpm dev
# Running at http://localhost:5173
```

### Useful Docker commands

```bash
# Run from backend/
docker compose down        # stop (data persists)
docker compose down -v     # stop and wipe the database volume
```

## API Endpoints

| Method | URL | Auth | Description |
|---|---|---|---|
| GET | `/api/rooms` | Public | List all rooms |
| GET | `/api/rooms/{id}/bookings` | Public | List bookings for a room |
| POST | `/api/bookings` | Bearer token | Create a booking |
| DELETE | `/api/bookings/{id}` | Bearer token | Delete a booking |

## Design Decisions

### Backend

**Service + Repository pattern** — Controllers handle HTTP only. Services own business logic (overlap validation, 409 responses). Repositories own Eloquent queries. Each layer is independently testable and swappable.

**Overlap detection** — `BookingService` uses a half-open interval query: a conflict exists when `existing.start_time < new.end_time AND existing.end_time > new.start_time`. Returns HTTP 409 on conflict with a human-readable message surfaced in the form.

**Sanctum personal access tokens over JWT** — Tokens are DB-backed and trivially revocable. Simpler to set up for a mini project with no login UI — a single admin token is seeded and copied into the frontend `.env`.

**PostgreSQL over MySQL** — Switched in session 2 for stronger standards compliance and to align with the project's production environment preference.

**DB-only Docker Compose** — Only the `db` service runs in Docker; Laravel runs locally with `php artisan serve`. Simpler DX than a full app container — no image rebuild on code changes.

**PostgreSQL port mapped to 5433** — Avoids collision with any local PostgreSQL instance on the default port 5432. Port is defined once in `.env` (`DB_PORT`) and referenced in `docker-compose.yml` via `${DB_PORT}`.

**Migration timestamp fix** — Both `create_rooms_table` and `create_bookings_table` originally had identical timestamps. Laravel fell back to alphabetical order, running bookings before rooms and failing the foreign key. Renamed rooms to `034010` and bookings to `034011` to enforce correct order.

### Frontend

**Tailwind CSS + styled-components** — Tailwind for layout, spacing, and utility classes. styled-components for component-specific styles with dynamic props (e.g. avatar color hash from name). Both live side-by-side; no conflict.

**Self-hosted Inter font via @fontsource/inter** — Eliminates the Google Fonts DNS/TLS round trip. Vite fingerprints the asset, so the browser caches it with `immutable` headers. No `<link>` tag in `index.html`.

**lucide-react over Material Symbols** — Material Symbols requires a Google Fonts request. lucide-react is a local dependency that tree-shakes per icon.

**react-i18next with English + Vietnamese dictionaries** — All user-visible strings live in `i18n/en.json` and `i18n/vi.json`. No hardcoded labels in components.

**Avatar initials with deterministic color hash** — No image URLs needed. The avatar background color is derived from a hash of the user's name, so the same name always gets the same color across renders.

**React Context + useReducer over Zustand** — State shape is flat and bounded to a single page. No need for an external store.

**Custom Fetch wrapper over Axios** — Handles auth headers, error parsing, and 204 responses. Zero extra dependency.

**react-virtuoso for the room list** — Only visible items are mounted in the DOM. Handles variable-height rows automatically without pre-measuring.

**ahooks `useInfiniteScroll` for room pagination** — Manages cursor state, loading flags, and `endReached` scroll detection in a single hook.

**react-day-picker for date range selection** — Lightweight, accessible, and ships its own CSS without pulling in a full component library.

**Notes field UI-only** — The booking form has a Notes field as per the design mockup. The backend does not yet have a `notes` column; the field is captured in the form but not sent to the API until the column is added.

# Favorite Movies & TV Shows

## Tech stack
- Frontend: React + Vite + TypeScript + TailwindCSS + Material UI + react-query + react-hook-form
- Backend: Node.js + Express + TypeScript + Prisma + MySQL
- Validation: Zod
- Database - MySQL  (Deployed on Railway)

## Setup (Backend)
1. cd server
2. npm install
3. Create `.env` with DATABASE_URL and PORT.
4. npx prisma generate
5. npx prisma migrate dev --name init
6. npm run seed    # optional sample data
7. npm run dev

## Setup (Frontend)
1. cd client
2. npm install
3. Create `.env` with `VITE_API_URL=http://localhost:8081/api`
4. npm run dev

Open `http://localhost:5173` (or the port Vite reports).

## Endpoints
- `GET /api/media/getMedia?page=1&limit=20` — paginated list
- `POST /api/media/newMedia` — create
- `PUT /api/media/update/:id` — update
- `DELETE /api/media/delete/:id` — delete


## Features
- Add new movie or tv show
- Edit existing movie or tv show
- Delete existing movie or tv show
- Search based on title, location and director
- Filter only movies , tv show or all
- Infinite scrolling loads new entries when scrolled to the end

## Notes
- Use `prisma studio` to inspect DB: `npx prisma studio`

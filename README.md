# Learn Lingo 🚀

**A concise language-learning frontend for discovering tutors and booking lessons.**

> Web application built with Vite + React + TypeScript using Firebase (Auth + Realtime Database).

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Recommended Improvements](#recommended-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About

Learn Lingo is a frontend app for finding tutors, viewing profiles, saving favorites, and booking a trial lesson. The project emphasizes a clean UI, performance, and maintainable TypeScript code.

---

## Features

- Browse and filter tutors
- Add tutors to favorites
- Sign up / Log in with Firebase Auth
- Book a trial lesson
- Pages: Home, Teachers, Favorites, NotFound

---

## Tech Stack

- Vite + React (SWC) + TypeScript
- Firebase (Auth, Realtime Database)
- Zustand for state management
- React Hook Form + Yup for forms and validation
- ESLint for code quality

---

## Quick Start

Requirements: Node.js (recommended >= 18) and npm or yarn.

1. Clone the repo

```bash
git clone <repo-url>
cd learn-lingo
```

2. Install dependencies

```bash
npm install
# or
# yarn
```

3. Create a `.env` file from the example and fill in Firebase credentials

```bash
cp .env.example .env
# edit .env and add your Firebase keys
```

4. Start the dev server

```bash
npm run dev
```

Open http://localhost:5173 (or the port shown by Vite)

---

## Environment Variables

The project uses Vite variables prefixed with `VITE_`:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_DATABASE_URL`

> ⚠️ Do not commit secret keys to the repository. `.env` is included in `.gitignore`.

---

## Scripts

- `npm run dev` — start development server (Vite)
- `npm run build` — build (TypeScript project build + Vite build)
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint

---

## Project Structure (high level)

- `src/` — main source code
  - `components/` — React components
  - `firebase/` — Firebase config and DB utilities
  - `store/` — Zustand stores

---

## Recommended Improvements

- Add test suite (Vitest / React Testing Library)
- Add CI (GitHub Actions) for lint/build/tests
- Add deployment configuration (Vercel / Netlify)

---

## Contributing

1. Create a feature branch: `git checkout -b feat/short-description`
2. Open a pull request with a description and testing steps
3. Ensure lint and TypeScript checks pass

---

## License

MIT — modify as needed.

---

## Contact

If you need help or want to suggest features — open an issue or create a PR.

---

<div align="center">Made with ❤️ & TypeScript</div>

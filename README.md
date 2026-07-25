# 🎬 NetFlixGPT

A Netflix-inspired movie browsing app with GPT-powered search — describe what you want to watch and get AI-curated suggestions.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.x-764ABC?logo=redux&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwindcss&logoColor=white)
![OpenRouter](https://img.shields.io/badge/OpenRouter-GPT-412991?logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?logo=vercel&logoColor=white)

---

## 📸 Screenshots

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/e8f47bc5-cb4a-4823-9bf8-2428cd783c6a" width="400" alt="Sign Up"/><br/><sub>Sign Up</sub></td>
    <td><img src="https://github.com/user-attachments/assets/fd7769ab-afba-497c-a854-bcd5c0b4cdd4" width="400" alt="Sign In"/><br/><sub>Sign In</sub></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/689ff752-e2d8-4a10-9539-32cd3efd3fd6" width="400" alt="Form Validation"/><br/><sub>Form Validation</sub></td>
    <td><img src="https://github.com/user-attachments/assets/6919110a-cc8b-47f4-9748-78997e0c2b7e" width="400" alt="Home Hero"/><br/><sub>Home — Hero with Trailer</sub></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/754d10d4-8081-4eb4-9b42-7e6362e491dc" width="400" alt="Movie Lists"/><br/><sub>Popular, Upcoming & Top Rated</sub></td>
    <td><img src="https://github.com/user-attachments/assets/e0cc047c-881b-496d-a4d8-3df2fcc1e790" width="400" alt="Movie Card"/><br/><sub>Movie Description Card</sub></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/52719b87-6d0f-455a-ae50-c965f117e000" width="400" alt="GPT Search"/><br/><sub>GPT Search Page</sub></td>
    <td><img src="https://github.com/user-attachments/assets/f5fec2a4-a990-4f0f-8801-8498cbf62332" width="400" alt="GPT Results"/><br/><sub>GPT Results</sub></td>
  </tr>
</table>

---

## What it does

**Browse page** — after login you get a hero section with an auto-playing trailer (muted), overlaid with the movie title and description, plus horizontally scrollable lists: Now Playing, Popular, Trending, Upcoming.

**GPT Search** — type something like *"a mind-bending sci-fi from the 2000s"* and GPT (via OpenRouter) picks movie names, then TMDB fetches the full details.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Tailwind CSS |
| State Management | Redux Toolkit |
| Auth | Firebase Authentication |
| Routing | React Router DOM v7 |
| Movie Data | TMDB API (via Vercel proxy) |
| AI Search | OpenRouter API (GPT) |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js v18+
- A [TMDB API](https://www.themoviedb.org/settings/api) access token
- An [OpenRouter API](https://openrouter.ai/keys) key
- A [Firebase](https://console.firebase.google.com/) project with Authentication enabled

### 1. Clone the repo

```bash
git clone https://github.com/Darshankumarjain/NetFlixGPT.git
cd NetFlixGPT
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root:

```env
REACT_APP_TMDB_KEY=your_tmdb_access_token
REACT_APP_OPENAI_KEY=your_openrouter_api_key
```

> ⚠️ Never commit `.env`. It's already in `.gitignore`.

### 4. Run locally

```bash
npm start
```

App runs at `http://localhost:3000`.

---

## TMDB Proxy

TMDB blocks direct browser requests in some regions, so all TMDB calls go through a Vercel serverless proxy at `api/tmdb.js`:

```js
// api/tmdb.js
export default async function handler(req, res) {
  const { endpoint } = req.query;

  const response = await fetch(`https://api.themoviedb.org/3/${endpoint}`, {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.REACT_APP_TMDB_KEY,
    },
  });

  const data = await response.json();
  res.json(data);
}
```

This runs server-side on Vercel, so the TMDB token never hits the browser.

---

## Project Structure

```
src/
├── components/
│   ├── Login.js                   # Sign in / Sign up
│   ├── Browse.js                  # Main browse page
│   ├── Header.js                  # Nav bar
│   ├── MainContainer.js           # Hero + trailer
│   ├── SecondaryContainer.js      # Movie list rows
│   ├── MovieList.js               # Scrollable row
│   ├── MovieCard.js               # Poster card
│   ├── GPTSearch.js               # GPT search page
│   └── GPTMovieSuggestions.js
├── hooks/
│   ├── useNowPlayingMovies.js
│   ├── usePopularMovies.js
│   ├── useTrendingMovies.js
│   ├── useUpcomingMovies.js
│   └── useMovieTrailer.js
├── redux/
│   ├── store.js
│   ├── userSlice.js
│   ├── movieSlice.js
│   └── gptSlice.js
├── utils/
│   ├── firebase.js
│   ├── constants.js
│   └── validate.js
└── api/
    └── tmdb.js                    # Vercel serverless proxy
```

---

## Key Features

- **Firebase Auth** — Email/password sign up and sign in. Protected routes redirect unauthenticated users to login.
- **Trailer Background** — Auto-plays the official YouTube trailer (muted) as a full-screen background on the browse page.
- **Movie Categories** — Now Playing, Popular, Trending, and Upcoming — each fetched via a custom hook.
- **GPT Search** — Plain English search powered by OpenRouter. GPT returns movie names, TMDB handles the details.
- **TMDB Proxy** — Serverless function on Vercel routes TMDB requests server-side to bypass regional blocks.
- **Memoization** — Redux caches API responses to avoid redundant calls.
- **Responsive** — Works on mobile and desktop.

---

## Deployment (Vercel)

```bash
npm run build
```

Then push to GitHub and import the repo on [vercel.com](https://vercel.com). Add your env variables in the Vercel dashboard under **Settings → Environment Variables**.

> The `api/tmdb.js` file is auto-detected by Vercel as a serverless function — no extra config needed.

---

## Environment Variables Reference

| Variable | Where to get it |
|---|---|
| `REACT_APP_TMDB_KEY` | [TMDB API Settings](https://www.themoviedb.org/settings/api) |
| `REACT_APP_OPENAI_KEY` | [OpenRouter Keys](https://openrouter.ai/keys) |
| Firebase config | Firebase Console → Project Settings |

---

## Author

**Darshan Kumar Jain** · [GitHub](https://github.com/Darshankumarjain)

---

*Built with React, Redux, Firebase, Tailwind CSS, TMDB API, OpenRouter, and Vercel.*

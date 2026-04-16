# Programming Club Website Architecture

## System Architecture

```mermaid
graph TD
    User[User / Student] -->|HTTPS| Frontend[React Frontend (Vite)]
    Frontend -->|REST API / WebSocket| Backend[Express Backend]
    Backend -->|Auth| MongoDB[(MongoDB Database)]
    Backend -->|AI Queries| AI[AI Assistant Service]
    Admin[Admin] -->|Secure Login| Frontend
```

## Folder Structure

```
/
├── client/                 # Frontend (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/        # Images, fonts, icons
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page views (Home, Events, etc.)
│   │   ├── contexts/      # React Contexts (Auth, Theme)
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # API services
│   │   ├── styles/        # Global CSS & Variables
│   │   ├── utils/         # Helper functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
├── server/                 # Backend (Node + Express)
│   ├── config/            # DB Config, Env variables
│   ├── controllers/       # Route logic
│   ├── models/            # Mongoose Models
│   ├── routes/            # API Routes
│   ├── middleware/        # Auth, Error handling
│   ├── utils/             # Helper functions
│   ├── index.js           # Entry point
│   └── package.json
│
└── README.md
```

## Tech Stack Decisions

- **Frontend**: React with Vite for fast HMR. Vanilla CSS with CSS Variables for theming (Dark/Light mode). GSAP for high-performance animations.
- **Backend**: Node/Express for scalable API.
- **Database**: MongoDB for flexible schema (Events, Users).
- **AI**: Integrated via backend proxy to manage keys securely.

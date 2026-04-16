# 🚀 Programming Club Website

A production-grade, highly optimized, and modern website for the Programming Club. Built with the MERN stack (MongoDB, Express, React, Node.js) and enhanced with GSAP/Framer Motion animations.

## ✨ Features

- **Modern UI/UX**: Glassmorphism design, smooth 60FPS animations, and responsive layout.
- **Event Management**: Browse upcoming and past events with advanced filtering.
- **Secure Registration**: Full user registration system with JWT authentication (ready).
- **AI Assistant**: Interactive floating chat assistant to answer club-related queries.
- **Performance**: Optimized with Vite, Code Splitting, and Lazy Loading.

## 🛠 Tech Stack

- **Frontend**: React.js, Vite, Framer Motion, Vanilla CSS (Variables + Glassmorphism).
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **Auth**: JWT, bcryptjs.
- **Tools**: Axios, React Router v6, React Icons.

## 📂 Project Structure

```
/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable UI (Navbar, FloatingAI)
│   │   ├── pages/         # Views (Home, Events, Register)
│   │   └── styles/        # Global CSS
│   └── vite.config.js     # Proxy config
│
└── server/                 # Express Backend
    ├── config/            # DB Connection
    ├── models/            # Mongoose Models
    ├── routes/            # API Routes
    └── index.js           # Server Entry
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local or Atlas URI)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd Programmers\ club\ website
    ```

2.  **Install Dependencies:**

    ```bash
    # Backend
    cd server
    npm install

    # Frontend
    cd ../client
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the `server` directory:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/progclub
    JWT_SECRET=your_jwt_secret
    ```

### Running the App (Simplified)

1.  **Install All Dependencies:**
    From the root directory, run:
    ```bash
    npm run install-all
    ```

2.  **Start Both Frontend & Backend:**
    From the root directory, run:
    ```bash
    npm run dev
    ```

3.  **Access the Website:**
    - Frontend: `http://localhost:5173`
    - Backend API: `http://localhost:5000`

## 🤖 AI Assistant

The AI Assistant is located in the bottom right corner. Currently running in **Mock Mode**, it can answer questions about:

- Events ("When is the next hackathon?")
- Registration ("How do I join?")
- Contact ("How can I contact us?")

## 🔮 Future Roadmap

- [ ] Connect Real OpenAI API key in Backend.
- [ ] Admin Dashboard for Event Creation.
- [ ] Email Notification Service (Nodemailer).
- [ ] Payment Gateway for Paid Workshops.

---

Built with ❤️ for the Programming Club.

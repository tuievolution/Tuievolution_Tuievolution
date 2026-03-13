# TuiEvolution

TuiEvolution is a modern, full-stack web application built to showcase innovative projects, team portfolios, and interactive user experiences. It serves as both a collaborative development environment and a portfolio piece for two software engineers pushing the boundaries of web technologies and Artificial Intelligence.

## 🚀 Tech Stack
* **Frontend:** React (Vite), Tailwind CSS, Framer Motion, Lucide React
* **Backend:** Java Spring Boot, Hibernate / JPA
* **Database:** PostgreSQL (hosted on Neon)
* **Deployment:** Vercel (Frontend), Render (Backend)

## ✨ Key Features & Development Highlights

### 1. Robust Backend & Database Architecture
* **Cloud Database Integration:** Migrated from an in-memory H2 database to a production-ready PostgreSQL cloud database using Neon.
* **Stable Deployment:** Configured environment variables and connection pooling (HikariCP) for seamless, crash-free deployment on Render.
* **Relational Data Modeling:** Designed robust entity mappings (e.g., `Users`, `TeamMembers`) using JPA/Hibernate to handle complex data structures like skill lists and user profiles.

### 2. Secure Authentication System
* **Full-Stack Auth Flow:** Implemented a complete registration (`/signup`) and login (`/login`) pipeline connecting the React frontend to the Spring Boot REST API.
* **Persistent Sessions:** Utilized React Context (`AuthContext`) and `localStorage` to create persistent user sessions, allowing users to remain logged in across page reloads.
* **Protected Routes:** Engineered a secure routing system in `react-router-dom` that guards sensitive pages (like the User Profile) and gracefully redirects unauthorized users.

### 3. Dynamic & Responsive UI/UX
* **Mobile-First Navigation:** Built a responsive, glassmorphic Navbar featuring a sliding mobile drawer and an integrated user profile dropdown.
* **Interactive Components:** Designed visually striking elements, including glowing project cards with synchronized `setTimeout` light effects and a scrolling marquee for project highlights.
* **Theme Management:** Fully integrated Light/Dark mode toggling using Tailwind CSS and CSS variables for a customized viewing experience.

### 4. AuraTech AI Assistant
* **Interactive Chatbot:** Developed a custom, animated floating chatbot (AuraTech) using `framer-motion` to guide visitors through the site.
* **Contextual Routing:** Programmed the bot to provide intelligent, clickable options that smoothly navigate users to specific project details or team member portfolios.

## 👥 The Team
TuiEvolution is developed by a two-person team combining diverse technical expertise:
* **Evrim Aluç:** Software Engineer focusing on Frontend Design.
* **Tuana Akyıldız:** Fullstack Software Engineer worked in Java-based Backend systems and modern Frontend interfaces.

## 🛠️ How to Run Locally

### Backend
1. Navigate to the `backend` directory.
2. Ensure `application.properties` is configured with the correct PostgreSQL database URI.
3. Run `mvn spring-boot:run`. The server will start on `http://localhost:10000`.

### Frontend
1. Navigate to the `frontend` directory.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the Vite development server.
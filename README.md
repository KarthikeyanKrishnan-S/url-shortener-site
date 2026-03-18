# Easy URL Shortener

A lightweight, minimal URL shortener built as a full-stack student project using Spring Boot (Java) and React (TypeScript).

## Project Overview
This project takes a long URL and generates a compact 6-character short code. When users visit the short link, they are automatically redirected to the original destination. The application also tracks click counts and displays basic analytics in a simple chart.

### Tech Stack
- **Backend:** Java 17, Spring Boot 3.2, Spring Data JPA, H2 In-Memory Database
- **Frontend:** React 18, TypeScript, Vite, Vanilla CSS (Flexbox), Chart.js
- **Architecture:** Basic Controller -> Service -> Repository (No DTOs, No complex design patterns)

### Features
- 🔗 Enter long URLs to generate compact short codes.
- 📊 Dashboard with recent URLs and their metrics (Created Date, Click count).
- 📈 Analytics chart tracking URL creations and click patterns over time.
- 📱 Fully responsive design using standard CSS media queries.
- 🌱 Includes preloaded seed data for easy testing.

## Screenshots
*(Add screenshots inside the `screenshots/` folder and link them here)*
- Main UI (`screenshots/main-ui.png`)
- Table with Data (`screenshots/table-data.png`)
- Chart Section (`screenshots/chart-section.png`)
- Redirect Working (`screenshots/redirect.png`)

## Setup Instructions

### 1. Run the Backend (Spring Boot)
Open your terminal and navigate to the `backend` folder:
```bash
cd backend
./mvnw spring-boot:run
```
*(Note on Windows you may need to run `.\mvnw spring-boot:run` or just run it via your IDE like Eclipse/IntelliJ)*

The backend will start on `http://localhost:8080`.
*(The H2 database console is enabled at `http://localhost:8080/h2-console` with JDBC URL: `jdbc:h2:mem:urldb`)*

### 2. Run the Frontend (React + Vite)
Open a second terminal and navigate to the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```

Visit the app in your browser at `http://localhost:5173`.

## How to Test
1. Enter a valid URL (e.g., `https://example.com`) in the input box and click "Shorten".
2. The table will update with the newly generated Short URL.
3. Click "Copy" or "Open" on the Short URL (`http://localhost:8080/shortCode`).
4. You will be redirected! Check back on the React UI to see the Click count incremented.
5. Click "View Analytics" to see the clicks mapped on a line chart over time.

## Assumptions
- H2 Database is sufficient (data resets when the server stops, allowing for rapid testing).
- Security, JWT, and authentication are not required for this baseline project.
- Seed data runs on startup automatically to populate the table for grading.

## Time Taken
Approximately 15-20 hours to plan, setup, build, and style.

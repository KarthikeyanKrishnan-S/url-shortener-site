# url-shortener-site
This is a simple full-stack URL Shortener application built using React and Spring Boot. Users can shorten URLs, view recent URLs, track clicks, and view basic analytics.

## Features
- Enter long URLs to generate compact short codes.
- Dashboard with recent URLs and their metrics (Created Date, Click count).
- Comprehensive analytics chart (using Chart.js) tracking URL accesses.
- Fully responsive design mimicking modern dashboards using Bootstrap.
- Includes preloaded seed data.

## Project Structure
- **/backend**: Java 17, Spring Boot 3.2, Spring Data JPA, H2 Database.
- **/frontend**: React 18, TypeScript, Vite, Bootstrap, Chart.js.

## Getting Started

### 1. Run the Backend (Spring Boot)
Option A (Maven Wrapper):
Navigate to the `backend` folder and run:
`./mvnw spring-boot:run`

Option B (IDE):
Open `backend` in IntelliJ or VSCode as a Java project and run `UrlShortenerApplication`.

### 2. Run the Frontend (React Vite)
Navigate to the `frontend` folder and run:
```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Visit the app in your browser at `http://localhost:5173`.
To see redirects working, click "Open" on any generated link, which will hit `http://localhost:8080/{shortCode}`.

The H2 database console is enabled at `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:urldb`).

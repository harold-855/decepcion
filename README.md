# Workspace Reservation System SPA


# Project Canvas


## Descripción general
This project involves developing a single-page application (SPA) using JavaScript, Vite, Tailwind CSS, and a JSON server.



The main objective is to assess knowledge related to:

- SPA architecture
- Authentication
- Role management
- Route protection
- Session persistence
- API consumption
- DOM manipulation
- Code modularization
- Development best practices



---

## Context of the problem

A cinema chain wants to modernize its system for managing showtimes and ticket reservations.
Currently, showtime management is done manually, which has caused problems.



### Administrator (admin)

You can:

View all bookings.

• Create movie screenings.

• Edit screenings.

• Delete screenings.

• Approve or cancel bookings.

### User

Can:

 Check the available showtimes.

• Book tickets for a performance.

• View only your reservations.

• Cancel your reservations.

• Modify reservations as long as the performance has not yet started.

---

## Tecnologías utilizadas

- JavaScript ES6+
- Vite
- TailwindCSS
- JSON Server
- Concurrently
- HTML5
- CSS3

---

## Delivered base structure

```txt
src
├── assets
├── components
│   └── Sidebar.js
├── controllers
│   └── login.controller.js
├── router
│   └── router.js
├── views
│   ├── loginView.js
│   ├── homeView.js
│   └── notFound.js
├── utils.js
├── main.js
└── style.css
```

---

## Architecture Explanation

### Components

Contains reusable interface components.

Example:

```txt
components/
└── Sidebar.js
```

The Sidebar can be reused in different views and centralizes the main system navigation.

### Controllers

Contain the application's business logic and events.

Example:

```txt
controllers/
└── login.controller.js
```

Responsibilities:

- Capture form events
- Validate credentials
- Consume the API
- Manage login
- Redirect users

### Views

These represent the application's screens.

Currently:

- Login
- Home
- Not Found (404)

Each view returns an HTML template that is dynamically rendered within the main container.

### Router

Manage the internal navigation of the SPA.

Responsibilities:

- Render views
- Manage routes
- Protect private views
- Redirect users
- Show 404 pages

### Utils

It contains reusable auxiliary functions.

Currently:

- Save session
- Get session
- Delete session
- Validate authentication

---

## Mock API
The application uses JSON Server to simulate a REST API.

Example administrator user:

```json
{
  "id": 1,
  "email": "admin@test.com",
  "password": "123456",
  "role": "admin"
}
```

Example of a standard user:

```json
{
  "id": 2,
  "email": "user@test.com",
  "password": "123456",
  "role": "user"
}
```

---

## Environment Setup

Install dependencies:

```bash
npm install
```

Run project:

```bash
npm run dev
```

This command simultaneously launches:

- Vite
- JSON Server

thanks to the use of Concurrently.
---

## Suggested scripts

```json
{
  "scripts": {
    "client": "vite",
    "server": "json-server --watch db.json --port 3000",
    "dev": "concurrently \"npm run client\" \"npm run server\""
  }
}
```

---

## Proof credentials

Administrator:

```txt
admin@test.com
123456
```

User:

```txt
user@test.com
123456
```

---

## Included Basic Features

- Functional Login
- API Consumption via JSON Server
- Session Persistence with LocalStorage
- Logout
- SPA Router
- Basic Route Protection
- Reusable Sidebar
- Custom 404 Page
- TailwindCSS Configuration
- Vite Configuration

---






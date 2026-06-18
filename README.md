# Tidal Tech

A full-stack web application for Tidal Tech, a technology support and consulting service serving Malibu, CA. Built entirely from scratch while founding and operating the business as a Computer Science student at Pepperdine University.

Live site: [tidaltechco.com](https://tidaltechco.com)

## About

Tidal Tech offers free over-the-phone tech support, free technology consultations, and in-home services for residents of Malibu and surrounding areas. This repository contains the full codebase for the customer-facing website and backend API.

## Features

- **Home page** -- Service overview and calls to action
- **Phone Support booking** -- Calendar-based scheduling system for free over-the-phone tech support calls
- **Free Consultation form** -- Detailed intake form that collects client lifestyle and technology information to enable personalized recommendations
- **In-Home Service booking** -- Appointment booking with real-time availability
- **Admin dashboard** -- Password-protected availability manager for adding and removing appointment slots by type (phone or in-person)
- **Automated emails** -- Branded HTML confirmation emails sent to both the client and admin on every form submission
- **Terms of Service page** -- Client-facing service agreement

## Tech Stack

**Frontend:**
- React with Vite
- Tailwind CSS
- React Router

**Backend:**
- Node.js
- Express.js
- Resend (email API)

**Database:**
- Supabase (PostgreSQL)

**Deployment:**
- Frontend: Netlify
- Backend: Render
- Version control: GitHub with automatic CI/CD deployment on push

## Architecture

The frontend is a React SPA deployed on Netlify. The backend is a Node/Express REST API deployed on Render. Availability data is stored in Supabase and read directly from the frontend using the Supabase JS client. Form submissions are handled by the backend API which sends branded HTML emails via the Resend API.

## Local Development

**Prerequisites:** Node.js 22+

**Frontend:**
```bash
npm install
npm run dev
```

**Backend:**
```bash
cd server
npm install
node index.js
```

## Author

Davy Williams -- Computer Science student at Pepperdine University
[tidaltechco.com](https://tidaltechco.com) -- [LinkedIn](https://linkedin.com/in/davyrwilliams)

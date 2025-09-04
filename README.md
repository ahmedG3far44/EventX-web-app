# EventX - Event Management System

EventX is a full-stack event management system designed to help organizers manage events, sell tickets, track attendees, and analyze engagement. The application features role-based access for Admins and Users with a modern UI/UX design.

## Tech Stack

- **Frontend**: React with Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Additional Libraries**: QR Code Generator, Chart.js/Recharts for analytics

## Prerequisites

- Node.js 
- MongoDB 
- pnpm (for frontend)
- npm (for backend)

## Installation and Setup

### Backend Setup

1. Navigate to the server directory:
### Backend Setup
```bash
cd server
npm install

PORT=8000
NODE_ENV=dev
JWT_SECRETE=your_secrets
DATABASE_URL=mongodb://localhost:27017/eventx
SSL_CERT=/etc/letsencrypt/live/domain_name/fullchain.pem
SSL_KEY=/etc/letsencrypt/live/domain_name/privkey.pem

npm run dev

cd client

pnpm install


eventx-app/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/               # Source code
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Utility functions
│   │   └── styles/        # CSS/Tailwind files
│   │   └── .env/         # Environment file
│   ├── package.json
│   
├── server/                # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── configs/          # Configuration files
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Utility functions
│   │── .env/            # Environment file
│   ├── package.json
└── README.md

Features Implemented
Admin Features

    Event creation, editing, and deletion

    Ticket management with QR code generation

    Analytics dashboard with charts for:

        Total revenue, attendees, and tickets sold

        Attendee demographics (age, gender, location)

        Event popularity and engagement metrics

User Features

    Event browsing with search and filtering

    Event details viewing

    Ticket booking with seat selection

    "My Tickets" section with QR codes for check-in

    Notifications for upcoming events

API Endpoints
Authentication

    POST /api/auth/register - Register a new user

    POST /api/auth/login - Login user

    GET /api/auth/me - Get current user

Events

    GET /api/events - Get all events (with search, filter, pagination)

    GET /api/events/:id - Get single event

    POST /api/events - Create new event (Admin only)

    PUT /api/events/:id - Update event (Admin only)

    DELETE /api/events/:id - Delete event (Admin only)

Users

    GET /api/users - Get all users (Admin only)

    GET /api/users/:id - Get single user

Tickets

    GET /api/tickets - Get all tickets (Admin only)

    GET /api/tickets/:userId - Get user's tickets

    POST /api/tickets - Create new ticket (Purchase)

Analytics

    GET /api/analytics/events - Get event analytics

    GET /api/analytics/revenue - Get sales analytics

    GET /api/analytics/users - Get user analytics

    GET /api/analytics/overall - Get overall analytics

Deployment
Backend Deployment

    Deployed to EC2 machine using pm2 

Frontend Deployment

    Build the React application: pnpm run build

    Deployed to Netlify
## Live Demo:
    <a target="_blank" href="https://nimble-taiyaki-547585.netlify.app/">Live Demo</a>

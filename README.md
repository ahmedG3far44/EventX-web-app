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

    PUT /api/users/:id - Update user

    DELETE /api/users/:id - Delete user (Admin only)

Tickets

    GET /api/tickets - Get all tickets (Admin only)

    GET /api/tickets/user - Get user's tickets

    POST /api/tickets - Create new ticket (Purchase)

    GET /api/tickets/:id - Get single ticket

    PUT /api/tickets/:id - Update ticket status

    DELETE /api/tickets/:id - Cancel/refund ticket

Analytics

    GET /api/analytics/events - Get event analytics

    GET /api/analytics/sales - Get sales analytics

    GET /api/analytics/users - Get user analytics
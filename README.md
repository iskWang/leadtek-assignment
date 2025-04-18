# System Monitoring Dashboard

A real-time system monitoring dashboard built with React and Node.js.

## Features

- Real-time system metrics monitoring
- Beautiful and responsive charts
- WebSocket for live updates
- Dark theme support

## Project Structure

```
├── apps
│   ├── dashboard     # Frontend React application
│   └── server       # Backend Node.js server
└── packages
    └── chart-components  # Shared chart components
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- pnpm 8 or later

### Installation

1. Clone the repository

```bash
git clone https://github.com/iskWang/leadtek-assignment.git
cd leadtek-assignment
```

2. Install dependencies

```bash
pnpm install
```

3. Set up environment variables

Copy the example environment files and modify them as needed:

```bash
# Root directory
cp .env.example .env

# Server
cp apps/server/.env.example apps/server/.env

# Dashboard
cp apps/dashboard/.env.example apps/dashboard/.env
```

### Development

1. Start the backend server:

```bash
pnpm --filter server dev
```

2. Start the frontend application:

```bash
pnpm --filter dashboard dev
```

3. Open your browser and visit `http://localhost:3002`

## Environment Variables

### Root Directory (`.env`)

- `NODE_ENV`: Development environment
- `SERVER_PORT`: Backend server port
- `CLIENT_PORT`: Frontend application port

### Server (`.env`)

- `PORT`: Server port (inherits from root)
- `WS_PATH`: WebSocket endpoint path

### Dashboard (`.env`)

- `VITE_PORT`: Frontend port (inherits from root)
- `VITE_API_URL`: Backend API URL
- `VITE_WS_PATH`: WebSocket endpoint path

## License

MIT

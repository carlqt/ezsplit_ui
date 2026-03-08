default:
  just --list

# Starts the backend
start-backend:
  docker compose up

# Starts the frontend app
start-frontend:
  pnpm dev

# Apply schema change and seeds the database
setup:
  pnpm db:setup

default:
  just --list

# Start the entire application (both backend and frontend)
up:
  docker compose up -d
  pnpm dev

down:
  docker compose down

build:
  docker compose build

# Starts the backend
start-backend:
  docker compose up

# Starts the frontend app
start-frontend:
  pnpm dev

# Apply schema change and seeds the database
setup:
  pnpm db:setup

# Tail docker logs. Add arguments to filter logs, e.g. `just logs backend`
logs *service:
  docker compose logs -f {{service}}

# Codegenerator for graphql
codegen:
  pnpm codegen

# Update all git submodules to the latest commit on their respective branches
submodule-update:
  git submodule update --remote --merge

FROM node:18-alpine

WORKDIR /app

# Copy root package files
COPY package.json package-lock.json ./

# Install root dependencies
RUN npm ci

# Copy frontend source
COPY src ./src
COPY public ./public

# Build frontend
RUN npm run build

# Copy backend
COPY backend ./backend

# Install backend dependencies
RUN npm ci --prefix backend

# Expose port
EXPOSE 5000

# Start backend (serves built frontend)
CMD ["node", "backend/server.js"]

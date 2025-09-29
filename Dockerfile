# Multi-stage build for React app
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Accept build argument for API URL
ARG REACT_APP_API_URL=http://localhost:9090
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Build the React app
RUN npm run build

# Production stage - serve on port 3000
FROM node:18-alpine

# Install serve globally
RUN npm install -g serve

# Copy built app
COPY --from=build /app/build /app/build

# Set working directory
WORKDIR /app

# Expose port 3000
EXPOSE 3000

# Start the app on port 3000
CMD ["serve", "-s", "build", "-l", "3000"]
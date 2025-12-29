# AI Agent Ecosystem - Docker Configuration

FROM node:18-alpine AS base

# Install Python and system dependencies
RUN apk add --no-cache python3 py3-pip git docker docker-compose curl

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY requirements.txt ./

# Install Node.js dependencies
RUN npm ci --only=production

# Install Python dependencies
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy source code
COPY src/ ./src/
COPY .env.example ./.env

# Build TypeScript
RUN npm run build

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S aiagent -u 1001

# Change ownership
RUN chown -R aiagent:nodejs /app
USER aiagent

# Expose ports
EXPOSE 8080 8081

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

# Start the application
CMD ["npm", "start"]
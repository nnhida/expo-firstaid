# Base Node.js image
FROM node:22-alpine AS base

# Dependencies stage
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package manager files and install dependencies
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then \
    echo "Installing dependencies with Yarn..." && yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then \
    echo "Installing dependencies with NPM..." && npm ci; \
  elif [ -f pnpm-lock.yaml ]; then \
    echo "Installing dependencies with PNPM..." && corepack enable pnpm && pnpm install --frozen-lockfile; \
  else \
    echo "Lockfile not found!" && exit 1; \
  fi

# Build stage
FROM base AS builder
WORKDIR /app

# Copy installed dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy application files
COPY . .

# Apply Prisma migrations
RUN npx prisma db push || (echo "Prisma DB push failed!" && exit 1)

# Build the application
RUN \
  if [ -f yarn.lock ]; then \
    echo "Building application with Yarn..." && yarn run build; \
  elif [ -f package-lock.json ]; then \
    echo "Building application with NPM..." && npm run build; \
  elif [ -f pnpm-lock.yaml ]; then \
    echo "Building application with PNPM..." && corepack enable pnpm && pnpm run build; \
  else \
    echo "Lockfile not found!" && exit 1; \
  fi

# Runner stage
FROM base AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Add non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Add capability for Node.js to bind low ports
RUN apk add --no-cache libcap && \
    setcap 'cap_net_bind_service=+ep' $(which node) || echo "Setcap not found!"

# Switch to non-root user
USER nextjs

# Expose port 80
EXPOSE 80
ENV PORT=80
ENV HOSTNAME="0.0.0.0"

# Command to start the server
CMD ["node", "server.js"]

# ----------- Stage 1: Build ----------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN npm run build
# ----------- Stage 2: Runtime ----------
FROM node:20-alpine

WORKDIR /app

# Copy only the build output and necessary files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/app ./app

# Expose the Next.js port
EXPOSE 3000

# Run the Next.js app in production mode
CMD ["npm", "run", "start"]
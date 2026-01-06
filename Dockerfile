FROM node:20-alpine
RUN apk add --no-cache openssl

EXPOSE 3000
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies (including dev for Prisma setup)
RUN npm ci --legacy-peer-deps && npm cache clean --force

# Copy the rest of the code
COPY . .

# Generate Prisma client and run migrations
RUN npx prisma generate
# Only run migrate in production if DB URL is set
# RUN npx prisma migrate deploy

# Build the app
RUN npm run build

# Start the app
CMD ["npm", "run", "docker-start"]

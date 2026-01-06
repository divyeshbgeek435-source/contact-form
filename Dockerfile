FROM node:20-alpine

RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --legacy-peer-deps

COPY . .

# Prisma
RUN npx prisma generate

# Build Remix
RUN npx remix build

EXPOSE 3000

CMD ["npm", "run", "docker-start"]

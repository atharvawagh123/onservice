# # Install dependencies
# FROM node:24-alpine AS deps
# WORKDIR /app
# COPY package*.json ./
# RUN npm install

# # Build stage
# FROM node:24-alpine AS builder
# WORKDIR /app
# COPY . .
# COPY --from=deps /app/node_modules ./node_modules
# RUN npx prisma generate
# #RUN npm run build

# # Production runner
# FROM node:24-alpine AS runner
# WORKDIR /app

# ENV NODE_ENV=production

# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/prisma ./prisma

# EXPOSE 3000

# CMD ["npm", "start"]




FROM node:24-alpine
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install
COPY . .

# Default command for dev
CMD ["npm", "run", "dev"]

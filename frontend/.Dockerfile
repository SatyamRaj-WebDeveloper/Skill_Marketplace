# stage 1 : Installing Dependencies
FROM node:20.12.2-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

#stage 2 : Build the application
FROM node:20.12.2-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node-modules ./node-modules
COPY . .
RUN npm run build

# stage 3 : Production Image
FROM node:20.12.2-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder --chown=next.js:node.js  /app/.next/standalone ./
COPY --from=builder --chown=next.js:node.js /app/.next/static ./.next/static

EXPOSE 3000
CMD [ "node":'server.js' ];



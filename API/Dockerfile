# Stage 1: Build the application
FROM node:latest as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm run test

# Stage 2: Run the application
FROM node:latest
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
EXPOSE 3000
CMD ["node", "dist/main"]

# BUILD STAGE
FROM node:22.12.0-alpine AS builder
WORKDIR /app

ARG API_URL
ARG HOME_URL

ENV API_URL=$API_URL
ENV HOME_URL=$HOME_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# RUNTIME STAGE
FROM nginx:alpine AS runtime

COPY --from=builder /app/dist ./usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
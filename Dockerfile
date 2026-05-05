# =========================
# 1. BASE
# =========================
FROM node:22-alpine AS base

WORKDIR /app

COPY package*.json ./


# =========================
# 2. DEPENDENCIES
# =========================
FROM base AS deps

RUN npm ci


# =========================
# 3. BUILD
# =========================
FROM node:22-alpine AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build


# =========================
# 4. PRODUCTION
# =========================
FROM nginx:alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

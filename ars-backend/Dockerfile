### Worker Mode ###
### Dependencies ###
FROM node:20-alpine as deps
WORKDIR /app

# Копируем package.json и package-lock.json
COPY ./package.json ./package-lock.json ./

# Устанавливаем зависимости (только runtime)
RUN npm ci

# ---------- BUILDER STAGE ----------
FROM node:20-alpine as builder
WORKDIR /app

ENV NODE_ENV=production
ENV NODE_OPTIONS=--openssl-legacy-provider

# Устанавливаем зависимости для CLI
RUN npm install -g @medusajs/medusa-cli@latest && apk add --no-cache python3

# Копируем node_modules из предыдущего этапа
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/package-lock.json ./package-lock.json

# Копируем исходники
COPY . .

# Сборка проекта (создаст .medusa/server)
RUN npm run build

# Копируем .env внутрь .medusa/server
COPY .env.production .medusa/server/.env

### Runner ###
FROM node:20-alpine as runner
WORKDIR /app

# Устанавливаем зависимости для запуска
RUN apk add --no-cache python3

# Копируем собранное приложение
COPY --from=builder /app/.medusa/server ./.medusa/server
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/.medusa/server/.env ./.medusa/server/.env

# Устанавливаем зависимости внутри .medusa/server
WORKDIR /app/.medusa/server

# Открываем порт (если нужно)
EXPOSE 9000

# Установка переменных окружения (можно использовать docker-compose)
ENV DISABLE_MEDUSA_ADMIN=true
ENV MEDUSA_WORKER_MODE=worker
ENV NODE_ENV=production

# Стартуем Medusa сервер
CMD ["sh", "-c", "\
    if [ ! -f .env ]; then \
    echo '❌ ERROR: .env not found in .medusa/server! Aborting.'; \
    exit 1; \
    fi && \
    echo '✅ .env found, continuing...' && \
    npm install --omit=dev && \
    npm run predeploy && \
    npm run start"]

### Dependencies ###
FROM node:22-alpine as deps
WORKDIR /app

# Установка Yarn 4 (Berry)
RUN corepack enable && corepack prepare yarn@4.1.1 --activate

# Копируем манифесты
COPY .yarnrc.yml ./
COPY .yarn ./.yarn
COPY package.json yarn.lock ./

# Устанавливаем зависимости
RUN yarn install --immutable

### Build ###
FROM node:22-alpine as builder
WORKDIR /app

# Установка Yarn 4
RUN corepack enable && corepack prepare yarn@4.4.0 --activate

# Копируем зависимости
COPY --from=deps /app /app

# Копируем исходники
COPY . .

# Сборка проекта
RUN yarn build

EXPOSE 8000

# Запуск собранного приложения
CMD ["yarn", "start"]

# -------- Stage 1: Build JS/CSS assets --------
FROM node:20-alpine as node-builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY vite.config.ts ./
RUN npm install --frozen-lockfile

# Copy frontend source code
COPY resources/ resources/
COPY public/ public/

# Build Vite assets
RUN npm run build


# -------- Stage 2: PHP + Laravel --------
FROM php:8.2-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    bash \
    git \
    curl \
    zip \
    unzip \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libzip-dev \
    oniguruma-dev \
    icu-dev \
    zlib-dev \
    libxml2-dev \
    shadow \
    mysql-client \
    nodejs \
    npm \
    openssl

# Install PHP extensions
RUN docker-php-ext-install \
    pdo_mysql \
    mbstring \
    zip \
    bcmath \
    intl \
    opcache

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy entire backend codebase
COPY . .

# Copy built assets from node-builder
COPY --from=node-builder /app/public/build ./public/build
COPY --from=node-builder /app/resources/views ./resources/views

# Install PHP dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader \
  && echo "✅ Composer install done" \
  || (echo "❌ Composer install failed" && exit 1)

# Set permissions
RUN addgroup -g 1000 laravel && \
    adduser -G laravel -g laravel -s /bin/sh -D laravel && \
    chown -R laravel:laravel /var/www

USER laravel

EXPOSE 9000

CMD ["php-fpm"]

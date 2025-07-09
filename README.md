# Personal Calendly

A Laravel-based calendar events application.

## Features

- Create, view, and manage calendar events
- Monthly calendar grid with event display
- Event recurrence and time selection
- Modern UI with shadcn/ui and Inertia.js
- Validation and error handling

## Requirements

- PHP >= 8.1
- Composer
- Node.js & npm
- A database (e.g., MySQL, PostgreSQL, SQLite)

## Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/sir-radar/personal-calendly.git
    cd personal-calendly
    ```

2. **Install dependencies:**
    ```sh
    composer install
    npm install
    ```
3. **Copy and configure your environment:**

    ```sh
    cp .env.example .env
    php artisan key:generate
    ```

4. **Run migrations:**

    ```sh
    php artisan migrate
    ```

5. **Seed the database:**

    ```sh
    php artisan db:seed
    ```

6. **Start the development server:**
    ```sh
    npm run dev
    php artisan serve
    ```
7. **Code Quality:**
    ```sh
    composer pint
    composer pint
    ```

**TODOS:**

[]: # - add users and link them to events

[]: # - improve DB query

[]: # - add edit function to events

[]: # - add delete function to events

[]: # - add factory and seeder for event

[]: # - add unit tests

[]: # - update readme documentation

[]: # - integrate CI/CD

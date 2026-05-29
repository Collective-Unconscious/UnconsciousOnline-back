# Unconscious Online Backend

### Welcome, contributor.

This is the backend API for [the Unconscious Online website](https://unconscious.online). This file will present you the contribution process as well as how to execute this project locally, run tests, and general information about the stack.

## How to contribute to this project ?

Everyone can contribute to this project. You can **create an issue** if you want to report a bug or suggest a feature.

If you want to contributer directly to the code, please create a branch from dev and make a pull request. a maintainer will review it.

## Git workflow

The **master** is the default branch, where production versions will be. Tagged push to this branch will deploy to production and update the API server.
> Only maintainers can push to the master branch.

The **dev** branch is where contributors will make pull request to. Tagged push to this branch will deploy to the test API.

## Running and testing

1. **Clone the repository**
```bash
git clone https://github.com/Collective-Unconscious/UnconsciousOnline-back.git
cd UnconsciousOnline-back
```

2. **Install the dependencies**
We use **pnpm** as our package manager. install the dependencies by running:
```bash
pnpm install
```

3. **Configure environment variables**
Copy the `.env.example` file to `.env` and fill the variables:
```bash
cp .env.example .env
```

4. **Start the development databases**
We use **Docker** to easily run the databases in development. Execute:
```bash
docker compose -f docker/docker-compose.dev.yml up -d
```

5. **Run the development server**
To start the NestJS project locally, run:
```bash
pnpm start:dev
```
The API will be running on [http://localhost:3001](http://localhost:3001).
> The Swagger docs will be available at [http://localhost:3001/api](http://localhost:3001/api) when running.

6. **Running the tests**
We use **Jest** for testing. To execute unit tests, run:
```bash
pnpm test
```
To run the end-to-end tests:
```bash
pnpm test:e2e
```

7. **Code quality and formatting**
To check for linting issues:
```bash
pnpm lint
```
To automatically format the code using **Prettier**:
```bash
pnpm format
```

## General information about the stack

This project is built using:
- **NestJS** - Node.js framework for backend applications
- **TypeORM & pg** - For PostgreSQL database management. This databse will store everything that isn't chat messages.
- **Mongoose** - For MongoDB database management. This database will store chat messages.
- **Redis & Cache Manager** - For caching
- **Passport & JWT** - For secure user authentication and OAuth

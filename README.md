# Microservice Task Manager

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Microservice Task Manager is a robust task management system built on the [Nest](https://github.com/nestjs/nest) framework using TypeScript. It focuses on providing a secure and efficient environment for handling tasks and users, with a strong emphasis on authentication and microservices architecture integrated with Kafka for seamless communication.

**Features:**
- **Task Management:** Create tasks effortlessly.
- **User Management:** Securely manage users with authentication.
- **Microservices with Kafka:** Efficient use of microservices ensures scalability and flexibility, seamlessly integrated with Kafka for asynchronous and resilient communication.

**Technologies Used:**
- Secure Authentication
- Microservices Architecture
- Apache Kafka

## Installation

```bash
$ pnpm install
```
## Generate Migrations

```bash
$ pnpm prisma generate
```
## Generates Postgresql container in Docker to local development

```bash
$ docker run --name ms-task-manager -p 5432:5432 -e POSTGRES_PASSWORD=admin -e POSTGRES_USERNAME=admin -e POSTGRES_PASSWORD_ROOT=admin -d -t bitnami/postgresql
```
## Generate Docker Containers

```bash
$ docker-compose up -d
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Alexandre Junior](https://www.linkedin.com/in/alexandrejuniorc/)
  
## License

Nest is [MIT licensed](LICENSE).

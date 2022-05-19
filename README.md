 <p align="center">AGROEX</p>

## Description

AGROEX Backend description

## Prerequisites
There is a heading for software needed for development.

| Source             | Link                                              |
|--------------------|---------------------------------------------------|
| Node(16+)          | [Node.js](https://nodejs.org/en/download/)
| PostgreSQL         | [14](https://www.postgresql.org/download/)        |
| Docker             | [Download]((https://www.docker.com/get-started/)) |

## If you have docker you can run the application
```bash
$ docker-compose up
```


## If you don't have docker :(
### Install PostgreSQL:
```bash
- Select the all components
- Installation of directories:
    - Suggested Windows directory: /var/lib/postgresql
    - Suggested MacOs directory: /Library/PostgreSQL/14
- Database Port: 5432
- Set Superuser of password: choose your own or just use "root"
- Locale: en_US.UTF-8 or default
```
## Pre-setup

### pgAdmin:
```bash
- Set password user (you may also use "root") #This password and superuser password are different
- Click on PostgreSQL 14 server
- Enter the Superuser password you chose during the PostgreSQL installation
- Create new Database "categories"
```

### If you have a MacBook, you need to change the paths in docker-compose.yml:
```bash
environment:
    PG_DATA: /Library/PostgreSQL/14/data
    volumes:
      - pgdata:/Library/PostgreSQL/14/data
```
### .env configuration:
```bash
PORT=5000
POSTGRES_TYPE=postgres
POSTGRES_HOST=postgres #for local use POSTGRES_HOST=localhost
POSTGRES_PORT=5432 
POSTGRES_PASSWORD=root #or use your superuser password
POSTGRES_USERNAME=postgres
POSTGRES_DB=categories
```



## Run app on localhost
```bash
Check again POSTGRES_HOST=localhost
```
```bash
$ npm i
```
```bash
$ npm run start:dev
```


## After the launch, the description of the API will be available at:
```bash
$ http://localhost:5000/api/docs
```

## Project structure
```js
+-- dist // Source build
+-- src
|   +-- categories // A module that manages "categories" resources
|   +-- config // Environment Configuration
|   +-- constants // Constant value and Enum
|   +-- database // 
|   +-- types // App types
|   +-- auth // Authentication
|   |   +-- migrations // TypeORM migrations 
|   +-- user // A module that manages "user" resources
|   |   +-- decorators // User decorators
|   |   +-- dto // DTO (Data Transfer Object) Schema, Validation
|   |   +-- guards // User Nest Guards
|   |   +-- middlewares // User Nest Middlewares
|   |   +-- types // User types
|   |   +-- repository // The logic to access data sources
|   +-- app.controller.ts
|   +-- app.module.ts
|   +-- app.service.ts
|   +-- config.ts
|   +-- main.ts
+-- .env
+-- Dockerfile
+-- docker-compose.yml
+-- Procfile // Commands are run by Heroku
+-- tsconfig

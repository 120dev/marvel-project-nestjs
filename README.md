# Marvel Project

This web application, built with Vue3, interacts with the Marvel API through a NestJS-based API Gateway.

It is built using Docker, Vue3 and NestJS.

## Prerequisites

Before you begin, make sure you have Docker installed on your machine

## Setting Up the Project

Follow these steps to set up the project on your local machine.

### 1. Clone the Project

```bash
git clone https://github.com/120dev/marvel-project-nestjs.git marvel-project-nestjs
cd marvel-project-nestjs
```
### 2. Download the Docker images
```bash
sudo docker pull node:latest
sudo docker pull nginx:stable-alpine
```

### 3. Build and Start the Project
```bash
sudo docker-compose up --build
```

Once the project is launched, open your browser and go to http://localhost:8888/
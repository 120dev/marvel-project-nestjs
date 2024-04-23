# Marvel Project

This project is a web application that utilizes the Marvel API to display Marvel series. It is built using Docker and Vue3.

## Prerequisites

Before you begin, make sure you have Docker installed on your machine

## Setting Up the Project

Follow these steps to set up the project on your local machine.

### 1. Clone the Project

```bash
git clone https://github.com/120dev/marvel-project.git marvel-project
cd marvel-project
```
2. Download the Docker Node.js Image
```bash
sudo docker pull node:latest
```

3. Build and Start the Project
```bash
sudo docker-compose up --build
```

Once the project is launched, open your browser and go to http://localhost:8888/



sequenceDiagram
    participant Client as Client HTTP
    participant Controller as ResearchAlertsController
    participant AbstractController as AbstractController
    participant Model as ResearchAlert
    participant Event as AlertEmailCreated Event
    participant Listener as SendAlertEmail Listener

    Client->>Controller: POST /alert-email (données de l'alerte)
    Controller->>AbstractController: Appelle store(Request)
    AbstractController->>Model: Crée l'alerte (ResearchAlert::create)
    Model-->>AbstractController: Retourne l'instance de l'alerte
    AbstractController->>Event: Déclenche AlertEmailCreated(alert)
    Event->>Listener: Envoyer un e-mail avec les détails de l'alerte
    Listener-->>Client: HTTP 201 Created (réponse JSON de l'alerte)

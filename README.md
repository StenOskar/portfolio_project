# React App Deployment with CI/CD and Kubernetes
### Overview
This project demonstrates the deployment of a React application using a CI/CD pipeline and Kubernetes.
The application is containerized with Docker, stored in Google Artifact Registry,
and deployed to a Google Kubernetes Engine (GKE) cluster. The pipeline is automated using GitHub Actions
### Features
- Automated CI/CD pipeline using GitHub Actions.
- Containerized application using Docker.
- Deployment and management of application using Kubernetes (GKE).
### Technologies Used
- Frontend: React (Node.js)
- CI/CD: GitHub Actions
- Containerization: Docker
- Artifact Storage: Google Artifact Registry
- Orchestration: Kubernetes (Google Kubernetes Engine)
- Cloud Platform: Google Cloud Platform (GCP)
- Configuration Management: YAML
### Prerequisites
Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later)
- Docker/ Docker Desktop
- kubectl
- Google Cloud SDK
- Git

### Installation

1. Clone the repository
```bash
git clone
```
2. Install dependencies
```bash
npm install
```
3. Run the application
```bash
npm start
```
4. Build the application
```bash
npm run build
```
### Running the application in a Docker container
5. Create a Docker image
```bash
docker build -t <image-name> .
```
6. Run the Docker container
```bash
docker run -p 8080:8080 <image-name>
```
### Testing
To run tests, use the following command:
```bash
npm test
```
### Running smoke tests
```bash
./scripts/smoke-test.sh
```

### CI/CD Pipeline
The CI/CD pipeline is automated using GitHub Actions. The pipeline consists of the following stages:
- Build: Install dependencies and build the application.
- Test: Run unit tests.
- Build Docker image: Create a Docker image of the application.
- Push Docker image: Push the Docker image to Google Artifact Registry.
- Deploy to GKE: Deploy the application to a GKE cluster.
- Smoke test: Run smoke tests on the deployed application.

### Deployment to kubernetes
To deploy to a Kubernetes cluster, read the deployment guide from Google Cloud Platform [here](https://cloud.google.com/kubernetes-engine/docs/deploy-app-cluster).
# Project Setup

## Prerequisites
Before starting, ensure you have the following installed on your system:
- [Docker](https://www.docker.com/get-started)

## Installation

1. **Install Required Docker Images**
   ```sh
   docker pull mysql:latest
   docker pull node:latest
   ```

2. **Build the Docker Containers**
   Navigate to the project's root directory and run:
   ```sh
   docker-compose build
   ```

3. **Start the Containers**
   After the build process completes, start the services:
   ```sh
   docker-compose up
   ```

4. **Wait for All Containers to Load**
   Ensure all services have fully initialized before proceeding.

5. **Access the Application**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Important Notes
- Ensure that **ports 3000, 3002, and 3306** are free before running the containers.
- If any of these ports are already in use, stop the conflicting processes.

## Stopping the Containers
To stop and remove the containers, run:
```sh
docker-compose down
```

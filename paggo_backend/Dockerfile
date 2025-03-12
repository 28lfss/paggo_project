# Use the latest Node.js image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (to leverage caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --only=production

# Install the NestJS CLI globally
RUN npm install -g @nestjs/cli

# Install package to load and manage environment variables safely
RUN npm install @nestjs/config

# Install Prisma packages
RUN npm install @prisma/client
RUN npm install --save-dev prisma

# Install packages for files uploads management
RUN npm install @nestjs/platform-express multer
RUN npm install --save-dev @types/express @types/multer
RUN npm install pdf-parse @prisma/client

# Install package to integrate Gemini API
RUN npm install @google/generative-ai

# Install bcrytp packages with TypeScript support
RUN npm install bcrypt
RUN npm install @types/bcrypt --save-dev

# Copy the rest of the application files
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3002

# Run Prisma migrations before starting the app
CMD ["sh", "-c", "npx prisma db push && npm run start"]

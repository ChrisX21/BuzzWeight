# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copy application code
COPY . .

# Expose the port if needed (not strictly necessary for MQTT/Redis)
EXPOSE 1883 6379

# Define the command to run the application
CMD ["node", "index.js"]

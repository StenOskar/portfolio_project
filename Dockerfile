# Use the official Node.js image
FROM node:14

# Set the working directory
WORKDIR /src

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the React app
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Expose the port for the app
EXPOSE 8080

# Serve the app
CMD ["serve", "-s", "build", "-l", "8080"]

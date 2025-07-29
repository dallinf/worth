# Use an official Node runtime as base
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port CRA uses
EXPOSE 4000

# Start the development server
CMD ["npm", "start"]

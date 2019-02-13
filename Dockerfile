FROM node:8

WORKDIR /usr/src/nodejs-api

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
cmd [ "npm", "start"]

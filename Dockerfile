FROM node:14

WORKDIR /bikeapp
COPY package.json .
RUN npm install
COPY . .
RUN node config/import.js
CMD npm start


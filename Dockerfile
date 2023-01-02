FROM node:14

WORKDIR /bikeapp
COPY package.json .
RUN npm install
COPY . .
CMD npm start


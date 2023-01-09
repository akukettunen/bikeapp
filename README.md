### Overview
This a project created to apply into the Dev Academy of spring 2023 by Solita. It consists of a [Node + Express.js backend](https://github.com/akukettunen/bikeapp) and a [Vue.js frontend](https://github.com/akukettunen/bikeapp-front).

##### Features
The features implemented are:
* Data import
  * Recommended
    * All
* Journey list view
  * Recommended
    * All
  * Additional
    * Pagination
* Station list
  * Recommended
    * List all the stations
  * Additional
    * Pagination
* Single station view
  * Recommended
    * All

There's also tests for the backend endpoints and some other unit tests implemented with Jest. The backend is Dockerized and is running on an EC2 instance. 

##### Backend
Find backend documentation [here](http://ec2-52-71-12-254.compute-1.amazonaws.com:6060/docs/) : ) (Made with swagger)

##### Frontend
The frontend is a Vue app touched up using [Vuetify](https://vuetifyjs.com/en/). It has been deployed into an S3 bucket which is a neat place to serve frontends from. The frontend uses [Vuex](https://vuex.vuejs.org/) for state management and Vue router to take care of routing.

### Deployed already :)
This repository has already been deployed and is running [here](http://bikeapp.s3-website-us-east-1.amazonaws.com/#/stations)!

The backend is running in a Docker container on an EC2 instance and the Vue frontend is served from an S3 bucket.

If you wish, feel free to follow the instructions below to run the app and tests locally.

### Running the app

##### 1. Requirements
You will need the following installed

node
https://nodejs.org/en/

docker
https://docs.docker.com/get-docker/

docker-compose
https://docker-docs.netlify.app/compose/install/

##### 2. Data setup
Add the data with which the database will be primed into the directory \data and name the files as follows
```
\bikeapp
  \data
    stations.csv
    trips_05.csv
    trips_06.csv
    trips_07.csv
```
##### 3. Running the backend
Add a file called **.env** to the directory root. The file contents are as follows:

\ bikeapp \ .env
```
MYSQLDB_USER=root
MYSQLDB_ROOT_PASSWORD=123456
MYSQLDB_DATABASE=bikeapp
MYSQLDB_LOCAL_PORT=3307
MYSQLDB_DOCKER_PORT=3306
MYSQL_DB_HOST=mysqldb
DB_HOST=localhost
NODE_LOCAL_PORT=8000
NODE_DOCKER_PORT=8080
```
Go to the root container and run
```
docker-compose build
````
and then
```
docker-compose up
```

The backend should now run at port 8080.

##### 4. Import data
After the containers are running, to validate and import data into the database run
```
node config/import/import.js
```

##### 5. Tests
To run the Jest tests run in the root directory (while containers are up)

```
docker exec -it bikeapp_app_1 npm test
```

##### 6. Running the frontend
The frontend is in its own repository. Go to the repository root and run the commands:
```
npm install
```
```
npm run serve
```

The app is now fully up! To view it go to **localhost:8080** on your browser of choice.

### Things learned while building
* The usefullness of docker really shines through in this sort of a situation
  * Made setting up the tests a breeze
* Learned yet again: configuration is not particularly fun

### Quality of life improvements I would implement first
* Proper error handling in routes and in Vuex actions
  - ie. catching, handling and displaying errors

* Loading indicators for data - skeletons maybe

* Paging doesn't allow for choosing a page

* At the moment you can go over on the pagination
   - meaning you can scroll to an empty page

* Some color wouldn't hurt the UI

* Better responsiveness for mobile view

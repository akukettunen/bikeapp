# Running

docker-compose build
docker-compose up

node config/import.js

Requirements:
node
https://nodejs.org/en/

docker
https://docs.docker.com/get-docker/

docker-compose
https://docker-docs.netlify.app/compose/install/

# Things learned while building
The usefullness of docker really shines through in this sort of a situation
Learned yet again: configuration is not particularly fun

# Quality of life improvements I would do first
Proper error handling in routes and in Vuex actions
 - ie. catching, handling and displaying errors

Loading indicators for data - skeletons maybe

Paging doesn't allow for choosing a page

At the moment you can go over on the pagination
  - meaning you can scroll to an empty page
  
Some color wouldn't hurt the UI

Alternate version of previous project that was built with Flask and an older version of React.

## The idea is the same. This is a platform where people can come and share their thoughts and ideas. 
This is a place for friendly and open discussions where people can collaborate and promote intellectual discourse on any issue. People will be suggested convos, rooms and other people that match their interests but have potentially alternative opinions. 

Instead of suggesting people that have similar views, suggest people with opposing views but interested in the same topic. 

Promote well formed and well structured arguments. 

## New project structure
This new frontend is a standalone app fetching data from different APIs, rather than being a set of templates being rendered by the server. 

The goal is to build a system based on microservices architecture. 

## One microservice for each main feature
- content suggestion (user, convos, rooms)
- notification system
- messaging system
- convo lists
- room list
- user list
- content suggestions


## all objects have CRUD operations
- the whole design is based on independent CRUD operations for each object
- convos are the central object of the web app
- basically all revolves around convos
- other objects also have independent operations and define the user interactions


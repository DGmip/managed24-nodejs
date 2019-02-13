# Managed 24/7 Technical Test

A ExpressJS restful API to query MongoDB

## Test Brief 

### Part 1 - Node / Express / MongoDB:

Create a node.js restful API with a single endpoint that given a search term returns a list of names that begin with that term. The query will be done against MongoDB.
The endpoint must be secured.

# About

## Mongo DB 
  Atlas was used (https://cloud.mongodb.com) and a cluster was spawned on Google Cloud

## Docker
  This seemed to me to be a good opportunity to learn about Docker (and since it is part of your stack) and see how far I could get using Docker as a tool to build sections of this app and bring them together.
  As a result Angular App and the ExpressJS API have been Dockerised and to the best of my current ability.
  I am using the Google Container Registry and the two images are public.
  After cloning this repo, you should be able to run
  ```docker-compose up```
  and then navigate your browser to localhost:4200 to view the app.

  The intention was to add them both to a swarm with nodejs-app as the swarm manager and deploy them separately, but I did not get that far.

  Should the previous command fail, you can run the image on the correct port with ```docker run -p 4000:8080 gcr.io/avian-pact-231312/nodejs-api```

## Running without Docker
  Without Docker it is necessary to pass the correct port as a parameter to main.js. This is because both images are exposing port 8080 and usually Docker would be mapping 8080 to 4000.
  ```node main.js port=4000```

  For instructions on running the angular app, please see [The Angular App repo](https://github.com/DGmip/managed24-angular).

## Testing
  ```npm run test```
  The endpoint is tested for each response case

### Mistakes made:

- Bunched several commits together into one as I was initially just experimenting with Docker
- Initially wrote a FilterByName angular pipe on all of the names instead of querying the database

### Semicolons!
  You might notice I don't use semi-colons in my typescript atm, [this article can shed a bit of light as to why.](https://medium.com/@eugenkiss/dont-use-semicolons-in-typescript-474ccfe4bdb3)

### What I would do if I had more time
  - Use a local installation of MongoDB and not Atlas
  - Make a GKE cluster
  - Use JWT for securing the endpoint, instead of just an API Key
  - Make the connection to the db persistent / protected from failure

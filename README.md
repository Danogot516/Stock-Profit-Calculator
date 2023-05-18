# Stock-Profit-Calculator
A full-stack application that finds the best profit comparing stock prices in a given timespan

# Installation steps
The app has been dockerized and uses a docker-compose.yml file, in order to setup the app do the following steps:
 1. Init the repository
 2. Run `docker-compose build` to build the images
 3. Run `docker-compose up` to spin up the containers
 4. In a separate terminal run `docker exec backend_container yarn seed-database` to populate the mongoDB database with stock prices
 5. Open http://localhost:5173/ to inspect the React website

The database seeding script uses the environment variables defined in the docker-compose.yml file to generate realistic looking stock prices in the specified timespan.

Docker images use local files as volumes, which allows the developer to change files locally and have the containers update their files as well.

In order to run the backend tests you must run `docker-compose -f docker-compose.yml -f docker-compose.test.yml run backend_container yarn test`

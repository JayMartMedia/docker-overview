Starting up Mongo in docker:

https://hub.docker.com/_/mongo

`docker run -d -p 27017:27017 --name mongo-db mongo:latest` - run detached, forward port 27017 on host machine to docker container, name the container, use the mongo-latest image

Start up server on host:

`yarn --cwd ./packages/server/ dev`

Start up ui on host:

`yarn --cwd ./packages/ui/ dev`

Containerizing Node apps with Docker:

https://hub.docker.com/_/node
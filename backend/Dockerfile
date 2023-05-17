FROM node:16
WORKDIR /backend
COPY package*.json .
RUN yarn install
COPY . .
EXPOSE $PORT
CMD [ "yarn", "dev" ]
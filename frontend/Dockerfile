FROM node:16
WORKDIR /frontend
COPY package*.json .
RUN yarn install
COPY . .
EXPOSE 5173
CMD [ "yarn", "dev" ]
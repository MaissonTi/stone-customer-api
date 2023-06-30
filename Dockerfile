FROM node:16-alpine as customer-api

WORKDIR /usr/src/

COPY package*.json ./
COPY . .

RUN npm i -g @nestjs/cli
RUN npm install
RUN npm run build

CMD [ "npm", "run", "start:prod" ]
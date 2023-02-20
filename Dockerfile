FROM node:16.13.1-alpine3.13

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm i -g @nestjs/cli

COPY . .

RUN npm run build

ENV TZ Europe/Warsaw

CMD [ "node", "dist/main.js"]
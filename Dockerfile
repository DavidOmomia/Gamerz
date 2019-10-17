FROM node:10-alpine

RUN mkdir -p /home/src/app/node_modules && chown -R node:node /home/src/app

WORKDIR /home/src/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "npm", "start" ]
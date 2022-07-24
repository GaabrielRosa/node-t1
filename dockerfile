FROM node:16

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

#ENTRYPOINT ["npm", "run", "migration:up"]

CMD [ "npm", "run", "dev" ]
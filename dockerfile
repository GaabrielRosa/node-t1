FROM node:16

WORKDIR /usr/src/app

COPY . /usr/src/app

ENTRYPOINT ["./entrypoint.prod.sh"]
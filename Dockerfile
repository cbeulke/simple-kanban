FROM node

ADD . /app

WORKDIR /app

CMD [ "node", "start.js" ]
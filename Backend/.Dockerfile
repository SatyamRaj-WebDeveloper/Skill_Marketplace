FROM node:20.12.2-alpine


WORKDIR /Backend

COPY package*.json ./ 

RUN npm install

COPY . .

EXPOSE 8000 

CMD ['node' : 'server.js']




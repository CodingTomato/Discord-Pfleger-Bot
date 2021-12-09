FROM node:12

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

ENV API_PORT=1405
ENV PREFIX= 
ENV PREFIX = #Pfleger

EXPOSE 1405

CMD [ "npm", "start" ]
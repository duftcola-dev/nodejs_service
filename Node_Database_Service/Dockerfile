FROM node:16.13.2

WORKDIR /.

RUN npm init -y 
RUN npm i express
RUN npm install --save express-handlebars
RUN npm install -save express-session

RUN mkdir -p /home/app

COPY  . .
CMD ["node index.js"]
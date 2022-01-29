FROM node:16.13.2


WORKDIR /home/app
COPY  ./package.json ./

RUN npm init -y 
RUN npm install
RUN npm i express
RUN npm install -g npm@8.4.0
RUN npm install --save express-handlebars
RUN npm install -save express-session
COPY  ./ ./

EXPOSE 3000

CMD ["node","index.js"]
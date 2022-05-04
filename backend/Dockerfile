FROM node:alpine

WORKDIR /app

COPY . /app

RUN npm install
RUN npm run db:gen

ENV PORT 8081

EXPOSE 8081

CMD [ "npm", "run", "db:gen", "npm", "run", "dev"]

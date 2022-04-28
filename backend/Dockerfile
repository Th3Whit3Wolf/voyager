FROM node:alpine

WORKDIR /app

COPY . /app

RUN npm install

ENV PORT 8082

EXPOSE 8082

RUN npm run db:gen

CMD ["npm", "run", "dev"]

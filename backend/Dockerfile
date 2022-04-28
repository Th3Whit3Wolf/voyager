FROM node:alpine

WORKDIR /app

COPY . /app

RUN npm install

ENV PORT 8081

EXPOSE 8081

CMD ["npm", "run", "dev"]

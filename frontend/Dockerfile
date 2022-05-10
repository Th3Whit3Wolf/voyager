FROM node:alpine

WORKDIR /app

COPY . /app

RUN npm install --force

ENV PORT 3000

EXPOSE 3000

CMD ["npm", "start"]

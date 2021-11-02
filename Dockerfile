FROM node:14.15.3-alpine

WORKDIR /app

EXPOSE 8080

COPY . .

RUN npm install
RUN npm run build


CMD [ "node", "backend/index.js" ]
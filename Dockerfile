FROM node:14.15.3-alpine

WORKDIR /app

EXPOSE 8080

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install
RUN npm run build

COPY . .

CMD [ "node", "backend/index.js" ]
FROM node:19.5.0-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npx prisma migrate

RUN npx prisma generate

RUN npm run build

CMD [ "node",  "dist/main.js" ]
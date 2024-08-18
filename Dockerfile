FROM node:alpine

WORKDIR /usr/src/app

COPY prisma ./prisma/
COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

CMD ["npm", "run", "dev"]
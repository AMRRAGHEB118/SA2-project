FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install
# pnpm yarn npm

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "preview" ]
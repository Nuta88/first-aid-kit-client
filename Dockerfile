FROM node:latest

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

ENV REACT_APP_BASE_URL=http://localhost:3002/api

EXPOSE 3000

CMD ["npm", "start"]

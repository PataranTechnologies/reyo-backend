FROM node:12

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install --silent

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]




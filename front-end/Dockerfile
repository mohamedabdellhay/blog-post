# Dockerfile for React
FROM node:23.0

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

CMD ["yarn", "dev", "--host", "--port", "3000"]

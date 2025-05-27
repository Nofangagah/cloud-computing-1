# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Inject secret dari argumen build ke file .env
ARG BACKEND_ENV
RUN echo "$BACKEND_ENV" > .env

COPY . .

RUN npm install

EXPOSE 3000
CMD ["node", "index.js"]

ARG NODE_VERSION=lts
FROM node:${NODE_VERSION} AS dev
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

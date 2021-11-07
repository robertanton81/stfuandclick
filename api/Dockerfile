# Docker Multistage construction 

### DEV   ###
FROM node:14.17.3 AS development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

#  Navigate to the container working directory 
WORKDIR /usr/src/app
#  Copy package.json
COPY package*.json ./

RUN npm install ## glob rimraf
RUN npm install --only=development
# COPY . .
RUN npm run build


### PROD   ###
FROM node:14.17.3 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN \
  npm config set registry https://registry.npm.taobao.org \
  && npm install --only=production

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
COPY --from=development /usr/src/app/ .

CMD ["node", "dist/main"]
 
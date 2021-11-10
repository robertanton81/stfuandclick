# Docker Multistage construction 

### BUILD   ###
FROM node:14.17.3 AS build


#  Navigate to the container working directory 
WORKDIR /app
#  Copy package.json
COPY package*.json ./
RUN npm install ## glob rimraf
COPY . .


ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN npm run build


### PROD   ###
FROM node:14.17.3 as production

WORKDIR /app

COPY package.json ./

RUN npm install --only=production

COPY --from=build /app/dist ./dist

CMD npm run start:prod
 

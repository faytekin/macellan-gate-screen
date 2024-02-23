FROM node:slim as BUILD

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:alpine

COPY --from=BUILD /usr/src/app/dist /usr/share/nginx/html

COPY --from=build /usr/src/app/.docker/nginx-default.conf /etc/nginx/conf.d/default.conf


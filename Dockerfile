FROM node:11.9.0

RUN mkdir -p /usr/src/yummy-api
WORKDIR /usr/src/yummy-api

COPY package.json /usr/src/yummy-api
RUN npm install

COPY . /usr/src/yummy-api

ARG NODE_VERSION=11.9.0

ENV NODE_VERSION $NODE_VERSION
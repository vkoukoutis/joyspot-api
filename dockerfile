FROM node:11.9.0

RUN mkdir -p /usr/src/joyspot-api
WORKDIR /usr/src/joyspot-api

COPY package.json /usr/src/joyspot-api
RUN npm install
RUN npm ci

COPY . /usr/src/joyspot-api

ARG NODE_VERSION=11.9.0

ENV NODE_VERSION $NODE_VERSION
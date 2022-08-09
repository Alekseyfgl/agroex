FROM node:16.13.1-alpine3.14
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN ls -l
RUN npm install
COPY . /usr/src/app
CMD ["npm", "run", "start"]

FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install --save @fortawesome/fontawesome-svg-core
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

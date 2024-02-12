FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY  . .

# ENV PORT=4545

# EXPOSE 4545

# CMD ["node" , "index.js"]
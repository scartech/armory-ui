FROM amd64/node:14-alpine

# set working directory
WORKDIR /app

# add node modules to the $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# add react app
COPY . ./

# start the app
CMD ["yarn", "start"]

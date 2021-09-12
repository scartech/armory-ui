# Stage 1 - build the react app
FROM amd64/node:14-alpine as build

# Set working directory
WORKDIR /app

# Add node modules to the $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# Copy react app
COPY . ./

# Build the react app
RUN yarn build


# Stage 2 - build the final image and copy the react build files
FROM amd64/nginx:1.17.8-alpine

# Copy the build files
COPY --from=build /app/build /usr/share/nginx/html

# Remove the default config and add our custom config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

# Run nginx on port 80 in the container
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]


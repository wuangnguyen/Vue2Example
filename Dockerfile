FROM nginx:stable-alpine as base
COPY nginx_config/nginx.conf /etc/nginx/nginx.conf
COPY nginx_config/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM base as production-stage
WORKDIR /app
COPY --from=build-stage /app/dist ./
CMD ["nginx", "-g", "daemon off;"]
# Etapa 1: Build Angular
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx ng build --configuration=production

# Etapa 2: Servir con NGINX
FROM nginx:alpine

# Copia el contenido interno de dist, sin importar el nombre del proyecto
COPY --from=build /app/dist/* /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]

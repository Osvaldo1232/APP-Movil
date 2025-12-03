# ==============================
# Etapa 1: Build Ionic Angular
# ==============================
FROM node:20 AS build

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Build de Ionic (genera la carpeta www)
RUN npx ionic build --prod


# ==============================
# Etapa 2: Servir con Nginx
# ==============================
FROM nginx:alpine

# Copiar archivos generados en /www
COPY --from=build /app/www /usr/share/nginx/html

# Copiar config de nginx
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]

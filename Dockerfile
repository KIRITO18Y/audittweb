FROM node:18-alpine as build

WORKDIR /app

# Primero copiar package.json y package-lock.json
COPY Auditt.Web/package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY Auditt.Web ./

# Construir la aplicación
RUN npm run build

FROM nginx:alpine

# Copiar la configuración de nginx
COPY Auditt.Web/nginx.conf /etc/nginx/nginx.conf

# Copiar los archivos estáticos desde la etapa de construcción
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
FROM node:18-alpine as build

WORKDIR /app

# Copiar todos los archivos necesarios
COPY . .

# Instalar dependencias
RUN npm install

# Construir la aplicación
RUN npm run build

FROM nginx:alpine

# Copiar la configuración de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar los archivos estáticos desde la etapa de construcción
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
FROM node:18-alpine as build

WORKDIR /app

# Primero copiar package.json y instalar dependencias
COPY package*.json ./
RUN npm install

# Luego copiar el resto del código fuente
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY public/ ./public/
COPY src/ ./src/

# Construir la aplicación
RUN npm run build

FROM nginx:alpine

# Copiar la configuración de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar los archivos estáticos desde la etapa de construcción
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
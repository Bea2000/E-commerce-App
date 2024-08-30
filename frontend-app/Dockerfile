# Usar una imagen base de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo en el contenedor
WORKDIR /frontend-app

# Copiar package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente al contenedor
COPY . .

# Exponer el puerto que la aplicación usará
EXPOSE 3000

# Comando para iniciar el servidor de desarrollo
CMD ["npm", "run", "dev"]

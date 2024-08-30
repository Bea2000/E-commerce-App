# Usar una imagen base de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo en la imagen
WORKDIR /backend-app

# Copiar los archivos de la aplicación (package.json y package-lock.json si existen)
COPY ./package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto en el que la aplicación se ejecutará
EXPOSE 4000

# Comando para ejecutar la aplicación cuando se inicie el contenedor
CMD ["npm", "run", "dev"]
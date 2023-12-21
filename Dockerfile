# Usa una imagen de Node.js como base
FROM node:14

# Establece el directorio de trabajo en la aplicación
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json para instalar dependencias
COPY package*.json ./

COPY .env ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

EXPOSE 8000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]

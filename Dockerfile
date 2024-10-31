# Establece la imagen base
FROM node:16

# Crea el directorio de la aplicación
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias, sin incluir bcrypt en esta etapa
RUN npm install && npm uninstall bcrypt && npm install bcrypt

# Copia el resto del código de la aplicación
COPY . .

# Compila el proyecto
RUN npm run build

# Expone el puerto que usa la app
EXPOSE 3000

# Comando para correr la app
CMD ["npm", "run", "start:prod"]

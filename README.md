#Despliegue en docker
#Command para crear la imagen
docker build -t pruebanode . 

#Command para crear el container y iniciarlo
docker run -p 3000:3000 pruebanode

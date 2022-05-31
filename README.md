# Recuerdos App

### La aplicación para inmortalizar los recuerdos de tus viajes

## Backend
 
 Para el desarrollo del backend se han utilizado las siguientes dependencias:

 
  Nombre                 | Versión | Descripción   
  -----------------------|---------|--------------------------|
**bcrypt**       | 5.0.1   | Nos provee de algoritmos de cifrado como el sha512 |
**body-parser**  | ^1.20.0 | Middleware de express para obtener body como JSON     |
**cors**         | ^2.8.5  | Middleware de express para configurar CORS   |
**debug**        | ~2.6.9  |  Instalado por el generador de express    |
**dotenv**       | ^16.0.1 | Librería para cargar ficheros .env   |
**express**      | ~4.16.1 |  Librería para construir aplicaciones web    |
**http-errors**  | ~1.6.3  |    Instalado por el generador de express    |
**jsonwebtoken** | ^8.5.1  | Libería para implementar JsonWebToken    |
**mongoose**     | ^6.3.3  |  Librería para conectarse a MongoDB   |
**morgan**       | ~1.9.1  |  Logger para express      |
**multer**       | ^1.4.4  |  Middleware de express para el manejo de la subida de imágenes     |

## Deploy 

La base de datos se ha desplegado en MongoDB Atlas y  la aplicación web se ha desplegado en heroku.

[Api](https://recuerdos-app-backend.herokuapp.com/)
# Tech Store
Este es un proyecto desarrollado en React Native. Su propósito es crear un **e-commerce** para la venta de productos tecnológicos.

---

### Alcance

#### 1. Gestión de usuarios
* Pantalla de registro con validación de campos (correo electrónico y contraseña).
* Integración de autenticación (Firebase Authentication).
* Autenticación con correo y contraseña.
#### 2. Exploración de Productos y Categorías
* Pantalla con categorías organizadas
* Pantalla de lista con fotos de los productos según la categoría escogida
* Visualización de detalles del producto (nombre, descripción, precio, foto)
#### 3. Gestión del Carrito de Compras
* Botón en la pantalla de detalles del producto para añadirlo al carrito
* Pantalla de resumen del carrito con productos añadidos, cantidades y precios
* Posibilidad de actualizar cantidades o eliminar productos
* Suma automática del precio total 
#### 4. Generación de Orden de Compra
* Enviar los datos de la orden a Firebase para su registro
* Pantalla con el historial de órdenes realizadas
* Visualización del detalle de cada orden (número de orden, total, fecha).
#### 3. Gestión del Perfil
* Pantalla para mostrar datos del perfil ( correo, usuario y foto)
* Cambiar foto de perfil
* Integración con la cámara del dispositivo
* Subida a Firebase
---
### Requisitos previos
Asegúrate de tener instalados los siguientes componentes:

* npm (gestor de paquetes)
* React Native
* Android Studio (para emular dispositivos Android)
* Expo Go (en caso de querer probar la aplicación en tu dispositivo físico)

---

### Herramientas utilizadas
* React Native
* Expo Go
* Android Studio
* Redux
* SQLite
* Firebase
* JavaScript

---

### Instalación
* Clona el repositorio en tu máquina local: 
git clone https://github.com/nparedes19/coder-tech-store.git
* Instala las dependencias necesarias: npm install
* Configura el entorno de tu emulador teniendo en cuenta que este proyecto trabaja con la SDK 51 de Expo Go

---

### Ejecutar la aplicación
* Inicia un emulador Android o abre la aplicación de Expo Go en tu dispositivo físico
* Ejecuta el siguiente comando: npx expo star
* En caso de estar en un emulador Android presiona la tecla A para abrir el proyecto en tu emulador
* En caso de estar en un dispositivo físico escanea el código QR que se muestra en pantalla
* Crea un usuario y empieza a explorar la aplicación

---

###### ¡Gracias por tu interés en el proyecto! Si tienes preguntas o sugerencias, no dudes en contactarme.
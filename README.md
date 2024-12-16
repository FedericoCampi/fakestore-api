# FakeStore API

Una API RESTful desarrollada con **NestJS** y **PostgreSQL** que consume datos de la FakeStore API y expone endpoints personalizados para gestionar productos.

## Características

- **Endpoints**:
  - Listar productos con detalles adicionales (stock aleatorio).
  - Obtener detalles de un producto específico.
  - Agregar productos al catálogo y almacenarlos en PostgreSQL.
  - Actualizar el stock de productos.
  - Eliminar productos del catálogo local.
- **Documentación**: Generada con Swagger.
- **Persistencia**: Usa PostgreSQL para almacenar datos.
- **Dockerización**: Configuración con Docker y Docker Compose.

---

## Requisitos

- **Node.js** (v16 o superior)
- **npm** o **yarn**
- **Docker** y **Docker Compose** (opcional)
- **PostgreSQL** instalado localmente (si no usas Docker)

---

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/fakestore-api.git
   cd fakestore-api

   npm install

2. Agregar al .env

   ```bash
   DB_HOST_DOCKER=db
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=tu_contraseña
   DB_NAME=fakestore
   PORT=5000

3. Levantar entorno desarrollo

     ```bash
     npm run start:dev

---

# Levantar contenedores
 
**docker-compose up --build**

---

# Swagger (Documentación de la API)
Visita **http://localhost:3000/api** para acceder a la documentación interactiva generada con Swagger.

---

# Ejecutar pruebas unitarias

  npm run test
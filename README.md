## API Catálogo de Cursos - Holguín

API edu-hlg-api, para la gestión de un catálogo de cursos públicos y privados en la provincia de Holguín, Cuba. Desarrollada inicialmente para atender las necesidades de la empresa Desoft, pero con alcance provincial para beneficio de toda la comunidad.

### Tabla de Contenidos

Descripción del Proyecto:

- Tecnologías Utilizadas
- Requisitos Previos
- Instalación

### Descripción del Proyecto

Esta API constituye el backend de un sistema de catálogo de cursos para la provincia de Holguín, permitiendo:

- Gestión completa de cursos (estatales y privados)

- Sistema de comentarios y valoraciones

- Autenticación y autorización de usuarios

- Clasificación de cursos por categorías

- Gestión de proveedores de cursos

El proyecto nace de la necesidad de centralizar y digitalizar la oferta educativa en la provincia, facilitando el acceso a la información sobre cursos disponibles tanto en el sector estatal como privado.

### Instalación:

- Primero se clona el repositorio y se4 instalan las dependencias requeridas.

```bash
# At project's root directory
npm install
```

- Luego se corre el `package.json` archivos de scrip para:
- Crear la base de datos a través del comando: ``sequelize db:create``
- Migrar los datos de la base de datos: ``sequelize db:migrate``
- Correr las semillas para obtener datos ficticios y comprobar las funcionalidades: ``sequelize db:seed:all``

- # SI USTED DESEA ELIMINAR LA BASE DE DATOS#: ``sequelize db:drop``

- Entonces para correr el proyecto:
```bash
# Start local project instance
nodemon ./src/bin/wwww
```

### Tecnologías Utilizadas

- Node.js 16 - Entorno de ejecución

- Express 4.x - Framework web

- Sequelize 6.x - ORM para base de datos

- PostgreSQL - Base de datos relacional

- JWT - Autenticación

- Yarn - Gestor de paquetes

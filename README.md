# App Web - Vehicle Management Documentation

Esta es una aplicación web construida con **Next.js** para gestionar vehículos y sus entradas/salidas. La aplicación permite realizar operaciones CRUD en vehículos y registrar entradas y salidas, proporcionando una interfaz intuitiva para administrar flotas de manera eficiente.

## Tecnologías Usadas

- **Next.js**: Framework para construir aplicaciones web en React, con funcionalidades de renderizado del lado del servidor y generación de sitios estáticos.
- **PrimeReact**: Biblioteca de componentes de UI para React, que permite crear una experiencia visual optimizada.
- **Axios**: Cliente HTTP para manejar peticiones a la API.
- **PrimeFlex**: Biblioteca de utilidades CSS para diseño flexible y responsive.
- **PrimeIcons**: Conjunto de iconos para enriquecer la UI de la aplicación.
- **TypeScript**: Lenguaje que mejora la escritura de código en JavaScript con tipado estático opcional.

## Pre-requisitos

- Node.js (versión 14 o superior)
- Git

## Estructura del Proyecto
```
📦VEHICLE-MANAGEMENT
 ┣ 📂app
 ┣ 📂hooks
 ┣ 📂layout
 ┣ 📂public
 ┣ 📂services
 ┣ 📂styles
 ┣ 📂types
 ┣ 📜next.config.js
 ┣ 📜.env.example
 ┣ 📜package.json
 ┗ 📜README.md
 ```

## Configuración del Ambiente Local

Sigue estos pasos para clonar y ejecutar el proyecto en tu máquina local.

### Paso 1: Clonar el Repositorio

Ejecuta el siguiente comando en tu terminal para clonar el repositorio:

```
git clone https://github.com/DanielDevHN/app-vehicles-management.git
```

### Paso 2: Instalar Dependencias

Navega a la carpeta del proyecto e instala las dependencias:

```
cd VEHICLE-MANAGEMENT
npm install
```

### Paso 3: Configurar Variables de Entorno

Crea un archivo .env en la raíz del proyecto y define la cadena de conexión para la base de datos PostgreSQL. Aquí tienes un ejemplo:

```
NEXT_PUBLIC_API_URL='http://localhost:3001'
```
Nota:: En el repositorio encontraras un archivo .env.example el cual puedes usar para crear tu .env

### Paso 4: Ejecutar la app

Inicia la app en modo de desarrollo:

```
npm run dev
```

La aplicación debería estar disponible en http://localhost:3000 de manera predeterminada.

## Funcionalidades Principales

- **Gestión de Vehículos**: CRUD completo para registrar, actualizar, listar y eliminar vehículos.
- **Registro de Entradas y Salidas**: Crear registros de entrada y salida de vehículos, incluyendo información de fecha, hora, kilometraje y motorista.
- **Filtrado y Búsqueda**: Filtros avanzados para buscar registros de entrada y salida por fecha, vehículo y motorista.

## Scripts Disponibles

- **```npm run dev```**: Inicia el servidor en modo de desarrollo.
- **```npm run build```**: Compila la aplicación para producción.
- **```npm start```**: Inicia el servidor en modo de producción después de compilar la aplicación.
- **```npm run lint```**: Ejecuta el linter para analizar el código y mantener su calidad.


## Contacto

Si tienes alguna duda o problema, no dudes en ponerte en contacto.

[dangrereyes@gmail.com](mailto:dangrereyes@gmail.com)

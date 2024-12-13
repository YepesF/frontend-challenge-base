# Quickbet Movies

Este proyecto es una aplicación desarrollada con [Next.js](https://nextjs.org/) que permite a los usuarios explorar películas, acceder a detalles de cada título y gestionar su lista de favoritos.

## Características

- Explorar una lista de películas populares.
- Buscar títulos específicos mediante una barra de búsqueda.
- Guardar películas en una lista personalizada de favoritos.
- Ver detalles completos de cada película, incluyendo sinopsis, calificación y género.

## Requisitos

Para ejecutar esta aplicación, es necesario configurar un archivo `.env.local` en el directorio raíz del proyecto con la siguiente variable de entorno:

```env
TMDB_TOKEN=tu_token_aqui
```

El token debe ser generado desde la API de [The Movie Database (TMDB)](https://www.themoviedb.org/).

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/YepesF/frontend-challenge-base.git
   cd frontend-challenge-base
   ```

2. Instala las dependencias:

   ```bash
   npm install
   # o
   yarn install
   ```

3. Crea el archivo `.env.local` y agrega tu token de TMDB:

   ```bash
   TMDB_TOKEN=tu_token_aqui
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación en acción.

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Compila el proyecto para producción.
- `npm run start`: Inicia el servidor en modo producción.
- `npm run lint`: Ejecuta linters para mantener la calidad del código.

## Estructura del Proyecto

- **`app/`**: Contiene las vistas principales de la aplicación.
- **`components/`**: Incluye componentes reutilizables como botones, formularios, etc.
- **`hooks/`**: Hooks personalizados para manejar lógica como local storage.
- **`styles/`**: Archivos de estilo global.
- **`public/`**: Recursos estáticos como imágenes.

## Despliegue

La aplicación está desplegada en **Vercel** y disponible en el siguiente enlace:  
[https://frontend-challenge-base-three.vercel.app/](https://frontend-challenge-base-three.vercel.app/)

## Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [API de The Movie Database (TMDB)](https://developers.themoviedb.org/3/getting-started)

---

**Nota:** Asegúrate de contar con Node.js instalado en tu sistema para ejecutar este proyecto correctamente.

# Huella Viva Veterinaria

Sitio de demostración para una veterinaria ficticia de Cochabamba. El repositorio separa el frontend Angular, el backend Node.js/Express y el esquema MySQL.

## Requisitos

- Node.js 24 o compatible con Angular 21.
- MySQL 8.0 o compatible.
- Ollama instalado y en ejecución en el mismo equipo que el backend, con el modelo `gemma3:4b` disponible.

## Preparar la base de datos

Crear e inicializar la base importando `database/schema.sql` en MySQL. El script incluye datos ficticios para el sitio.

## Iniciar el backend

```powershell
npm install
Copy-Item backend/.env.example backend/.env
# Completar la conexión MySQL; Ollama usa http://localhost:11434 por defecto
npm run start:backend
```

API local: `http://localhost:3000/api`. La ruta `GET /api/health` informa el estado de la API, MySQL y Ollama.

## Iniciar el frontend

```powershell
npm run start:frontend
```

Abrir `http://localhost:4200`. El frontend consume los datos de negocio, el formulario y el chatbot desde la API de Node.

## Variables del backend

Consultar `backend/.env.example`. `OLLAMA_BASE_URL` usa `http://localhost:11434` por defecto y `OLLAMA_MODEL` usa `gemma3:4b`. El backend llama a Ollama; Angular nunca se conecta directamente al modelo. Para usar otro puerto o un host distinto, cambia `OLLAMA_BASE_URL` en `backend/.env`.

## APIs principales

| Método | Ruta | Uso |
|---|---|---|
| GET | `/api/health` | Estado de la API, MySQL y Ollama |
| GET | `/api/services` | Servicios de la veterinaria |
| GET | `/api/specialties` | Especialidades veterinarias |
| GET | `/api/clinic` | Perfil, horario y galería |
| GET | `/api/prices` | Tarifario referencial |
| POST | `/api/contact` | Validar y guardar un mensaje de contacto |
| POST | `/api/chat` | Conversar con `gemma3:4b` usando el perfil, catálogo y precios actuales de MySQL como contexto |

## Contenido audiovisual

El video de portada enlaza al recurso de Pexels “Veterinarian Listening Heart Of Dog With Stethoscope”, de Tima Miroshnichenko. Se reproduce en bucle, sin audio, y la página ofrece una imagen alternativa si no carga. [Ver recurso en Pexels](https://www.pexels.com/video/veterinarian-listening-heart-of-dog-with-stethoscope-6235197/).

## Publicación

Antes de desplegar, configurar CORS con los dominios finales, establecer HTTPS y definir las variables del backend en el proveedor de alojamiento. Ollama debe ejecutarse en el mismo equipo o ser accesible desde el backend desplegado. Nunca subir archivos `.env`.

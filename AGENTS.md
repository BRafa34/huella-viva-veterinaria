# Guía del proyecto: sitio web de la veterinaria

## Objetivo

Construir un sitio web para una veterinaria con frontend en Angular, backend en Node.js y base de datos MySQL. El frontend debe obtener mediante APIs del backend todos los datos que se puedan administrar o mostrar como contenido del negocio. El sitio incluirá un chatbot conectado al Ollama local con el modelo `gemma3:4b`.

## Requisitos funcionales

- **Inicio:** presentar la veterinaria y mostrar un video de animales en reproducción continua. Buscar un video apropiado en Pexels y respetar sus condiciones de uso; almacenar en configuración la URL y cualquier atribución que corresponda. Incluir una imagen alternativa y controles de accesibilidad cuando el video no se pueda reproducir.
- **Servicios:** listar los servicios ofrecidos por la veterinaria.
- **Especialidades:** mostrar las áreas de atención y sus descripciones.
- **Nosotros:** mostrar historia, dirección, teléfono y fotos de la tienda/veterinaria.
- **Precios:** mostrar los precios disponibles, con moneda y notas claras cuando el precio sea referencial.
- **Contactos:** mostrar los canales de contacto y un formulario validado. El envío debe llegar a una API del backend y registrarse en MySQL; informar al usuario si se recibió o si ocurrió un error.
- **Chatbot:** crear desde cero una interfaz de conversación que se comunique únicamente con el backend. El backend se conecta al Ollama local en `http://localhost:11434` y usa el modelo ya descargado `gemma3:4b`. En cada consulta, dar al modelo el perfil, horario, catálogo de servicios, especialidades y precios actuales leídos desde MySQL. Mantener la URL y el nombre del modelo configurables en el entorno del backend; Angular no debe conectarse directamente a Ollama.

## Arquitectura prevista

Mantener frontend y backend como proyectos separados en el mismo repositorio:

- `frontend/`: aplicación Angular, componentes, páginas, servicios HTTP, modelos y configuración de entorno del frontend. No incluir credenciales ni conexión directa a MySQL/Ollama.
- `backend/`: aplicación Node.js con Express (salvo que el proyecto ya use otra estructura compatible), acceso a MySQL, APIs y conexión al servicio Ollama.
- `database/`: esquema, migraciones o scripts de creación y datos iniciales que no contengan datos personales reales.
- `README.md`: requisitos, instalación, configuración, arranque y uso del frontend, backend, MySQL y Ollama.

El frontend debe consumir APIs del backend para los datos del negocio. Mantener separadas las responsabilidades de rutas, controladores, modelos/acceso a datos y middleware. El backend debe exponer `App.js` como punto de entrada de la aplicación, según el requisito del proyecto.

## Backend requerido

Organizar el backend, como mínimo, en:

- `models/`: consultas y acceso a datos MySQL.
- `controllers/`: lógica de cada recurso y manejo de solicitudes.
- `middleware/`: validación, manejo centralizado de errores y otras funciones transversales necesarias.
- `routes/`: endpoints REST agrupados por recurso.
- `chatbot/`: cliente/adaptador de Ollama, instrucciones del asistente y lógica de conversación.
- `App.js`: configuración de Express, middleware y rutas.
- `.env.example`: nombres de variables necesarias y valores de ejemplo no secretos. El archivo local `.env` contiene la configuración real y debe estar excluido de Git.

Usar parámetros enlazados en consultas SQL. Validar y limitar los datos que recibe el servidor. No enviar errores internos, credenciales ni trazas al navegador.

## API y datos iniciales

Definir y documentar endpoints REST para, como mínimo:

- servicios;
- especialidades;
- información de la veterinaria y galería;
- precios;
- envío de mensajes del formulario de contacto;
- conversación con el chatbot;
- comprobación de salud del backend.

El diseño inicial de MySQL debe contemplar tablas para `services`, `specialties`, `clinic_info` (o perfil de la veterinaria), `gallery_photos`, `price_items` y `contact_messages`. Revisar si el modelo permite unir servicios y especialidades de forma directa o si hace falta una tabla de relación. Añadir tablas de conversación solo si el flujo del chatbot requiere guardar historial. Definir claves, restricciones e índices según las consultas de la aplicación. La veterinaria es ficticia: crear datos de demostración coherentes para nombre, historia, ubicación, teléfono, servicios y precios, sin presentarlos como datos de un negocio real.

## Seguridad, configuración y experiencia de uso

- No exponer credenciales de MySQL ni conectar Angular directamente con Ollama.
- Configurar el acceso local desde el backend mediante `OLLAMA_BASE_URL` (por defecto `http://localhost:11434`) y `OLLAMA_MODEL` (por defecto `gemma3:4b`). El backend y Ollama deben ejecutarse en el mismo equipo para que `localhost` apunte al servicio correcto.
- Configurar CORS para los orígenes de desarrollo y despliegue que realmente se utilicen.
- Validar en el backend los mensajes, consultas y formularios; aplicar límites razonables al chatbot y al formulario.
- Mostrar estados de carga, vacío y error en las páginas que dependen de APIs.
- Hacer el diseño adaptable a móvil y escritorio, con navegación accesible y etiquetas para formularios.
- Usar configuración distinta para desarrollo y producción. No subir `.env`, contraseñas, tokens ni información personal.

## Plan de trabajo

1. Confirmar las versiones de Node.js, Angular y MySQL compatibles con el entorno y comprobar que Ollama local ofrece el modelo `gemma3:4b`.
2. Definir estructura de carpetas, esquema inicial de MySQL, datos de ejemplo y contrato de APIs.
3. Implementar backend, configuración de entorno, conexión a MySQL, modelos, controladores, middleware, rutas y endpoint de salud.
4. Crear el chatbot desde cero y conectar el backend con Ollama local usando `gemma3:4b`. Documentar cómo iniciar Ollama y el backend en el mismo equipo.
5. Implementar el frontend Angular y conectar sus vistas y formularios a las APIs.
6. Integrar el video de Pexels, revisar atribución/licencia y añadir alternativa accesible.
7. Verificar los flujos principales de frontend, APIs, persistencia en MySQL y chatbot, y corregir fallos encontrados.
8. Preparar el repositorio para compartir: README, `.gitignore`, archivos de ejemplo y revisión para evitar secretos. Publicar frontend y backend en GitHub cuando se disponga del repositorio/cuenta y del destino acordado.

## Criterios de aceptación

- El proyecto contiene frontend Angular y backend Node.js diferenciados y documentados.
- Las páginas de servicios, especialidades, nosotros, precios y contacto obtienen su contenido desde APIs del backend.
- El formulario valida los datos y guarda correctamente los mensajes en MySQL.
- El chatbot conversa a través del backend con Ollama usando Gemma 3, o informa con claridad cuando Ollama no está disponible.
- El inicio muestra el video en bucle y ofrece una alternativa si no carga.
- La configuración sensible no se incluye en Git y existe una guía reproducible de instalación y ejecución.
- El proyecto puede compartirse en GitHub con frontend y backend identificables.

## Configuración necesaria para cada entorno

- Confirmar que Ollama esté iniciado y que el modelo configurado exista localmente antes de probar el chatbot.
- En un despliegue, alojar Ollama junto al backend o configurar `OLLAMA_BASE_URL` con una dirección alcanzable por el backend; el valor local por defecto solo funciona cuando ambos están en el mismo equipo.
- Usar un video permitido de Pexels y registrar la atribución correspondiente; no subir secretos ni archivos multimedia pesados al repositorio.

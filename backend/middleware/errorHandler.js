export function notFound(_req, res) {
  res.status(404).json({ message: 'No encontramos esa ruta.' });
}

export function errorHandler(error, _req, res, _next) {
  if (error.name === 'TimeoutError' || error.name === 'AbortError') {
    return res.status(504).json({ message: 'El asistente está tardando en responder. Intenta de nuevo en un momento.' });
  }
  if (error.cause?.code === 'ECONNREFUSED' || error.message === 'fetch failed') {
    return res.status(503).json({ message: 'No se pudo conectar con Ollama local. Abre Ollama y confirma que esté disponible en localhost:11434.' });
  }
  const status = Number.isInteger(error.status) ? error.status : 500;
  if (status >= 500) console.error(error.message);
  res.status(status).json({ message: status >= 500 ? 'Ocurrió un problema en el servidor. Intenta nuevamente.' : error.message });
}

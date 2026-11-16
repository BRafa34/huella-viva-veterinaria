export function validateContact(req, res, next) {
  const { name, email, phone = '', subject, message } = req.body || {};
  const errors = {};
  if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 120) errors.name = 'Escribe tu nombre (2 a 120 caracteres).';
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || email.length > 160) errors.email = 'Escribe un correo válido.';
  if (typeof phone !== 'string' || phone.length > 40) errors.phone = 'El teléfono no debe superar 40 caracteres.';
  if (typeof subject !== 'string' || subject.trim().length < 3 || subject.trim().length > 160) errors.subject = 'El asunto debe tener entre 3 y 160 caracteres.';
  if (typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 3000) errors.message = 'El mensaje debe tener entre 10 y 3000 caracteres.';
  if (Object.keys(errors).length) return res.status(400).json({ message: 'Revisa los datos del formulario.', errors });
  next();
}

export function validateChat(req, res, next) {
  const messages = req.body?.messages;
  const valid = Array.isArray(messages) && messages.length > 0 && messages.length <= 12 && messages.every(
    (item) => item && ['user', 'assistant'].includes(item.role) && typeof item.content === 'string' && item.content.trim().length > 0 && item.content.length <= 1200
  );
  if (!valid) return res.status(400).json({ message: 'Envía hasta 12 mensajes válidos, con un máximo de 1200 caracteres cada uno.' });
  next();
}

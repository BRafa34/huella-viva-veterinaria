import * as contentModel from '../models/contentModel.js';
import { pool } from '../config/database.js';
import { checkOllama } from '../chatbot/ollamaClient.js';

export async function services(_req, res, next) {
  try { res.json(await contentModel.getServices()); } catch (error) { next(error); }
}

export async function specialties(_req, res, next) {
  try { res.json(await contentModel.getSpecialties()); } catch (error) { next(error); }
}

export async function clinic(_req, res, next) {
  try {
    const result = await contentModel.getClinic();
    if (!result) return res.status(404).json({ message: 'No se encontró información de la veterinaria.' });
    res.json(result);
  } catch (error) { next(error); }
}

export async function prices(_req, res, next) {
  try { res.json(await contentModel.getPrices()); } catch (error) { next(error); }
}

export async function contact(req, res, next) {
  try {
    const { name, email, phone, subject, message } = req.body;
    const id = await contentModel.saveContact({ name: name.trim(), email: email.trim(), phone: phone?.trim(), subject: subject.trim(), message: message.trim() });
    res.status(201).json({ message: 'Gracias. Recibimos tu mensaje y pronto nos pondremos en contacto.', id });
  } catch (error) { next(error); }
}

export async function health(_req, res) {
  let database = 'ok';
  try { await pool.query('SELECT 1'); } catch { database = 'unavailable'; }
  const ollama = await checkOllama();
  res.status(database === 'ok' ? 200 : 503).json({ status: database === 'ok' ? 'ok' : 'degraded', database, ollama });
}

import { pool } from '../config/database.js';

export async function getServices() {
  const [rows] = await pool.execute(
    'SELECT id, name, description, icon, featured FROM services WHERE active = 1 ORDER BY display_order, name'
  );
  return rows;
}

export async function getSpecialties() {
  const [rows] = await pool.execute(
    'SELECT id, name, description, icon FROM specialties WHERE active = 1 ORDER BY display_order, name'
  );
  return rows;
}

export async function getClinic() {
  const [[clinic]] = await pool.execute(
    `SELECT name, tagline, story, address, phone, email, hours,
            hero_video_url AS heroVideoUrl, hero_video_credit AS heroVideoCredit,
            hero_video_source AS heroVideoSource, hero_image_url AS heroImageUrl,
            instagram_url AS instagramUrl, whatsapp_url AS whatsappUrl
     FROM clinic_info WHERE id = 1 LIMIT 1`
  );
  if (!clinic) return null;
  const [gallery] = await pool.execute(
    'SELECT id, image_url AS imageUrl, alt_text AS alt FROM gallery_photos WHERE active = 1 ORDER BY display_order, id'
  );
  return { ...clinic, gallery };
}

export async function getPrices() {
  const [rows] = await pool.execute(
    `SELECT id, name, description, amount, currency, note
     FROM price_items WHERE active = 1 ORDER BY display_order, name`
  );
  return rows;
}

export async function saveContact({ name, email, phone, subject, message }) {
  const [result] = await pool.execute(
    'INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
    [name, email, phone || null, subject, message]
  );
  return result.insertId;
}

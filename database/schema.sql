CREATE DATABASE IF NOT EXISTS huella_viva
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE huella_viva;

CREATE TABLE IF NOT EXISTS services (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  description VARCHAR(500) NOT NULL,
  icon VARCHAR(40) NOT NULL DEFAULT '✦',
  featured TINYINT(1) NOT NULL DEFAULT 0,
  display_order INT NOT NULL DEFAULT 0,
  active TINYINT(1) NOT NULL DEFAULT 1,
  UNIQUE KEY uq_services_name (name)
);

CREATE TABLE IF NOT EXISTS specialties (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  description VARCHAR(500) NOT NULL,
  icon VARCHAR(40) NOT NULL DEFAULT '✦',
  display_order INT NOT NULL DEFAULT 0,
  active TINYINT(1) NOT NULL DEFAULT 1,
  UNIQUE KEY uq_specialties_name (name)
);

CREATE TABLE IF NOT EXISTS clinic_info (
  id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
  name VARCHAR(140) NOT NULL,
  tagline VARCHAR(220) NOT NULL,
  story TEXT NOT NULL,
  address VARCHAR(240) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  email VARCHAR(160) NOT NULL,
  hours VARCHAR(240) NOT NULL,
  hero_video_url VARCHAR(500) NOT NULL,
  hero_video_credit VARCHAR(240) NOT NULL,
  hero_video_source VARCHAR(500) NOT NULL,
  hero_image_url VARCHAR(500) NOT NULL,
  instagram_url VARCHAR(500) DEFAULT NULL,
  whatsapp_url VARCHAR(500) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS gallery_photos (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  image_url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(240) NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  active TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS price_items (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(140) NOT NULL,
  description VARCHAR(300) DEFAULT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'BOB',
  note VARCHAR(240) DEFAULT NULL,
  display_order INT NOT NULL DEFAULT 0,
  active TINYINT(1) NOT NULL DEFAULT 1,
  UNIQUE KEY uq_price_items_name (name)
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL,
  phone VARCHAR(40) DEFAULT NULL,
  subject VARCHAR(160) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_contact_created_at (created_at)
);

INSERT INTO clinic_info
(id, name, tagline, story, address, phone, email, hours, hero_video_url, hero_video_credit, hero_video_source, hero_image_url, instagram_url, whatsapp_url)
VALUES
(1, 'Huella Viva', 'Cuidamos de quienes llenan tu vida de alegría.',
'Huella Viva es una veterinaria ficticia creada para este proyecto académico. Nació con una idea sencilla: cada mascota merece atención cercana, respetuosa y con tiempo para escuchar a su familia. Nuestro equipo reúne medicina preventiva, diagnóstico y cariño en un espacio pensado para que perros y gatos se sientan seguros.',
'Av. América Este #1245, Cochabamba, Bolivia', '+591 70765432', 'hola@huellaviva.demo',
'Lunes a sábado · 08:30–19:00 | Domingos · 09:00–13:00',
'https://videos.pexels.com/video-files/6235197/6235197-uhd_3840_2160_25fps.mp4',
'Video: Tima Miroshnichenko · Pexels',
'https://www.pexels.com/video/veterinarian-listening-heart-of-dog-with-stethoscope-6235197/',
'https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg?auto=compress&cs=tinysrgb&w=1600',
'https://www.instagram.com/', 'https://wa.me/59170765432')
ON DUPLICATE KEY UPDATE id = id;

INSERT INTO services (name, description, icon, featured, display_order) VALUES
('Consulta veterinaria', 'Revisión completa, orientación y plan de cuidado para cada etapa de vida.', '✳', 1, 1),
('Vacunación', 'Esquemas preventivos para perros y gatos, con seguimiento de sus próximas dosis.', '✦', 1, 2),
('Laboratorio clínico', 'Análisis de apoyo diagnóstico con explicación clara de los resultados.', '⌕', 1, 3),
('Cirugía', 'Procedimientos programados con evaluación y acompañamiento antes y después.', '＋', 1, 4),
('Peluquería y baño', 'Higiene y estética con productos adecuados a la piel y pelaje de tu mascota.', '✧', 0, 5),
('Farmacia veterinaria', 'Productos de cuidado y medicamentos con orientación profesional.', '＋', 0, 6)
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO specialties (name, description, icon, display_order) VALUES
('Medicina preventiva', 'Controles periódicos, vacunas y recomendaciones para mantener una vida saludable.', '♡', 1),
('Dermatología', 'Evaluación de piel, pelaje, alergias e irritaciones frecuentes.', '❋', 2),
('Odontología', 'Revisión de salud oral y orientación para prevenir molestias dentales.', '◉', 3),
('Medicina felina', 'Atención amable y adaptada a las necesidades de los gatos.', '⌁', 4)
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO gallery_photos (image_url, alt_text, display_order) VALUES
('https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg?auto=compress&cs=tinysrgb&w=900', 'Veterinaria revisando con cariño a un perro', 1),
('https://images.pexels.com/photos/6235666/pexels-photo-6235666.jpeg?auto=compress&cs=tinysrgb&w=900', 'Profesional veterinaria junto a un perro', 2),
('https://images.pexels.com/photos/7469214/pexels-photo-7469214.jpeg?auto=compress&cs=tinysrgb&w=900', 'Perro recibiendo atención en la clínica', 3)
ON DUPLICATE KEY UPDATE alt_text = VALUES(alt_text);

INSERT INTO price_items (name, description, amount, currency, note, display_order) VALUES
('Consulta general', 'Evaluación clínica de perros y gatos', 80.00, 'BOB', 'Precio referencial; puede variar según el caso.', 1),
('Vacuna antirrábica', 'Aplicación y registro de vacuna', 65.00, 'BOB', 'Precio referencial; confirmar disponibilidad.', 2),
('Baño para mascota pequeña', 'Baño higiénico y secado', 90.00, 'BOB', 'El costo final depende del pelaje.', 3),
('Corte de uñas', 'Servicio breve de higiene', 25.00, 'BOB', 'Precio referencial.', 4),
('Hemograma', 'Análisis de sangre básico', 120.00, 'BOB', 'Requiere evaluación veterinaria.', 5)
ON DUPLICATE KEY UPDATE name = VALUES(name);

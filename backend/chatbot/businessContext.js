import * as contentModel from '../models/contentModel.js';

const formatList = (items, render) => items.length ? items.map(render).join('\n') : 'Sin información cargada.';

export async function buildBusinessContext() {
  const [clinic, services, specialties, prices] = await Promise.all([
    contentModel.getClinic(),
    contentModel.getServices(),
    contentModel.getSpecialties(),
    contentModel.getPrices()
  ]);

  const profile = clinic ? [
    `Nombre: ${clinic.name}`,
    `Descripción: ${clinic.tagline}`,
    `Historia: ${clinic.story}`,
    `Dirección: ${clinic.address}`,
    `Teléfono: ${clinic.phone}`,
    `Correo: ${clinic.email}`,
    `Horario: ${clinic.hours}`,
    ...(clinic.whatsappUrl ? [`WhatsApp: ${clinic.whatsappUrl}`] : []),
    ...(clinic.instagramUrl ? [`Instagram: ${clinic.instagramUrl}`] : [])
  ].join('\n') : 'Perfil de la veterinaria: sin información cargada.';

  const serviceList = formatList(services, (item) => `- ${item.name}: ${item.description}`);
  const specialtyList = formatList(specialties, (item) => `- ${item.name}: ${item.description}`);
  const priceList = formatList(prices, (item) => {
    const amount = new Intl.NumberFormat('es-BO', { style: 'currency', currency: item.currency }).format(Number(item.amount));
    const note = item.note ? ` (${item.note})` : '';
    return `- ${item.name}: ${amount}${item.description ? ` — ${item.description}` : ''}${note}`;
  });

  return [
    'FICHA ACTUAL DE LA VETERINARIA (leída desde MySQL)',
    profile,
    'Servicios:', serviceList,
    'Especialidades:', specialtyList,
    'Precios:', priceList
  ].join('\n');
}

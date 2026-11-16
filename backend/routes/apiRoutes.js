import { Router } from 'express';
import { contact, clinic, health, prices, services, specialties } from '../controllers/apiController.js';
import { chat } from '../controllers/chatController.js';
import { validateChat, validateContact } from '../middleware/validate.js';

const router = Router();
router.get('/health', health);
router.get('/services', services);
router.get('/specialties', specialties);
router.get('/clinic', clinic);
router.get('/prices', prices);
router.post('/contact', validateContact, contact);
router.post('/chat', validateChat, chat);
export default router;

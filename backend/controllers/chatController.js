import { askOllama } from '../chatbot/ollamaClient.js';
import { buildBusinessContext } from '../chatbot/businessContext.js';

export async function chat(req, res, next) {
  try {
    const messages = req.body.messages.map(({ role, content }) => ({ role, content: content.trim() }));
    const businessContext = await buildBusinessContext();
    const reply = await askOllama(messages, businessContext);
    res.json({ reply });
  } catch (error) { next(error); }
}

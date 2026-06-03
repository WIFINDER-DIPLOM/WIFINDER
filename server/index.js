import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Пути к файлам с данными
const DATA_DIR = path.join(__dirname, 'data');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
const REACTIONS_FILE = path.join(DATA_DIR, 'reactions.json');

// ====== Утилиты для работы с файлами ======
async function readJSON(filePath, defaultValue = []) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    // Если файл не существует — создаём с дефолтным значением
    await writeJSON(filePath, defaultValue);
    return defaultValue;
  }
}

async function writeJSON(filePath, data) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

app.get('/api/contacts', async (req, res) => {
  const contacts = await readJSON(CONTACTS_FILE, []);
  res.json(contacts);
});

app.get('/api/messages/:chatId', async (req, res) => {
  const chatId = parseInt(req.params.chatId);
  const messages = await readJSON(MESSAGES_FILE, []);
  const chatMessages = messages.filter(m => m.chatId === chatId);
  res.json(chatMessages);
});

app.post('/api/messages', async (req, res) => {
  const messages = await readJSON(MESSAGES_FILE, []);
  const newMessage = {
    id: Date.now(),
    ...req.body,
    timestamp: new Date().toISOString(),
    status: 'sent',
    isRead: false,
    isEdited: false,
    replyTo: req.body.replyToId || null,
  };
  messages.push(newMessage);
  await writeJSON(MESSAGES_FILE, messages);
  res.status(201).json(newMessage);
});

app.delete('/api/messages/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  let messages = await readJSON(MESSAGES_FILE, []);
  messages = messages.filter(m => m.id !== id);
  await writeJSON(MESSAGES_FILE, messages);
  res.json({ success: true });
});

app.put('/api/messages/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { text } = req.body;
  const messages = await readJSON(MESSAGES_FILE, []);
  const message = messages.find(m => m.id === id);
  if (message) {
    message.text = text;
    message.isEdited = true;
    await writeJSON(MESSAGES_FILE, messages);
    res.json(message);
  } else {
    res.status(404).json({ error: 'Message not found' });
  }
});

app.post('/api/messages/read/:chatId', async (req, res) => {
  const chatId = parseInt(req.params.chatId);
  const CURRENT_USER_ID = 0;
  const messages = await readJSON(MESSAGES_FILE, []);
  messages.forEach(m => {
    if (m.chatId === chatId && m.senderId !== CURRENT_USER_ID) {
      m.isRead = true;
    }
  });
  await writeJSON(MESSAGES_FILE, messages);
  res.json({ success: true });
});

// Получить реакции сообщения
app.get('/api/reactions/:messageId', async (req, res) => {
  const messageId = parseInt(req.params.messageId);
  const reactions = await readJSON(REACTIONS_FILE, {});
  res.json(reactions[messageId] || []);
});

// Добавить/удалить реакцию
app.post('/api/reactions', async (req, res) => {
  const { messageId, emoji, userId } = req.body;
  const reactions = await readJSON(REACTIONS_FILE, {});
  
  if (!reactions[messageId]) reactions[messageId] = [];
  
  const existingIndex = reactions[messageId].findIndex(
    r => r.emoji === emoji && r.userId === userId
  );
  
  if (existingIndex >= 0) {
    reactions[messageId].splice(existingIndex, 1);
  } else {
    reactions[messageId].push({ userId, emoji });
  }
  
  await writeJSON(REACTIONS_FILE, reactions);
  res.json(reactions[messageId]);
});

// ====== Запуск сервера ======
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
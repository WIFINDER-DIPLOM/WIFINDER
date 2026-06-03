export const CURRENT_USER_ID = 0;

const tempAvatar = "./images/iconamoon_profile.svg"

export const contacts = [
  { id: 1, name: "Алексей Петров", avatar: tempAvatar, lastSeen: "был в 12:45", online: false, isGroup: false },
  { id: 2, name: "Мария Сидорова", avatar: tempAvatar, lastSeen: "онлайн", online: true, isGroup: false },
  { id: 3, name: "Рабочий чат", avatar: tempAvatar, lastSeen: "5 участников", online: false, isGroup: true },
  { id: 4, name: "Елена Козлова", avatar: tempAvatar, lastSeen: "была вчера", online: false, isGroup: false },
  { id: 5, name: "Дмитрий Волков", avatar: tempAvatar, lastSeen: "онлайн", online: true, isGroup: false },
  { id: 6, name: "Анна Краснова", avatar: tempAvatar, lastSeen: "была в 10:30", online: false, isGroup: false },
];

export const seedMessages = [
  { id: 1, chatId: 1, senderId: 1, text: "Привет! Как дела?", timestamp: "2024-01-15T10:00:00", status: "read", replyTo: null, isRead: true, isEdited: false },
  // ... остальные сообщения
];

export const reactions = {
  2: [{ userId: 1, emoji: "❤️" }],
  4: [{ userId: 1, emoji: "" }],
  8: [{ userId: 5, emoji: "" }, { userId: 0, emoji: "🎉" }],
};

export const MockDB = {
  getContacts: async () => new Promise((resolve) => setTimeout(() => resolve(contacts), 300)),
  getMessages: async (chatId) => new Promise((resolve) =>
    setTimeout(() => resolve(seedMessages.filter(m => m.chatId === chatId)), 300)
  ),
  sendMessage: async (msg) => new Promise((resolve) =>
    setTimeout(() => resolve({ ...msg, id: Date.now(), timestamp: new Date().toISOString() }), 500)
  ),
  deleteMessage: async (id) => new Promise((resolve) => setTimeout(() => resolve(true), 300)),
  editMessage: async (id, text) => new Promise((resolve) => setTimeout(() => resolve(true), 300)),
  markAsRead: async (chatId) => new Promise((resolve) => setTimeout(() => resolve(true), 200)),
  getReactions: async (messageId) => new Promise((resolve) =>
    setTimeout(() => resolve(reactions[messageId] || []), 200)
  ),
  addReaction: async (messageId, emoji) => new Promise((resolve) => setTimeout(() => resolve(true), 200)),
};
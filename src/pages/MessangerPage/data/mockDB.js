export const CURRENT_USER_ID = 0;

const API_BASE = "/api";

export const MockDB = {
  getContacts: async () => {
    const res = await fetch(`${API_BASE}/contacts`);
    return res.json();
  },

  getMessages: async (chatId) => {
    const res = await fetch(`${API_BASE}/messages/${chatId}`);
    return res.json();
  },

  sendMessage: async (msg) => {
    const res = await fetch(`${API_BASE}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msg),
    });
    return res.json();
  },

  deleteMessage: async (id) => {
    const res = await fetch(`${API_BASE}/messages/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },

  editMessage: async (id, text) => {
    const res = await fetch(`${API_BASE}/messages/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    return res.json();
  },

  markAsRead: async (chatId) => {
    const res = await fetch(`${API_BASE}/messages/read/${chatId}`, {
      method: "POST",
    });
    return res.json();
  },

  getReactions: async (messageId) => {
    const res = await fetch(`${API_BASE}/reactions/${messageId}`);
    return res.json();
  },

  addReaction: async (messageId, emoji) => {
    const res = await fetch(`${API_BASE}/reactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messageId, emoji, userId: CURRENT_USER_ID }),
    });
    return res.json();
  },
};

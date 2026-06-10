import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import ChatView from "../../components/ChatView/ChatView";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
import EmptyChat from "../../components/ChatView/EmptyChat/EmptyChat";
import { MessengerContext } from "./context/MessengerContext";
import { MockDB, CURRENT_USER_ID } from "./data/mockDB";

const MessengerPage = () => {
  const { chatId: paramChatId } = useParams();
  const initialChatId = paramChatId ? parseInt(paramChatId) : null;

  const [activeChat, setActiveChat] = useState(initialChatId);
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    MockDB.getContacts()
      .then(setContacts)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (activeChat) {
      setLoading(true);
      MockDB.getMessages(activeChat)
        .then((msgs) =>
          setMessages((prev) => ({ ...prev, [activeChat]: msgs })),
        )
        .finally(() => setLoading(false));
    }
  }, [activeChat]);

  const sendMessage = useCallback(async (chatId, text, replyTo) => {
    const newMsg = await MockDB.sendMessage({
      chatId,
      senderId: CURRENT_USER_ID,
      text,
      replyTo,
    });
    setMessages((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMsg],
    }));
  }, []);

  const deleteMessage = useCallback(async (msgId) => {
    await MockDB.deleteMessage(msgId);
    setMessages((prev) => {
      const updated = {};
      Object.keys(prev).forEach((chatId) => {
        updated[chatId] = prev[chatId].map((m) =>
          m.id === msgId ? { ...m, isDeleted: true, text: "" } : m,
        );
      });
      return updated;
    });
  }, []);

  const editMessage = useCallback(async (msgId, text) => {
    await MockDB.editMessage(msgId, text);
    setMessages((prev) => {
      const updated = {};
      Object.keys(prev).forEach((chatId) => {
        updated[chatId] = prev[chatId].map((m) =>
          m.id === msgId ? { ...m, text, isEdited: true } : m,
        );
      });
      return updated;
    });
  }, []);

  const lastMessages = {};
  const unreadCounts = {};
  Object.keys(messages).forEach((chatId) => {
    const chatMsgs = messages[chatId] || [];
    lastMessages[chatId] = chatMsgs.filter((m) => !m.isDeleted);
    unreadCounts[chatId] = chatMsgs.filter(
      (m) => !m.isDeleted && m.senderId !== CURRENT_USER_ID && !m.isRead,
    ).length;
  });

  const contextValue = {
    contacts,
    messages,
    lastMessages,
    unreadCounts,
    sendMessage,
    deleteMessage,
    editMessage,
  };

  return (
    <MessengerContext.Provider value={contextValue}>
      <div
        style={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {loading && activeChat && <LoadingOverlay />}
        <Sidebar
          activeChat={activeChat}
          onSelectChat={setActiveChat}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        {activeChat ? <ChatView chatId={activeChat} /> : <EmptyChat />}
      </div>
    </MessengerContext.Provider>
  );
};

export default MessengerPage;

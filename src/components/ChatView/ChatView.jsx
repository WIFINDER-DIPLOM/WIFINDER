import React, { useState, useEffect, useRef, useCallback, useContext, useMemo } from 'react';
import { MessengerContext } from '../../pages/MessangerPage/context/MessengerContext';
import ChatHeader from './ChatHeader/ChatHeader';
import MessageBubble from './MessageBubble/MessageBubble';
import EmojiPicker from './EmojiPicker/EmojiPicker';
import TypingIndicator from './TypingIndicator/TypingIndicator';
import EmptyChat from './EmptyChat/EmptyChat';
import styles from './ChatView.module.css';
import { CURRENT_USER_ID, MockDB } from '../../pages/MessangerPage/data/mockDB';

export default function ChatView({ chatId }) {
  const { messages, sendMessage, deleteMessage, editMessage, contacts } = useContext(MessengerContext);
  const [text, setText] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [reactions, setReactions] = useState({});
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const contact = contacts.find(c => c.id === chatId);
  const chatMessages = messages[chatId] || [];

  useEffect(() => { 
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); 
  }, [chatMessages, typing]);

  useEffect(() => { 
    MockDB.markAsRead(chatId); 
  }, [chatId]);

  useEffect(() => {
    if (contact && !contact.isGroup) {
      let hideTimeout;
      const timeout = setTimeout(() => { 
        setTyping(true); 
        hideTimeout = setTimeout(() => setTyping(false), 3000); 
      }, 2000 + Math.random() * 3000);
      
      return () => {
        clearTimeout(timeout);
        clearTimeout(hideTimeout);
      };
    }
  }, [chatId, contact, chatMessages.length]);

  const handleSend = useCallback(() => {
    if (!text.trim()) return;
    sendMessage(chatId, text.trim(), replyTo?.id || null);
    setText(''); 
    setReplyTo(null); 
    setShowEmoji(false);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  }, [text, chatId, replyTo, sendMessage]);

  const handleKeyDown = (e) => { 
    if (e.key === 'Enter' && !e.shiftKey) { 
      e.preventDefault(); 
      handleSend(); 
    } 
  };

  const handleAutoResize = useCallback((e) => { 
    e.target.style.height = 'auto'; 
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'; 
    setText(e.target.value); 
  }, []);

  const handleReaction = useCallback((messageId, emoji) => {
    MockDB.addReaction(messageId, emoji);
    setReactions(prev => {
      const existing = prev[messageId] || [];
      const hasReaction = existing.find(r => r.emoji === emoji && r.userId === CURRENT_USER_ID);
      if (hasReaction) {
        return { 
          ...prev, 
          [messageId]: existing.filter(r => !(r.emoji === emoji && r.userId === CURRENT_USER_ID)) 
        };
      }
      return { 
        ...prev, 
        [messageId]: [...existing, { userId: CURRENT_USER_ID, emoji }] 
      };
    });
  }, []);

  const groupedMessages = useMemo(() => {
    const result = [];
    let currentDate = null;
    chatMessages.forEach(msg => {
      const msgDate = new Date(msg.timestamp).toDateString();
      if (msgDate !== currentDate) {
        currentDate = msgDate;
        result.push({ 
          type: 'date', 
          value: new Date(msg.timestamp).toLocaleDateString('ru-RU', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          }) 
        });
      }
      result.push({ type: 'message', value: msg });
    });
    return result;
  }, [chatMessages]);

  if (!contact) return <div className={styles['chat-area']}><EmptyChat /></div>;

  return (
    <div className={styles['chat-area']}>
      <div className={styles['chat-bg-pattern']} />
      <ChatHeader contact={contact} />
      <div className={styles['messages-container']}>
        <div className={styles['messages-inner']}>
          {groupedMessages.map((item, i) =>
            item.type === 'date' ? (
              <div className={styles['date-separator']} key={`date-${i}`}>
                <span>{item.value}</span>
              </div>
            ) : (
              <MessageBubble 
                key={item.value.id} 
                msg={item.value} 
                contact={contact}
                onReply={setReplyTo} 
                onDelete={deleteMessage} 
                onEdit={editMessage}
                onReact={handleReaction} 
                reactions={reactions} 
              />
            )
          )}
          {typing && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {replyTo && (
        <div className={styles['reply-bar']}>
          <div className={styles['reply-content']}>
            <div className={styles['reply-bar-line']} />
            <div>
              <div className={styles['reply-bar-name']}>
                {replyTo.senderId === CURRENT_USER_ID ? 'Вы' : contact.name}
              </div>
              <div className={styles['reply-bar-text']}>{replyTo.text}</div>
            </div>
          </div>
          <button className={styles['reply-close-btn']} onClick={() => setReplyTo(null)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
      )}

      <div className={styles['input-area']} style={{ position: 'relative' }}>
        <div className={styles['input-wrapper']}>
          <button className={styles['input-btn']} title="Прикрепить">
            <svg viewBox="0 0 24 24">
              <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
            </svg>
          </button>
          <div className={styles['input-field-wrapper']}>
            <textarea 
              ref={textareaRef} 
              className={styles['message-input']}
              placeholder="Написать сообщение..." 
              value={text}
              onChange={handleAutoResize} 
              onKeyDown={handleKeyDown} 
              rows={1} 
            />
            <div className={styles['emoji-btn']} onClick={() => setShowEmoji(!showEmoji)}>
              <svg viewBox="0 0 24 24">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
              </svg>
            </div>
          </div>
          {text.trim() ? (
            <button className={styles['send-btn']} onClick={handleSend}>
              <svg viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          ) : (
            <button 
              className={`${styles['send-btn']} ${isRecording ? styles.recording : ''}`} 
              onClick={() => setIsRecording(!isRecording)}
            >
              <svg viewBox="0 0 24 24">
                {isRecording ? (
                  <path d="M6 6h12v12H6z"/>
                ) : (
                  <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                )}
              </svg>
            </button>
          )}
        </div>
        {showEmoji && (
          <EmojiPicker 
            onSelect={emoji => { 
              setText(prev => prev + emoji); 
              if (textareaRef.current) textareaRef.current.focus(); 
            }} 
            close={() => setShowEmoji(false)} 
          />
        )}
      </div>
    </div>
  );
}
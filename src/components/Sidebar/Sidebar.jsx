import React, { useContext } from 'react';
import { MessengerContext } from '../../pages/MessangerPage/context/MessengerContext';
import styles from './Sidebar.module.css';

export default function Sidebar({ activeChat, onSelectChat, searchTerm, onSearchChange }) {
  const { contacts, lastMessages, unreadCounts } = useContext(MessengerContext);

  const filtered = contacts.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const d = new Date(timestamp);
    const now = new Date();
    if (d.toDateString() === now.toDateString())
      return d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    const diff = (now - d) / (1000 * 60 * 60 * 24);
    if (diff < 7) return d.toLocaleDateString('ru-RU', { weekday: 'short' });
    return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles['sidebar-header']}>
        <div className={styles['sidebar-back']} onClick={() =>  window.history.back()}>
          <svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
        </div>
        <div className={styles['sidebar-search']}>
          <svg className={styles['sidebar-search-icon']} viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          <input type="text" placeholder="Поиск" value={searchTerm} onChange={e => onSearchChange(e.target.value)} />
        </div>
      </div>
      <div className={styles['chat-list']}>
        {filtered.map(contact => {
          const msgs = lastMessages[contact.id] || [];
          const lastMsg = msgs[msgs.length - 1];
          const unread = unreadCounts[contact.id] || 0;
          return (
            <div
              key={contact.id}
              className={`${styles['chat-item']} ${activeChat === contact.id ? styles.active : ''}`}
              onClick={() => onSelectChat(contact.id)}
            >
              <div className={styles['chat-item-avatar']}>
               <img width="50" height="50" src="https://img.icons8.com/material-outlined/50/FFFFFF/user-male-circle.png" alt="user-male-circle"/>
                {contact.online && <div className={styles['online-dot']} />}
              </div>
              <div className={styles['chat-item-content']}>
                <div className={styles['chat-item-top']}>
                  <span className={styles['chat-item-name']}>{contact.name}</span>
                  {lastMsg && <span className={styles['chat-item-time']}>{formatDate(lastMsg.timestamp)}</span>}
                </div>
                <div className={styles['chat-item-bottom']}>
                  <span className={styles['chat-item-preview']}>
                    {lastMsg && (
                      <>
                        {lastMsg.senderId == 0 && !contact.isGroup && <span className={styles.sender}>Вы: </span>}
                        {lastMsg.isDeleted ? 'Сообщение удалено' : lastMsg.text}
                      </>
                    )}
                  </span>
                  {unread > 0 && <span className={styles['chat-item-badge']}>{unread}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
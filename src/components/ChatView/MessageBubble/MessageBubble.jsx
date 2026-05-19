import React, { useState, useRef, useEffect } from 'react';
import styles from './MessageBubble.module.css';
import { CURRENT_USER_ID } from '../../../pages/MessangerPage/data/mockDB';

export default function MessageBubble({ msg, contact, onReply, onDelete, onEdit, onReact, reactions }) {
  const [showCtx, setShowCtx] = useState(null);
  const [editText, setEditText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const editInputRef = useRef(null);

  const isOutgoing = msg.senderId === CURRENT_USER_ID;
  const timeStr = new Date(msg.timestamp).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  const replyMsg = msg.replyTo ? window.seedMessages?.find(m => m.id === msg.replyTo) : null;
  const msgReactions = reactions[msg.id] || [];

  useEffect(() => { if (isEditing && editInputRef.current) { editInputRef.current.focus(); editInputRef.current.select(); } }, [isEditing]);

  const handleCtx = (e) => { e.preventDefault(); setShowCtx({ x: e.clientX, y: e.clientY }); };
  const closeCtx = () => setShowCtx(null);
  const handleEdit = () => { if (editText.trim()) { onEdit(msg.id, editText.trim()); setIsEditing(false); } };

  return (
    <>
      <div className={`${styles.message} ${isOutgoing ? styles.outgoing : styles.incoming}`} onContextMenu={handleCtx}>
        <div className={styles['message-bubble']}>
          {msg.isDeleted ? (
            <div className={styles['deleted-message']}>Сообщение удалено</div>
          ) : isEditing ? (
            <div>
              <input
                ref={editInputRef}
                value={editText}
                onChange={e => setEditText(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleEdit(); if (e.key === 'Escape') setIsEditing(false); }}
                className={styles['edit-input']}
              />
              <div className={styles['edit-actions']}>
                <button onClick={handleEdit} className={styles['edit-save-btn']}>Сохранить</button>
                <button onClick={() => setIsEditing(false)} className={styles['edit-cancel-btn']}>Отмена</button>
              </div>
            </div>
          ) : (
            <>
              {replyMsg && (
                <div className={styles['reply-block']} onClick={() => onReply && onReply(replyMsg)}>
                  <div className={styles['reply-name']}>{replyMsg.senderId === CURRENT_USER_ID ? 'Вы' : contact.name}</div>
                  <div className={styles['reply-text']}>{replyMsg.text}</div>
                </div>
              )}
              <span className={styles['message-text']}>{msg.text}</span>
              <span className={styles['message-meta']}>
                {msg.isEdited && <span className={styles['edited-label']}>ред.</span>}
                <span className={styles['message-time']}>{timeStr}</span>
                {isOutgoing && (
                  <span className={`${styles['message-status']} ${msg.isRead ? styles.read : ''}`}>
                    {msg.status === 'sent' ? (
                      <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    ) : (
                      <svg viewBox="0 0 24 24"><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"/></svg>
                    )}
                  </span>
                )}
              </span>
            </>
          )}
          {msgReactions.length > 0 && (
            <div className={styles['message-reactions']}>
              {msgReactions.map((r, i) => (
                <span
                  key={i}
                  className={`${styles['reaction-chip']} ${r.userId === CURRENT_USER_ID ? styles.active : ''}`}
                  onClick={() => onReact && onReact(msg.id, r.emoji)}
                >
                  {r.emoji} <span className={styles.count}>{msgReactions.filter(x => x.emoji === r.emoji).length}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {showCtx && (
        <>
          <div className={styles['context-menu']} style={{ top: showCtx.y, left: Math.min(showCtx.x, window.innerWidth - 200) }}>
            {!msg.isDeleted && !isOutgoing && (
              <div className={styles['ctx-item']} onClick={() => { onReply && onReply(msg); closeCtx(); }}>
                <svg viewBox="0 0 24 24"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/></svg>
                Ответить
              </div>
            )}
            {isOutgoing && !msg.isDeleted && (
              <div className={styles['ctx-item']} onClick={() => { setEditText(msg.text); setIsEditing(true); closeCtx(); }}>
                <svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                Редактировать
              </div>
            )}
            <div className={`${styles['ctx-item']} ${styles.danger}`} onClick={() => { onDelete && onDelete(msg.id); closeCtx(); }}>
              <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
              Удалить
            </div>
          </div>
          <div className={styles['context-overlay']} onClick={closeCtx} />
        </>
      )}
    </>
  );
}
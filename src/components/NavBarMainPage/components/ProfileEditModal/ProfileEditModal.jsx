import React from "react";
import styles from "../../NavBarMainPage.module.css";

const ProfileEditModal = ({ isOpen, onClose, form, onChange, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3>Редактирование профиля</h3>
        <div className={styles.editForm}>
          <label>Имя</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Имя"
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Email"
          />
          <label>Телефон</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="Телефон"
          />
        </div>
        <div className={styles.modalButtons}>
          <button onClick={onClose} className={styles.cancelBtn}>
            Отмена
          </button>
          <button onClick={onSave} className={styles.saveBtn}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
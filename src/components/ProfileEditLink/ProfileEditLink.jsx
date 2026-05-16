import React, { useState } from 'react';
import {
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography
} from '@mui/material';

const ProfileEditLink = () => {
  // Состояние открытия диалога
  const [open, setOpen] = useState(false);
  
  // Состояние данных профиля (пример)
  const [profile, setProfile] = useState({
    name: 'Румянцев Владимир',
    email: 'vladimir777@gmail.com',
    phone: '+7 123 456-78-90'
  });

  // Локальные копии для редактирования в форме
  const [editForm, setEditForm] = useState({ ...profile });

  // Обработчик открытия диалога
  const handleOpen = (e) => {
    e.preventDefault(); // если нужно предотвратить переход по ссылке
    setEditForm({ ...profile }); // синхронизируем с текущими данными
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setProfile({ ...editForm }); // сохраняем изменения
    setOpen(false);
    // можно добавить уведомление
    console.log('Профиль обновлён:', editForm);
  };

  return (
    <Box>
      {/* Ссылка, при клике открывает форму */}
      <Link
        href="#"
        onClick={handleOpen}
        underline="hover"
        sx={{ cursor: 'pointer' }}
      >
        Редактировать профиль
      </Link>

      {/* Модальное окно с формой */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Редактирование профиля</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Имя"
              name="name"
              value={editForm.name}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={editForm.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Телефон"
              name="phone"
              value={editForm.phone}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Для демонстрации выводим текущие данные профиля */}
      <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
        Текущий профиль: {profile.name}, {profile.email}, {profile.phone}
      </Typography>
    </Box>
  );
};

export default ProfileEditLink;
import React, { useState } from 'react';
import PlayerAvatarUploader from './PlayerAvatarUploader';

const PlayerForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    USERNAME: initialData.USERNAME || '',
    EMAIL: initialData.EMAIL || '',
    AGE: initialData.AGE || '',
    TEAM_id: initialData.TEAM_id || '',
    POSITION_id: initialData.POSITION_id || '',
    NATIONALITY_id: initialData.NATIONALITY_id || '',
    level: initialData.level || '',
    rank: initialData.rank || '',
    avatar: initialData.avatar || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarUpload = (avatarUrl) => {
    setFormData({ ...formData, avatar: avatarUrl });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="USERNAME" value={formData.USERNAME} onChange={handleChange} placeholder="Username" className="input" />
      <input name="EMAIL" value={formData.EMAIL} onChange={handleChange} placeholder="Email" className="input" />
      <input name="AGE" value={formData.AGE} onChange={handleChange} placeholder="Age" className="input" />
      <input name="level" value={formData.level} onChange={handleChange} placeholder="Level" className="input" />
      <input name="rank" value={formData.rank} onChange={handleChange} placeholder="Rank" className="input" />
      <PlayerAvatarUploader onUpload={handleAvatarUpload} />
      <button type="submit" className="btn">Save Player</button>
    </form>
  );
};

export default PlayerForm;

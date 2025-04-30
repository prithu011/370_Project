import React from 'react';

const PlayerAvatarUploader = ({ onUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fakeUrl = URL.createObjectURL(file); // Replace with actual upload logic
    onUpload(fakeUrl);
  };

  return <input type="file" accept="image/*" onChange={handleFileChange} className="input" />;
};

export default PlayerAvatarUploader;

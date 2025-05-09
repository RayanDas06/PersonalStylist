import React, { useState } from 'react';
import '../style/ClosetUpload.css';

const ClosetUpload = () => {
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [descriptions, setDescriptions] = useState<string[]>([]);


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(e.target.files || []);
  setImages((prev) => [...prev, ...files]);

  const newPreviews = files.map((file) => URL.createObjectURL(file));
  setPreviews((prev) => [...prev, ...newPreviews]);

  setDescriptions((prev) => [...prev, ...files.map(() => '')]); // Start with empty descriptions
    };

    const handleDescriptionChange = (index: number, value: string) => {
    const updated = [...descriptions];
    updated[index] = value;
    setDescriptions(updated);
    };


  return (
    <div className="closet-container">
      <h2>Your Closet</h2>

      <label className="upload-button">
        Choose Images
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </label>


      <div className="gallery">
        {previews.map((src, index) => (
          <div className="gallery-item" key={index}>
            <img src={src} alt={`Clothing ${index}`} />
            <p className="description">Item {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClosetUpload;


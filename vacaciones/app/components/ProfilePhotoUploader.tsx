import React, { useState } from "react";
import { uploadProfilePhoto, setProfilePhotoUrl } from "../services/api";
import type { ChangeEvent } from "react";

interface ProfilePhotoUploaderProps {
  onUpload: (url: string) => void;
}

const ProfilePhotoUploader: React.FC<ProfilePhotoUploaderProps> = ({ onUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          const imageUrl = data.url;
          setPreview(imageUrl);
          onUpload(imageUrl);
        } else {
          console.error("Error al subir la imagen");
        }
      } catch (error) {
        console.error("Error al subir la imagen", error);
      }
    }
  };

  return (
    <div className="text-black">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Vista previa" className="mt-2 w-32 h-32 object-cover rounded-full" />}
    </div>
  );
};

export default ProfilePhotoUploader;

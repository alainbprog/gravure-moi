import { useState } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';

export default function CustomizationModal({ isOpen, onClose, product, onAddToCart }) {
  const [customText, setCustomText] = useState("");
  const [fontStyle, setFontStyle] = useState("classic");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageName, setImageName] = useState("");

  if (!isOpen) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("L'image ne doit pas dépasser 5 Mo");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target.result);
      setImageName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImageName("");
  };

  const handleAdd = () => {
    onAddToCart({
      ...product,
      customText: customText.trim() || "Texte à graver",
      fontStyle,
      customImage: uploadedImage,
      imageName
    });
    onClose();
    setCustomText("");
    setUploadedImage(null);
    setImageName("");
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[95vh] overflow-hidden flex flex-col">
        
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">Personnaliser votre gravure</h2>
          <button onClick={onClose}><X size={28} /></button>
        </div>

        <div className="flex-1 p-6 space-y-6 overflow-auto">
          {/* Preview */}
          <div className="bg-amber-50 border-2 border-dashed border-amber-300 rounded-2xl p-6 text-center">
            <p className="text-amber-800 mb-4">Prévisualisation</p>
            <div className="bg-white border rounded-2xl p-8 min-h-[200px] flex flex-col items-center justify-center gap-4">
              {uploadedImage && <img src={uploadedImage} className="max-h-40 object-contain rounded" />}
              {customText && <p className="text-lg font-medium">{customText}</p>}
              {!uploadedImage && !customText && <p className="text-gray-400">Votre gravure apparaîtra ici</p>}
            </div>
          </div>

          {/* Upload Image */}
          <div>
            <label className="block font-medium mb-2">Image à graver (optionnel)</label>
            {!uploadedImage ? (
              <label className="border-2 border-dashed border-gray-300 hover:border-amber-400 rounded-2xl p-10 flex flex-col items-center cursor-pointer">
                <Upload size={40} className="text-amber-600 mb-3" />
                <span className="font-medium">Choisir une photo ou logo</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            ) : (
              <div className="flex items-center gap-4 bg-amber-50 p-4 rounded-2xl">
                <img src={uploadedImage} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1 truncate">{imageName}</div>
                <button onClick={removeImage} className="text-red-500"><Trash2 size={24} /></button>
              </div>
            )}
          </div>

          {/* Texte */}
          <div>
            <label className="block font-medium mb-2">Texte à graver</label>
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Ex: Joyeux anniversaire Marie ❤️"
              className="w-full h-28 p-4 border rounded-2xl focus:ring-amber-500"
              maxLength={120}
            />
            <p className="text-xs text-right text-gray-500">{customText.length}/120 caractères</p>
          </div>
        </div>

        <div className="p-6 border-t flex gap-3">
          <button onClick={onClose} className="flex-1 py-4 border rounded-2xl font-medium">Annuler</button>
          <button onClick={handleAdd} className="flex-1 py-4 bg-amber-700 text-white rounded-2xl font-semibold">Ajouter au panier</button>
        </div>
      </div>
    </div>
  );
}

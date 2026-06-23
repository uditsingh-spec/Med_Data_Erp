import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, X, Camera } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  onChange: (file: File | null) => void;
  error?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ label, onChange, error }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit.");
        return;
      }
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setPreview(null);
    onChange(null);
  };

  // WebRTC Camera Logic for Desktop/Devices where 'capture' doesn't invoke native camera
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 4096 },
          height: { ideal: 2160 }
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
    } catch (err) {
      alert("Could not access camera. Please allow permissions or use file upload.");
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "camera-photo.jpg", { type: "image/jpeg" });
            onChange(file);
            setPreview(URL.createObjectURL(blob));
            stopCamera();
          }
        }, 'image/jpeg', 0.95);
      }
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl ${error ? 'border-red-300' : 'border-slate-300'}`}>
        {preview ? (
          <div className="relative">
            <img src={preview} alt="Preview" className="h-32 w-auto object-cover rounded-lg" />
            <button
              type="button"
              onClick={clearImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : isCameraActive ? (
          <div className="w-full flex flex-col items-center">
            <video ref={videoRef} autoPlay playsInline className="w-full max-w-sm rounded-lg bg-black mb-4 h-48 object-cover"></video>
            <div className="flex space-x-3">
              <button type="button" onClick={stopCamera} className="px-4 py-2 text-sm text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Cancel</button>
              <button type="button" onClick={capturePhoto} className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center">
                <Camera className="w-4 h-4 mr-2" /> Snap Photo
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-center w-full">
            <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
            <div className="flex flex-col items-center space-y-3">
              <label htmlFor="file-upload" className="relative cursor-pointer bg-white border border-slate-200 px-4 py-2 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 flex items-center justify-center w-full max-w-[200px]">
                <span>Upload a file</span>
                <input id="file-upload" name="file-upload" type="file" accept="image/jpeg, image/png, image/webp" className="sr-only" onChange={handleFileChange} />
              </label>
              <div className="text-sm text-slate-400 font-medium">OR</div>
              <button 
                type="button" 
                onClick={startCamera}
                className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center justify-center w-full max-w-[200px]"
              >
                <Camera className="w-4 h-4 mr-2" /> Take Photo
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2">PNG, JPG, WEBP up to 10MB</p>
          </div>
        )}
      </div>
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default ImageUploader;

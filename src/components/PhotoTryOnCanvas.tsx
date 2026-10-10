import React, { useState, useRef, ChangeEvent } from 'react';
import { OutfitState } from '../types/fashion';
import { GARMENT_CATALOG } from '../data/catalog';
import { Upload, X, Sliders, Info, AlertCircle, Camera, Check, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react';
import { playShutterSound } from '../utils/sound';

interface PhotoTryOnCanvasProps {
  outfit: OutfitState;
  onUpdatePhoto: (photoUrl: string | null) => void;
  onOpenSnapshot: () => void;
}

export const PhotoTryOnCanvas: React.FC<PhotoTryOnCanvasProps> = ({
  outfit,
  onUpdatePhoto,
  onOpenSnapshot,
}) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [photoScale, setPhotoScale] = useState<number>(outfit.photoScale || 1);
  const [garmentOpacity, setGarmentOpacity] = useState<number>(0.92);
  const [blendMode, setBlendMode] = useState<'normal' | 'multiply' | 'screen'>('normal');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { userPhotoUrl, selectedGarments, garmentColors } = outfit;

  const tunicItem = selectedGarments.tunic ? GARMENT_CATALOG.find((g) => g.id === selectedGarments.tunic) : null;
  const outerItem = selectedGarments.outerwear ? GARMENT_CATALOG.find((g) => g.id === selectedGarments.outerwear) : null;
  const headItem = selectedGarments.headwear ? GARMENT_CATALOG.find((g) => g.id === selectedGarments.headwear) : null;
  const jewelryItem = selectedGarments.jewelry ? GARMENT_CATALOG.find((g) => g.id === selectedGarments.jewelry) : null;

  const tunicColor = (tunicItem && garmentColors[tunicItem.id]) || tunicItem?.defaultColorHex || '#B91C1C';
  const outerColor = (outerItem && garmentColors[outerItem.id]) || outerItem?.defaultColorHex || '#059669';
  const headColor = (headItem && garmentColors[headItem.id]) || headItem?.defaultColorHex || '#18181B';
  const jewelryColor = (jewelryItem && garmentColors[jewelryItem.id]) || jewelryItem?.defaultColorHex || '#E2E8F0';

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Vui lòng chọn tệp hình ảnh hợp lệ (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('Kích thước ảnh quá lớn (tối đa 10MB). Vui lòng chọn ảnh nhẹ hơn.');
      return;
    }

    setErrorMessage(null);
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setTimeout(() => {
        setIsProcessing(false);
        onUpdatePhoto(result);
      }, 600);
    };
    reader.onerror = () => {
      setIsProcessing(false);
      setErrorMessage('Không thể đọc tệp ảnh. Vui lòng thử lại với ảnh khác.');
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    onUpdatePhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="relative w-full h-full min-h-[520px] lg:min-h-[640px] flex flex-col items-center justify-center bg-stone-950/80 border border-stone-800/80 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
      {/* Upload & Privacy Explainer Banner */}
      <div className="absolute top-3 inset-x-3 z-30 flex items-center justify-between bg-stone-900/90 backdrop-blur-md border border-stone-700/60 px-3 py-2 rounded-xl text-xs text-stone-300 shadow-md">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="truncate">
            {userPhotoUrl
              ? 'Ảnh của bạn được xử lý trực tiếp trên trình duyệt, đảm bảo an toàn & bảo mật riêng tư.'
              : 'Chụp hoặc tải ảnh toàn thân thẳng đứng, ánh sáng rõ để thử trang phục Việt.'}
          </span>
        </div>
        {userPhotoUrl && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 px-2 py-1 text-[11px] bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" /> Đổi ảnh
            </button>
            <button
              onClick={handleRemovePhoto}
              className="p-1 hover:bg-rose-900/40 text-stone-400 hover:text-rose-300 rounded-lg transition-colors cursor-pointer"
              title="Xóa ảnh"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Main Content Area */}
      {!userPhotoUrl ? (
        <div className="w-full max-w-md p-6 text-center space-y-4">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-950/40 border border-amber-600/30 flex items-center justify-center text-amber-400 shadow-lg">
            <Upload className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h3 className="font-serif text-lg font-semibold text-stone-100">
              Tải Ảnh Toàn Thân Của Bạn
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Thử ướm trang phục truyền thống và cách tân Việt Nam trực tiếp lên dáng người của bạn.
            </p>
          </div>

          <div className="p-3 bg-stone-900/60 rounded-xl border border-stone-800 text-left text-xs space-y-1.5 text-stone-300">
            <div className="font-medium text-amber-400 text-[11px] uppercase tracking-wider">Tiêu chuẩn ảnh tối ưu:</div>
            <div className="flex items-start gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Tư thế đứng thẳng, nhìn thẳng vào camera, thấy rõ vai và thân người.</span>
            </div>
            <div className="flex items-start gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Ánh sáng ban ngày hoặc phòng sáng rõ, tránh ngược sáng.</span>
            </div>
            <div className="flex items-start gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Ảnh cá nhân không bị lưu trữ vĩnh viễn trên máy chủ bên ngoài.</span>
            </div>
          </div>

          {errorMessage && (
            <div className="p-2.5 bg-rose-950/50 border border-rose-800/80 rounded-xl text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-900 font-semibold rounded-xl text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Đang chuẩn bị khung hình...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" /> Chọn ảnh từ thiết bị
              </>
            )}
          </button>
        </div>
      ) : (
        /* Active Photo Try-On Canvas with Layer Overlay */
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-4">
          {/* User Photo Layer */}
          <div
            className="relative max-h-[560px] lg:max-h-[660px] flex items-center justify-center transition-transform"
            style={{ transform: `scale(${photoScale})` }}
          >
            <img
              src={userPhotoUrl}
              alt="User Try-On Preview"
              className="max-h-[560px] lg:max-h-[660px] w-auto object-contain rounded-xl shadow-2xl"
            />

            {/* Garment Layer Silhouette Overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ opacity: garmentOpacity, mixBlendMode: blendMode }}
            >
              <svg
                viewBox="0 0 500 800"
                className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Overlay Tunic */}
                {tunicItem && (
                  <g opacity="0.95">
                    {tunicItem.renderKey === 'tunic_ao_dai_trad' && (
                      <>
                        <path
                          d="M 220,200 Q 215,260 224,320 Q 212,330 205,480 Q 200,600 206,710 Q 250,718 294,710 Q 300,600 295,480 Q 288,330 276,320 Q 285,260 280,200 Z"
                          fill={tunicColor}
                        />
                        <path d="M 236,172 L 264,172 L 266,192 L 234,192 Z" fill={tunicColor} />
                        <line x1="236" y1="172" x2="264" y2="172" stroke="#fbbf24" strokeWidth="2" />
                      </>
                    )}
                    {tunicItem.renderKey !== 'tunic_ao_dai_trad' && (
                      <path
                        d="M 220,195 Q 210,260 216,330 Q 206,440 210,660 Q 250,670 290,660 Q 294,440 284,330 Q 288,260 278,195 Z"
                        fill={tunicColor}
                      />
                    )}
                  </g>
                )}

                {/* Overlay Outerwear */}
                {outerItem && (
                  <path
                    d="M 218,190 L 140,360 L 175,375 L 220,240 L 208,550 Q 250,565 292,550 L 280,240 L 325,375 L 360,360 L 282,190 Z"
                    fill={outerColor}
                    opacity="0.85"
                  />
                )}

                {/* Overlay Headwear */}
                {headItem && (
                  <ellipse cx="250" cy="112" rx="38" ry="24" fill={headColor} opacity="0.9" />
                )}

                {/* Overlay Jewelry */}
                {jewelryItem && (
                  <ellipse cx="250" cy="195" rx="26" ry="16" fill="none" stroke={jewelryColor} strokeWidth="4" />
                )}
              </svg>
            </div>
          </div>

          {/* Alignment & Adjustments Floating Bar */}
          <div className="absolute bottom-3 inset-x-3 z-30 flex flex-wrap items-center justify-between gap-2 bg-stone-900/90 backdrop-blur-md border border-stone-800 p-2 rounded-xl text-xs text-stone-300">
            <div className="flex items-center gap-3">
              <span className="text-stone-400 font-medium">Tỷ lệ:</span>
              <button
                onClick={() => setPhotoScale((prev) => Math.min(1.4, +(prev + 0.05).toFixed(2)))}
                className="p-1 hover:bg-stone-800 rounded text-stone-300 hover:text-amber-400"
                title="Phóng to ảnh"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setPhotoScale((prev) => Math.max(0.7, +(prev - 0.05).toFixed(2)))}
                className="p-1 hover:bg-stone-800 rounded text-stone-300 hover:text-amber-400"
                title="Thu nhỏ ảnh"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>

              <span className="text-stone-600">|</span>

              <span className="text-stone-400 font-medium">Độ trong suốt áo:</span>
              <input
                type="range"
                min="0.3"
                max="1"
                step="0.05"
                value={garmentOpacity}
                onChange={(e) => setGarmentOpacity(parseFloat(e.target.value))}
                className="w-20 accent-amber-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playShutterSound();
                  onOpenSnapshot();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-medium rounded-lg shadow transition-colors cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" /> Lưu ảnh thử đồ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

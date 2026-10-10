import React from 'react';
import { GARMENT_CATALOG, CULTURAL_COLOR_PALETTES } from '../data/catalog';
import { X, Check } from 'lucide-react';

interface ColorPalettePickerProps {
  garmentId: string | null;
  currentColorHex: string;
  onSelectColor: (garmentId: string, hex: string) => void;
  onClose: () => void;
}

export const ColorPalettePicker: React.FC<ColorPalettePickerProps> = ({
  garmentId,
  currentColorHex,
  onSelectColor,
  onClose,
}) => {
  if (!garmentId) return null;

  const garment = GARMENT_CATALOG.find((g) => g.id === garmentId);
  if (!garment) return null;

  const palette = garment.colorPalette || CULTURAL_COLOR_PALETTES;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-[#FBF9F5] border border-[#E8E1D5] rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-3">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#8B2624] font-semibold">
              COLOR STORY · BẢNG MÀU LỤA
            </span>
            <h3 className="font-serif text-base font-bold text-[#241A16] mt-0.5">
              {garment.vietnameseName}
            </h3>
            {garment.fabricType && (
              <p className="text-xs text-[#8B7C72] font-medium">{garment.fabricType}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8B7C72] hover:text-[#241A16] hover:bg-[#F2ECE4] rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Color Swatches Grid */}
        <div className="grid grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
          {palette.map((color) => {
            const isSelected = currentColorHex.toLowerCase() === color.hex.toLowerCase();
            return (
              <button
                key={color.id}
                onClick={() => {
                  onSelectColor(garment.id, color.hex);
                  onClose();
                }}
                className={`p-2.5 rounded-2xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#8B2624] ring-1 ring-[#8B2624]/30 shadow-xs'
                    : 'bg-[#FAF8F5] border-[#EFE9DF] hover:border-[#D5C7B7] hover:bg-white'
                }`}
              >
                <div
                  className="w-7 h-7 rounded-xl border border-black/10 shrink-0 shadow-xs flex items-center justify-center"
                  style={{ backgroundColor: color.hex }}
                >
                  {isSelected && <Check className="w-4 h-4 text-white drop-shadow stroke-[3]" />}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-[#241A16] truncate">
                    {color.name}
                  </div>
                  {color.culturalMeaning && (
                    <div className="text-[10px] text-[#6B5E55] line-clamp-2 leading-tight mt-0.5">
                      {color.culturalMeaning}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-2 border-t border-[#F0EAE1] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-[#8B2624] hover:bg-[#721F1D] text-white rounded-2xl transition-colors cursor-pointer shadow-xs"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

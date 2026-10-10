import React, { useState } from 'react';
import { OutfitState, OccasionType } from '../types/fashion';
import { Undo2, Redo2, Shuffle, RotateCcw, Bookmark, Scale, Check } from 'lucide-react';

interface StylingToolbarProps {
  outfit: OutfitState;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onSurpriseMe: () => void;
  onReset: () => void;
  onSaveLookbook: () => void;
  onOpenCompare: () => void;
  onChangeTheme: (theme: OccasionType) => void;
  onChangeStyleMode: (mode: 'traditional_pure' | 'contemporary_remix') => void;
}

export const StylingToolbar: React.FC<StylingToolbarProps> = ({
  outfit,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onSurpriseMe,
  onReset,
  onSaveLookbook,
  onOpenCompare,
  onChangeTheme,
  onChangeStyleMode,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-white/90 border border-[#E8E1D5] p-3 sm:px-4 rounded-3xl shadow-xs">
      {/* Left: Style Direction & Occasion Dropdown */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Style Mode Switcher */}
        <div className="flex items-center bg-[#F7F4EE] p-1 rounded-2xl border border-[#E8E1D5] text-xs">
          <button
            onClick={() => onChangeStyleMode('traditional_pure')}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              outfit.styleMode === 'traditional_pure'
                ? 'bg-white text-[#8B2624] font-semibold shadow-xs'
                : 'text-[#6B5E55] hover:text-[#241A16]'
            }`}
          >
            Truyền Thống
          </button>
          <button
            onClick={() => onChangeStyleMode('contemporary_remix')}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              outfit.styleMode === 'contemporary_remix'
                ? 'bg-white text-[#8B2624] font-semibold shadow-xs'
                : 'text-[#6B5E55] hover:text-[#241A16]'
            }`}
          >
            Cách Tân Remix
          </button>
        </div>

        {/* Occasion / Theme */}
        <div className="flex items-center gap-2 bg-[#F7F4EE] border border-[#E8E1D5] px-3.5 py-1.5 rounded-2xl text-xs">
          <span className="text-[#8B7C72] font-medium">Bối cảnh diện:</span>
          <select
            value={outfit.theme}
            onChange={(e) => onChangeTheme(e.target.value as OccasionType)}
            className="bg-transparent text-[#241A16] font-medium border-none focus:outline-none cursor-pointer pr-1"
          >
            <option value="tet_celebration">Tết Nguyên Đán &amp; Khởi Xuân</option>
            <option value="wedding_ceremony">Lễ Vu Quy &amp; Hỷ Sự</option>
            <option value="royal_court">Nghi Lễ Cung Đình Huế</option>
            <option value="temple_sacred">Đi Lễ Chùa Thanh Tịnh</option>
            <option value="street_chic">Dạo Phố &amp; Cafe Đương Đại</option>
            <option value="runway_editorial">Sàn Diễn Haute Couture</option>
          </select>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5">
        {/* Undo */}
        <button
          onClick={onUndo}
          disabled={!canUndo}
          title="Hoàn tác (Undo)"
          aria-label="Hoàn tác"
          className="p-2 rounded-2xl bg-[#F7F4EE] hover:bg-[#EFE9DF] disabled:opacity-40 text-[#52443C] transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          <Undo2 className="w-4 h-4" />
        </button>

        {/* Redo */}
        <button
          onClick={onRedo}
          disabled={!canRedo}
          title="Làm lại (Redo)"
          aria-label="Làm lại"
          className="p-2 rounded-2xl bg-[#F7F4EE] hover:bg-[#EFE9DF] disabled:opacity-40 text-[#52443C] transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          <Redo2 className="w-4 h-4" />
        </button>

        {/* Surprise Me / Randomize */}
        <button
          onClick={onSurpriseMe}
          title="Gợi ý phối ngẫu nhiên"
          className="flex items-center gap-1.5 px-3 py-2 bg-[#F7F4EE] hover:bg-[#EFE9DF] text-[#8B2624] rounded-2xl text-xs font-semibold transition-colors cursor-pointer"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Phối Ngẫu Nhiên</span>
        </button>

        {/* Compare */}
        <button
          onClick={onOpenCompare}
          title="So sánh bộ trang phục"
          aria-label="So sánh"
          className="p-2 rounded-2xl bg-[#F7F4EE] hover:bg-[#EFE9DF] text-[#52443C] hover:text-[#8B2624] transition-colors cursor-pointer"
        >
          <Scale className="w-4 h-4" />
        </button>

        {/* Reset */}
        {showResetConfirm ? (
          <div className="flex items-center gap-1 bg-red-50 border border-red-200 px-2 py-1 rounded-2xl text-xs">
            <span className="text-[#8B2624] text-[11px] font-medium">Đặt lại?</span>
            <button
              onClick={() => {
                onReset();
                setShowResetConfirm(false);
              }}
              className="p-1 hover:bg-red-100 text-[#8B2624] rounded-lg cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setShowResetConfirm(false)}
              className="p-1 hover:bg-stone-200 text-[#8B7C72] rounded-lg cursor-pointer"
            >
              ×
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            title="Đặt lại trang phục"
            aria-label="Đặt lại trang phục"
            className="p-2 rounded-2xl bg-[#F7F4EE] hover:bg-[#EFE9DF] text-[#8B7C72] hover:text-[#8B2624] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}

        {/* Primary Save Action */}
        <button
          onClick={onSaveLookbook}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#8B2624] hover:bg-[#721F1D] text-white font-semibold rounded-2xl text-xs shadow-xs transition-all cursor-pointer"
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Lưu Lookbook</span>
        </button>
      </div>
    </div>
  );
};

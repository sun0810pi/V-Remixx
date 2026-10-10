import React from 'react';
import { Bookmark, Volume2, VolumeX, User, Camera } from 'lucide-react';

interface StudioHeaderProps {
  activeView: 'studio' | 'encyclopedia';
  onSelectView: (view: 'studio' | 'encyclopedia') => void;
  tryOnMode: 'avatar' | 'photo';
  onChangeTryOnMode: (mode: 'avatar' | 'photo') => void;
  onOpenLookbook: () => void;
  savedLooksCount: number;
  soundActive: boolean;
  onToggleSound: () => void;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  activeView,
  onSelectView,
  tryOnMode,
  onChangeTryOnMode,
  onOpenLookbook,
  savedLooksCount,
  soundActive,
  onToggleSound,
}) => {
  return (
    <header className="w-full bg-[#FBF9F5]/90 border-b border-[#E8E1D5] backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo & Editorial Monogram */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#8B2624] flex items-center justify-center text-white font-serif font-black text-xl shadow-xs">
            V
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold tracking-wider text-[#241A16]">
                V-REMIX
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#8B2624] font-semibold border-l border-[#D5C7B7] pl-2">
                THE VIETNAMESE FASHION ATELIER
              </span>
            </div>
            <div className="text-[11px] text-[#8B7C72] font-serif italic hidden sm:block">
              Tradition, reimagined by you · Collection 01 · Heritage Áo Dài
            </div>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="flex items-center gap-1 bg-white/80 border border-[#E5DDD0] p-1 rounded-2xl text-xs shadow-xs">
          <button
            onClick={() => onSelectView('studio')}
            className={`px-4 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              activeView === 'studio'
                ? 'bg-[#8B2624] text-white font-semibold shadow-xs'
                : 'text-[#6B5E55] hover:text-[#241A16]'
            }`}
          >
            Studio
          </button>
          <button
            onClick={() => onSelectView('encyclopedia')}
            className={`px-4 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              activeView === 'encyclopedia'
                ? 'bg-[#8B2624] text-white font-semibold shadow-xs'
                : 'text-[#6B5E55] hover:text-[#241A16]'
            }`}
          >
            Collections &amp; Di Sản
          </button>
        </nav>

        {/* Right Actions: Mode Switcher, Lookbook, Sound */}
        <div className="flex items-center gap-2">
          {/* Avatar vs Photo Mode Switcher */}
          {activeView === 'studio' && (
            <div className="hidden md:flex items-center bg-white border border-[#E5DDD0] p-1 rounded-2xl text-xs shadow-xs">
              <button
                onClick={() => onChangeTryOnMode('avatar')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl transition-colors cursor-pointer ${
                  tryOnMode === 'avatar'
                    ? 'bg-[#8B2624]/10 text-[#8B2624] font-semibold'
                    : 'text-[#6B5E55] hover:text-[#241A16]'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Avatar Studio</span>
              </button>
              <button
                onClick={() => onChangeTryOnMode('photo')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl transition-colors cursor-pointer ${
                  tryOnMode === 'photo'
                    ? 'bg-[#8B2624]/10 text-[#8B2624] font-semibold'
                    : 'text-[#6B5E55] hover:text-[#241A16]'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Ảnh Của Tôi</span>
              </button>
            </div>
          )}

          {/* Lookbook Drawer Button with Count */}
          <button
            onClick={onOpenLookbook}
            title="Mở Lookbook đã lưu"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-[#F9F7F3] border border-[#E5DDD0] text-[#241A16] rounded-2xl text-xs font-semibold transition-all shadow-xs cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#8B2624]" />
            <span className="hidden sm:inline">Lookbook</span>
            {savedLooksCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#8B2624] text-white text-[10px] font-bold flex items-center justify-center">
                {savedLooksCount}
              </span>
            )}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundActive ? 'Tắt âm thanh tương tác' : 'Bật âm thanh tương tác'}
            className="p-2 rounded-2xl bg-white hover:bg-[#F9F7F3] border border-[#E5DDD0] text-[#6B5E55] hover:text-[#241A16] transition-colors shadow-xs cursor-pointer"
          >
            {soundActive ? <Volume2 className="w-4 h-4 text-[#8B2624]" /> : <VolumeX className="w-4 h-4 text-[#A89C93]" />}
          </button>
        </div>
      </div>
    </header>
  );
};

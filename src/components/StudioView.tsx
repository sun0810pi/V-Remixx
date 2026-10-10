import React, { useState } from 'react';
import { OutfitState, GarmentCategory, GarmentItem, HistoricalEra, OccasionType } from '../types/fashion';
import { GARMENT_CATALOG, CULTURAL_COLOR_PALETTES } from '../data/catalog';
import { AvatarCanvas } from './AvatarCanvas';
import { Bookmark, MoreHorizontal, ArrowRight, RotateCcw, Sparkles, ShieldCheck, Volume2, VolumeX, Eye, BookOpen } from 'lucide-react';
import { isSoundEnabled, toggleSound, playEquipSound } from '../utils/sound';

interface StudioViewProps {
  outfit: OutfitState;
  lookTitle: string;
  savedLooksCount: number;
  onUpdateOutfit: (newOutfit: OutfitState) => void;
  onOpenCategory: (category: GarmentCategory) => void;
  onOpenColorPicker: (garmentId: string) => void;
  onOpenAIStylist: () => void;
  onOpenCulturalReview: () => void;
  onOpenLookbook: () => void;
  onOpenEncyclopedia: () => void;
  onUndo: () => void;
  onRandomize: () => void;
  onResetOutfit: () => void;
  onSaveLook: () => void;
  onSwitchToWelcome: () => void;
}

export const StudioView: React.FC<StudioViewProps> = ({
  outfit,
  lookTitle,
  savedLooksCount,
  onUpdateOutfit,
  onOpenCategory,
  onOpenColorPicker,
  onOpenAIStylist,
  onOpenCulturalReview,
  onOpenLookbook,
  onOpenEncyclopedia,
  onUndo,
  onRandomize,
  onResetOutfit,
  onSaveLook,
  onSwitchToWelcome,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  // Resolve equipped items
  const tunicItem = outfit.selectedGarments.tunic
    ? GARMENT_CATALOG.find((g) => g.id === outfit.selectedGarments.tunic)
    : null;
  const bottomItem = outfit.selectedGarments.bottom
    ? GARMENT_CATALOG.find((g) => g.id === outfit.selectedGarments.bottom)
    : null;
  const headItem = outfit.selectedGarments.headwear
    ? GARMENT_CATALOG.find((g) => g.id === outfit.selectedGarments.headwear)
    : null;
  const jewelryItem = outfit.selectedGarments.jewelry
    ? GARMENT_CATALOG.find((g) => g.id === outfit.selectedGarments.jewelry)
    : null;
  const accessoryItem = headItem || jewelryItem || null;

  // Selected pieces string matching Reference 2: "Áo dài · Quần lụa · Trâm cài"
  const piecesLabels: string[] = [];
  if (tunicItem) piecesLabels.push(tunicItem.category === 'tunic' ? 'Áo dài' : tunicItem.vietnameseName);
  if (bottomItem) piecesLabels.push('Quần lụa');
  if (headItem) piecesLabels.push(headItem.vietnameseName.split(' ')[0] || 'Phụ kiện');
  else if (jewelryItem) piecesLabels.push(jewelryItem.vietnameseName.split(' ')[0] || 'Phụ kiện');
  const selectedPiecesText = piecesLabels.join(' · ') || 'Chưa chọn trang phục';

  // Collection Title based on theme
  const collectionNumber = outfit.styleMode === 'contemporary_remix' ? 'COLLECTION 02' : 'COLLECTION 01';
  const collectionSubtitle =
    outfit.styleMode === 'contemporary_remix' ? 'VIETNAMESE CONTEMPORARY REMIX' : 'VIETNAMESE HERITAGE';

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#241A16] flex flex-col justify-between selection:bg-[#4E1D24]/15 selection:text-[#4E1D24]">
      {/* Top Navigation matching Reference 2 */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-5 pb-3 flex items-center justify-between border-b border-[#EAE3D6]/70">
        <div onClick={onSwitchToWelcome} className="cursor-pointer group">
          <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#241A16] group-hover:text-[#4E1D24] transition-colors">
            V-REMIX
          </h1>
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#736357] font-medium mt-0.5">
            THE VIETNAMESE FASHION ATELIER
          </p>
        </div>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <button className="text-[#4E1D24] font-semibold border-b-2 border-[#4E1D24] pb-0.5 cursor-pointer">
            Studio
          </button>
          <button
            onClick={onOpenLookbook}
            className="flex items-center gap-1.5 text-[#241A16] hover:text-[#4E1D24] transition-colors cursor-pointer"
          >
            <span>Collections</span>
            <div className="relative">
              <Bookmark className="w-4 h-4 text-[#241A16]" />
              {savedLooksCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-3 h-3 bg-[#4E1D24] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                  {savedLooksCount}
                </span>
              )}
            </div>
          </button>
        </nav>
      </header>

      {/* Main Studio Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-5">
        {/* Sub-header Bar matching Reference 2 */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <span className="text-[11px] tracking-[0.16em] uppercase text-[#8B7E74] font-semibold block mb-0.5">
              {collectionNumber} &middot; {collectionSubtitle}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241A16] tracking-tight">
              The Art of Áo Dài
            </h2>
            <p className="text-sm text-[#736357] mt-0.5 font-normal italic">
              Tradition, reimagined by you.
            </p>
          </div>

          {/* Three Dots Menu Button */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-[#736357] hover:text-[#241A16] hover:bg-[#EFE7DC] rounded-xl transition-colors cursor-pointer"
              title="Tùy chọn Atelier"
              aria-label="Tùy chọn"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-11 w-64 bg-white border border-[#E3DACB] rounded-2xl p-2 shadow-xl z-50 text-xs animate-in fade-in duration-150">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onSwitchToWelcome();
                  }}
                  className="w-full text-left px-3 py-2 text-[#3D2820] hover:bg-[#FAF7F2] rounded-xl font-medium flex items-center gap-2 cursor-pointer"
                >
                  <span>Màn hình chào (Welcome)</span>
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenEncyclopedia();
                  }}
                  className="w-full text-left px-3 py-2 text-[#3D2820] hover:bg-[#FAF7F2] rounded-xl font-medium flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#8B2624]" />
                  <span>Bách Khoa Di Sản Áo Dài</span>
                </button>
                <div className="h-px bg-[#F0EAE0] my-1" />
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onResetOutfit();
                  }}
                  className="w-full text-left px-3 py-2 text-[#3D2820] hover:bg-[#FAF7F2] rounded-xl font-medium flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#8B7E74]" />
                  <span>Khôi phục mặc định (Reset)</span>
                </button>
                <button
                  onClick={() => {
                    handleToggleSound();
                  }}
                  className="w-full text-left px-3 py-2 text-[#3D2820] hover:bg-[#FAF7F2] rounded-xl font-medium flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                    <span>Âm thanh Atelier</span>
                  </span>
                  <span className="text-[10px] text-[#8B7E74]">{soundOn ? 'BẬT' : 'TẮT'}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 3-Column Studio Grid matching Reference 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* COLUMN 1 (Left - lg:col-span-3): WARDROBE (Equipped pieces preview stack) */}
          <div className="lg:col-span-3 flex flex-col">
            <span className="text-[11px] tracking-[0.16em] uppercase text-[#736357] font-semibold mb-3 block">
              WARDROBE
            </span>

            <div className="space-y-3.5 flex-1 flex flex-col justify-between">
              {/* Card 1: Áo Dài (Top Piece) */}
              <div
                onClick={() => onOpenCategory('tunic')}
                className="group flex flex-col rounded-xl overflow-hidden bg-white border border-[#E5DDD0] hover:border-[#4E1D24] hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="aspect-[4/5] bg-[#FAF8F5] relative overflow-hidden flex items-center justify-center">
                  <img
                    src="/assets/editorial/wardrobe_ao_dai_top.jpg"
                    alt="Áo Dài"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="py-2 text-center bg-[#FAF8F5] border-t border-[#F0EAE0]">
                  <span className="font-serif font-semibold text-xs sm:text-sm text-[#3D2820]">
                    {tunicItem ? tunicItem.vietnameseName : 'Áo dài'}
                  </span>
                </div>
              </div>

              {/* Card 2: Quần Lụa (Silk Pants Piece) */}
              <div
                onClick={() => onOpenCategory('bottom')}
                className="group flex flex-col rounded-xl overflow-hidden bg-white border border-[#E5DDD0] hover:border-[#4E1D24] hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="aspect-[4/5] bg-[#FAF8F5] relative overflow-hidden flex items-center justify-center">
                  <img
                    src="/assets/editorial/wardrobe_quan_lua.jpg"
                    alt="Quần lụa"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="py-2 text-center bg-[#FAF8F5] border-t border-[#F0EAE0]">
                  <span className="font-serif font-semibold text-xs sm:text-sm text-[#3D2820]">
                    {bottomItem ? bottomItem.vietnameseName : 'Quần lụa'}
                  </span>
                </div>
              </div>

              {/* Card 3: Phụ Kiện (Accessories Piece) */}
              <div
                onClick={() => onOpenCategory('headwear')}
                className="group flex flex-col rounded-xl overflow-hidden bg-white border border-[#E5DDD0] hover:border-[#4E1D24] hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="aspect-[4/5] bg-[#1E1917] relative overflow-hidden flex items-center justify-center">
                  <img
                    src="/assets/editorial/wardrobe_phu_kien.jpg"
                    alt="Phụ kiện"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="py-2 text-center bg-[#FAF8F5] border-t border-[#F0EAE0]">
                  <span className="font-serif font-semibold text-xs sm:text-sm text-[#3D2820]">
                    {accessoryItem ? accessoryItem.vietnameseName : 'Phụ kiện'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2 (Center - lg:col-span-6): YOUR CANVAS */}
          <div className="lg:col-span-6 flex flex-col">
            <AvatarCanvas
              outfit={outfit}
              lookTitle={lookTitle}
              onUndo={onUndo}
              onRandomize={onRandomize}
              onSaveLook={onSaveLook}
              onOpenColorPicker={onOpenColorPicker}
              onSelectCategory={onOpenCategory}
            />
          </div>

          {/* COLUMN 3 (Right - lg:col-span-3): YOUR LOOK */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="h-full bg-[#F5EFE6] border border-[#E5DDD0] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-[11px] tracking-[0.16em] uppercase text-[#736357] font-semibold mb-3 block">
                  YOUR LOOK
                </span>

                {/* Section 1: COLOR STORY matching Reference 2 */}
                <div className="mb-5 pb-4 border-b border-[#EAE1D3]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] tracking-[0.14em] uppercase text-[#8B7E74] font-medium">
                      COLOR STORY
                    </span>
                    <button
                      onClick={() => onOpenColorPicker(tunicItem?.id || 'ao_dai_traditional')}
                      className="text-[10px] text-[#8B2624] hover:underline font-medium cursor-pointer"
                    >
                      Đổi sắc lụa
                    </button>
                  </div>
                  {/* Swatches Row matching Reference 2 */}
                  <div className="flex items-center gap-2.5">
                    {[
                      { hex: outfit.garmentColors[tunicItem?.id || ''] || '#8B2624', name: 'Đỏ son' },
                      { hex: '#C5A059', name: 'Vàng kim' },
                      { hex: '#2C221E', name: 'Nâu mực' },
                      { hex: '#FAF6F0', name: 'Trắng ngà' },
                    ].map((swatch, idx) => (
                      <button
                        key={idx}
                        onClick={() => onOpenColorPicker(tunicItem?.id || 'ao_dai_traditional')}
                        title={swatch.name}
                        className="w-5 h-5 rounded-full border border-black/15 shadow-2xs hover:scale-110 transition-transform cursor-pointer"
                        style={{ backgroundColor: swatch.hex }}
                      />
                    ))}
                  </div>
                </div>

                {/* Section 2: Selected pieces matching Reference 2 */}
                <div className="mb-5 pb-4 border-b border-[#EAE1D3]">
                  <span className="text-[11px] tracking-[0.14em] uppercase text-[#8B7E74] font-medium block mb-1">
                    Selected pieces
                  </span>
                  <p className="font-serif text-sm font-semibold text-[#241A16] leading-snug">
                    {selectedPiecesText}
                  </p>
                  <p className="text-[11px] text-[#8B7E74] mt-1 italic">
                    Lụa tơ tằm dệt thủ công &middot; Dáng thanh nhã
                  </p>
                </div>

                {/* Section 3: Style assistant matching Reference 2 */}
                <div>
                  <span className="text-[11px] tracking-[0.14em] uppercase text-[#8B7E74] font-medium block mb-1.5">
                    Style assistant
                  </span>
                  <p className="text-xs text-[#6B5E55] mb-3.5 leading-relaxed font-normal">
                    Khám phá một cách phối mới với những món đồ hiện có.
                  </p>

                  {/* Button 1: Gợi ý phối đồ */}
                  <button
                    onClick={onOpenAIStylist}
                    className="w-full py-2.5 px-3 rounded-lg bg-[#4E1D24] hover:bg-[#3D161C] active:bg-[#331117] text-white text-xs font-medium tracking-wide flex items-center justify-center gap-1.5 shadow-2xs mb-2 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#F5DF9E]" />
                    <span>Gợi ý phối đồ</span>
                  </button>

                  {/* Button 2: Kiểm tra văn hóa */}
                  <button
                    onClick={onOpenCulturalReview}
                    className="w-full py-2.5 px-3 rounded-lg bg-white border border-[#DDD4C5] hover:bg-[#FAF8F5] active:bg-[#F2ECE1] text-[#241A16] text-xs font-medium tracking-wide flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#8B2624]" />
                    <span>Kiểm tra văn hóa</span>
                  </button>
                </div>
              </div>

              {/* Cultural Harmony Badge */}
              <div className="mt-4 pt-3 border-t border-[#EAE1D3] flex items-center justify-between text-[11px] text-[#736357]">
                <span className="font-serif italic">Hài hòa di sản:</span>
                <span className="font-semibold text-[#8B2624]">95% Hoàn mỹ</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: DISCOVER YOUR STYLE matching Reference 2 */}
        <section className="mt-7 bg-[#F5EFE6] border border-[#E5DDD0] rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-[11px] tracking-[0.16em] uppercase text-[#736357] font-semibold">
              DISCOVER YOUR STYLE
            </span>
            <button
              onClick={() => onOpenCategory('tunic')}
              className="text-xs text-[#8B2624] hover:underline font-medium flex items-center gap-1 cursor-pointer"
            >
              <span>Browse pieces</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4 Large Category Cards matching Reference 2 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {/* 1. Tops */}
            <div
              onClick={() => onOpenCategory('tunic')}
              className="group flex flex-col rounded-xl overflow-hidden bg-white border border-[#E5DDD0] hover:border-[#4E1D24] hover:shadow-sm transition-all cursor-pointer"
            >
              <div className="aspect-[4/3] bg-[#FAF8F5] relative overflow-hidden flex items-center justify-center">
                <img
                  src="/assets/editorial/category_tops.jpg"
                  alt="Tops"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="py-2 text-center bg-[#FAF8F5] border-t border-[#F0EAE0]">
                <span className="font-serif font-semibold text-xs text-[#3D2820]">
                  Tops
                </span>
              </div>
            </div>

            {/* 2. Bottoms */}
            <div
              onClick={() => onOpenCategory('bottom')}
              className="group flex flex-col rounded-xl overflow-hidden bg-white border border-[#E5DDD0] hover:border-[#4E1D24] hover:shadow-sm transition-all cursor-pointer"
            >
              <div className="aspect-[4/3] bg-[#FAF8F5] relative overflow-hidden flex items-center justify-center">
                <img
                  src="/assets/editorial/category_bottoms.jpg"
                  alt="Bottoms"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="py-2 text-center bg-[#FAF8F5] border-t border-[#F0EAE0]">
                <span className="font-serif font-semibold text-xs text-[#3D2820]">
                  Bottoms
                </span>
              </div>
            </div>

            {/* 3. Accessories */}
            <div
              onClick={() => onOpenCategory('headwear')}
              className="group flex flex-col rounded-xl overflow-hidden bg-white border border-[#E5DDD0] hover:border-[#4E1D24] hover:shadow-sm transition-all cursor-pointer"
            >
              <div className="aspect-[4/3] bg-[#FAF8F5] relative overflow-hidden flex items-center justify-center">
                <img
                  src="/assets/editorial/category_accessories.jpg"
                  alt="Accessories"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="py-2 text-center bg-[#FAF8F5] border-t border-[#F0EAE0]">
                <span className="font-serif font-semibold text-xs text-[#3D2820]">
                  Accessories
                </span>
              </div>
            </div>

            {/* 4. Shoes */}
            <div
              onClick={() => onOpenCategory('footwear')}
              className="group flex flex-col rounded-xl overflow-hidden bg-white border border-[#E5DDD0] hover:border-[#4E1D24] hover:shadow-sm transition-all cursor-pointer"
            >
              <div className="aspect-[4/3] bg-[#FAF8F5] relative overflow-hidden flex items-center justify-center">
                <img
                  src="/assets/editorial/category_shoes.jpg"
                  alt="Shoes"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="py-2 text-center bg-[#FAF8F5] border-t border-[#F0EAE0]">
                <span className="font-serif font-semibold text-xs text-[#3D2820]">
                  Shoes
                </span>
              </div>
            </div>
          </div>

          {/* Subtitle Note matching Reference 2 */}
          <p className="text-[11px] text-[#9E9085] text-center mt-3.5 font-normal">
            Bản phác thảo bố cục. Các hình minh họa là hình tham khảo art direction, không phải asset đã được tích hợp vào game.
          </p>
        </section>
      </main>

      {/* Footer subtle brand mark */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-4 text-center text-xs text-[#8B7E74]/70">
        V-Remix &middot; Virtual Vietnamese Fashion Atelier &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

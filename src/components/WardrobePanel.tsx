import React, { useState } from 'react';
import { GarmentCategory, GarmentItem, HistoricalEra, OccasionType, OutfitState } from '../types/fashion';
import { GARMENT_CATALOG } from '../data/catalog';
import { playEquipSound, playUnequipSound } from '../utils/sound';
import { Palette, Trash2, Check, Filter } from 'lucide-react';

interface WardrobePanelProps {
  outfit: OutfitState;
  activeCategory: GarmentCategory;
  onSelectCategory: (category: GarmentCategory) => void;
  onEquipGarment: (category: GarmentCategory, garmentId: string) => void;
  onUnequipGarment: (category: GarmentCategory) => void;
  onOpenColorPicker: (garmentId: string) => void;
}

const CATEGORIES: { key: GarmentCategory; label: string; count: number }[] = [
  { key: 'tunic', label: 'Áo Chính', count: GARMENT_CATALOG.filter((g) => g.category === 'tunic').length },
  { key: 'inner', label: 'Áo Lót & Yếm', count: GARMENT_CATALOG.filter((g) => g.category === 'inner').length },
  { key: 'bottom', label: 'Quần & Váy', count: GARMENT_CATALOG.filter((g) => g.category === 'bottom').length },
  { key: 'outerwear', label: 'Áo Khoác', count: GARMENT_CATALOG.filter((g) => g.category === 'outerwear').length },
  { key: 'headwear', label: 'Khăn & Nón', count: GARMENT_CATALOG.filter((g) => g.category === 'headwear').length },
  { key: 'jewelry', label: 'Trang Sức', count: GARMENT_CATALOG.filter((g) => g.category === 'jewelry').length },
  { key: 'footwear', label: 'Giày Guốc', count: GARMENT_CATALOG.filter((g) => g.category === 'footwear').length },
  { key: 'handheld', label: 'Cầm Tay', count: GARMENT_CATALOG.filter((g) => g.category === 'handheld').length },
];

export const WardrobePanel: React.FC<WardrobePanelProps> = ({
  outfit,
  activeCategory,
  onSelectCategory,
  onEquipGarment,
  onUnequipGarment,
  onOpenColorPicker,
}) => {
  const [eraFilter, setEraFilter] = useState<string>('all');
  const [occasionFilter, setOccasionFilter] = useState<string>('all');

  const currentEquippedId = outfit.selectedGarments[activeCategory];

  const categoryItems = GARMENT_CATALOG.filter((item) => {
    if (item.category !== activeCategory) return false;
    if (eraFilter !== 'all' && item.era !== eraFilter) return false;
    if (occasionFilter !== 'all' && !item.occasions.includes(occasionFilter as OccasionType)) return false;
    return true;
  });

  const handleItemClick = (item: GarmentItem) => {
    if (currentEquippedId === item.id) {
      playUnequipSound();
      onUnequipGarment(activeCategory);
    } else {
      playEquipSound();
      onEquipGarment(activeCategory, item.id);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white/95 border border-[#E8E1D5] rounded-3xl p-4 sm:p-5 shadow-sm">
      {/* Editorial Header */}
      <div className="border-b border-[#F0EAE1] pb-3 mb-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#8B2624] font-semibold">
              ATELIER WARDROBE
            </span>
            <h3 className="font-serif text-lg font-bold text-[#241A16] mt-0.5">
              Kho Trang Phục Di Sản
            </h3>
          </div>
          {currentEquippedId && (
            <button
              onClick={() => {
                playUnequipSound();
                onUnequipGarment(activeCategory);
              }}
              title="Gỡ món này"
              className="flex items-center gap-1 text-[11px] text-[#8B7C72] hover:text-[#8B2624] px-2.5 py-1 hover:bg-[#F5EFEB] rounded-xl transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Gỡ bỏ</span>
            </button>
          )}
        </div>

        {/* Minimalist Horizontal Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = cat.key === activeCategory;
            const isEquipped = Boolean(outfit.selectedGarments[cat.key]);
            return (
              <button
                key={cat.key}
                onClick={() => onSelectCategory(cat.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#8B2624] text-white font-semibold shadow-xs'
                    : 'text-[#6B5E55] hover:text-[#241A16] hover:bg-[#F7F4EE]'
                }`}
              >
                <span>{cat.label}</span>
                {isEquipped && !isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B2624] shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Row: Clean Editorial Text Selects */}
      <div className="flex items-center justify-between gap-2 mb-3 text-xs">
        <div className="flex items-center gap-2 overflow-x-auto">
          <select
            value={eraFilter}
            onChange={(e) => setEraFilter(e.target.value)}
            className="bg-[#FBF9F5] border border-[#E5DDD0] text-[#3E312B] text-xs rounded-xl px-2.5 py-1 focus:outline-none focus:border-[#8B2624] cursor-pointer"
          >
            <option value="all">Mọi thời kỳ di sản</option>
            <option value="nguyen_court">Triều Nguyễn (Huế)</option>
            <option value="le_dynasty">Thời Hậu Lê</option>
            <option value="folk_tradition">Dân gian truyền thống</option>
            <option value="modern_revival">Áo Dài Lemur</option>
            <option value="contemporary_remix">Cách tân &amp; Remix</option>
          </select>

          <select
            value={occasionFilter}
            onChange={(e) => setOccasionFilter(e.target.value)}
            className="bg-[#FBF9F5] border border-[#E5DDD0] text-[#3E312B] text-xs rounded-xl px-2.5 py-1 focus:outline-none focus:border-[#8B2624] cursor-pointer"
          >
            <option value="all">Mọi dịp lễ hội</option>
            <option value="tet_celebration">Tết Nguyên Đán</option>
            <option value="wedding_ceremony">Cưới hỏi &amp; Lễ Vu Quy</option>
            <option value="royal_court">Nghi lễ cung đình</option>
            <option value="temple_sacred">Đi lễ chùa thanh tịnh</option>
            <option value="street_chic">Dạo phố đương đại</option>
          </select>
        </div>
      </div>

      {/* Item List: Luxury Fashion Illustration Swatches */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3 max-h-[460px] lg:max-h-[560px]">
        {categoryItems.length === 0 ? (
          <div className="text-center py-16 text-[#A89C93] text-xs space-y-2">
            <Filter className="w-8 h-8 mx-auto opacity-30 text-[#8B2624]" />
            <p>Không có thiết kế nào phù hợp với bộ lọc hiện tại.</p>
            <button
              onClick={() => {
                setEraFilter('all');
                setOccasionFilter('all');
              }}
              className="text-[#8B2624] font-medium hover:underline cursor-pointer"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          categoryItems.map((item) => {
            const isEquipped = currentEquippedId === item.id;
            const chosenColor = outfit.garmentColors[item.id] || item.defaultColorHex;

            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`group p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isEquipped
                    ? 'bg-[#FBF8F5] border-[#8B2624] ring-1 ring-[#8B2624]/20 shadow-xs'
                    : 'bg-[#FDFCFB] border-[#F0EAE1] hover:border-[#D5C7B7] hover:bg-[#F9F7F3]'
                }`}
              >
                {/* Fashion Atelier Swatch Thumbnail */}
                <div className="relative w-14 h-16 rounded-xl bg-white border border-[#E8E1D5] shrink-0 flex flex-col items-center justify-center p-1.5 shadow-xs overflow-hidden">
                  {/* Visual Silhouette Sketch */}
                  <div
                    className="w-8 h-10 rounded-sm shadow-xs transition-transform group-hover:scale-105"
                    style={{ backgroundColor: chosenColor }}
                  />
                  {/* Fabric Swatch Label Dot */}
                  <div className="w-1.5 h-1.5 rounded-full mt-1 bg-[#8B2624]/40" />

                  {isEquipped && (
                    <div className="absolute top-1 right-1 w-4 h-4 bg-[#8B2624] text-white rounded-full flex items-center justify-center shadow-xs">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </div>

                {/* Garment Details & Editorial Metadata */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="font-serif text-sm font-bold text-[#241A16] truncate">
                      {item.vietnameseName}
                    </h4>
                    {isEquipped && (
                      <span className="text-[10px] font-semibold text-[#8B2624] uppercase tracking-wider shrink-0">
                        Đang mặc
                      </span>
                    )}
                  </div>

                  {item.fabricType && (
                    <div className="text-[11px] font-medium text-[#8B2624] truncate">
                      {item.fabricType}
                    </div>
                  )}

                  <p className="text-[11px] text-[#6B5E55] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Clean unboxed metadata (Anti-slop discipline) */}
                  <div className="flex items-center gap-1.5 text-[10px] text-[#8B7C72] pt-0.5">
                    <span>
                      {item.era === 'nguyen_court'
                        ? 'Triều Nguyễn'
                        : item.era === 'le_dynasty'
                        ? 'Thời Hậu Lê'
                        : item.era === 'folk_tradition'
                        ? 'Dân gian'
                        : item.era === 'modern_revival'
                        ? 'Thế kỷ 20'
                        : 'Cách tân Remix'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{item.genderSupport === 'female' ? 'Nữ' : item.genderSupport === 'male' ? 'Nam' : 'Unisex'}</span>
                  </div>
                </div>

                {/* Color Palette Picker Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isEquipped) {
                      onEquipGarment(activeCategory, item.id);
                    }
                    onOpenColorPicker(item.id);
                  }}
                  title="Tùy chọn sắc màu lụa"
                  className="p-1.5 text-[#8B7C72] hover:text-[#8B2624] hover:bg-[#F5EFEB] rounded-xl transition-colors shrink-0 self-center cursor-pointer"
                >
                  <Palette className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

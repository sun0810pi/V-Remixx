import React, { useState } from 'react';
import { GarmentCategory, GarmentItem, HistoricalEra, OccasionType, OutfitState } from '../types/fashion';
import { GARMENT_CATALOG } from '../data/catalog';
import { playEquipSound, playUnequipSound } from '../utils/sound';
import { X, Check, Palette, Sparkles, Filter, ChevronRight, Trash2 } from 'lucide-react';

interface WardrobeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: GarmentCategory;
  onSelectCategory: (category: GarmentCategory) => void;
  outfit: OutfitState;
  onEquipGarment: (category: GarmentCategory, garmentId: string) => void;
  onUnequipGarment: (category: GarmentCategory) => void;
  onOpenColorPicker: (garmentId: string) => void;
}

const CATEGORY_TABS: { key: GarmentCategory; label: string; count: number }[] = [
  { key: 'tunic', label: 'Áo Chính (Tops)', count: GARMENT_CATALOG.filter((g) => g.category === 'tunic').length },
  { key: 'bottom', label: 'Quần & Váy (Bottoms)', count: GARMENT_CATALOG.filter((g) => g.category === 'bottom').length },
  { key: 'outerwear', label: 'Áo Khoác (Outerwear)', count: GARMENT_CATALOG.filter((g) => g.category === 'outerwear').length },
  { key: 'headwear', label: 'Khăn & Nón (Headwear)', count: GARMENT_CATALOG.filter((g) => g.category === 'headwear').length },
  { key: 'jewelry', label: 'Trang Sức (Jewelry)', count: GARMENT_CATALOG.filter((g) => g.category === 'jewelry').length },
  { key: 'footwear', label: 'Giày Guốc (Shoes)', count: GARMENT_CATALOG.filter((g) => g.category === 'footwear').length },
  { key: 'handheld', label: 'Cầm Tay (Handheld)', count: GARMENT_CATALOG.filter((g) => g.category === 'handheld').length },
  { key: 'inner', label: 'Áo Lót & Yếm (Inner)', count: GARMENT_CATALOG.filter((g) => g.category === 'inner').length },
];

export const WardrobeDrawer: React.FC<WardrobeDrawerProps> = ({
  isOpen,
  onClose,
  activeCategory,
  onSelectCategory,
  outfit,
  onEquipGarment,
  onUnequipGarment,
  onOpenColorPicker,
}) => {
  const [selectedEra, setSelectedEra] = useState<string>('all');

  if (!isOpen) return null;

  const currentEquippedId = outfit.selectedGarments[activeCategory];

  const filteredItems = GARMENT_CATALOG.filter((item) => {
    if (item.category !== activeCategory) return false;
    if (selectedEra !== 'all' && item.era !== selectedEra) return false;
    return true;
  });

  const handleToggleItem = (item: GarmentItem) => {
    if (currentEquippedId === item.id) {
      playUnequipSound();
      onUnequipGarment(activeCategory);
    } else {
      playEquipSound();
      onEquipGarment(activeCategory, item.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#FBF9F5] border border-[#E3DACB] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EAE3D6] flex items-center justify-between bg-white">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#8B2624] font-semibold">
              ATELIER WARDROBE
            </span>
            <h3 className="font-serif text-xl font-bold text-[#241A16] mt-0.5">
              Kho Trang Phục &amp; Phụ Kiện
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#736357] hover:text-[#241A16] hover:bg-[#F2ECE1] rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="px-6 py-2.5 bg-[#FAF7F2] border-b border-[#EAE3D6] flex items-center gap-2 overflow-x-auto scrollbar-none">
          {CATEGORY_TABS.map((tab) => {
            const isActive = tab.key === activeCategory;
            const isEquipped = Boolean(outfit.selectedGarments[tab.key]);
            return (
              <button
                key={tab.key}
                onClick={() => onSelectCategory(tab.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#4E1D24] text-white font-semibold shadow-2xs'
                    : 'text-[#6B5E55] hover:text-[#241A16] hover:bg-white'
                }`}
              >
                <span>{tab.label}</span>
                {isEquipped && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-[#4E1D24]'}`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Garment Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const isEquipped = currentEquippedId === item.id;
            const activeColor = outfit.garmentColors[item.id] || item.defaultColorHex;

            return (
              <div
                key={item.id}
                onClick={() => handleToggleItem(item)}
                className={`group flex flex-col rounded-xl overflow-hidden bg-white border cursor-pointer transition-all duration-200 ${
                  isEquipped
                    ? 'border-[#4E1D24] ring-2 ring-[#4E1D24]/20 shadow-md'
                    : 'border-[#E5DDD0] hover:border-[#C5B8A5] hover:shadow-xs'
                }`}
              >
                {/* Visual Header / Actual Thumbnail Asset */}
                <div className="h-32 bg-[#FAF8F5] relative flex items-center justify-center p-2 border-b border-[#F0EAE0]">
                  <img
                    src={item.thumbnailUrl || `/assets/thumbnails/${item.id}.svg`}
                    alt={item.vietnameseName}
                    referrerPolicy="no-referrer"
                    className="w-24 h-24 object-contain transition-transform group-hover:scale-105 drop-shadow-2xs"
                  />

                  {/* Active Color Tint Pill */}
                  <div
                    className="absolute bottom-2 right-2 w-4 h-4 rounded-full border border-black/20 shadow-2xs"
                    style={{ backgroundColor: activeColor }}
                    title={`Màu sắc hiện tại: ${activeColor}`}
                  />

                  {/* Equipped Badge */}
                  {isEquipped && (
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#4E1D24] text-white text-[10px] font-semibold rounded-full tracking-wide flex items-center gap-1 shadow-2xs">
                      <Check className="w-3 h-3" /> Đang mặc
                    </span>
                  )}

                  {/* Fabric Tag */}
                  {item.fabricType && (
                    <span className="absolute bottom-2 left-2.5 text-[10px] text-[#8B7E74] bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-md border border-[#E5DDD0]">
                      {item.fabricType}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#241A16] group-hover:text-[#4E1D24] transition-colors">
                      {item.vietnameseName}
                    </h4>
                    <p className="text-[11px] text-[#736357] line-clamp-2 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#F0EAE0] flex items-center justify-between text-xs">
                    <span className="text-[10px] text-[#8B7E74]">
                      {item.tags?.[0] ? `#${item.tags[0]}` : 'Di sản'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenColorPicker(item.id);
                      }}
                      className="p-1 text-[#8B7E74] hover:text-[#4E1D24] transition-colors rounded-lg hover:bg-[#FAF8F5]"
                      title="Chọn màu sắc lụa"
                    >
                      <Palette className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-white border-t border-[#EAE3D6] flex items-center justify-between text-xs text-[#736357]">
          <span>
            Đã trang bị: <strong className="text-[#241A16]">{filteredItems.length} mẫu</strong> trong danh mục này
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#4E1D24] hover:bg-[#3D161C] text-white font-medium rounded-xl transition-colors cursor-pointer"
          >
            Xong
          </button>
        </div>
      </div>
    </div>
  );
};

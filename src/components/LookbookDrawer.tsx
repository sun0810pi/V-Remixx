import React from 'react';
import { LookbookItem, OutfitState } from '../types/fashion';
import { GARMENT_CATALOG } from '../data/catalog';
import { Bookmark, Trash2, ArrowUpRight, Scale, Calendar, X } from 'lucide-react';
import { playEquipSound } from '../utils/sound';

interface LookbookDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedLooks: LookbookItem[];
  onLoadLook: (outfit: OutfitState) => void;
  onDeleteLook: (id: string) => void;
  onCompareLook: (look: LookbookItem) => void;
}

export const LookbookDrawer: React.FC<LookbookDrawerProps> = ({
  isOpen,
  onClose,
  savedLooks,
  onLoadLook,
  onDeleteLook,
  onCompareLook,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md h-full bg-[#FBF9F5] border-l border-[#E8E1D5] p-5 sm:p-6 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-3">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase tracking-widest text-[#8B2624] font-semibold">
              ATELIER ARCHIVE
            </span>
            <h3 className="font-serif text-lg font-bold text-[#241A16]">
              Lookbook Của Bạn ({savedLooks.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8B7C72] hover:text-[#241A16] hover:bg-[#F2ECE4] rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Saved Looks List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
          {savedLooks.length === 0 ? (
            <div className="text-center py-24 text-[#8B7C72] text-xs space-y-3">
              <Bookmark className="w-10 h-10 mx-auto opacity-20 text-[#8B2624]" />
              <p className="font-serif text-sm font-semibold text-[#3E312B]">
                Chưa có outfit nào trong Lookbook
              </p>
              <p className="text-[11px] text-[#A89C93] max-w-xs mx-auto">
                Hãy tự do sáng tạo một bộ đồ di sản ưng ý trong Studio và nhấn "Lưu Lookbook"!
              </p>
            </div>
          ) : (
            savedLooks.map((item) => {
              const tunic = item.outfit.selectedGarments.tunic
                ? GARMENT_CATALOG.find((g) => g.id === item.outfit.selectedGarments.tunic)
                : null;
              const bottom = item.outfit.selectedGarments.bottom
                ? GARMENT_CATALOG.find((g) => g.id === item.outfit.selectedGarments.bottom)
                : null;
              const head = item.outfit.selectedGarments.headwear
                ? GARMENT_CATALOG.find((g) => g.id === item.outfit.selectedGarments.headwear)
                : null;

              return (
                <div
                  key={item.id}
                  className="bg-white border border-[#E8E1D5] rounded-2xl p-4 space-y-3 hover:border-[#D5C7B7] transition-all shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#241A16]">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-[#8B7C72] mt-0.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                        </span>
                        <span>·</span>
                        <span className="text-[#8B2624] font-medium">
                          {item.culturalReview.score} điểm hài hòa
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onDeleteLook(item.id)}
                      title="Xóa bộ đồ"
                      className="text-[#A89C93] hover:text-[#8B2624] p-1 hover:bg-[#FAF8F5] rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Equipped preview */}
                  <div className="text-[11px] text-[#52443C] space-y-1 bg-[#FAF8F5] p-2.5 rounded-xl border border-[#F0EAE1]">
                    {tunic && <div>• Áo chính: <span className="font-medium text-[#241A16]">{tunic.vietnameseName}</span></div>}
                    {bottom && <div>• Quần/Váy: <span className="font-medium text-[#241A16]">{bottom.vietnameseName}</span></div>}
                    {head && <div>• Khăn/Nón: <span className="font-medium text-[#241A16]">{head.vietnameseName}</span></div>}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-1 border-t border-[#F0EAE1]">
                    <button
                      onClick={() => {
                        playEquipSound();
                        onLoadLook(item.outfit);
                        onClose();
                      }}
                      className="flex-1 py-2 bg-[#8B2624] hover:bg-[#721F1D] text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>Mặc lại vào Studio</span>
                    </button>

                    <button
                      onClick={() => onCompareLook(item)}
                      title="So sánh với bộ hiện tại"
                      className="px-3 py-2 bg-[#FAF8F5] hover:bg-[#F2ECE4] text-[#52443C] hover:text-[#8B2624] rounded-xl text-xs font-semibold transition-colors cursor-pointer border border-[#E8E1D5]"
                    >
                      <Scale className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

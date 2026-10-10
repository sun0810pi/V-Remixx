import React from 'react';
import { OutfitState, LookbookItem } from '../types/fashion';
import { GARMENT_CATALOG } from '../data/catalog';
import { runDeterministicCulturalReview } from '../data/culturalRules';
import { X, Scale } from 'lucide-react';

interface OutfitComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentOutfit: OutfitState;
  comparisonLook: LookbookItem | null;
  savedLooks: LookbookItem[];
  onSelectComparisonLook: (look: LookbookItem) => void;
}

export const OutfitComparisonModal: React.FC<OutfitComparisonModalProps> = ({
  isOpen,
  onClose,
  currentOutfit,
  comparisonLook,
  savedLooks,
  onSelectComparisonLook,
}) => {
  if (!isOpen) return null;

  const currentReview = runDeterministicCulturalReview(currentOutfit);
  const targetLook = comparisonLook || savedLooks[0] || null;
  const targetReview = targetLook ? runDeterministicCulturalReview(targetLook.outfit) : null;

  const renderGarmentRow = (categoryLabel: string, catKey: keyof OutfitState['selectedGarments']) => {
    const currentId = currentOutfit.selectedGarments[catKey];
    const targetId = targetLook?.outfit.selectedGarments[catKey];

    const currentGarment = currentId ? GARMENT_CATALOG.find((g) => g.id === currentId) : null;
    const targetGarment = targetId ? GARMENT_CATALOG.find((g) => g.id === targetId) : null;

    const isDifferent = currentId !== targetId;

    return (
      <tr className={`border-b border-[#F0EAE1] text-xs ${isDifferent ? 'bg-[#FDF9F8]' : ''}`}>
        <td className="py-2.5 px-3 font-semibold text-[#8B7C72]">{categoryLabel}</td>
        <td className="py-2.5 px-3 text-[#241A16] font-medium">
          {currentGarment ? (
            <div>
              <span>{currentGarment.vietnameseName}</span>
              {currentGarment.fabricType && (
                <div className="text-[10px] text-[#8B2624] font-normal">{currentGarment.fabricType}</div>
              )}
            </div>
          ) : (
            <span className="text-[#A89C93] italic">Trống</span>
          )}
        </td>
        <td className="py-2.5 px-3 text-[#241A16] font-medium">
          {targetGarment ? (
            <div>
              <span>{targetGarment.vietnameseName}</span>
              {targetGarment.fabricType && (
                <div className="text-[10px] text-[#8B2624] font-normal">{targetGarment.fabricType}</div>
              )}
            </div>
          ) : (
            <span className="text-[#A89C93] italic">Trống</span>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-[#FBF9F5] border border-[#E8E1D5] rounded-3xl p-6 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-3">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase tracking-widest text-[#8B2624] font-semibold">
              OUTFIT COMPARISON
            </span>
            <h3 className="font-serif text-lg font-bold text-[#241A16]">
              So Sánh Hai Bản Phối Thời Trang
            </h3>
            <p className="text-xs text-[#6B5E55]">
              Đối chiếu chi tiết từng lớp trang phục và bối cảnh văn hóa
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8B7C72] hover:text-[#241A16] hover:bg-[#F2ECE4] rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Target Look Picker if multiple saved looks exist */}
        {savedLooks.length > 1 && (
          <div className="py-2.5 flex items-center gap-2 border-b border-[#F0EAE1] text-xs">
            <span className="text-[#8B7C72] font-medium">So sánh với:</span>
            <select
              value={targetLook?.id || ''}
              onChange={(e) => {
                const found = savedLooks.find((l) => l.id === e.target.value);
                if (found) onSelectComparisonLook(found);
              }}
              className="bg-white border border-[#E5DDD0] text-[#241A16] text-xs rounded-xl px-3 py-1 focus:outline-none"
            >
              {savedLooks.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Comparison Table */}
        <div className="flex-1 overflow-y-auto py-3">
          {!targetLook ? (
            <div className="text-center py-16 text-[#8B7C72] text-xs">
              <Scale className="w-8 h-8 mx-auto opacity-20 text-[#8B2624] mb-2" />
              <p className="font-serif font-bold text-sm text-[#241A16]">Chưa có outfit nào khác trong Lookbook để so sánh</p>
              <p className="text-[11px] text-[#A89C93] mt-1">
                Lưu outfit hiện tại vào Lookbook trước, sau đó phối một phiên bản mới để đối chiếu!
              </p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E8E1D5] text-xs text-[#8B7C72] uppercase tracking-wider">
                  <th className="py-2.5 px-3 w-1/4">Thành Phần</th>
                  <th className="py-2.5 px-3 w-3/8 text-[#8B2624] font-bold">Outfit Đang Mặc</th>
                  <th className="py-2.5 px-3 w-3/8 text-[#241A16] font-bold">Bộ Đối Chiếu ({targetLook.title})</th>
                </tr>
              </thead>
              <tbody>
                {renderGarmentRow('Áo Chính (Tunic)', 'tunic')}
                {renderGarmentRow('Áo Lót / Yếm (Inner)', 'inner')}
                {renderGarmentRow('Quần / Váy (Bottom)', 'bottom')}
                {renderGarmentRow('Áo Khoác (Outer)', 'outerwear')}
                {renderGarmentRow('Khăn / Nón (Head)', 'headwear')}
                {renderGarmentRow('Trang Sức (Jewelry)', 'jewelry')}
                {renderGarmentRow('Giày Guốc (Footwear)', 'footwear')}
                {renderGarmentRow('Cầm Tay (Handheld)', 'handheld')}

                {/* Cultural Evaluation Row */}
                <tr className="border-b border-[#F0EAE1] text-xs font-semibold">
                  <td className="py-3 px-3 text-[#8B7C72]">Đánh Giá Bối Cảnh</td>
                  <td className="py-3 px-3 text-[#8B2624]">
                    {currentReview.overallStatus === 'appropriate' ? 'Phù hợp bối cảnh' : 'Cần xem xét thêm'} ({currentReview.score}đ)
                  </td>
                  <td className="py-3 px-3 text-[#2D5A47]">
                    {targetReview?.overallStatus === 'appropriate' ? 'Phù hợp bối cảnh' : 'Cần xem xét thêm'} ({targetReview?.score}đ)
                  </td>
                </tr>

                {/* Style Mode Row */}
                <tr className="border-b border-[#F0EAE1] text-xs">
                  <td className="py-2.5 px-3 text-[#8B7C72]">Định Hướng</td>
                  <td className="py-2.5 px-3 text-[#241A16]">
                    {currentOutfit.styleMode === 'traditional_pure' ? 'Truyền Thống Thuần Túy' : 'Cách Tân Remix'}
                  </td>
                  <td className="py-2.5 px-3 text-[#241A16]">
                    {targetLook.outfit.styleMode === 'traditional_pure' ? 'Truyền Thống Thuần Túy' : 'Cách Tân Remix'}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#F0EAE1] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#8B2624] hover:bg-[#721F1D] text-white text-xs font-semibold rounded-2xl transition-colors cursor-pointer shadow-xs"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

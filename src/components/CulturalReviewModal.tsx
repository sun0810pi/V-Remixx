import React from 'react';
import { OutfitState, CulturalReviewSummary, GarmentCategory } from '../types/fashion';
import { CulturalReviewCard } from './CulturalReviewCard';
import { X } from 'lucide-react';

interface CulturalReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: CulturalReviewSummary;
  outfit: OutfitState;
  onApplyAutoFix: (category: GarmentCategory, targetGarmentId: string | null) => void;
}

export const CulturalReviewModal: React.FC<CulturalReviewModalProps> = ({
  isOpen,
  onClose,
  review,
  outfit,
  onApplyAutoFix,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#FBF9F5] border border-[#E3DACB] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EAE3D6] flex items-center justify-between bg-white">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#8B2624] font-semibold">
              CULTURAL AUTHENTICITY &amp; CONTEXT
            </span>
            <h3 className="font-serif text-xl font-bold text-[#241A16] mt-0.5">
              Đánh Giá Tính Hài Hòa &amp; Điển Chế
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#736357] hover:text-[#241A16] hover:bg-[#F2ECE1] rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          <CulturalReviewCard
            review={review}
            outfit={outfit}
            onApplyAutoFix={(cat, targetId) => {
              onApplyAutoFix(cat, targetId);
              // don't immediately close so the user can see the updated score!
            }}
          />
        </div>
      </div>
    </div>
  );
};

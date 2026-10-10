import React, { useState } from 'react';
import { CulturalReviewSummary, CulturalCheckResult, OutfitState, GarmentCategory } from '../types/fashion';
import { ShieldCheck, AlertCircle, HelpCircle, BookOpen, Wrench, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { playEquipSound } from '../utils/sound';

interface CulturalReviewCardProps {
  review: CulturalReviewSummary;
  outfit: OutfitState;
  onApplyAutoFix: (category: GarmentCategory, targetGarmentId: string | null) => void;
  onRequestAICommentary?: () => void;
  isLoadingAI?: boolean;
}

export const CulturalReviewCard: React.FC<CulturalReviewCardProps> = ({
  review,
  outfit,
  onApplyAutoFix,
  onRequestAICommentary,
  isLoadingAI = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [expandedCheckIdx, setExpandedCheckIdx] = useState<number | null>(null);

  const getStatusDisplay = (status: CulturalCheckResult['status']) => {
    switch (status) {
      case 'appropriate':
        return (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-[#2D5A47]">
            <ShieldCheck className="w-3.5 h-3.5" /> Phù hợp với bối cảnh
          </span>
        );
      case 'needs_review':
        return (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-[#8B2624]">
            <AlertCircle className="w-3.5 h-3.5" /> Cần xem xét thêm
          </span>
        );
      case 'insufficient_evidence':
        return (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-[#8B7C72]">
            <HelpCircle className="w-3.5 h-3.5" /> Chưa đủ bằng chứng
          </span>
        );
    }
  };

  return (
    <div className="bg-white/95 border border-[#E8E1D5] rounded-3xl p-4 sm:p-5 shadow-xs space-y-3">
      {/* Header with Title and Toggle */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-start justify-between gap-3 cursor-pointer select-none"
      >
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-[#8B2624] font-semibold">
              HERITAGE REVIEW
            </span>
            {review.isHarmoniousRemix && (
              <span className="text-[10px] font-medium text-[#2D5A47] bg-[#2D5A47]/10 px-2 py-0.5 rounded-full">
                Sáng tạo đương đại
              </span>
            )}
          </div>
          <h3 className="font-serif text-base font-bold text-[#241A16]">
            Kiểm Tra Bối Cảnh Văn Hóa
          </h3>
          <p className="text-xs text-[#6B5E55] leading-relaxed pt-0.5">
            {review.summary}
          </p>
        </div>

        <button className="p-1 text-[#8B7C72] hover:text-[#241A16] rounded-lg">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isOpen && (
        <div className="space-y-3 pt-2 border-t border-[#F0EAE1]">
          {/* Era Composition Text */}
          {review.eraComposition.length > 0 && (
            <div className="text-xs space-y-1">
              <span className="text-[10px] text-[#8B7C72] uppercase tracking-wider font-semibold">
                Nguồn gốc thời kỳ:
              </span>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {review.eraComposition.map((era) => (
                  <span
                    key={era.era}
                    className="text-[11px] bg-[#FAF8F5] text-[#3E312B] px-2.5 py-0.5 rounded-lg border border-[#E8E1D5]"
                  >
                    {era.name} ({era.count})
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Individual Cultural Checks */}
          <div className="space-y-2 pt-1">
            {review.checks.map((check, idx) => {
              const isExpanded = expandedCheckIdx === idx || check.status === 'needs_review';

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border transition-all text-xs ${
                    check.status === 'needs_review'
                      ? 'bg-[#FDF9F8] border-[#8B2624]/30'
                      : 'bg-[#FCFBF9] border-[#EFE9DF]'
                  }`}
                >
                  <div
                    onClick={() => setExpandedCheckIdx(isExpanded ? null : idx)}
                    className="flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {getStatusDisplay(check.status)}
                      <span className="font-serif font-bold text-[#241A16] truncate">
                        · {check.title}
                      </span>
                    </div>
                    <button className="text-[#8B7C72] hover:text-[#241A16]">
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-2.5 pt-2 border-t border-[#F0EAE1] space-y-2 text-[11px] leading-relaxed text-[#52443C]">
                      <div>
                        <span className="font-medium text-[#8B7C72]">Khảo sát: </span>
                        <span>{check.whatWasChecked}</span>
                      </div>

                      {check.issueIdentified && (
                        <div className="text-[#8B2624] bg-red-50/70 p-2 rounded-xl border border-red-100">
                          <span className="font-semibold">Điểm lưu ý: </span>
                          <span>{check.issueIdentified}</span>
                        </div>
                      )}

                      <div>
                        <span className="font-medium text-[#8B7C72]">Ý nghĩa: </span>
                        <span>{check.whyItMatters}</span>
                      </div>

                      <div>
                        <span className="font-medium text-[#8B7C72]">Gợi ý tinh chỉnh: </span>
                        <span className="text-[#241A16] font-medium">{check.recommendation}</span>
                      </div>

                      {check.historicalCitation && (
                        <div className="flex items-center gap-1.5 text-[10px] text-[#8B2624] italic pt-0.5">
                          <BookOpen className="w-3 h-3 shrink-0" />
                          <span>Căn cứ lịch sử: {check.historicalCitation}</span>
                        </div>
                      )}

                      {/* Actionable Quick Fix */}
                      {check.autoFixAction && (
                        <div className="pt-1.5">
                          <button
                            onClick={() => {
                              playEquipSound();
                              onApplyAutoFix(
                                check.autoFixAction!.category,
                                check.autoFixAction!.targetGarmentId
                              );
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#8B2624] hover:bg-[#721F1D] text-white font-semibold rounded-xl text-[11px] transition-colors cursor-pointer shadow-xs"
                          >
                            <Wrench className="w-3 h-3" />
                            <span>Điều chỉnh ngay: {check.autoFixAction.label}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* AI Historical Commentary */}
          {review.aiCommentary ? (
            <div className="p-3 bg-[#FAF8F5] border border-[#E8E1D5] rounded-2xl text-xs space-y-1">
              <span className="font-serif font-bold text-[#8B2624] text-xs">Góc nhìn nghiên cứu:</span>
              <p className="text-[11px] text-[#52443C] italic leading-relaxed">
                "{review.aiCommentary}"
              </p>
            </div>
          ) : (
            onRequestAICommentary && (
              <button
                onClick={onRequestAICommentary}
                disabled={isLoadingAI}
                className="w-full py-2 bg-[#F7F4EE] hover:bg-[#EFE9DF] text-[#6B5E55] hover:text-[#8B2624] rounded-2xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#8B2624]" />
                <span>{isLoadingAI ? 'Đang tra cứu tư liệu...' : 'Tra cứu thêm bối cảnh di sản'}</span>
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

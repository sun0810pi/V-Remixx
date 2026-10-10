import React, { useState } from 'react';
import { OutfitState, AIOutfitConcept, GarmentCategory } from '../types/fashion';
import { GARMENT_CATALOG } from '../data/catalog';
import { Sparkles, Send, RefreshCw, Check, Compass, ChevronDown, ChevronUp } from 'lucide-react';
import { playEquipSound } from '../utils/sound';

interface AIStylingPanelProps {
  outfit: OutfitState;
  onApplyConcept: (concept: AIOutfitConcept) => void;
  onApplySingleGarment: (category: GarmentCategory, garmentId: string, colorHex?: string) => void;
}

const QUICK_PROMPTS = [
  'Áo dài lụa đỏ son đón Tết cổ truyền',
  'Hoàng gia Cố Đô Huế trang nghiêm với Áo Tấc & Khăn Đóng',
  'Remix Áo Yếm lụa với phong cách đương đại',
  'Áo dài trắng ngà thanh tao đi lễ chùa',
  'Nét mộc Nam Bộ với Áo Bà Ba và Khăn Rằn',
];

export const AIStylingPanel: React.FC<AIStylingPanelProps> = ({
  outfit,
  onApplyConcept,
  onApplySingleGarment,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [promptText, setPromptText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [concepts, setConcepts] = useState<AIOutfitConcept[]>([]);
  const [activeConceptIdx, setActiveConceptIdx] = useState<number>(0);

  const handleGenerate = async (customPrompt?: string) => {
    const textToSubmit = customPrompt || promptText;
    if (!textToSubmit.trim()) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/outfit-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSubmit,
          currentOutfit: outfit,
          availableGarmentIds: GARMENT_CATALOG.map((g) => ({
            id: g.id,
            category: g.category,
            name: g.name,
            vietnameseName: g.vietnameseName,
            era: g.era,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Không thể kết nối AI Stylist');
      }

      const data = await response.json();
      if (data.concepts && data.concepts.length > 0) {
        setConcepts(data.concepts);
        setActiveConceptIdx(0);
      } else {
        throw new Error('Không có concept phù hợp');
      }
    } catch {
      setConcepts(getAlgorithmicConcepts(textToSubmit, outfit));
      setActiveConceptIdx(0);
    } finally {
      setIsLoading(false);
    }
  };

  const currentConcept = concepts[activeConceptIdx];

  return (
    <div className="bg-white/95 border border-[#E8E1D5] rounded-3xl p-4 sm:p-5 shadow-xs space-y-3.5">
      {/* Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <div className="space-y-0.5">
          <span className="text-[10px] uppercase tracking-widest text-[#8B2624] font-semibold">
            STYLE ASSISTANT
          </span>
          <h3 className="font-serif text-base font-bold text-[#241A16]">
            Gợi Ý Phối Đồ AI
          </h3>
          <p className="text-xs text-[#6B5E55]">
            Khám phá cách phối trang phục mới từ kho đồ di sản thực tế
          </p>
        </div>
        <button className="p-1 text-[#8B7C72] hover:text-[#241A16] rounded-lg">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isOpen && (
        <div className="space-y-3 pt-2 border-t border-[#F0EAE1]">
          {/* Quick Prompts */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-[#8B7C72] uppercase tracking-wider font-semibold">
              Gợi ý nhanh theo chủ đề:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {QUICK_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPromptText(p);
                    handleGenerate(p);
                  }}
                  className="text-[11px] bg-[#FAF8F5] hover:bg-[#F2ECE4] text-[#52443C] px-3 py-1.5 rounded-xl border border-[#E8E1D5] whitespace-nowrap transition-colors cursor-pointer"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Form */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              placeholder="Nhập ý tưởng (vd: Áo dài đỏ son dự tiệc trà Đông Dương)..."
              className="flex-1 bg-[#FAF8F5] border border-[#E5DDD0] rounded-2xl px-3.5 py-2 text-xs text-[#241A16] placeholder-[#A89C93] focus:outline-none focus:border-[#8B2624]"
            />
            <button
              onClick={() => handleGenerate()}
              disabled={isLoading || !promptText.trim()}
              className="p-2.5 bg-[#8B2624] hover:bg-[#721F1D] disabled:opacity-50 text-white rounded-2xl transition-colors cursor-pointer shadow-xs disabled:cursor-not-allowed"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>

          {/* Concepts Display */}
          {concepts.length > 0 && currentConcept && (
            <div className="space-y-3 pt-2 border-t border-[#F0EAE1]">
              <div className="flex items-center justify-between">
                <span className="font-serif text-xs font-bold text-[#8B2624]">
                  3 Concept Đề Xuất:
                </span>
                <div className="flex items-center gap-1">
                  {concepts.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveConceptIdx(i)}
                      className={`px-2.5 py-0.5 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                        activeConceptIdx === i
                          ? 'bg-[#8B2624] text-white font-bold'
                          : 'bg-[#FAF8F5] text-[#6B5E55] hover:text-[#241A16]'
                      }`}
                    >
                      Concept {i + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Concept Box */}
              <div className="p-4 bg-[#FAF8F5] border border-[#E8E1D5] rounded-2xl space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-sm font-bold text-[#241A16]">
                      {currentConcept.vietnameseTitle}
                    </h4>
                    <span className="text-[10px] text-[#8B7C72] uppercase tracking-wider font-medium">
                      {currentConcept.styleVibe}
                    </span>
                  </div>
                  <p className="text-xs text-[#52443C] mt-1 leading-relaxed">
                    {currentConcept.narrativeDescription}
                  </p>
                </div>

                <div className="text-[11px] bg-white p-2.5 rounded-xl border border-[#F0EAE1] text-[#6B5E55] leading-relaxed italic">
                  <span className="text-[#8B2624] font-medium not-italic">Lý do văn hóa: </span>
                  {currentConcept.culturalRationale}
                </div>

                {/* Items in concept */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] text-[#8B7C72] uppercase tracking-wider font-semibold">
                    Các món trong bộ:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                    {Object.entries(currentConcept.garmentIds).map(([cat, gid]) => {
                      if (!gid) return null;
                      const garment = GARMENT_CATALOG.find((g) => g.id === gid);
                      if (!garment) return null;
                      const suggestedColor = currentConcept.colorSuggestions[gid];

                      return (
                        <div
                          key={cat}
                          className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#F0EAE1]"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {suggestedColor && (
                              <span
                                className="w-2.5 h-2.5 rounded-full border border-black/15 shrink-0"
                                style={{ backgroundColor: suggestedColor }}
                              />
                            )}
                            <span className="text-[#3E312B] truncate text-[11px] font-medium">
                              {garment.vietnameseName}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              playEquipSound();
                              onApplySingleGarment(cat as GarmentCategory, gid, suggestedColor);
                            }}
                            title="Chỉ thử món này"
                            className="text-[10px] text-[#8B2624] hover:underline font-semibold shrink-0 cursor-pointer"
                          >
                            Thử món này
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Apply Full Outfit */}
                <button
                  onClick={() => {
                    playEquipSound();
                    onApplyConcept(currentConcept);
                  }}
                  className="w-full py-2.5 bg-[#8B2624] hover:bg-[#721F1D] text-white font-semibold rounded-2xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Áp Dụng Toàn Bộ Outfit Này</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

function getAlgorithmicConcepts(prompt: string, outfit: OutfitState): AIOutfitConcept[] {
  return [
    {
      conceptId: 'concept_1',
      conceptTitle: 'Auspicious Spring Radiance',
      vietnameseTitle: 'Sắc Đỏ Thiều Quang (Tết Cổ Truyền)',
      narrativeDescription: 'Áo Dài lụa Hà Đông đỏ son thêu hoa cúc vàng kim, phối cùng quần lụa trắng ngà, mấn nhung đính ngọc trai và quạt lụa thêu chim hạc.',
      styleVibe: 'Trang trọng & Cổ điển',
      garmentIds: {
        tunic: 'ao_dai_traditional',
        bottom: 'quan_ao_dai_white',
        headwear: 'man_nhung_pearl',
        handheld: 'quat_lua_hac',
        footwear: 'hai_nhung_theu_gold',
        jewelry: 'kieng_bac_lotus',
      },
      colorSuggestions: {
        ao_dai_traditional: '#8B2624',
        quan_ao_dai_white: '#FAF6F0',
        man_nhung_pearl: '#8B2624',
        quat_lua_hac: '#FAF6F0',
      },
      culturalRationale: 'Sắc đỏ son trầm biểu trưng cho may mắn, phúc lộc đầu xuân. Kiềng bạc chạm sen tôn lên cốt cách đoan trang Thăng Long.',
    },
    {
      conceptId: 'concept_2',
      conceptTitle: 'Imperial Dignity of Hue',
      vietnameseTitle: 'Khí Chất Cung Đình Xứ Huế',
      narrativeDescription: 'Áo Tấc tay thụng vàng hoàng triều dệt gấm kim tuyến, kết hợp khăn đóng ngũ nếp lụa đen và hài nhung thêu hoa tinh xảo.',
      styleVibe: 'Nghi lễ Hoàng gia',
      garmentIds: {
        tunic: 'ao_tac_royal',
        bottom: 'quan_ao_dai_white',
        headwear: 'khan_dong_traditional',
        footwear: 'hai_nhung_theu_gold',
        jewelry: 'kieng_bac_lotus',
        handheld: 'nhanh_sen_ngoc',
      },
      colorSuggestions: {
        ao_tac_royal: '#C5A059',
        khan_dong_traditional: '#2C221E',
        quan_ao_dai_white: '#FAF6F0',
      },
      culturalRationale: 'Tuân thủ nghiêm ngặt điển chế Lễ phục triều Nguyễn, thể hiện sự tôn kính gia tiên và đức hạnh Nhân - Lễ - Nghĩa - Trí - Tín.',
    },
    {
      conceptId: 'concept_3',
      conceptTitle: 'Contemporary Indochine Remix',
      vietnameseTitle: 'Giao Thoa Đương Đại Đông Dương',
      narrativeDescription: 'Áo Dài Cách Tân gấm hoa tà lửng sắc hồng cánh sen phối cùng quần culottes linen mộc, túi cói Kim Sơn thêu tay và giày loafer da bóng.',
      styleVibe: 'Đương đại & Tự do',
      garmentIds: {
        tunic: 'ao_dai_cachtan',
        bottom: 'quan_culottes_modern',
        footwear: 'modern_leather_loafers',
        handheld: 'tui_coi_lotus',
        jewelry: 'pearl_necklace_phuquoc',
      },
      colorSuggestions: {
        ao_dai_cachtan: '#CF8481',
        quan_culottes_modern: '#FAF6F0',
      },
      culturalRationale: 'Sự hòa quyện giữa nhịp sống đô thị trẻ trung và tình yêu di sản thủ công Việt Nam.',
    },
  ];
}

import React, { useState } from 'react';
import { VIETNAMESE_FASHION_CHRONOLOGY, AO_DAI_ANATOMY, CULTURAL_ETIQUETTE_GUIDE } from '../data/encyclopedia';
import { BookOpen, Clock, Sparkles, CheckCircle2, ChevronRight, Search } from 'lucide-react';

export const HeritageEncyclopedia: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'anatomy' | 'etiquette'>('timeline');
  const [selectedPeriodId, setSelectedPeriodId] = useState<string>('nguyen_court');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentPeriod = VIETNAMESE_FASHION_CHRONOLOGY.find((p) => p.id === selectedPeriodId) || VIETNAMESE_FASHION_CHRONOLOGY[0];

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Encyclopedia Banner */}
      <div className="bg-gradient-to-r from-amber-950/70 via-stone-900 to-stone-900 border border-amber-600/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" /> Bách Khoa Toàn Thư Cổ Phục & Di Sản
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">
            Dòng Chảy Trang Phục Việt Nam
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Khám phá hơn 1000 năm lịch sử y phục Đại Việt - Việt Nam, từ áo Giao Lĩnh thời Lý - Trần,
            Lễ phục Áo Tấc triều Nguyễn đến nét thanh tao của Áo Dài hiện đại.
          </p>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-800 pb-3">
        {[
          { key: 'timeline', label: 'Niên Biểu Lịch Sử', icon: Clock },
          { key: 'anatomy', label: 'Cấu Trúc Áo Dài', icon: Sparkles },
          { key: 'etiquette', label: 'Quy Chuẩn Ứng Xử', icon: CheckCircle2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-600 text-stone-950 shadow-md shadow-amber-900/30'
                  : 'bg-stone-900/60 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Chronological Timeline */}
      {activeTab === 'timeline' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Era Selector (Left) */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
              Chọn Thời Kỳ:
            </span>
            <div className="space-y-1.5">
              {VIETNAMESE_FASHION_CHRONOLOGY.map((p) => {
                const isSelected = p.id === selectedPeriodId;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPeriodId(p.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-950/40 border-amber-500/80 text-amber-200 shadow-md ring-1 ring-amber-500/30'
                        : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold text-stone-100">
                        {p.vietnameseEra}
                      </div>
                      <div className="text-[10px] text-stone-500 mt-0.5">
                        {p.timeframe}
                      </div>
                    </div>
                    {isSelected && <ChevronRight className="w-4 h-4 text-amber-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Era Details (Right) */}
          <div className="md:col-span-8 bg-stone-900/70 border border-stone-800/90 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="border-b border-stone-800 pb-3">
              <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">
                {currentPeriod.timeframe}
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-100 mt-0.5">
                {currentPeriod.vietnameseEra} ({currentPeriod.eraName})
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {currentPeriod.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 bg-stone-950/60 border border-stone-800/80 rounded-xl space-y-1.5">
                <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Trang Phục Tiêu Biểu
                </h4>
                <ul className="text-xs text-stone-300 space-y-1">
                  {currentPeriod.keyGarments.map((g, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 bg-stone-950/60 border border-stone-800/80 rounded-xl space-y-1.5">
                <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Đặc Trưng Dáng Áo
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {currentPeriod.silhouetteHighlights}
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-stone-950/60 border border-stone-800/80 rounded-xl space-y-1.5">
              <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Ý Nghĩa Lịch Sử & Xã Hội
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                {currentPeriod.historicalSignificance}
              </p>
            </div>

            {currentPeriod.reliableSources && currentPeriod.reliableSources.length > 0 && (
              <div className="text-[11px] text-stone-400 pt-1">
                <span className="font-medium text-stone-300">Tư liệu tham khảo xác thực: </span>
                {currentPeriod.reliableSources.join(' · ')}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Áo Dài Anatomy */}
      {activeTab === 'anatomy' && (
        <div className="space-y-4">
          <div className="max-w-2xl text-xs text-stone-400">
            Giải phẫu các bộ phận chi tiết làm nên vẻ đẹp thanh thoát, kín đáo mà gợi cảm của tà Áo Dài Việt Nam.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AO_DAI_ANATOMY.map((part, idx) => (
              <div
                key={idx}
                className="bg-stone-900/70 border border-stone-800/90 rounded-2xl p-4 shadow-lg space-y-2.5 hover:border-amber-500/50 transition-all"
              >
                <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <h4 className="font-serif text-sm font-bold text-amber-300">
                    {part.vietnameseTerm}
                  </h4>
                  <span className="text-[10px] text-stone-500">#{idx + 1}</span>
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-stone-300 mb-0.5">Ý nghĩa & Công năng:</div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {part.functionAndMeaning}
                  </p>
                </div>
                <div className="pt-1 border-t border-stone-800/60">
                  <div className="text-[10px] font-semibold text-amber-400/90 mb-0.5">Tiến trình cách tân:</div>
                  <p className="text-[11px] text-stone-400 leading-relaxed">
                    {part.designEvolution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Cultural Etiquette Guide */}
      {activeTab === 'etiquette' && (
        <div className="space-y-4">
          <div className="max-w-2xl text-xs text-stone-400">
            Cẩm nang diện cổ phục và áo dài đúng chuẩn mực nghi lễ, thể hiện sự am hiểu và tôn trọng thuần phong mỹ tục.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CULTURAL_ETIQUETTE_GUIDE.map((item, idx) => (
              <div
                key={idx}
                className="bg-stone-900/70 border border-stone-800/90 rounded-2xl p-5 shadow-lg space-y-3"
              >
                <h4 className="font-serif text-sm font-bold text-stone-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>{item.occasion}</span>
                </h4>

                <div className="p-3 bg-emerald-950/20 border border-emerald-800/40 rounded-xl space-y-1">
                  <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                    Nên Phối Đồ:
                  </span>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {item.recommendations}
                  </p>
                </div>

                <div className="p-3 bg-rose-950/20 border border-rose-800/40 rounded-xl space-y-1">
                  <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider">
                    Cần Tránh:
                  </span>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {item.avoidances}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

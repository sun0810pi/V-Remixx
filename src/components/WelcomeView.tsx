import React, { useState } from 'react';
import { Sparkles, ArrowRight, Bookmark } from 'lucide-react';

interface WelcomeViewProps {
  onEnterStudio: (mode: 'traditional' | 'contemporary') => void;
  onOpenLookbook: () => void;
  savedLooksCount: number;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({
  onEnterStudio,
  onOpenLookbook,
  savedLooksCount,
}) => {
  const [selectedDirection, setSelectedDirection] = useState<'traditional' | 'contemporary'>('traditional');

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#241A16] flex flex-col justify-between selection:bg-[#4E1D24]/15 selection:text-[#4E1D24]">
      {/* Top Header matching Reference 1 */}
      <header className="w-full max-w-5xl mx-auto px-5 sm:px-8 pt-6 pb-4 flex items-center justify-between border-b border-[#EAE3D6]/70">
        <div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#241A16]">
            V-REMIX
          </h1>
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#736357] font-medium mt-0.5">
            VIETNAMESE FASHION PLAYGROUND
          </p>
        </div>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => onEnterStudio(selectedDirection)}
            className="text-[#241A16] hover:text-[#4E1D24] transition-colors cursor-pointer"
          >
            Studio
          </button>
          <button
            onClick={onOpenLookbook}
            className="flex items-center gap-1.5 text-[#241A16] hover:text-[#4E1D24] transition-colors cursor-pointer"
          >
            <span>Lookbook</span>
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

      {/* Main Creative Space Card matching Reference 1 */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-6 sm:py-10">
        <div className="w-full max-w-[540px] sm:max-w-[620px] bg-[#F2ECE1] border border-[#E3DACB] rounded-2xl p-5 sm:p-7 shadow-xs">
          {/* Card Title & Sparkle */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-[11px] tracking-[0.18em] uppercase text-[#7D7267] font-semibold block mb-1">
                YOUR CREATIVE SPACE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4E1D24] tracking-tight">
                Một chút di sản, một chút cá tính.
              </h2>
              <p className="text-sm text-[#66574D] mt-1 font-normal">
                Tạo phong cách Việt theo cách của bạn.
              </p>
            </div>
            <div className="p-1.5 text-[#B38E46] shrink-0" title="Fashion Atelier Inspiration">
              <Sparkles className="w-6 h-6 stroke-[1.6]" />
            </div>
          </div>

          {/* Two Large Visual Choices */}
          <div className="grid grid-cols-2 gap-3.5 sm:gap-4 my-5">
            {/* Card 1: Traditional (Truyền Thống) */}
            <div
              onClick={() => setSelectedDirection('traditional')}
              className={`group flex flex-col rounded-xl overflow-hidden bg-white cursor-pointer transition-all duration-200 border ${
                selectedDirection === 'traditional'
                  ? 'border-[#4E1D24] ring-2 ring-[#4E1D24]/20 shadow-md'
                  : 'border-[#E5DDD0] hover:border-[#C5B8A5] hover:shadow-sm'
              }`}
            >
              {/* Real High-Fashion Editorial Artwork matching Reference 1 */}
              <div className="relative aspect-[3/4] bg-[#FAF8F5] overflow-hidden flex items-center justify-center">
                <img
                  src="/assets/editorial/welcome_traditional_card.jpg"
                  alt="Thời trang Áo Dài truyền thống"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Caption */}
              <div className="py-2.5 sm:py-3 text-center bg-[#FAF8F5] border-t border-[#F0EAE0]">
                <span className="font-serif font-bold text-xs sm:text-sm text-[#3D2820]">
                  Truyền thống
                </span>
              </div>
            </div>

            {/* Card 2: Contemporary Remix (Remix Hiện Đại) */}
            <div
              onClick={() => setSelectedDirection('contemporary')}
              className={`group flex flex-col rounded-xl overflow-hidden bg-white cursor-pointer transition-all duration-200 border ${
                selectedDirection === 'contemporary'
                  ? 'border-[#4E1D24] ring-2 ring-[#4E1D24]/20 shadow-md'
                  : 'border-[#E5DDD0] hover:border-[#C5B8A5] hover:shadow-sm'
              }`}
            >
              {/* Real High-Fashion Editorial Artwork matching Reference 1 */}
              <div className="relative aspect-[3/4] bg-[#F7F2EB] overflow-hidden flex items-center justify-center">
                <img
                  src="/assets/editorial/welcome_contemporary_card.jpg"
                  alt="Thời trang Áo Dài đương đại Remix"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Caption */}
              <div className="py-2.5 sm:py-3 text-center bg-[#FAF8F5] border-t border-[#F0EAE0]">
                <span className="font-serif font-bold text-xs sm:text-sm text-[#3D2820]">
                  Remix hiện đại
                </span>
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={() => onEnterStudio(selectedDirection)}
            className="w-full py-3.5 sm:py-4 rounded-xl bg-[#4E1D24] hover:bg-[#3D161C] active:bg-[#331117] text-white font-medium text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <span>Bắt đầu phối đồ</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Editorial Note */}
          <p className="text-[11px] text-[#9E9085] text-center mt-3 font-normal">
            Concept định hướng art direction, chưa phải giao diện game hoàn chỉnh.
          </p>
        </div>
      </main>

      {/* Footer subtle brand mark */}
      <footer className="w-full max-w-5xl mx-auto px-5 sm:px-8 py-4 text-center text-xs text-[#8B7E74]/70">
        V-Remix &middot; Virtual Vietnamese Fashion Atelier &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

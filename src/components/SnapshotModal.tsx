import React, { useRef, useState } from 'react';
import { OutfitState } from '../types/fashion';
import { GARMENT_CATALOG } from '../data/catalog';
import { runDeterministicCulturalReview } from '../data/culturalRules';
import { X, Download, Camera, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SnapshotModalProps {
  isOpen: boolean;
  onClose: () => void;
  outfit: OutfitState;
}

export const SnapshotModal: React.FC<SnapshotModalProps> = ({
  isOpen,
  onClose,
  outfit,
}) => {
  const [editorialCaption, setEditorialCaption] = useState<string | null>(null);
  const [isGeneratingCaption, setIsGeneratingCaption] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  const review = runDeterministicCulturalReview(outfit);

  const tunic = outfit.selectedGarments.tunic
    ? GARMENT_CATALOG.find((g) => g.id === outfit.selectedGarments.tunic)
    : null;
  const outer = outfit.selectedGarments.outerwear
    ? GARMENT_CATALOG.find((g) => g.id === outfit.selectedGarments.outerwear)
    : null;
  const bottom = outfit.selectedGarments.bottom
    ? GARMENT_CATALOG.find((g) => g.id === outfit.selectedGarments.bottom)
    : null;
  const head = outfit.selectedGarments.headwear
    ? GARMENT_CATALOG.find((g) => g.id === outfit.selectedGarments.headwear)
    : null;
  const jewelry = outfit.selectedGarments.jewelry
    ? GARMENT_CATALOG.find((g) => g.id === outfit.selectedGarments.jewelry)
    : null;

  const handleDownloadCard = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#8B2624', '#C5A059', '#2D5A47', '#FAF6F0'],
    });

    // Create high-fashion editorial print canvas
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 1200;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background: Ivory Atelier Paper
    ctx.fillStyle = '#FBF9F5';
    ctx.fillRect(0, 0, 900, 1200);

    // Double Gold Filigree Border
    ctx.strokeStyle = '#C5A059';
    ctx.lineWidth = 2;
    ctx.strokeRect(36, 36, 828, 1128);

    ctx.strokeStyle = '#8B2624';
    ctx.lineWidth = 1;
    ctx.strokeRect(46, 46, 808, 1108);

    // Atelier Monogram & Brand
    ctx.fillStyle = '#8B2624';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('V - R E M I X', 450, 100);

    ctx.fillStyle = '#241A16';
    ctx.font = 'bold 36px serif';
    ctx.fillText('THE VIETNAMESE FASHION ATELIER', 450, 150);

    ctx.fillStyle = '#8B7C72';
    ctx.font = 'italic 16px serif';
    ctx.fillText('Collection 01 · Heritage Áo Dài · Look Editorial', 450, 185);

    // Divider Line
    ctx.strokeStyle = '#E8E1D5';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(120, 220);
    ctx.lineTo(780, 220);
    ctx.stroke();

    // Central Look Details Box
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(90, 260, 720, 680);
    ctx.strokeStyle = '#E8E1D5';
    ctx.lineWidth = 1;
    ctx.strokeRect(90, 260, 720, 680);

    // Title
    ctx.fillStyle = '#8B2624';
    ctx.font = 'bold 28px serif';
    ctx.textAlign = 'center';
    const mainTitle = tunic ? tunic.vietnameseName : 'Bộ Trang Phục Di Sản';
    ctx.fillText(mainTitle, 450, 320);

    ctx.fillStyle = '#52443C';
    ctx.font = '15px sans-serif';
    ctx.fillText(`Định hướng: ${outfit.styleMode === 'traditional_pure' ? 'Truyền Thống Thuần Túy' : 'Sáng Tạo Đương Đại'} · Bối cảnh: ${outfit.theme}`, 450, 355);

    // Garment Pieces Breakdown
    ctx.textAlign = 'left';
    ctx.fillStyle = '#241A16';
    ctx.font = 'bold 18px serif';
    ctx.fillText('CÁC MÓN PHỤC TRANG TUYỂN CHỌN:', 140, 420);

    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#3E312B';
    let lineY = 465;

    if (tunic) {
      ctx.fillText(`• Áo chính: ${tunic.vietnameseName} (${tunic.fabricType || 'Lụa tơ tằm'})`, 140, lineY);
      lineY += 45;
    }
    if (outer) {
      ctx.fillText(`• Áo khoác: ${outer.vietnameseName} (${outer.fabricType || 'Voan kính thêu'})`, 140, lineY);
      lineY += 45;
    }
    if (bottom) {
      ctx.fillText(`• Quần/Váy: ${bottom.vietnameseName} (${bottom.fabricType || 'Lụa mềm'})`, 140, lineY);
      lineY += 45;
    }
    if (head) {
      ctx.fillText(`• Khăn/Nón: ${head.vietnameseName} (${head.fabricType || 'Lụa xếp'})`, 140, lineY);
      lineY += 45;
    }
    if (jewelry) {
      ctx.fillText(`• Trang sức: ${jewelry.vietnameseName} (${jewelry.fabricType || 'Bạc chạm'})`, 140, lineY);
      lineY += 45;
    }

    // Editorial Caption in Box
    ctx.fillStyle = '#FAF8F5';
    ctx.fillRect(130, lineY + 30, 640, 140);
    ctx.strokeStyle = '#E8E1D5';
    ctx.strokeRect(130, lineY + 30, 640, 140);

    ctx.fillStyle = '#8B2624';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('LỜI TỰA BIÊN TẬP THỜI TRANG:', 150, lineY + 65);

    ctx.fillStyle = '#52443C';
    ctx.font = 'italic 15px serif';
    const captionText = editorialCaption || 'Tác phẩm kết tinh vẻ đẹp nền nã của tơ lụa truyền thống cùng tư duy tạo dáng thanh thoát của thời trang đương đại.';
    ctx.fillText(captionText.length > 80 ? captionText.slice(0, 80) + '...' : captionText, 150, lineY + 105);

    // Footer
    ctx.textAlign = 'center';
    ctx.fillStyle = '#8B7C72';
    ctx.font = '13px serif';
    ctx.fillText(`V-Remix · Gìn giữ cốt cách áo mũ ngàn năm · ${new Date().toLocaleDateString('vi-VN')}`, 450, 1100);

    const a = document.createElement('a');
    a.download = `v-remix-editorial-${Date.now()}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
  };

  const handleGenerateEditorialCaption = async () => {
    setIsGeneratingCaption(true);
    try {
      const response = await fetch('/api/ai/cultural-critique', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ outfit }),
      });
      if (response.ok) {
        const data = await response.json();
        setEditorialCaption(data.editorialCaption || data.critique || 'Tác phẩm lụa là thanh tao, giao hòa giữa vẻ đẹp cổ truyền và hơi thở hiện đại.');
      } else {
        setEditorialCaption('Tác phẩm thời trang tôn vinh đường nét duyên dáng của người Việt, giao hòa giữa vẻ đẹp cổ truyền và hơi thở hiện đại.');
      }
    } catch {
      setEditorialCaption('Tác phẩm thời trang tôn vinh đường nét duyên dáng của người Việt, giao hòa giữa vẻ đẹp cổ truyền và hơi thở hiện đại.');
    } finally {
      setIsGeneratingCaption(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#FBF9F5] border border-[#E8E1D5] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-3">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase tracking-widest text-[#8B2624] font-semibold">
              EDITORIAL SNAPSHOT
            </span>
            <h3 className="font-serif text-lg font-bold text-[#241A16]">
              Thẻ Biên Tập Thời Trang
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8B7C72] hover:text-[#241A16] hover:bg-[#F2ECE4] rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Card Preview */}
        <div
          ref={cardRef}
          className="bg-white border-2 border-[#C5A059]/40 rounded-2xl p-6 shadow-xs space-y-4 text-center relative overflow-hidden"
        >
          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-widest text-[#8B2624] font-semibold">
              V-REMIX · COLLECTION 01
            </span>
            <h4 className="font-serif text-xl font-bold text-[#241A16]">
              {tunic ? tunic.vietnameseName : 'Bộ Trang Phục Di Sản'}
            </h4>
            <div className="text-xs text-[#8B7C72]">
              {outfit.styleMode === 'traditional_pure' ? 'Truyền Thống Thuần Túy' : 'Sáng Tạo Đương Đại'}
            </div>
          </div>

          {/* Equipped list */}
          <div className="bg-[#FAF8F5] border border-[#F0EAE1] rounded-2xl p-4 text-left text-xs space-y-1.5 text-[#52443C]">
            {tunic && <div>• Áo chính: <span className="font-semibold text-[#241A16]">{tunic.vietnameseName}</span> <span className="text-[#8B2624] font-medium">({tunic.fabricType})</span></div>}
            {outer && <div>• Áo khoác: <span className="font-semibold text-[#241A16]">{outer.vietnameseName}</span> <span className="text-[#8B2624] font-medium">({outer.fabricType})</span></div>}
            {bottom && <div>• Quần/Váy: <span className="font-semibold text-[#241A16]">{bottom.vietnameseName}</span> <span className="text-[#8B2624] font-medium">({bottom.fabricType})</span></div>}
            {head && <div>• Khăn/Nón: <span className="font-semibold text-[#241A16]">{head.vietnameseName}</span> <span className="text-[#8B2624] font-medium">({head.fabricType})</span></div>}
            {jewelry && <div>• Trang sức: <span className="font-semibold text-[#241A16]">{jewelry.vietnameseName}</span></div>}
          </div>

          {/* Optional Editorial Caption */}
          {editorialCaption && (
            <div className="p-3 bg-[#FDF9F8] border border-[#8B2624]/20 rounded-xl text-xs text-[#52443C] italic text-left leading-relaxed">
              "{editorialCaption}"
            </div>
          )}

          <div className="text-[11px] text-[#8B7C72] pt-2 border-t border-[#F0EAE1]">
            {new Date().toLocaleDateString('vi-VN')} · Gìn giữ cốt cách áo mũ ngàn năm
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-[#F0EAE1]">
          {!editorialCaption && (
            <button
              onClick={handleGenerateEditorialCaption}
              disabled={isGeneratingCaption}
              className="w-full sm:w-auto flex-1 py-2.5 px-3 bg-[#FAF8F5] hover:bg-[#F2ECE4] text-[#52443C] hover:text-[#8B2624] rounded-2xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#E8E1D5]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8B2624]" />
              <span>{isGeneratingCaption ? 'Đang viết lời tựa...' : 'Lời Tựa Editorial AI'}</span>
            </button>
          )}

          <button
            onClick={handleDownloadCard}
            className="w-full sm:w-auto flex-1 py-2.5 px-4 bg-[#8B2624] hover:bg-[#721F1D] text-white font-semibold rounded-2xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải Ảnh Thẻ Lookbook</span>
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useRef, useState } from 'react';
import { OutfitState, AvatarConfig, GarmentCategory } from '../types/fashion';
import { GARMENT_CATALOG } from '../data/catalog';
import { Maximize2, Undo2, Shuffle, Bookmark, Palette, Eye, Sparkles } from 'lucide-react';
import { playShutterSound } from '../utils/sound';

interface AvatarCanvasProps {
  outfit: OutfitState;
  lookTitle?: string;
  onUpdateAvatar?: (avatar: Partial<AvatarConfig>) => void;
  onUndo?: () => void;
  onRandomize?: () => void;
  onSaveLook?: () => void;
  onOpenColorPicker?: (garmentId: string) => void;
  onSelectCategory?: (category: GarmentCategory) => void;
}

export const AvatarCanvas: React.FC<AvatarCanvasProps> = ({
  outfit,
  lookTitle = 'Look 001 · The Modern Classic',
  onUpdateAvatar,
  onUndo,
  onRandomize,
  onSaveLook,
  onOpenColorPicker,
  onSelectCategory,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { avatar, selectedGarments, garmentColors } = outfit;

  // Resolve equipped items
  const tunicItem = selectedGarments.tunic ? GARMENT_CATALOG.find((g) => g.id === selectedGarments.tunic) : null;
  const innerItem = selectedGarments.inner ? GARMENT_CATALOG.find((g) => g.id === selectedGarments.inner) : null;
  const bottomItem = selectedGarments.bottom ? GARMENT_CATALOG.find((g) => g.id === selectedGarments.bottom) : null;
  const outerItem = selectedGarments.outerwear ? GARMENT_CATALOG.find((g) => g.id === selectedGarments.outerwear) : null;
  const headItem = selectedGarments.headwear ? GARMENT_CATALOG.find((g) => g.id === selectedGarments.headwear) : null;
  const jewelryItem = selectedGarments.jewelry ? GARMENT_CATALOG.find((g) => g.id === selectedGarments.jewelry) : null;
  const footItem = selectedGarments.footwear ? GARMENT_CATALOG.find((g) => g.id === selectedGarments.footwear) : null;
  const handItem = selectedGarments.handheld ? GARMENT_CATALOG.find((g) => g.id === selectedGarments.handheld) : null;

  // Active garment colors
  const tunicColor = (tunicItem && garmentColors[tunicItem.id]) || tunicItem?.defaultColorHex || '#FAF8F5';
  const bottomColor = (bottomItem && garmentColors[bottomItem.id]) || bottomItem?.defaultColorHex || '#FAF8F5';
  const outerColor = (outerItem && garmentColors[outerItem.id]) || outerItem?.defaultColorHex || '#5C1923';
  const headColor = (headItem && garmentColors[headItem.id]) || headItem?.defaultColorHex || '#EADBCE';
  const jewelryColor = (jewelryItem && garmentColors[jewelryItem.id]) || jewelryItem?.defaultColorHex || '#D4AF37';
  const footColor = (footItem && garmentColors[footItem.id]) || footItem?.defaultColorHex || '#FFFFFF';
  const handColor = (handItem && garmentColors[handItem.id]) || handItem?.defaultColorHex || '#FAF8F5';

  const isDefaultWhiteLace = !tunicItem || tunicItem.id === 'ao_dai_traditional';

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[580px] lg:min-h-[660px] bg-[#F5EFE6] border border-[#E5DDD0] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xs select-none ${
        isFullscreen ? 'fixed inset-4 z-50 shadow-2xl bg-[#F5EFE6]' : ''
      }`}
    >
      {/* Top Canvas Header Bar matching Reference 2 */}
      <div className="flex items-center justify-between z-20">
        <span className="text-[11px] tracking-[0.16em] uppercase text-[#736357] font-semibold">
          YOUR CANVAS
        </span>
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-1.5 text-[#736357] hover:text-[#4E1D24] hover:bg-[#EAE2D4] rounded-lg transition-colors cursor-pointer"
          title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
          aria-label="Phóng to khung tranh"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Main Fashion Illustration Stage matching Reference 2 */}
      <div className="flex-1 flex items-center justify-center my-2 relative overflow-hidden">
        <svg
          viewBox="0 0 540 820"
          className="w-full h-full max-h-[560px] sm:max-h-[620px] object-contain drop-shadow-[0_15px_30px_rgba(60,40,30,0.08)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Paper Watercolor Texture & Glow */}
            <radialGradient id="studioSoftGlow" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#FAF7F2" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#F2ECE0" stopOpacity="0.3" />
            </radialGradient>

            {/* Silk Sheen Overlay */}
            <linearGradient id="silkSheen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.12" />
            </linearGradient>

            {/* Gold Filigree Gradient */}
            <linearGradient id="goldFiligree" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F9E8B6" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#AA8222" />
            </linearGradient>

            {/* Pattern for Sheer Lace Floral Ao Dai (like Reference 2) */}
            <pattern id="laceFloralPattern" width="30" height="30" patternUnits="userSpaceOnUse">
              <path
                d="M 15,5 Q 18,12 25,15 Q 18,18 15,25 Q 12,18 5,15 Q 12,12 15,5 Z"
                fill="none"
                stroke="#CFC5B8"
                strokeWidth="0.8"
                opacity="0.45"
              />
              <circle cx="15" cy="15" r="1.5" fill="#CFC5B8" opacity="0.4" />
            </pattern>

            <filter id="subtleInkShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#3A2A20" floodOpacity="0.1" />
            </filter>
          </defs>

          {/* 1. Backdrop: Textured Warm Ivory Watercolor Wash */}
          <rect x="20" y="10" width="500" height="800" rx="16" fill="url(#studioSoftGlow)" />

          {/* 2. Soft Ink-Wash Plum / Cherry Blossom Branch (Framing upper right background like Reference 2) */}
          <g id="blossom_branch_background" opacity="0.85">
            {/* Main gnarled branch strokes */}
            <path
              d="M 480,40 C 440,70 380,80 340,110 C 310,135 290,170 280,210"
              stroke="#523E34"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />
            <path
              d="M 410,75 C 370,120 375,170 360,220"
              stroke="#624D41"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.65"
            />
            <path
              d="M 340,110 C 315,90 280,85 250,95"
              stroke="#624D41"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.55"
            />
            <path
              d="M 460,95 C 490,130 500,180 505,240"
              stroke="#523E34"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M 440,150 C 420,190 410,250 415,310"
              stroke="#624D41"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />

            {/* Watercolor Cherry / Plum Blossoms (Hoa Đào / Hoa Mai) */}
            {[
              { cx: 450, cy: 55, r: 10 },
              { cx: 420, cy: 75, r: 8 },
              { cx: 380, cy: 90, r: 11 },
              { cx: 345, cy: 110, r: 9 },
              { cx: 310, cy: 130, r: 8 },
              { cx: 280, cy: 90, r: 10 },
              { cx: 370, cy: 140, r: 9 },
              { cx: 355, cy: 190, r: 8 },
              { cx: 470, cy: 120, r: 10 },
              { cx: 495, cy: 170, r: 9 },
              { cx: 430, cy: 175, r: 8 },
              { cx: 415, cy: 235, r: 9 },
              { cx: 400, cy: 280, r: 7 },
              { cx: 300, cy: 175, r: 8 },
            ].map((flower, i) => (
              <g key={i}>
                {/* 5 rounded petals */}
                {[0, 72, 144, 216, 288].map((deg) => {
                  const rad = (deg * Math.PI) / 180;
                  const px = flower.cx + (flower.r * 0.7) * Math.cos(rad);
                  const py = flower.cy + (flower.r * 0.7) * Math.sin(rad);
                  return (
                    <circle
                      key={deg}
                      cx={px}
                      cy={py}
                      r={flower.r * 0.55}
                      fill="#E5999E"
                      opacity="0.65"
                    />
                  );
                })}
                {/* Flower center pistil */}
                <circle cx={flower.cx} cy={flower.cy} r={flower.r * 0.28} fill="#94232C" opacity="0.8" />
              </g>
            ))}
          </g>

          {/* 3. Hair Back Silhouette */}
          <path
            d="M 230,130 Q 200,220 205,380 Q 240,410 270,410 Q 300,410 335,380 Q 340,220 310,130 Z"
            fill={avatar.hairColor || '#1A1513'}
            filter="url(#subtleInkShadow)"
          />

          {/* 4. Elegant Footwear & Floor Contact */}
          {footItem?.renderKey === 'foot_guoc_moc' ? (
            <g id="footwear_guoc_moc">
              {/* Wooden Clogs Guốc Mộc */}
              <polygon points="230,735 255,735 252,752 232,752" fill="#7C4830" />
              <path d="M 232,735 Q 242,725 253,735" stroke={footColor} strokeWidth="5" fill="none" strokeLinecap="round" />
              <polygon points="280,735 305,735 302,752 282,752" fill="#7C4830" />
              <path d="M 282,735 Q 292,725 303,735" stroke={footColor} strokeWidth="5" fill="none" strokeLinecap="round" />
            </g>
          ) : (
            <g id="footwear_heels">
              {/* Pointed Stiletto Heels (White silk heels like Reference 2) */}
              {/* Left Heel */}
              <polygon points="232,730 252,730 256,742 228,742" fill={footColor} stroke="#D4C9BC" strokeWidth="1" />
              <polygon points="228,740 232,740 230,754 227,754" fill="#C4B8AA" />
              {/* Right Heel */}
              <polygon points="282,730 302,730 306,742 278,742" fill={footColor} stroke="#D4C9BC" strokeWidth="1" />
              <polygon points="278,740 282,740 280,754 277,754" fill="#C4B8AA" />
            </g>
          )}

          {/* 5. Fluid Wide-Leg Silk Palazzo Trousers (Quần Lụa Trắng like Reference 2) */}
          <g id="bottom_silk_trousers" filter="url(#subtleInkShadow)">
            {bottomItem?.renderKey === 'bottom_culottes' ? (
              // Culottes
              <path
                d="M 234,360 C 205,450 208,580 214,640 L 254,640 C 258,540 259,480 260,430 C 261,480 262,540 266,640 L 306,640 C 312,580 315,450 286,360 Z"
                fill={bottomColor}
              />
            ) : bottomItem?.renderKey === 'bottom_vay_dup' ? (
              // Pleated Skirt
              <path
                d="M 235,350 C 180,530 188,680 196,738 C 260,750 324,738 324,738 C 332,680 340,530 285,350 Z"
                fill={bottomColor}
              />
            ) : (
              // Wide fluid silk trousers (default / traditional)
              <>
                <path
                  d="M 232,350 C 195,500 198,660 204,734 L 254,734 C 262,600 264,520 265,430 C 266,520 268,600 276,734 L 326,734 C 332,660 335,500 298,350 Z"
                  fill={bottomColor}
                />
                {/* Accordion drape and watercolor crease lines like fashion sketch */}
                <path d="M 220,380 C 208,520 212,660 216,730" stroke="#3D2D24" strokeWidth="1.2" strokeOpacity="0.18" fill="none" />
                <path d="M 244,460 C 238,580 236,660 242,730" stroke="#3D2D24" strokeWidth="1" strokeOpacity="0.12" fill="none" />
                <path d="M 310,380 C 322,520 318,660 314,730" stroke="#3D2D24" strokeWidth="1.2" strokeOpacity="0.18" fill="none" />
                <path d="M 286,460 C 292,580 294,660 288,730" stroke="#3D2D24" strokeWidth="1" strokeOpacity="0.12" fill="none" />
              </>
            )}
          </g>

          {/* 6. Model Base Anatomy: Torso, Neck & Face */}
          <g id="model_slender_anatomy">
            {/* Clavicle & Neck */}
            <path d="M 245,150 L 245,210 C 255,214 265,214 275,210 L 275,150 Z" fill={avatar.skinTone || '#FED7AA'} />
            <path d="M 238,214 Q 260,222 282,214" stroke="#E2B492" strokeWidth="1.4" fill="none" opacity="0.6" />

            {/* Slender Waist & Torso */}
            <path
              d="M 228,210 C 218,270 224,340 228,390 L 292,390 C 296,340 302,270 292,210 Z"
              fill={avatar.skinTone || '#FED7AA'}
            />

            {/* Refined Facial Structure */}
            <path
              d="M 260,105 C 284,105 292,125 290,148 C 288,168 274,188 260,195 C 246,188 232,168 230,148 C 228,125 236,105 260,105 Z"
              fill={avatar.skinTone || '#FED7AA'}
            />
            {/* Soft Cheek Blush */}
            <circle cx="242" cy="155" r="7" fill="#E88B88" opacity="0.35" />
            <circle cx="278" cy="155" r="7" fill="#E88B88" opacity="0.35" />

            {/* Eyebrows with Delicate Arch */}
            <path d="M 240,138 Q 248,133 255,138" stroke="#3D2A20" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <path d="M 265,138 Q 272,133 280,138" stroke="#3D2A20" strokeWidth="1.6" fill="none" strokeLinecap="round" />

            {/* Almond Eyes with Winged Liner */}
            <path d="M 241,146 Q 248,141 255,146" stroke="#221815" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M 265,146 Q 272,141 279,146" stroke="#221815" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <circle cx="248" cy="147" r="2.6" fill="#221815" />
            <circle cx="272" cy="147" r="2.6" fill="#221815" />
            <circle cx="249" cy="146" r="0.8" fill="#FFFFFF" />
            <circle cx="273" cy="146" r="0.8" fill="#FFFFFF" />

            {/* Delicate Nose Bridge */}
            <path d="M 259,144 L 258,162 L 262,164" stroke="#DDA884" strokeWidth="1.2" fill="none" strokeLinecap="round" />

            {/* Rose Crimson Lips */}
            <path d="M 252,176 Q 260,174 268,176 Q 260,185 252,176 Z" fill="#991B1B" opacity="0.9" />
            <path d="M 254,176 Q 260,178 266,176" stroke="#7F1D1D" strokeWidth="0.8" fill="none" />
          </g>

          {/* 7. Áo Dài / Tunic Layer (Haute Couture Masterpiece) */}
          <g id="tunic_fashion_layer" filter="url(#subtleInkShadow)">
            {tunicItem?.renderKey === 'tunic_ao_tac' ? (
              // Ceremonial Áo Tấc Wide Sleeves
              <>
                <path d="M 230,200 L 155,380 C 185,450 230,405 235,385 L 235,235 Z" fill={tunicColor} />
                <path d="M 290,200 L 365,380 C 335,450 290,405 285,385 L 285,235 Z" fill={tunicColor} />
                <path
                  d="M 230,195 C 215,280 210,420 205,570 C 210,700 212,740 214,740 C 260,755 306,740 306,740 C 308,700 310,570 305,420 C 300,280 290,195 Z"
                  fill={tunicColor}
                />
                <rect x="244" y="180" width="32" height="20" fill={tunicColor} />
                <line x1="244" y1="180" x2="276" y2="180" stroke="url(#goldFiligree)" strokeWidth="2.5" />
              </>
            ) : tunicItem?.renderKey === 'tunic_ao_ba_ba' ? (
              // Southern Áo Bà Ba
              <>
                <path d="M 234,202 L 198,340 L 212,344 L 236,230 Z" fill={tunicColor} />
                <path d="M 286,202 L 322,340 L 308,344 L 284,230 Z" fill={tunicColor} />
                <path
                  d="M 235,198 C 228,265 232,315 232,325 C 224,345 222,435 222,455 C 260,465 298,455 298,455 C 298,435 296,345 288,325 C 288,315 292,265 285,198 Z"
                  fill={tunicColor}
                />
                <line x1="260" y1="205" x2="260" y2="450" stroke="#221A16" strokeWidth="1.2" strokeOpacity="0.4" />
              </>
            ) : (
              // Classic Áo Dài with Sheer Floral Lace / Silk (Default & Modern Classic like Reference 2)
              <>
                {/* Sleeves: Sculpted Raglan Fit */}
                {/* Left Sleeve (curving up gently to touch brim of hat like Reference 2) */}
                <path
                  d="M 235,205 C 205,230 180,260 170,290 L 184,295 C 194,270 216,242 240,225 Z"
                  fill={tunicColor}
                />
                {/* Right Sleeve (extending down towards lotus bouquet) */}
                <path
                  d="M 285,205 C 305,240 325,280 334,330 L 320,335 C 312,285 294,248 280,225 Z"
                  fill={tunicColor}
                />

                {/* Long Flowing Bodice and Split Panels (Tà Áo Dài Thướt Tha) */}
                <path
                  d="M 230,205 C 222,265 230,320 232,335 C 218,365 210,510 214,755 C 260,765 306,755 306,755 C 310,510 302,365 288,335 C 290,320 298,265 290,205 Z"
                  fill={tunicColor}
                />

                {/* Sheer Floral Lace Pattern Overlay (Reference 2 White Lace) */}
                {isDefaultWhiteLace && (
                  <path
                    d="M 230,205 C 222,265 230,320 232,335 C 218,365 210,510 214,755 C 260,765 306,755 306,755 C 310,510 302,365 288,335 C 290,320 298,265 290,205 Z"
                    fill="url(#laceFloralPattern)"
                  />
                )}

                {/* Silk Highlights and Draping Contours */}
                <path
                  d="M 230,205 C 222,265 230,320 232,335 C 218,365 210,510 214,755 L 228,755 C 226,510 232,365 242,335 C 240,320 238,265 240,205 Z"
                  fill="url(#silkSheen)"
                />

                {/* 3cm High Mandarin Standing Collar (Cổ Đứng Cung Đình) */}
                <path d="M 246,180 L 274,180 L 276,202 L 244,202 Z" fill={tunicColor} />
                <line x1="246" y1="180" x2="274" y2="180" stroke="url(#goldFiligree)" strokeWidth="1.8" />

                {/* Diagonal Lapel Seam & Golden Toggles */}
                <path d="M 258,181 C 272,196 284,210 286,255" stroke="url(#goldFiligree)" strokeWidth="1.4" fill="none" />
                {[194, 210, 228, 246].map((y, idx) => (
                  <circle key={idx} cx={268 + idx * 3.2} cy={y} r="2.4" fill="url(#goldFiligree)" />
                ))}
              </>
            )}
          </g>

          {/* 8. Forearms & Hands */}
          <g id="model_hands">
            {/* Right Arm: Gracefully touching brim of conical hat like Reference 2 */}
            <path
              d="M 170,290 C 165,275 168,230 180,185 L 188,188 C 178,230 176,275 184,295 Z"
              fill={avatar.skinTone || '#FED7AA'}
            />
            {/* Right Hand touching hat */}
            <path d="M 178,185 Q 182,175 190,172 Q 192,180 186,190 Z" fill={avatar.skinTone || '#FED7AA'} />

            {/* Left Arm: Extending down towards lotus bouquet */}
            <path
              d="M 334,330 C 338,360 334,395 320,415 L 312,410 C 324,392 328,360 320,335 Z"
              fill={avatar.skinTone || '#FED7AA'}
            />
            {/* Left Hand holding stems */}
            <path d="M 320,415 Q 312,425 316,432 Q 324,428 322,415 Z" fill={avatar.skinTone || '#FED7AA'} />
          </g>

          {/* 9. Handheld Prop: Lotus Bouquet / Fan / Basket */}
          <g id="handheld_bouquet">
            {handItem?.renderKey === 'hand_quat_lua' ? (
              // Round Silk Fan
              <g transform="translate(325, 360) rotate(-15)">
                <line x1="10" y1="50" x2="10" y2="95" stroke="#6E3C29" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="10" cy="30" r="32" fill={handColor} stroke="#C5A059" strokeWidth="2" />
                <path d="M 0,30 Q 10,20 22,25 Q 12,38 0,30" fill="#241915" opacity="0.8" />
              </g>
            ) : (
              // Fresh Green & White Lotus Buds Bouquet (Bó Hoa Sen Trắng like Reference 2)
              <g transform="translate(295, 335)" filter="url(#subtleInkShadow)">
                {/* Long green stems */}
                <path d="M 22,75 L 18,170" stroke="#2E5A44" strokeWidth="3.2" strokeLinecap="round" />
                <path d="M 26,75 L 24,165" stroke="#2E5A44" strokeWidth="3" strokeLinecap="round" />
                <path d="M 30,75 L 32,168" stroke="#224835" strokeWidth="3.5" strokeLinecap="round" />

                {/* Silk Ribbon Tie around stems */}
                <rect x="16" y="88" width="18" height="12" rx="2" fill="#FAF6F0" stroke="#C4B8AA" strokeWidth="0.8" />
                <path d="M 22,100 L 18,130" stroke="#FAF6F0" strokeWidth="2" />
                <path d="M 26,100 L 28,125" stroke="#FAF6F0" strokeWidth="2" />

                {/* Lush Lotus Leaves */}
                <path d="M 12,50 C -5,35 5,15 25,25 C 28,40 18,48 12,50 Z" fill="#26523D" opacity="0.9" />
                <path d="M 35,45 C 55,30 50,10 32,18 C 28,32 30,42 35,45 Z" fill="#1E4432" opacity="0.85" />

                {/* Elegant White & Pink Lotus Flower Buds */}
                {/* Bud 1 (Left) */}
                <path d="M 8,30 C -2,12 8,-5 18,-8 C 22,8 18,25 8,30 Z" fill="#FAF8F5" stroke="#C8BCAC" strokeWidth="0.8" />
                <path d="M 8,20 C 1,8 10,0 16,-4" stroke="#DDA8AB" strokeWidth="1.2" fill="none" />

                {/* Bud 2 (Center High) */}
                <path d="M 24,18 C 14,-2 22,-20 30,-24 C 38,-20 44,-2 34,18 Z" fill="#FAF8F5" stroke="#C8BCAC" strokeWidth="0.8" />
                <path d="M 26,8 C 22,-8 30,-18 30,-22" stroke="#E5999E" strokeWidth="1.4" fill="none" />
                <path d="M 32,8 C 36,-8 30,-18 30,-22" stroke="#E5999E" strokeWidth="1.4" fill="none" />

                {/* Bud 3 (Right) */}
                <path d="M 38,32 C 48,15 42,-2 32,-5 C 28,10 30,26 38,32 Z" fill="#FAF8F5" stroke="#C8BCAC" strokeWidth="0.8" />
                <path d="M 38,20 C 44,8 36,0 34,-3" stroke="#DDA8AB" strokeWidth="1.2" fill="none" />
              </g>
            )}
          </g>

          {/* 10. Front Hair Cascades */}
          <g id="hair_front_styling">
            {/* Flowing wavy dark curls draping gracefully around shoulders like Reference 2 */}
            <path
              d="M 230,125 C 215,160 212,220 220,280 C 228,240 230,180 236,145 Z"
              fill={avatar.hairColor || '#1A1513'}
            />
            <path
              d="M 290,125 C 305,160 308,220 300,280 C 292,240 290,180 284,145 Z"
              fill={avatar.hairColor || '#1A1513'}
            />
          </g>

          {/* 11. Headwear Layer (Nón Lá / Khăn Đóng / Mấn Nhung) */}
          <g id="headwear_layer" filter="url(#subtleInkShadow)">
            {headItem?.renderKey === 'head_khan_dong' ? (
              // Five-Fold Silk Turban
              <g>
                <ellipse cx="260" cy="112" rx="38" ry="24" fill={headColor} />
                <path d="M 228,118 Q 260,96 292,118" stroke="#FAF6F0" strokeWidth="1.2" strokeOpacity="0.35" fill="none" />
                <path d="M 226,124 Q 260,102 294,124" stroke="#FAF6F0" strokeWidth="1.2" strokeOpacity="0.35" fill="none" />
              </g>
            ) : headItem?.renderKey === 'head_man_nhung' ? (
              // Velvet Crown with Pearls
              <g>
                <ellipse cx="260" cy="108" rx="36" ry="22" fill={headColor} />
                <ellipse cx="260" cy="108" rx="36" ry="22" fill="none" stroke="url(#goldFiligree)" strokeWidth="2.8" />
              </g>
            ) : headItem?.renderKey === 'head_tram_cai' ? (
              // Gold Lotus Hairpin
              <g transform="translate(260, 100)">
                <line x1="15" y1="-8" x2="45" y2="-28" stroke="url(#goldFiligree)" strokeWidth="3" strokeLinecap="round" />
                <circle cx="45" cy="-28" r="7" fill="url(#goldFiligree)" />
                <circle cx="45" cy="-28" r="3" fill="#FFF" />
              </g>
            ) : (
              // Classic Vietnamese Conical Leaf Hat (Nón Lá like Reference 2)
              <g id="conical_non_la">
                {/* Conical Straw Hat Body */}
                <polygon points="260,35 155,148 365,148" fill={headColor} stroke="#BAA692" strokeWidth="1.2" />
                <ellipse cx="260" cy="148" rx="105" ry="18" fill="#F0E5D6" stroke="#BAA692" strokeWidth="1" />

                {/* Bamboo Rib Rings */}
                {[52, 72, 92, 112, 132].map((y) => {
                  const widthFactor = (y - 35) / 113;
                  return (
                    <ellipse
                      key={y}
                      cx="260"
                      cy={y}
                      rx={105 * widthFactor}
                      ry={18 * widthFactor}
                      fill="none"
                      stroke="#8C7662"
                      strokeWidth="0.8"
                      strokeOpacity="0.4"
                    />
                  );
                })}

                {/* Soft Silk Chin Strap Ribbon (Draped down shoulders) */}
                <path d="M 188,148 Q 220,200 244,245" stroke="#DDA8AB" strokeWidth="2.8" fill="none" />
                <path d="M 332,148 Q 300,200 276,245" stroke="#DDA8AB" strokeWidth="2.8" fill="none" />
              </g>
            )}
          </g>
        </svg>
      </div>

      {/* Canvas Footer matching Reference 2 */}
      <div className="flex flex-col items-center justify-center pt-2 z-20">
        {/* Look Title */}
        <span className="font-serif text-sm sm:text-base font-semibold text-[#3D2820] tracking-wide mb-3">
          {lookTitle}
        </span>

        {/* 3 Compact Tactile Actions */}
        <div className="flex items-center gap-3">
          {/* Undo Action */}
          <button
            onClick={onUndo}
            title="Hoàn tác thay đổi"
            aria-label="Hoàn tác"
            className="w-10 h-10 rounded-full border border-[#D5CABE] bg-white/90 hover:bg-[#F2ECE1] text-[#3D2820] flex items-center justify-center transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            <Undo2 className="w-4 h-4" />
          </button>

          {/* Random Outfit Action */}
          <button
            onClick={onRandomize}
            title="Phối đồ ngẫu nhiên"
            aria-label="Ngẫu nhiên"
            className="w-10 h-10 rounded-full bg-[#3D1E24] hover:bg-[#2C141A] text-white flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <Shuffle className="w-4 h-4" />
          </button>

          {/* Save to Lookbook Action */}
          <button
            onClick={onSaveLook}
            title="Lưu vào Lookbook"
            aria-label="Lưu trang phục"
            className="w-10 h-10 rounded-full border border-[#D5CABE] bg-white/90 hover:bg-[#F2ECE1] text-[#3D2820] flex items-center justify-center transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

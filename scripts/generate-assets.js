import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const editorialDir = path.join(projectRoot, 'public', 'assets', 'editorial');
const thumbnailsDir = path.join(projectRoot, 'public', 'assets', 'thumbnails');

fs.mkdirSync(editorialDir, { recursive: true });
fs.mkdirSync(thumbnailsDir, { recursive: true });

// 1. WELCOME TRADITIONAL EDITORIAL ILLUSTRATION
const welcomeTraditionalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800">
  <defs>
    <radialGradient id="wt_glow" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="65%" stop-color="#FAF5EC"/>
      <stop offset="100%" stop-color="#F0E6D4"/>
    </radialGradient>
    <linearGradient id="wt_crimson" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A52A2A"/>
      <stop offset="50%" stop-color="#8B2624"/>
      <stop offset="100%" stop-color="#581518"/>
    </linearGradient>
    <linearGradient id="wt_gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F9E8B6"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#AA8222"/>
    </linearGradient>
    <filter id="wt_shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#3A2018" flood-opacity="0.14"/>
    </filter>
  </defs>

  <rect width="600" height="800" fill="url(#wt_glow)"/>

  <!-- Plum Blossom Branch Backdrop -->
  <g opacity="0.65">
    <path d="M 520,60 C 470,110 400,120 340,160 C 300,190 280,240 270,300" stroke="#5C4436" stroke-width="4.5" stroke-linecap="round" fill="none"/>
    <path d="M 430,110 C 390,160 395,220 375,270" stroke="#6E5343" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    <circle cx="480" cy="85" r="12" fill="#E28F95" opacity="0.8"/>
    <circle cx="440" cy="115" r="10" fill="#E28F95" opacity="0.8"/>
    <circle cx="395" cy="130" r="14" fill="#E28F95" opacity="0.8"/>
    <circle cx="355" cy="155" r="11" fill="#E28F95" opacity="0.8"/>
    <circle cx="310" cy="190" r="10" fill="#E28F95" opacity="0.8"/>
    <circle cx="480" cy="85" r="4" fill="#8B2624"/>
    <circle cx="440" cy="115" r="3.5" fill="#8B2624"/>
    <circle cx="395" cy="130" r="4.5" fill="#8B2624"/>
  </g>

  <!-- Fashion Model Figure -->
  <g filter="url(#wt_shadow)">
    <!-- Back Hair -->
    <path d="M 270,140 Q 230,260 235,440 Q 280,470 310,470 Q 350,470 380,440 Q 385,260 345,140 Z" fill="#1C1816"/>

    <!-- Pointed Silk Heels -->
    <polygon points="265,720 288,720 292,735 260,735" fill="#FAF6F0" stroke="#D5CBBF" stroke-width="1"/>
    <polygon points="260,733 264,733 262,750 259,750" fill="#C5BBAF"/>
    <polygon points="325,720 348,720 352,735 320,735" fill="#FAF6F0" stroke="#D5CBBF" stroke-width="1"/>
    <polygon points="320,733 324,733 322,750 319,750" fill="#C5BBAF"/>

    <!-- Flowing White Silk Trousers -->
    <path d="M 265,370 C 220,530 225,690 232,730 L 285,730 C 294,600 296,520 297,440 C 298,520 300,600 309,730 L 362,730 C 369,690 374,530 329,370 Z" fill="#FAF6F0"/>
    <path d="M 252,410 C 238,550 242,680 247,725" stroke="#3D2D24" stroke-width="1.2" stroke-opacity="0.15" fill="none"/>
    <path d="M 342,410 C 356,550 352,680 347,725" stroke="#3D2D24" stroke-width="1.2" stroke-opacity="0.15" fill="none"/>

    <!-- Model Neck & Face -->
    <path d="M 285,160 L 285,225 C 295,230 305,230 315,225 L 315,160 Z" fill="#FED7AA"/>
    <path d="M 300,110 C 324,110 332,130 330,154 C 328,175 314,196 300,203 C 286,196 272,175 270,154 C 268,130 276,110 300,110 Z" fill="#FED7AA"/>
    <circle cx="283" cy="160" r="7.5" fill="#E88B88" opacity="0.35"/>
    <circle cx="317" cy="160" r="7.5" fill="#E88B88" opacity="0.35"/>
    <path d="M 282,152 Q 289,147 296,152" stroke="#221815" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M 304,152 Q 311,147 318,152" stroke="#221815" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="289" cy="153" r="2.8" fill="#221815"/>
    <circle cx="311" cy="153" r="2.8" fill="#221815"/>
    <path d="M 292,183 Q 300,181 308,183 Q 300,192 292,183 Z" fill="#991B1B"/>

    <!-- Crimson Silk Áo Dài Tunic Body -->
    <path d="M 272,225 C 235,255 205,290 195,325 L 210,332 C 222,302 248,272 278,248 Z" fill="url(#wt_crimson)"/>
    <path d="M 328,225 C 352,265 375,310 385,365 L 370,370 C 361,315 339,275 322,248 Z" fill="url(#wt_crimson)"/>
    <path d="M 268,225 C 258,290 266,350 268,368 C 252,400 242,545 246,725 C 298,735 350,725 350,725 C 354,545 344,400 328,368 C 330,350 338,290 328,225 Z" fill="url(#wt_crimson)"/>

    <!-- Imperial Gold Phoenix & Lotus Embroidery -->
    <path d="M 298,280 C 280,310 275,380 300,450 C 315,410 325,340 298,280 Z" fill="none" stroke="url(#wt_gold)" stroke-width="2" opacity="0.85"/>
    <circle cx="298" cy="330" r="10" fill="none" stroke="url(#wt_gold)" stroke-width="1.6" opacity="0.8"/>
    <path d="M 298,320 Q 308,330 298,340 Q 288,330 298,320 Z" fill="url(#wt_gold)" opacity="0.7"/>

    <!-- High Collar (Cổ Đứng 3cm) -->
    <path d="M 285,198 L 315,198 L 317,222 L 283,222 Z" fill="url(#wt_crimson)"/>
    <line x1="285" y1="198" x2="315" y2="198" stroke="url(#wt_gold)" stroke-width="2"/>
    <line x1="298" y1="200" x2="324" y2="245" stroke="url(#wt_gold)" stroke-width="1.5"/>
    <circle cx="304" cy="212" r="2.8" fill="url(#wt_gold)"/>
    <circle cx="312" cy="226" r="2.8" fill="url(#wt_gold)"/>
    <circle cx="320" cy="240" r="2.8" fill="url(#wt_gold)"/>

    <!-- Arms & Hands -->
    <path d="M 195,325 C 190,305 192,260 206,205 L 215,208 C 204,260 202,305 210,332 Z" fill="#FED7AA"/>
    <path d="M 204,205 Q 208,195 216,192 Q 218,200 212,210 Z" fill="#FED7AA"/>
    <path d="M 385,365 C 389,395 385,430 371,450 L 363,445 C 375,427 379,395 370,370 Z" fill="#FED7AA"/>

    <!-- Lotus Bouquet -->
    <g transform="translate(345, 385)">
      <path d="M 22,70 L 18,160" stroke="#2D5A47" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M 28,70 L 26,155" stroke="#234B3A" stroke-width="3" stroke-linecap="round"/>
      <rect x="16" y="80" width="16" height="10" fill="#FAF6F0" rx="2"/>
      <path d="M 10,40 C -8,25 2,5 22,15 C 25,30 15,38 10,40 Z" fill="#24553F"/>
      <path d="M 8,25 C -2,7 8,-10 18,-13 C 22,3 18,20 8,25 Z" fill="#FAF6F0" stroke="#CF8481" stroke-width="1"/>
      <path d="M 8,15 Q 14,0 16,-6" stroke="#CF8481" stroke-width="1.5" fill="none"/>
      <path d="M 24,12 C 14,-8 22,-26 30,-30 C 38,-26 44,-8 34,12 Z" fill="#FAF6F0" stroke="#CF8481" stroke-width="1"/>
      <path d="M 26,2 Q 30,-16 30,-20" stroke="#CF8481" stroke-width="1.8" fill="none"/>
    </g>

    <!-- Front Waves of Hair -->
    <path d="M 270,140 C 255,175 252,235 260,295 C 268,255 270,195 276,160 Z" fill="#1C1816"/>
    <path d="M 330,140 C 345,175 348,235 340,295 C 332,255 330,195 324,160 Z" fill="#1C1816"/>

    <!-- Hue Conical Hat (Nón Lá) -->
    <polygon points="300,50 185,165 415,165" fill="#FAF5EC" stroke="#C5B8A5" stroke-width="1.2"/>
    <ellipse cx="300" cy="165" rx="115" ry="20" fill="#F0E5D4" stroke="#C5B8A5" stroke-width="1"/>
    <ellipse cx="300" cy="75" rx="25" ry="4.5" fill="none" stroke="#8C7662" stroke-width="0.8" opacity="0.45"/>
    <ellipse cx="300" cy="95" rx="45" ry="8" fill="none" stroke="#8C7662" stroke-width="0.8" opacity="0.45"/>
    <ellipse cx="300" cy="115" rx="65" ry="11.5" fill="none" stroke="#8C7662" stroke-width="0.8" opacity="0.45"/>
    <ellipse cx="300" cy="135" rx="85" ry="15" fill="none" stroke="#8C7662" stroke-width="0.8" opacity="0.45"/>
    <ellipse cx="300" cy="155" rx="105" ry="18.5" fill="none" stroke="#8C7662" stroke-width="0.8" opacity="0.45"/>
    <path d="M 215,165 Q 250,220 275,265" stroke="#CF8481" stroke-width="3" fill="none"/>
    <path d="M 385,165 Q 350,220 325,265" stroke="#CF8481" stroke-width="3" fill="none"/>
  </g>

  <text x="300" y="780" font-family="serif" font-size="12" font-weight="600" fill="#8B2624" letter-spacing="3" text-anchor="middle">ATELIER V-REMIX · DI SẢN TRUYỀN THỐNG</text>
</svg>`;

// 2. WELCOME CONTEMPORARY EDITORIAL ILLUSTRATION
const welcomeContemporarySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800">
  <defs>
    <radialGradient id="wc_glow" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="65%" stop-color="#F7F3EB"/>
      <stop offset="100%" stop-color="#ECE3D4"/>
    </radialGradient>
    <linearGradient id="wc_jade" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3D735C"/>
      <stop offset="50%" stop-color="#2D5A47"/>
      <stop offset="100%" stop-color="#19382B"/>
    </linearGradient>
    <linearGradient id="wc_wine" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7A242B"/>
      <stop offset="50%" stop-color="#5C1920"/>
      <stop offset="100%" stop-color="#3A0D12"/>
    </linearGradient>
    <filter id="wc_shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#2D3A30" flood-opacity="0.14"/>
    </filter>
  </defs>

  <rect width="600" height="800" fill="url(#wc_glow)"/>

  <g opacity="0.35">
    <circle cx="300" cy="380" r="240" fill="none" stroke="#2D5A47" stroke-width="1.2" stroke-dasharray="6,4"/>
    <line x1="120" y1="200" x2="480" y2="200" stroke="#C5B8A5" stroke-width="0.8"/>
    <line x1="120" y1="620" x2="480" y2="620" stroke="#C5B8A5" stroke-width="0.8"/>
  </g>

  <!-- Fashion Model Figure (Contemporary Remix) -->
  <g filter="url(#wc_shadow)">
    <!-- Sleek Modern Bob Hair -->
    <path d="M 270,120 C 250,140 240,180 242,230 C 255,235 270,230 275,200 C 278,160 300,120 300,120 Z" fill="#1C1816"/>
    <path d="M 330,120 C 350,140 360,180 358,230 C 345,235 330,230 325,200 C 322,160 300,120 300,120 Z" fill="#1C1816"/>
    <path d="M 270,120 C 300,95 330,120 330,120 L 325,180 C 300,185 275,180 270,120 Z" fill="#1C1816"/>

    <!-- Chunky Polished Black Loafers -->
    <rect x="256" y="722" width="34" height="20" rx="6" fill="#1C1816"/>
    <rect x="253" y="738" width="40" height="8" rx="2" fill="#2D2724"/>
    <rect x="316" y="722" width="34" height="20" rx="6" fill="#1C1816"/>
    <rect x="313" y="738" width="40" height="8" rx="2" fill="#2D2724"/>

    <!-- High-Waist Cropped Wide Culottes (Ivory Silk) -->
    <path d="M 268,360 C 235,460 238,590 244,650 L 286,650 C 290,560 292,490 295,430 C 298,490 300,560 304,650 L 346,650 C 352,590 355,460 322,360 Z" fill="#FAF6F0"/>
    <line x1="262" y1="420" x2="266" y2="640" stroke="#3D2D24" stroke-width="1" stroke-opacity="0.12"/>
    <line x1="328" y1="420" x2="324" y2="640" stroke="#3D2D24" stroke-width="1" stroke-opacity="0.12"/>

    <!-- Slender Ankles -->
    <rect x="268" y="650" width="12" height="74" fill="#FED7AA"/>
    <rect x="320" y="650" width="12" height="74" fill="#FED7AA"/>

    <!-- Neck & Face -->
    <path d="M 288,160 L 288,220 C 296,225 304,225 312,220 L 312,160 Z" fill="#FED7AA"/>
    <path d="M 300,115 C 322,115 330,132 328,154 C 326,173 314,192 300,198 C 286,192 274,173 272,154 C 270,132 278,115 300,115 Z" fill="#FED7AA"/>
    <path d="M 282,148 Q 290,144 296,149" stroke="#1A1513" stroke-width="2.2" fill="none"/>
    <path d="M 304,149 Q 310,144 318,148" stroke="#1A1513" stroke-width="2.2" fill="none"/>
    <circle cx="289" cy="151" r="2.6" fill="#1A1513"/>
    <circle cx="311" cy="151" r="2.6" fill="#1A1513"/>
    <path d="M 294,178 Q 300,181 306,178 Q 300,186 294,178 Z" fill="#7A242B"/>

    <!-- Freshwater Pearl Choker -->
    <path d="M 287,208 Q 300,216 313,208" stroke="#FAF6F0" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <path d="M 288,214 Q 300,222 312,214" stroke="#FAF6F0" stroke-width="3.5" fill="none" stroke-linecap="round"/>

    <!-- Asymmetrical Midi Contemporary Áo Dài -->
    <path d="M 270,225 C 255,290 262,350 265,365 C 255,395 250,510 252,620 C 298,630 342,620 342,620 C 344,510 338,395 328,365 C 330,350 338,290 326,225 Z" fill="url(#wc_wine)"/>
    <path d="M 272,225 C 310,240 335,270 348,320 L 360,560 C 330,590 290,580 280,540 L 280,310 Z" fill="url(#wc_jade)" opacity="0.88"/>

    <!-- Contemporary Sleeves -->
    <path d="M 272,225 C 245,260 220,310 212,350 L 226,355 C 235,320 256,275 278,245 Z" fill="url(#wc_wine)"/>
    <path d="M 326,225 C 345,260 365,310 374,350 L 360,355 C 352,320 335,275 320,245 Z" fill="url(#wc_jade)"/>

    <!-- Kim Sơn Seagrass Tote -->
    <g transform="translate(350, 350)">
      <circle cx="20" cy="45" r="26" fill="#C5A059" stroke="#9A7836" stroke-width="1.8"/>
      <path d="M 8,24 C 8,6 32,6 32,24" stroke="#6E3C29" stroke-width="3" fill="none"/>
      <path d="M 20,40 C 14,30 18,20 20,18 C 22,20 26,30 20,40 Z" fill="#CF8481"/>
      <path d="M 14,42 C 8,34 10,26 14,24 C 16,30 18,36 14,42 Z" fill="#E28F95"/>
      <path d="M 26,42 C 32,34 30,26 26,24 C 24,30 22,36 26,42 Z" fill="#E28F95"/>
    </g>

    <!-- Contemporary Earrings -->
    <line x1="274" y1="162" x2="274" y2="182" stroke="#D4AF37" stroke-width="1.6"/>
    <circle cx="274" cy="182" r="3" fill="#D4AF37"/>
    <line x1="326" y1="162" x2="326" y2="182" stroke="#D4AF37" stroke-width="1.6"/>
    <circle cx="326" cy="182" r="3" fill="#D4AF37"/>
  </g>

  <text x="300" y="780" font-family="serif" font-size="12" font-weight="600" fill="#2D5A47" letter-spacing="3" text-anchor="middle">ATELIER V-REMIX · CONTEMPORARY REMIX</text>
</svg>`;

// 3. DISCOVER YOUR STYLE CATEGORY PREVIEW CARDS
// Card A: Tops (Áo Chính)
const categoryTopsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <radialGradient id="top_bg" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#FAF4EA"/>
    </radialGradient>
    <linearGradient id="top_crimson" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A52A2A"/>
      <stop offset="100%" stop-color="#6E1A18"/>
    </linearGradient>
    <linearGradient id="top_gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F9E8B6"/>
      <stop offset="100%" stop-color="#D4AF37"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#top_bg)"/>
  <rect x="8" y="8" width="384" height="284" rx="14" fill="none" stroke="#E6DDD0" stroke-width="1.5"/>

  <!-- High-Fashion Áo Dài Tunic Silhouette -->
  <g transform="translate(200, 140)">
    <!-- Shoulders & Sleeves -->
    <path d="M -20,-80 L -85,-10 L -68,0 L -18,-50 L -25,120 C 0,130 0,130 25,120 L 18,-50 L 68,0 L 85,-10 L 20,-80 Z" fill="url(#top_crimson)"/>
    <!-- High Collar 3cm -->
    <rect x="-14" y="-95" width="28" height="18" fill="url(#top_crimson)" rx="2"/>
    <line x1="-14" y1="-95" x2="14" y2="-95" stroke="url(#top_gold)" stroke-width="2"/>
    <!-- Diagonal Placket & Knot Buttons -->
    <path d="M 0,-80 Q 20,-60 22,-20" stroke="url(#top_gold)" stroke-width="1.8" fill="none"/>
    <circle cx="8" cy="-68" r="2.8" fill="url(#top_gold)"/>
    <circle cx="16" cy="-52" r="2.8" fill="url(#top_gold)"/>
    <circle cx="21" cy="-35" r="2.8" fill="url(#top_gold)"/>
    <!-- Lotus Embroidery Accent -->
    <circle cx="0" cy="15" r="14" fill="none" stroke="url(#top_gold)" stroke-width="1.2" opacity="0.8"/>
    <path d="M 0,5 Q 10,15 0,25 Q -10,15 0,5 Z" fill="url(#top_gold)" opacity="0.75"/>
  </g>
</svg>`;

// Card B: Bottoms (Quần & Váy)
const categoryBottomsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <radialGradient id="bot_bg" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#FAF4EA"/>
    </radialGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bot_bg)"/>
  <rect x="8" y="8" width="384" height="284" rx="14" fill="none" stroke="#E6DDD0" stroke-width="1.5"/>

  <!-- Fluid Wide Silk Palazzo Trousers -->
  <g transform="translate(200, 135)">
    <!-- Silk Trousers Silhouette -->
    <path d="M -30,-80 L 30,-80 L 75,120 L 15,120 L 2,-10 L -2,-10 L -15,120 L -75,120 Z" fill="#FAF6F0" stroke="#D1C7BA" stroke-width="1.5"/>
    <!-- Accordion Silk Drapes -->
    <path d="M -22,-60 C -35,10 -38,70 -45,115" stroke="#3D2D24" stroke-width="1.2" stroke-opacity="0.2" fill="none"/>
    <path d="M 22,-60 C 35,10 38,70 45,115" stroke="#3D2D24" stroke-width="1.2" stroke-opacity="0.2" fill="none"/>
    <path d="M -8,-20 C -6,30 -8,70 -6,115" stroke="#3D2D24" stroke-width="1" stroke-opacity="0.15" fill="none"/>
    <path d="M 8,-20 C 6,30 8,70 6,115" stroke="#3D2D24" stroke-width="1" stroke-opacity="0.15" fill="none"/>
    <!-- Silk Waistband with Drawstring -->
    <rect x="-32" y="-84" width="64" height="8" rx="2" fill="#EFE8DD"/>
  </g>
</svg>`;

// Card C: Accessories (Phụ Kiện)
const categoryAccessoriesSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <radialGradient id="acc_bg" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#FAF4EA"/>
    </radialGradient>
    <linearGradient id="acc_gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F9E8B6"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#AA8222"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#acc_bg)"/>
  <rect x="8" y="8" width="384" height="284" rx="14" fill="none" stroke="#E6DDD0" stroke-width="1.5"/>

  <!-- Iconic Conical Hat (Nón Lá) & Golden Apricot Hairpin -->
  <g transform="translate(190, 135)">
    <!-- Nón Lá Conical Hat -->
    <polygon points="0,-65 -85,35 85,35" fill="#FAF5EC" stroke="#C5B8A5" stroke-width="1.4"/>
    <ellipse cx="0" cy="35" rx="85" ry="16" fill="#F0E5D4" stroke="#C5B8A5" stroke-width="1"/>
    <!-- Rings -->
    <ellipse cx="0" cy="-40" rx="22" ry="4" fill="none" stroke="#8C7662" stroke-width="0.8" opacity="0.5"/>
    <ellipse cx="0" cy="-15" rx="46" ry="8" fill="none" stroke="#8C7662" stroke-width="0.8" opacity="0.5"/>
    <ellipse cx="0" cy="10" rx="68" ry="12" fill="none" stroke="#8C7662" stroke-width="0.8" opacity="0.5"/>
    <!-- Pink Ribbon Strap -->
    <path d="M -50,35 Q -30,85 -5,115" stroke="#CF8481" stroke-width="2.6" fill="none"/>
    <path d="M 50,35 Q 30,85 5,115" stroke="#CF8481" stroke-width="2.6" fill="none"/>

    <!-- Gilded Apricot Blossom Hairpin (Trâm Cài Hoa Mai) -->
    <g transform="translate(60, -30) rotate(25)">
      <line x1="-30" y1="40" x2="35" y2="-40" stroke="url(#acc_gold)" stroke-width="3" stroke-linecap="round"/>
      <circle cx="35" cy="-40" r="12" fill="url(#acc_gold)"/>
      <circle cx="35" cy="-40" r="4.5" fill="#FFFFFF"/>
      <circle cx="45" cy="-30" r="4" fill="#FAF6F0"/>
      <circle cx="25" cy="-50" r="4" fill="#FAF6F0"/>
    </g>
  </g>
</svg>`;

// Card D: Shoes (Giày Guốc)
const categoryShoesSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <radialGradient id="sh_bg" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#FAF4EA"/>
    </radialGradient>
    <linearGradient id="sh_gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F9E8B6"/>
      <stop offset="100%" stop-color="#D4AF37"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#sh_bg)"/>
  <rect x="8" y="8" width="384" height="284" rx="14" fill="none" stroke="#E6DDD0" stroke-width="1.5"/>

  <!-- Pair of Traditional Guốc Mộc & Embroidered Velvet Slippers -->
  <g transform="translate(200, 150)">
    <!-- Left: Carved Wooden Clog (Guốc Mộc) -->
    <g transform="translate(-70, -10)">
      <!-- Wood Sole -->
      <path d="M -50,-10 C -20,-14 20,-12 45,-5 C 50,-2 50,15 45,18 C 30,22 -30,22 -45,18 C -52,14 -52,-5 -50,-10 Z" fill="#8C5338" stroke="#6B3A22" stroke-width="1.2"/>
      <!-- Wooden Heel Blocks -->
      <polygon points="-42,16 -20,16 -24,42 -45,42" fill="#6B3A22"/>
      <polygon points="18,16 38,16 34,42 14,42" fill="#6B3A22"/>
      <!-- Red Velvet Strap (Quai Nhung Đỏ) -->
      <path d="M -15,-13 Q 5,-45 25,-8" stroke="#8B2624" stroke-width="10" stroke-linecap="round" fill="none"/>
      <path d="M -15,-13 Q 5,-45 25,-8" stroke="#A52A2A" stroke-width="6" stroke-linecap="round" fill="none"/>
    </g>

    <!-- Right: Embroidered Velvet Slipper (Hài Nhung Thêu) -->
    <g transform="translate(70, -10)">
      <path d="M -45,-12 C -20,-16 25,-12 45,5 C 52,12 48,22 42,22 C 20,22 -25,22 -42,18 C -48,14 -48,-6 -45,-12 Z" fill="#8B2624" stroke="#681816" stroke-width="1.2"/>
      <!-- Upturned Toe (Mũi Hài Cong) -->
      <path d="M 40,5 Q 52,-10 46,-18 Q 40,-12 36,0" fill="url(#sh_gold)"/>
      <!-- Gold Embroidered Phoenix / Cloud Motif -->
      <path d="M -15,2 Q 0,-8 15,4 Q 0,10 -15,2 Z" fill="none" stroke="url(#sh_gold)" stroke-width="1.6"/>
      <circle cx="0" cy="3" r="2.5" fill="url(#sh_gold)"/>
    </g>
  </g>
</svg>`;

// Write all editorial and category card SVGs
fs.writeFileSync(path.join(editorialDir, 'welcome_traditional.svg'), welcomeTraditionalSvg);
fs.writeFileSync(path.join(editorialDir, 'welcome_contemporary.svg'), welcomeContemporarySvg);
fs.writeFileSync(path.join(editorialDir, 'category_tops.svg'), categoryTopsSvg);
fs.writeFileSync(path.join(editorialDir, 'category_bottoms.svg'), categoryBottomsSvg);
fs.writeFileSync(path.join(editorialDir, 'category_accessories.svg'), categoryAccessoriesSvg);
fs.writeFileSync(path.join(editorialDir, 'category_shoes.svg'), categoryShoesSvg);

console.log('Successfully generated Welcome editorial & Discover Category SVGs.');

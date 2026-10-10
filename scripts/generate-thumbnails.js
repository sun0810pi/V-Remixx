import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const thumbnailsDir = path.join(projectRoot, 'public', 'assets', 'thumbnails');
fs.mkdirSync(thumbnailsDir, { recursive: true });

function wrapCard(id, title, colorHex, graphicSvg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="bg_${id}" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#FAF5EC"/>
    </radialGradient>
    <linearGradient id="silk_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colorHex}"/>
      <stop offset="100%" stop-color="#1A1513" stop-opacity="0.3"/>
    </linearGradient>
    <linearGradient id="gold_${id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F9E8B6"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#AA8222"/>
    </linearGradient>
  </defs>

  <!-- Clean Fashion Studio Card Background -->
  <rect width="200" height="200" rx="16" fill="url(#bg_${id})"/>
  <rect x="5" y="5" width="190" height="190" rx="13" fill="none" stroke="#EAE0D2" stroke-width="1.2"/>
  <circle cx="100" cy="92" r="56" fill="${colorHex}" fill-opacity="0.08"/>

  <!-- Centered Isolated Garment Illustration -->
  <g transform="translate(100, 92)">
    ${graphicSvg}
  </g>

  <!-- Editorial Typographic Label -->
  <text x="100" y="176" font-family="serif" font-size="11" font-weight="600" fill="#3D2820" text-anchor="middle" letter-spacing="0.5">${title}</text>
</svg>`;
}

const items = [
  // 1. ao_dai_traditional
  {
    id: 'ao_dai_traditional',
    title: 'Áo Dài Cổ Đứng',
    colorHex: '#8B2624',
    svg: `
      <!-- Standing Collar & Long Panels -->
      <path d="M -15,-52 L -48,-15 L -36,-8 L -12,-35 L -16,48 C 0,55 0,55 16,48 L 12,-35 L 36,-8 L 48,-15 L 15,-52 Z" fill="#8B2624"/>
      <rect x="-8" y="-60" width="16" height="10" fill="#8B2624" rx="1"/>
      <line x1="-8" y1="-60" x2="8" y2="-60" stroke="url(#gold_ao_dai_traditional)" stroke-width="1.6"/>
      <!-- Diagonal Placket & Buttons -->
      <path d="M 0,-50 Q 14,-38 15,-10" stroke="url(#gold_ao_dai_traditional)" stroke-width="1.4" fill="none"/>
      <circle cx="6" cy="-42" r="2.2" fill="url(#gold_ao_dai_traditional)"/>
      <circle cx="11" cy="-30" r="2.2" fill="url(#gold_ao_dai_traditional)"/>
      <circle cx="14" cy="-18" r="2.2" fill="url(#gold_ao_dai_traditional)"/>
      <circle cx="0" cy="12" r="8" fill="none" stroke="url(#gold_ao_dai_traditional)" stroke-width="1" opacity="0.8"/>
    `
  },
  // 2. ao_dai_cachtan
  {
    id: 'ao_dai_cachtan',
    title: 'Áo Dài Cách Tân',
    colorHex: '#CF8481',
    svg: `
      <!-- Midi Length & 3/4 Sleeves, Round Neck -->
      <path d="M -16,-46 L -42,-22 L -32,-16 L -12,-32 L -15,30 C 0,36 0,36 15,30 L 12,-32 L 32,-16 L 42,-22 L 16,-46 Z" fill="#CF8481"/>
      <!-- Jewel Round Neckline -->
      <path d="M -12,-46 Q 0,-40 12,-46" stroke="#8B2624" stroke-width="2" fill="none"/>
      <!-- Contemporary Floral Embroidery Pattern -->
      <circle cx="0" cy="-5" r="9" fill="#8B2624" fill-opacity="0.3"/>
      <circle cx="0" cy="-5" r="4" fill="#8B2624"/>
      <path d="M -6,-5 Q 0,-15 6,-5" stroke="#FFFFFF" stroke-width="1" fill="none"/>
    `
  },
  // 3. ao_ngu_than_chẽn
  {
    id: 'ao_ngu_than_chẽn',
    title: 'Áo Ngũ Thân Tay Chẽn',
    colorHex: '#2C221E',
    svg: `
      <!-- Five Panel Robe with Snug Sleeves and Five Buttons -->
      <path d="M -14,-50 L -45,-15 L -35,-10 L -12,-34 L -16,48 C 0,54 0,54 16,48 L 12,-34 L 35,-10 L 45,-15 L 14,-50 Z" fill="#2C221E"/>
      <rect x="-8" y="-58" width="16" height="9" fill="#2C221E"/>
      <!-- Overlapping Front Lapel -->
      <path d="M 0,-49 L 14,-15 L 14,48" stroke="#5C483E" stroke-width="1.8" fill="none"/>
      <!-- 5 Confucian Buttons -->
      <circle cx="0" cy="-48" r="2.2" fill="url(#gold_ao_ngu_than_chẽn)"/>
      <circle cx="7" cy="-35" r="2.2" fill="url(#gold_ao_ngu_than_chẽn)"/>
      <circle cx="12" cy="-20" r="2.2" fill="url(#gold_ao_ngu_than_chẽn)"/>
      <circle cx="14" cy="-5" r="2.2" fill="url(#gold_ao_ngu_than_chẽn)"/>
      <circle cx="14" cy="10" r="2.2" fill="url(#gold_ao_ngu_than_chẽn)"/>
    `
  },
  // 4. ao_tac_royal
  {
    id: 'ao_tac_royal',
    title: 'Áo Tấc Lễ Phục',
    colorHex: '#C5A059',
    svg: `
      <!-- Voluminous Wide Sleeves (Tay Thụng) -->
      <path d="M -15,-50 L -55,-5 C -45,15 -25,10 -15,0 L -18,50 C 0,56 0,56 18,50 L 15,0 C 25,10 45,15 55,-5 L 15,-50 Z" fill="#C5A059"/>
      <rect x="-10" y="-58" width="20" height="10" fill="#C5A059"/>
      <line x1="-10" y1="-58" x2="10" y2="-58" stroke="url(#gold_ao_tac_royal)" stroke-width="2"/>
      <!-- Gold Brocade Dragon Silhouette -->
      <circle cx="0" cy="10" r="14" fill="none" stroke="url(#gold_ao_tac_royal)" stroke-width="2"/>
      <path d="M -6,10 Q 0,2 6,10 Q 0,18 -6,10" fill="url(#gold_ao_tac_royal)"/>
    `
  },
  // 5. ao_giao_linh
  {
    id: 'ao_giao_linh',
    title: 'Áo Giao Lĩnh Đại Việt',
    colorHex: '#1E2C3D',
    svg: `
      <!-- Crossover Collar Right over Left with Waist Sash -->
      <path d="M -15,-48 L -50,-10 L -38, -2 L -14,-30 L -18,48 C 0,54 0,54 18,48 L 14,-30 L 38,-2 L 50,-10 L 15,-48 Z" fill="#1E2C3D"/>
      <!-- Distinct Cross Collar V Bands -->
      <path d="M -14,-46 L 12,0" stroke="#FAF6F0" stroke-width="3" fill="none"/>
      <path d="M 14,-46 L -8,0" stroke="#FAF6F0" stroke-width="3" fill="none"/>
      <!-- Waist Sash Tied in Front -->
      <rect x="-18" y="0" width="36" height="7" fill="#8B2624" rx="2"/>
      <path d="M -4,7 L -8,32" stroke="#8B2624" stroke-width="2.5"/>
      <path d="M 4,7 L 0,35" stroke="#8B2624" stroke-width="2.5"/>
    `
  },
  // 6. ao_ba_ba
  {
    id: 'ao_ba_ba',
    title: 'Áo Bà Ba Nam Bộ',
    colorHex: '#582B46',
    svg: `
      <!-- Collarless Blouse with Center Buttons and Pockets -->
      <path d="M -15,-45 L -44,-10 L -34,-4 L -12,-28 L -16,28 C 0,32 0,32 16,28 L 12,-28 L 34,-4 L 44,-10 L 15,-45 Z" fill="#582B46"/>
      <!-- Soft Round Collarless Neckline -->
      <path d="M -14,-45 Q 0,-38 14,-45" stroke="#3A162D" stroke-width="2" fill="none"/>
      <!-- Center Button Placket -->
      <line x1="0" y1="-38" x2="0" y2="28" stroke="#3A162D" stroke-width="1.6"/>
      <circle cx="0" cy="-30" r="1.8" fill="#FAF6F0"/>
      <circle cx="0" cy="-18" r="1.8" fill="#FAF6F0"/>
      <circle cx="0" cy="-6" r="1.8" fill="#FAF6F0"/>
      <circle cx="0" cy="6" r="1.8" fill="#FAF6F0"/>
      <circle cx="0" cy="18" r="1.8" fill="#FAF6F0"/>
      <!-- Two Lower Pockets -->
      <rect x="-13" y="10" width="7" height="8" rx="1" fill="#451E36"/>
      <rect x="6" y="10" width="7" height="8" rx="1" fill="#451E36"/>
    `
  },
  // 7. ao_tu_than
  {
    id: 'ao_tu_than',
    title: 'Áo Tứ Thân Kinh Bắc',
    colorHex: '#6E3C29',
    svg: `
      <!-- Four Panels with Tied Knot in Front -->
      <path d="M -16,-46 L -48,-12 L -38,-6 L -14,-30 L -18,48 L -4,48 L -2,8 L 2,8 L 4,48 L 18,48 L 14,-30 L 38,-6 L 48,-12 L 16,-46 Z" fill="#6E3C29"/>
      <!-- Silk Halter Yếm Showing Underneath -->
      <polygon points="0,-38 -12,-16 0,-2 12,-16" fill="#8B2624"/>
      <!-- Front Tied Knots Cascading Down -->
      <ellipse cx="0" cy="8" rx="5" ry="4" fill="#C5A059"/>
      <path d="M -3,8 C -8,22 -6,38 -8,45" stroke="#C5A059" stroke-width="3" fill="none"/>
      <path d="M 3,8 C 8,22 6,38 8,45" stroke="#C5A059" stroke-width="3" fill="none"/>
    `
  },
  // 8. yem_silk
  {
    id: 'yem_silk',
    title: 'Áo Yếm Cổ Yếm',
    colorHex: '#8B2624',
    svg: `
      <!-- Diamond Halter Bodice with Ties -->
      <polygon points="0,-45 -32,0 0,42 32,0" fill="#8B2624"/>
      <!-- Neck Ties -->
      <path d="M -6,-44 Q -15,-58 -8,-62" stroke="#8B2624" stroke-width="2" fill="none"/>
      <path d="M 6,-44 Q 15,-58 8,-62" stroke="#8B2624" stroke-width="2" fill="none"/>
      <!-- Back Ties -->
      <path d="M -30,0 Q -45,10 -40,25" stroke="#8B2624" stroke-width="2" fill="none"/>
      <path d="M 30,0 Q 45,10 40,25" stroke="#8B2624" stroke-width="2" fill="none"/>
      <!-- Embroidered Golden Lotus on Yếm -->
      <circle cx="0" cy="5" r="10" fill="none" stroke="url(#gold_yem_silk)" stroke-width="1.4"/>
      <path d="M 0,-2 Q 7,5 0,12 Q -7,5 0,-2 Z" fill="url(#gold_yem_silk)"/>
    `
  },
  // 9. ao_canh_inner
  {
    id: 'ao_canh_inner',
    title: 'Áo Cánh Lụa Mỏng',
    colorHex: '#FAF6F0',
    svg: `
      <!-- Lightweight White Modest Under-Blouse -->
      <path d="M -14,-45 L -42,-12 L -34,-6 L -12,-28 L -15,26 C 0,30 0,30 15,26 L 12,-28 L 34,-6 L 42,-12 L 14,-45 Z" fill="#FAF6F0" stroke="#D1C7BA" stroke-width="1.2"/>
      <path d="M -12,-44 Q 0,-38 12,-44" stroke="#B8AC9C" stroke-width="1.6" fill="none"/>
      <line x1="0" y1="-38" x2="0" y2="26" stroke="#C5B9AA" stroke-width="1.2"/>
      <circle cx="0" cy="-28" r="1.5" fill="#8B7E74"/>
      <circle cx="0" cy="-16" r="1.5" fill="#8B7E74"/>
      <circle cx="0" cy="-4" r="1.5" fill="#8B7E74"/>
      <circle cx="0" cy="8" r="1.5" fill="#8B7E74"/>
    `
  },
  // 10. quan_ao_dai_white
  {
    id: 'quan_ao_dai_white',
    title: 'Quần Lụa Trắng',
    colorHex: '#FAF6F0',
    svg: `
      <!-- Fluid Wide Silk Trousers -->
      <path d="M -22,-45 L 22,-45 L 48,50 L 12,50 L 2,-10 L -2,-10 L -12,50 L -48,50 Z" fill="#FAF6F0" stroke="#D1C7BA" stroke-width="1.2"/>
      <path d="M -15,-30 C -22,10 -24,40 -28,48" stroke="#3D2D24" stroke-width="1" stroke-opacity="0.18" fill="none"/>
      <path d="M 15,-30 C 22,10 24,40 28,48" stroke="#3D2D24" stroke-width="1" stroke-opacity="0.18" fill="none"/>
    `
  },
  // 11. vay_dup_traditional
  {
    id: 'vay_dup_traditional',
    title: 'Váy Đụp Xếp Nếp',
    colorHex: '#2C221E',
    svg: `
      <!-- Voluminous Gathered Black Folk Skirt -->
      <path d="M -20,-40 L 20,-40 C 35,0 48,35 52,50 C 0,55 0,55 -52,50 C -48,35 -35,0 -20,-40 Z" fill="#2C221E"/>
      <rect x="-22" y="-44" width="44" height="6" fill="#6E3C29" rx="1"/>
      <!-- Pleat Lines -->
      <line x1="-12" y1="-38" x2="-28" y2="48" stroke="#1A1513" stroke-width="1.2"/>
      <line x1="-4" y1="-38" x2="-10" y2="49" stroke="#1A1513" stroke-width="1.2"/>
      <line x1="4" y1="-38" x2="10" y2="49" stroke="#1A1513" stroke-width="1.2"/>
      <line x1="12" y1="-38" x2="28" y2="48" stroke="#1A1513" stroke-width="1.2"/>
    `
  },
  // 12. quan_culottes_modern
  {
    id: 'quan_culottes_modern',
    title: 'Quần Culottes Lửng',
    colorHex: '#FAF6F0',
    svg: `
      <!-- Cropped Tailored Culottes -->
      <path d="M -20,-42 L 20,-42 L 38,24 L 12,24 L 2,-10 L -2,-10 L -12,24 L -38,24 Z" fill="#FAF6F0" stroke="#D1C7BA" stroke-width="1.2"/>
      <line x1="-12" y1="-28" x2="-14" y2="20" stroke="#3D2D24" stroke-width="1" stroke-opacity="0.15"/>
      <line x1="12" y1="-28" x2="14" y2="20" stroke="#3D2D24" stroke-width="1" stroke-opacity="0.15"/>
    `
  },
  // 13. quan_denim_fusion
  {
    id: 'quan_denim_fusion',
    title: 'Quần Jeans Fusion',
    colorHex: '#1E2C3D',
    svg: `
      <!-- High Waist Raw Denim Straight Trousers -->
      <path d="M -18,-45 L 18,-45 L 26,50 L 10,50 L 2,-8 L -2,-8 L -10,50 L -26,50 Z" fill="#1E2C3D"/>
      <rect x="-19" y="-48" width="38" height="5" fill="#141E2B" rx="1"/>
      <!-- Denim Contrast Orange Stitching -->
      <line x1="-18" y1="-43" x2="18" y2="-43" stroke="#D97706" stroke-width="0.8"/>
      <line x1="-1" y1="-38" x2="-1" y2="-8" stroke="#D97706" stroke-width="0.8"/>
      <line x1="1" y1="-38" x2="1" y2="-8" stroke="#D97706" stroke-width="0.8"/>
      <circle cx="0" cy="-45" r="1.5" fill="#D4AF37"/>
    `
  },
  // 14. ao_nhat_binh_court
  {
    id: 'ao_nhat_binh_court',
    title: 'Áo Nhật Bình Cung Đình',
    colorHex: '#8B2624',
    svg: `
      <!-- Cloud Collar Robe with 5-Color Rainbow Cuffs -->
      <path d="M -16,-50 L -54,-10 L -38, -2 L -14,-28 L -18,50 C 0,56 0,56 18,50 L 14,-28 L 38,-2 L 54,-10 L 16,-50 Z" fill="#8B2624"/>
      <!-- Rectangular Embroidered Cloud Collar (Cổ Nhật Bình) -->
      <rect x="-14" y="-48" width="28" height="42" fill="#FAF6F0" stroke="url(#gold_ao_nhat_binh_court)" stroke-width="1.8" rx="2"/>
      <path d="M -8,-40 L 8,-40 L 8,-12 L -8,-12 Z" fill="none" stroke="#8B2624" stroke-width="1.2"/>
      <circle cx="0" cy="-26" r="3" fill="#2D5A47"/>
      <!-- Five Colored Cuffs (Ngũ Sắc) on Sleeves -->
      <rect x="-50" y="-12" width="12" height="2" fill="#8B2624"/>
      <rect x="-50" y="-10" width="12" height="2" fill="#C5A059"/>
      <rect x="-50" y="-8" width="12" height="2" fill="#2D5A47"/>
      <rect x="-50" y="-6" width="12" height="2" fill="#FAF6F0"/>
      <rect x="-50" y="-4" width="12" height="2" fill="#1E2C3D"/>
      <rect x="38" y="-12" width="12" height="2" fill="#8B2624"/>
      <rect x="38" y="-10" width="12" height="2" fill="#C5A059"/>
      <rect x="38" y="-8" width="12" height="2" fill="#2D5A47"/>
      <rect x="38" y="-6" width="12" height="2" fill="#FAF6F0"/>
      <rect x="38" y="-4" width="12" height="2" fill="#1E2C3D"/>
    `
  },
  // 15. ao_khoac_doi_kham
  {
    id: 'ao_khoac_doi_kham',
    title: 'Áo Đối Khâm Thêu Tay',
    colorHex: '#2D5A47',
    svg: `
      <!-- Open Front Sheer Duster with Parallel Lapels -->
      <path d="M -16,-48 L -48,-15 L -36,-10 L -14,-32 L -18,48 L -8,48 L -6,-15 L 6,-15 L 8,48 L 18,48 L 14,-32 L 36,-10 L 48,-15 L 16,-48 Z" fill="#2D5A47" opacity="0.9"/>
      <!-- Parallel Lapels (Đối Khâm) with Floral Embroidery -->
      <line x1="-6" y1="-46" x2="-6" y2="46" stroke="url(#gold_ao_khoac_doi_kham)" stroke-width="1.6"/>
      <line x1="6" y1="-46" x2="6" y2="46" stroke="url(#gold_ao_khoac_doi_kham)" stroke-width="1.6"/>
      <circle cx="-6" cy="-20" r="2.2" fill="url(#gold_ao_khoac_doi_kham)"/>
      <circle cx="6" cy="-20" r="2.2" fill="url(#gold_ao_khoac_doi_kham)"/>
      <circle cx="-6" cy="10" r="2.2" fill="url(#gold_ao_khoac_doi_kham)"/>
      <circle cx="6" cy="10" r="2.2" fill="url(#gold_ao_khoac_doi_kham)"/>
    `
  },
  // 16. khan_dong_traditional
  {
    id: 'khan_dong_traditional',
    title: 'Khăn Đóng Hoàng Triều',
    colorHex: '#2C221E',
    svg: `
      <!-- Five Fold Silk Turban -->
      <ellipse cx="0" cy="0" rx="42" ry="26" fill="#2C221E"/>
      <ellipse cx="0" cy="0" rx="36" ry="20" fill="#1A1513"/>
      <!-- Overlapping Diagonal Folds (chữ Nhân / chữ Nhất) -->
      <path d="M -30,6 Q 0,-14 30,6" stroke="#C5A059" stroke-width="1.4" fill="none" opacity="0.6"/>
      <path d="M -32,12 Q 0,-8 32,12" stroke="#C5A059" stroke-width="1.4" fill="none" opacity="0.6"/>
      <path d="M -26,18 Q 0,0 26,18" stroke="#C5A059" stroke-width="1.4" fill="none" opacity="0.6"/>
    `
  },
  // 17. man_nhung_pearl
  {
    id: 'man_nhung_pearl',
    title: 'Mấn Nhung Đính Ngọc',
    colorHex: '#8B2624',
    svg: `
      <!-- Velvet Crown Embellished with Pearls -->
      <ellipse cx="0" cy="0" rx="42" ry="25" fill="#8B2624"/>
      <ellipse cx="0" cy="0" rx="34" ry="18" fill="#FAF5EC"/>
      <ellipse cx="0" cy="0" rx="42" ry="25" fill="none" stroke="url(#gold_man_nhung_pearl)" stroke-width="2.5"/>
      <!-- Hand Sewn Pearls Ring -->
      ${[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => {
        const rad = deg * Math.PI / 180;
        const x = 38 * Math.cos(rad);
        const y = 22 * Math.sin(rad);
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.8" fill="#FAF6F0" stroke="#D1C7BA" stroke-width="0.6"/>`;
      }).join('')}
    `
  },
  // 18. non_la_hue
  {
    id: 'non_la_hue',
    title: 'Nón Lá Xứ Huế',
    colorHex: '#FAF6F0',
    svg: `
      <!-- Conical Palm Leaf Hat with Poem Silhouette -->
      <polygon points="0,-48 -58,24 58,24" fill="#FAF5EC" stroke="#C5B8A5" stroke-width="1.2"/>
      <ellipse cx="0" cy="24" rx="58" ry="12" fill="#F0E5D4" stroke="#C5B8A5" stroke-width="1"/>
      <!-- Bamboo Rings -->
      <ellipse cx="0" cy="-30" rx="14" ry="3" fill="none" stroke="#8C7662" stroke-width="0.8" opacity="0.45"/>
      <ellipse cx="0" cy="-12" rx="30" ry="6" fill="none" stroke="#8C7662" stroke-width="0.8" opacity="0.45"/>
      <ellipse cx="0" cy="6" rx="46" ry="9" fill="none" stroke="#8C7662" stroke-width="0.8" opacity="0.45"/>
      <!-- Pink Chin Strap Ribbons -->
      <path d="M -30,24 Q -16,48 -5,60" stroke="#CF8481" stroke-width="2" fill="none"/>
      <path d="M 30,24 Q 16,48 5,60" stroke="#CF8481" stroke-width="2" fill="none"/>
    `
  },
  // 19. non_quai_thao
  {
    id: 'non_quai_thao',
    title: 'Nón Quai Thao Kinh Bắc',
    colorHex: '#FDE68A',
    svg: `
      <!-- Large Circular Flat Hat with Flowing Silk Ribbon Ties -->
      <ellipse cx="0" cy="-5" rx="55" ry="24" fill="#FDE68A" stroke="#C5A059" stroke-width="1.4"/>
      <ellipse cx="0" cy="-8" rx="20" ry="10" fill="#EAB308" stroke="#A16207" stroke-width="1"/>
      <!-- Multicolored Silk Ribbons (Quai Thao) -->
      <path d="M -25,5 C -28,25 -22,48 -25,62" stroke="#8B2624" stroke-width="3" fill="none"/>
      <path d="M -22,5 C -25,25 -19,48 -22,62" stroke="#C5A059" stroke-width="2" fill="none"/>
      <path d="M 25,5 C 28,25 22,48 25,62" stroke="#8B2624" stroke-width="3" fill="none"/>
      <path d="M 22,5 C 25,25 19,48 22,62" stroke="#C5A059" stroke-width="2" fill="none"/>
    `
  },
  // 20. tram_cai_hoa_mai
  {
    id: 'tram_cai_hoa_mai',
    title: 'Trâm Cài Hoa Mai',
    colorHex: '#FAF6F0',
    svg: `
      <!-- Gilded Hairpin with 5-Petal Blossom and Pearl Drop -->
      <line x1="-25" y1="35" x2="25" y2="-30" stroke="url(#gold_tram_cai_hoa_mai)" stroke-width="3" stroke-linecap="round"/>
      <g transform="translate(25, -30)">
        <circle cx="0" cy="0" r="14" fill="url(#gold_tram_cai_hoa_mai)"/>
        <circle cx="0" cy="0" r="5" fill="#FAF6F0"/>
        <!-- Dangling Pearl Drops -->
        <line x1="0" y1="14" x2="0" y2="28" stroke="url(#gold_tram_cai_hoa_mai)" stroke-width="1.2"/>
        <circle cx="0" cy="30" r="3.2" fill="#FAF6F0" stroke="#C5B8A5" stroke-width="0.8"/>
      </g>
    `
  },
  // 21. kieng_bac_lotus
  {
    id: 'kieng_bac_lotus',
    title: 'Kiềng Bạc Chạm Sen',
    colorHex: '#FAF6F0',
    svg: `
      <!-- Rigid Solid Silver Torque Choker with Engraved Lotus -->
      <circle cx="0" cy="0" r="38" fill="none" stroke="#E2E8F0" stroke-width="7"/>
      <circle cx="0" cy="0" r="38" fill="none" stroke="#94A3B8" stroke-width="1"/>
      <path d="M -8,38 Q 0,35 8,38" stroke="#64748B" stroke-width="2" fill="none"/>
      <!-- Engraved Lotus Petals Accent -->
      <path d="M -6,-36 Q 0,-44 6,-36 Q 0,-28 -6,-36 Z" fill="#64748B"/>
    `
  },
  // 22. pearl_necklace_phuquoc
  {
    id: 'pearl_necklace_phuquoc',
    title: 'Chuỗi Ngọc Trai Phú Quốc',
    colorHex: '#FAF6F0',
    svg: `
      <!-- Double Strand of Lustrous Saltwater Pearls -->
      <path d="M -35,-20 C -38,15 38,15 35,-20" stroke="#FAF6F0" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M -30,-20 C -32,25 32,25 30,-20" stroke="#FAF6F0" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M -35,-20 C -38,15 38,15 35,-20" stroke="#D1C7BA" stroke-width="1" stroke-dasharray="2,3" fill="none"/>
    `
  },
  // 23. khan_ran_nam_bo
  {
    id: 'khan_ran_nam_bo',
    title: 'Khăn Rằn Nam Bộ',
    colorHex: '#2C221E',
    svg: `
      <!-- Checkered Cotton Scarf Folded with Fringed Hem -->
      <rect x="-35" y="-35" width="70" height="70" rx="4" fill="#FAF6F0" stroke="#2C221E" stroke-width="1.2"/>
      <!-- Checkerboard Pattern -->
      ${[-35, -21, -7, 7, 21].map(x => 
        [-35, -21, -7, 7, 21].map(y => 
          ((x + y) / 14 % 2 === 0) ? `<rect x="${x}" y="${y}" width="14" height="14" fill="#2C221E"/>` : ''
        ).join('')
      ).join('')}
    `
  },
  // 24. guoc_moc_sen
  {
    id: 'guoc_moc_sen',
    title: 'Guốc Mộc Hoa Sen',
    colorHex: '#6E3C29',
    svg: `
      <!-- Carved Wooden Clog with Red Velvet Strap -->
      <g transform="translate(0, 0)">
        <path d="M -40,-8 C -15,-12 15,-10 35,-4 C 40,-2 40,12 35,14 C 20,18 -20,18 -35,14 C -42,10 -42,-4 -40,-8 Z" fill="#8C5338" stroke="#6B3A22" stroke-width="1.2"/>
        <polygon points="-32,12 -15,12 -18,32 -34,32" fill="#6B3A22"/>
        <polygon points="12,12 28,12 25,32 9,32" fill="#6B3A22"/>
        <!-- Red Velvet Strap -->
        <path d="M -12,-10 Q 5,-36 20,-6" stroke="#8B2624" stroke-width="8" stroke-linecap="round" fill="none"/>
        <path d="M -12,-10 Q 5,-36 20,-6" stroke="#A52A2A" stroke-width="4" stroke-linecap="round" fill="none"/>
      </g>
    `
  },
  // 25. hai_nhung_theu_gold
  {
    id: 'hai_nhung_theu_gold',
    title: 'Hài Nhung Thêu Chỉ Vàng',
    colorHex: '#8B2624',
    svg: `
      <!-- Curved Pointed Court Velvet Slipper -->
      <path d="M -36,-10 C -15,-14 20,-10 36,4 C 42,10 38,18 34,18 C 15,18 -20,18 -34,14 C -38,10 -38,-4 -36,-10 Z" fill="#8B2624" stroke="#681816" stroke-width="1.2"/>
      <path d="M 32,4 Q 42,-8 36,-14 Q 30,-10 28,0" fill="url(#gold_hai_nhung_theu_gold)"/>
      <circle cx="0" cy="2" r="3" fill="url(#gold_hai_nhung_theu_gold)"/>
      <path d="M -12,2 Q 0,-6 12,2" stroke="url(#gold_hai_nhung_theu_gold)" stroke-width="1.4" fill="none"/>
    `
  },
  // 26. modern_leather_loafers
  {
    id: 'modern_leather_loafers',
    title: 'Giày Loafer Da Bóng',
    colorHex: '#2C221E',
    svg: `
      <!-- Modern Polished Chunky Platform Loafer -->
      <path d="M -38,-8 C -15,-12 20,-10 36,0 C 40,4 38,16 34,16 C 15,16 -20,16 -34,14 C -38,10 -38,-4 -38,-8 Z" fill="#1C1816"/>
      <!-- Platform Lug Sole -->
      <rect x="-36" y="14" width="70" height="12" rx="3" fill="#2C221E"/>
      <line x1="-24" y1="26" x2="-24" y2="20" stroke="#1A1513" stroke-width="2"/>
      <line x1="-8" y1="26" x2="-8" y2="20" stroke="#1A1513" stroke-width="2"/>
      <line x1="8" y1="26" x2="8" y2="20" stroke="#1A1513" stroke-width="2"/>
      <line x1="24" y1="26" x2="24" y2="20" stroke="#1A1513" stroke-width="2"/>
      <!-- Front Penny Strap -->
      <rect x="0" y="-8" width="16" height="5" fill="#3D3531" rx="1"/>
    `
  },
  // 27. quat_lua_hac
  {
    id: 'quat_lua_hac',
    title: 'Quạt Lụa Thêu Hạc',
    colorHex: '#FAF6F0',
    svg: `
      <!-- Translucent Silk Round Fan with Bamboo Handle -->
      <line x1="0" y1="15" x2="0" y2="52" stroke="#6E3C29" stroke-width="4" stroke-linecap="round"/>
      <circle cx="0" cy="-8" r="32" fill="#FAF6F0" stroke="#C5A059" stroke-width="2"/>
      <!-- Flying Crane Motif -->
      <path d="M -12,-8 Q 0,-18 12,-8 Q 0,-2 -12,-8 Z" fill="#1E2C3D"/>
      <circle cx="12" cy="-8" r="2" fill="#8B2624"/>
      <path d="M -4,-12 L 0,-22 L 4,-12" stroke="#1E2C3D" stroke-width="1.2" fill="none"/>
    `
  },
  // 28. tui_coi_lotus
  {
    id: 'tui_coi_lotus',
    title: 'Túi Cói Thêu Sen',
    colorHex: '#C5A059',
    svg: `
      <!-- Circular Seagrass Handbag with Handles and Embroidered Lotus -->
      <circle cx="0" cy="10" r="28" fill="#C5A059" stroke="#9A7836" stroke-width="2"/>
      <path d="M -12,-10 C -12,-26 12,-26 12,-10" stroke="#6E3C29" stroke-width="3.5" fill="none"/>
      <!-- Embroidered Pink Lotus -->
      <path d="M 0,2 C -6,12 -3,22 0,24 C 3,22 6,12 0,2 Z" fill="#CF8481"/>
      <path d="M -5,6 C -12,14 -10,22 -6,24 C -2,20 -4,12 -5,6 Z" fill="#E28F95"/>
      <path d="M 5,6 C 12,14 10,22 6,24 C 2,20 4,12 5,6 Z" fill="#E28F95"/>
    `
  },
  // 29. nhanh_sen_ngoc
  {
    id: 'nhanh_sen_ngoc',
    title: 'Cành Sen Hồ Tây',
    colorHex: '#CF8481',
    svg: `
      <!-- Fresh Lotus Blossom, Bud and Stem -->
      <path d="M -2,10 L -4,55" stroke="#2D5A47" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M 8,15 L 6,52" stroke="#234B3A" stroke-width="3" stroke-linecap="round"/>
      <!-- Broad Lotus Leaf -->
      <path d="M -25,25 C -35,15 -25,5 -10,12 C -6,22 -15,26 -25,25 Z" fill="#24553F"/>
      <!-- Lotus Flower Bud -->
      <g transform="translate(0, -5)">
        <path d="M -8,12 C -18,-5 -6,-22 4,-26 C 14,-22 26,-5 16,12 Z" fill="#FAF6F0" stroke="#CF8481" stroke-width="1.2"/>
        <path d="M 4,-20 Q 4,-5 4,10" stroke="#CF8481" stroke-width="1.5" fill="none"/>
        <path d="M -2,-12 Q -6,0 -4,8" stroke="#E28F95" stroke-width="1.2" fill="none"/>
        <path d="M 10,-12 Q 14,0 12,8" stroke="#E28F95" stroke-width="1.2" fill="none"/>
      </g>
    `
  }
];

items.forEach(item => {
  const content = wrapCard(item.id, item.title, item.colorHex, item.svg);
  fs.writeFileSync(path.join(thumbnailsDir, `${item.id}.svg`), content);
});

console.log(`Generated ${items.length} garment thumbnail SVGs.`);

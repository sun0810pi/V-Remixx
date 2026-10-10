export interface HistoricalPeriod {
  id: string;
  eraName: string;
  vietnameseEra: string;
  timeframe: string;
  keyGarments: string[];
  description: string;
  silhouetteHighlights: string;
  historicalSignificance: string;
  reliableSources: string[];
}

export interface GarmentAnatomyPart {
  partName: string;
  vietnameseTerm: string;
  functionAndMeaning: string;
  designEvolution: string;
}

export const VIETNAMESE_FASHION_CHRONOLOGY: HistoricalPeriod[] = [
  {
    id: 'ly_tran',
    eraName: 'Lý - Trần Dynasties',
    vietnameseEra: 'Thời Kỳ Lý - Trần (Đại Việt)',
    timeframe: '1009 – 1400',
    keyGarments: ['Áo Giao Lĩnh (Cross-collar)', 'Áo Viên Lĩnh (Round collar)', 'Thắt Lưng Lụa (Silk sashes)'],
    description: 'During the golden age of Buddhist Đại Việt, clothing combined East Asian cross-collar silhouettes with indigenous tropical flair, lotus embroidery, and flowing sashes.',
    silhouetteHighlights: 'Generous draped robes with wide sleeves, layered lapels right-over-left, and loose waist ties.',
    historicalSignificance: 'Established independent Đại Việt court dress distinct from imperial Chinese courts, embracing Buddhism and native symbolism.',
    reliableSources: ['Đại Việt Sử Ký Toàn Thư', 'Trần Quang Đức, "Ngàn Năm Áo Mũ" (2013)'],
  },
  {
    id: 'le_dynasty',
    eraName: 'Lê Dynasty',
    vietnameseEra: 'Thời Kỳ Hậu Lê & Lê Trung Hưng',
    timeframe: '1428 – 1789',
    keyGarments: ['Áo Giao Lĩnh', 'Áo Đối Khâm (Open silk robe)', 'Áo Cánh & Yếm'],
    description: 'The Confucian state codified court ranks and civilian dress. Women of the gentry favored layered translucent robes over colorful silk under-bodices.',
    silhouetteHighlights: 'Floor-length sweeping skirts (Váy), high sashes, and intricate gold-embroidered collars.',
    historicalSignificance: 'Produced the most diverse and documented textile heritage of pre-modern Vietnam, preserved in temple statues across the Red River Delta.',
    reliableSources: ['Bản rập bia đá & tượng chùa thời Lê', 'Viện Nghiên cứu Hán Nôm'],
  },
  {
    id: 'nguyen_court',
    eraName: 'Nguyễn Dynasty',
    vietnameseEra: 'Triều Nguyễn & Kinh Đô Huế',
    timeframe: '1802 – 1945',
    keyGarments: ['Áo Ngũ Thân Tay Chẽn', 'Áo Tấc (Áo thụng)', 'Áo Nhật Bình', 'Khăn Đóng / Khăn Xếp'],
    description: 'Lord Nguyễn Phúc Khoát and later Emperor Minh Mạng unified national clothing across both North and South, establishing the five-panel robe (Áo Ngũ Thân) and trousers (quần) as mandatory attire.',
    silhouetteHighlights: 'Standing collars (cổ đứng 2-3cm), five buttons symbolizing the five virtues, five panels of fabric sewn with meticulous flat-felled seams.',
    historicalSignificance: 'The direct genetic ancestor of the modern Áo Dài, crystallizing Vietnamese civil and ritual dignity.',
    reliableSources: ['Khâm Định Đại Nam Hội Điển Sự Lệ', 'Trung Tâm Bảo Tồn Di Tích Cố Đô Huế'],
  },
  {
    id: 'folk_roots',
    eraName: 'Regional Folk Heritage',
    vietnameseEra: 'Văn Hóa Dân Gian Bắc - Trung - Nam',
    timeframe: 'Centuries of Agrarian Living',
    keyGarments: ['Áo Tứ Thân (Four-panel)', 'Áo Yếm', 'Nón Quai Thao', 'Áo Bà Ba', 'Khăn Rằn', 'Nón Lá'],
    description: 'Practical, poetic folk garments suited to the river deltas and seasonal agriculture of Vietnam, immortalized in Quan Họ singing and Southern ca dao poetry.',
    silhouetteHighlights: 'Tied front flaps, open necklines, bare shoulders with Yếm, loose comfortable side slits.',
    historicalSignificance: 'Celebrates resilience, feminine labor, mother goddess worship (Đạo Mẫu), and intimate harmony with water and nature.',
    reliableSources: ['Bảo Tàng Dân Tộc Học Việt Nam', 'Viện Văn Hóa Nghệ Thuật Quốc Gia'],
  },
  {
    id: 'modern_national',
    eraName: 'Modern Áo Dài Revival',
    vietnameseEra: 'Thời Kỳ Đổi Mới Của Áo Dài Lemur & Lê Phổ',
    timeframe: '1930s – 1980s',
    keyGarments: ['Áo Dài Lemur Cát Tường', 'Áo Dài Lê Phổ', 'Áo Dài Raglan (1960s)'],
    description: 'Indochine fine arts graduates simplified the five-panel robe into two long front and back panels, sculpting the waistline and standardizing raglan diagonal sleeve seams.',
    silhouetteHighlights: 'Fitted waist, floor-grazing panels, standing collar, paired with long billowing silk trousers.',
    historicalSignificance: 'Recognized globally as Vietnam’s official national costume (Quốc Phục).',
    reliableSources: ['Tạp chí Ngày Nay (1934-1935)', 'Lịch Sử Mỹ Thuật Hiện Đại Việt Nam'],
  },
  {
    id: 'contemporary_remix',
    eraName: '21st Century High-Fashion Remix',
    vietnameseEra: 'Phong Trào Cách Tân & Sáng Tạo Đương Đại',
    timeframe: '2010s – Present',
    keyGarments: ['Áo Dài Cách Tân', 'Yếm Hiện Đại với Denim', 'Organza Áo Nhật Bình', 'Streetwear Fusion'],
    description: 'A vibrant renaissance among Vietnamese youth and independent designers who reappropriate imperial silhouettes, hand-embroidery, and folk textiles into everyday urban style.',
    silhouetteHighlights: 'Midi lengths, puff sleeves, mixed fabrics (denim, linen, velvet, organza), and bold modern accessorizing.',
    historicalSignificance: 'Proves that traditional culture is a living, breathing creative playground rather than a frozen artifact.',
    reliableSources: ['Vietnam International Fashion Week Archives', 'Elle Vietnam Fashion Reviews'],
  },
];

export const AO_DAI_ANATOMY: GarmentAnatomyPart[] = [
  {
    partName: 'Standing Collar',
    vietnameseTerm: 'Cổ Áo (Cổ Đứng / Cổ Tàu)',
    functionAndMeaning: 'Originally 2–4cm tall in Áo Ngũ Thân to keep posture upright, representing modest decorum and restraint. Modern variants also feature boat necks, sweetheart, or round collars.',
    designEvolution: 'From high Mandarin collar to modern breezy collarless and square necklines in contemporary remix.',
  },
  {
    partName: 'Front & Back Panels',
    vietnameseTerm: 'Thân & Tà Áo (Tà Trước / Tà Sau)',
    functionAndMeaning: 'Two long panels extending from the waist down to the calf or ankle that float with the wearer’s stride, creating the iconic "breeze of Vietnamese silk".',
    designEvolution: 'In Áo Ngũ Thân, there were five pieces of cloth. The 1930s modernization unified them into two fluid flowing panels.',
  },
  {
    partName: 'Side Slits',
    vietnameseTerm: 'Xẻ Tà (Đường Xẻ Hông)',
    functionAndMeaning: 'Slits extending up to the waistline that offer effortless mobility while walking or riding bicycles, revealing glimpses of the waist sash and trousers.',
    designEvolution: 'Deepened slightly in the 1960s Saigon style to accentuate the waistline.',
  },
  {
    partName: 'Raglan Diagonal Sleeve Seam',
    vietnameseTerm: 'Đường May Tay Raglan',
    functionAndMeaning: 'Introduced by Dung Tailors in Saigon in 1960, diagonal seams from collar to armpit eliminate unsightly fabric wrinkling across the chest.',
    designEvolution: 'Transformed Áo Dài from loose fitting to smooth, sculpted perfection.',
  },
  {
    partName: 'Fasteners & Buttons',
    vietnameseTerm: 'Cúc Bấm & Khuy Áo',
    functionAndMeaning: 'Traditionally 5 round buttons (representing Nhân, Lễ, Nghĩa, Trí, Tín) along the right shoulder and torso. Modern dresses often use hidden metal snaps or zippers.',
    designEvolution: 'From handcrafted cloth and jade toggles to invisible side zippers.',
  },
  {
    partName: 'Flowing Silk Pants',
    vietnameseTerm: 'Quần Lụa Ống Rộng',
    functionAndMeaning: 'Generously cut wide-leg trousers worn underneath, ensuring complete modesty while amplifying the airy movement of the panels.',
    designEvolution: 'Shifted from black silk (traditional) to white silk (popularized by student uniforms) and vibrant complementary colors.',
  },
];

export const CULTURAL_ETIQUETTE_GUIDE = [
  {
    occasion: 'Tết Nguyên Đán (Lunar New Year)',
    recommendations: 'Wear bright, joyful colors like Crimson Red (Đỏ Son), Imperial Gold (Vàng), or Lotus Pink (Hồng). Pair with comfortable clogs or embroidered slippers for visiting family and ancestral altars.',
    avoidances: 'Avoid somber all-black mourning tones or overly provocative bare-midriff cuts when greeting elders.',
  },
  {
    occasion: 'Lễ Vu Quy & Cưới Hỏi (Weddings)',
    recommendations: 'Áo Dài or Áo Nhật Bình paired with Khăn Đóng or Mấn Nhung. Bride traditionally wears Red or Ivory with intricate phoenix/dragon or lotus embroidery.',
    avoidances: 'Guests should avoid wearing pure bridal white or overshadowing the bride’s royal red ensemble.',
  },
  {
    occasion: 'Đi Chùa & Không Gian Tâm Linh (Temples & Pagodas)',
    recommendations: 'Prioritize modesty and reverence. Covered shoulders, high neckline, dignified long trousers. Earthy, serene tones like Indigo (Chàm), Chestnut Brown (Nâu Sồng), or Ivory.',
    avoidances: 'Never wear bare-shoulder Yếm alone or transparent fabrics without modest inner slips.',
  },
  {
    occasion: 'Dạo Phố & Sự Kiện Nghệ Thuật (Streetwear & Creative Gala)',
    recommendations: 'Freedom to remix! Layer Áo Yếm over high-waist denim, drape an Áo Khoác Đối Khâm as a sheer kimono coat, or pair a modern Midi Áo Dài with chunky platform loafers.',
    avoidances: 'Own your creative statement with knowledge of the historical pieces you are transforming.',
  },
];

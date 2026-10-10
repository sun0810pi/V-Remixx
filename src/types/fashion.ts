export type GarmentCategory =
  | 'tunic'       // Main tops: Áo Dài, Áo Ngũ Thân, Áo Tấc, Áo Giao Lĩnh, Áo Bà Ba, Áo Tứ Thân
  | 'inner'       // Inner garments: Yếm, Áo Cánh trắng, Camisole
  | 'bottom'      // Bottoms: Quần lụa, Váy đụp, Culottes, Fusion trousers
  | 'outerwear'   // Outer layer: Áo Nhật Bình khoác, Áo đối khâm, Khăn choàng tơ
  | 'headwear'    // Head: Khăn Đóng, Mấn nhung, Nón Lá, Nón Quai Thao, Trâm cài
  | 'jewelry'     // Accessories: Kiềng bạc, Vòng ngọc bích, Chuỗi ngọc trai, Khăn rằn
  | 'footwear'    // Shoes: Guốc mộc, Hài thêu, Loafer fusion, Sandal quai mảnh
  | 'handheld';   // Props: Quạt lụa thêu hạc, Túi cói, Nhánh sen hồng

export type HistoricalEra =
  | 'ly_tran'      // Lý - Trần Dynasties (1009–1400)
  | 'le_dynasty'   // Early & Later Lê Dynasties (1428–1789)
  | 'nguyen_court' // Nguyễn Dynasty Court & Hue (1802–1945)
  | 'folk_tradition' // Northern/Southern folk traditions (Bắc Bộ & Nam Bộ)
  | 'modern_revival' // 20th Century / Lemur Áo Dài / Chiêu Áo Dài
  | 'contemporary_remix'; // 21st Century high fashion remix & streetwear

export type OccasionType =
  | 'tet_celebration'  // Tết Nguyên Đán & Lunar New Year
  | 'wedding_ceremony' // Lễ Vu Quy & Ăn Hỏi (Hỷ sự)
  | 'royal_court'      // Cung đình & Traditional reenactment
  | 'temple_sacred'    // Đi Lễ Chùa & Sacred grounds
  | 'street_chic'      // Dạo phố, Cafe & Contemporary urban
  | 'runway_editorial' // Sàn diễn thời trang & Editorial shoot
  | 'festive';         // Lễ hội truyền thống & dân gian

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  culturalMeaning?: string;
}

export interface GarmentItem {
  id: string;
  name: string;
  vietnameseName: string;
  category: GarmentCategory;
  era: HistoricalEra;
  occasions: OccasionType[];
  description: string;
  culturalHistory: string;
  citations?: string[];
  defaultColorHex: string;
  colorPalette: ColorOption[];
  tags: string[];
  // SVG silhouette representation key or rendering details
  renderKey: string;
  // Visual layer order relative to others (higher numbers render on top)
  zIndex: number;
  genderSupport?: 'female' | 'male' | 'unisex';
  pattern?: 'lotus' | 'cloud' | 'dragon_phoenix' | 'checker' | 'plain' | 'brocade';
  fabricType?: string;
  thumbnailUrl?: string;
  renderAssetUrl?: string;
}

export interface AvatarConfig {
  gender: 'female' | 'male';
  skinTone: string; // hex
  hairStyle: 'high_bun' | 'flowing_straight' | 'braided_updo' | 'short_bob' | 'traditional_topknot';
  hairColor: string;
  expression: 'graceful' | 'smiling' | 'composed';
  backdrop: 'hue_palace' | 'hoian_lantern' | 'hanoi_lotus' | 'minimalist_runway' | 'bamboo_grove';
}

export interface OutfitState {
  id?: string;
  title?: string;
  avatar: AvatarConfig;
  tryOnMode: 'avatar' | 'photo';
  userPhotoUrl?: string | null;
  photoScale?: number;
  photoOffset?: { x: number; y: number };
  // Mapping of category to selected garment ID (or null if empty)
  selectedGarments: {
    tunic: string | null;
    inner: string | null;
    bottom: string | null;
    outerwear: string | null;
    headwear: string | null;
    jewelry: string | null;
    footwear: string | null;
    handheld: string | null;
  };
  // Custom colors chosen for garments
  garmentColors: Record<string, string>; // garmentId -> hex
  theme: OccasionType;
  styleMode: 'traditional_pure' | 'contemporary_remix';
}

export interface CulturalCheckResult {
  status: 'appropriate' | 'needs_review' | 'insufficient_evidence';
  title: string;
  whatWasChecked: string;
  issueIdentified?: string;
  whyItMatters: string;
  recommendation: string;
  historicalCitation?: string;
  autoFixAction?: {
    category: GarmentCategory;
    targetGarmentId: string | null;
    label: string;
  };
}

export interface CulturalReviewSummary {
  overallStatus: 'appropriate' | 'needs_review' | 'insufficient_evidence';
  score: number; // 0 - 100
  summary: string;
  checks: CulturalCheckResult[];
  eraComposition: { era: HistoricalEra; count: number; name: string }[];
  isHarmoniousRemix: boolean;
  aiCommentary?: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  createdAt: string;
  outfit: OutfitState;
  culturalReview: CulturalReviewSummary;
  thumbnailSvg?: string;
  notes?: string;
}

export interface AIOutfitConcept {
  conceptId: string;
  conceptTitle: string;
  vietnameseTitle: string;
  narrativeDescription: string;
  styleVibe: string;
  garmentIds: {
    tunic?: string;
    inner?: string;
    bottom?: string;
    outerwear?: string;
    headwear?: string;
    jewelry?: string;
    footwear?: string;
    handheld?: string;
  };
  colorSuggestions: Record<string, string>;
  culturalRationale: string;
}

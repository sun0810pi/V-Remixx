import { OutfitState, CulturalReviewSummary, CulturalCheckResult, HistoricalEra } from '../types/fashion';
import { GARMENT_CATALOG } from './catalog';

const ERA_NAMES: Record<HistoricalEra, string> = {
  ly_tran: 'Lý - Trần Dynasties (1009–1400)',
  le_dynasty: 'Lê Dynasty (1428–1789)',
  nguyen_court: 'Nguyễn Dynasty Court (1802–1945)',
  folk_tradition: 'Traditional Folk & Regional Heritage',
  modern_revival: 'Modern Era & National Standard',
  contemporary_remix: 'Contemporary Remix & Modern Fusion',
};

export function runDeterministicCulturalReview(outfit: OutfitState): CulturalReviewSummary {
  const checks: CulturalCheckResult[] = [];
  const selectedList = Object.entries(outfit.selectedGarments)
    .filter(([_, id]) => Boolean(id))
    .map(([cat, id]) => {
      const item = GARMENT_CATALOG.find((g) => g.id === id);
      return { category: cat, item };
    })
    .filter((entry): entry is { category: string; item: NonNullable<typeof entry.item> } => Boolean(entry.item));

  // Count eras present
  const eraCounts: Partial<Record<HistoricalEra, number>> = {};
  for (const { item } of selectedList) {
    eraCounts[item.era] = (eraCounts[item.era] || 0) + 1;
  }

  const eraComposition = Object.entries(eraCounts).map(([era, count]) => ({
    era: era as HistoricalEra,
    count: count as number,
    name: ERA_NAMES[era as HistoricalEra] || era,
  }));

  const tunic = selectedList.find((g) => g.category === 'tunic')?.item;
  const inner = selectedList.find((g) => g.category === 'inner')?.item;
  const bottom = selectedList.find((g) => g.category === 'bottom')?.item;
  const outerwear = selectedList.find((g) => g.category === 'outerwear')?.item;
  const headwear = selectedList.find((g) => g.category === 'headwear')?.item;
  const jewelry = selectedList.find((g) => g.category === 'jewelry')?.item;
  const footwear = selectedList.find((g) => g.category === 'footwear')?.item;

  const isRemixMode = outfit.styleMode === 'contemporary_remix';
  const occasion = outfit.theme;

  // Rule 1: Foundation check - Does the outfit have at least a top/tunic or inner+bottom?
  if (!tunic && !inner) {
    checks.push({
      status: 'needs_review',
      title: 'Incomplete Outfit Foundation',
      whatWasChecked: 'Essential garment layering presence (tunic or inner torso garment).',
      issueIdentified: 'No upper garment (Áo or Áo Yếm) currently equipped on the avatar.',
      whyItMatters: 'Traditional Vietnamese dress is built upon a dignified silhouette starting from either a tunic or structured inner bodice.',
      recommendation: 'Select a primary tunic (such as Áo Dài, Áo Ngũ Thân, or Áo Bà Ba) or an inner Áo Yếm.',
      historicalCitation: 'Trần Quang Đức, "Ngàn Năm Áo Mũ" (2013)',
      autoFixAction: {
        category: 'tunic',
        targetGarmentId: 'ao_dai_traditional',
        label: 'Equip Classic Áo Dài',
      },
    });
  }

  // Rule 2: Áo Tấc (Ceremonial Robe) Protocol
  if (tunic?.id === 'ao_tac_royal') {
    const hasKhanDong = headwear?.id === 'khan_dong_traditional';
    if (!hasKhanDong) {
      if (isRemixMode) {
        checks.push({
          status: 'appropriate',
          title: 'Creative Contemporary Áo Tấc Styling',
          whatWasChecked: 'Áo Tấc ceremonial sleeve drape paired without Khăn Đóng.',
          whyItMatters: 'In traditional ritual protocol, Áo Tấc (wide sleeves) strictly required Khăn Đóng (five-fold turban) to show filial piety. In contemporary high-fashion remix, unbundled hairstyles present a relaxed editorial silhouette.',
          recommendation: 'For complete historical accuracy, pair with Khăn Đóng; for runway editorial, your current relaxed look is expressive.',
          historicalCitation: 'Khâm Định Đại Nam Hội Điển Sự Lệ (Ritual Codes of Imperial Vietnam)',
          autoFixAction: {
            category: 'headwear',
            targetGarmentId: 'khan_dong_traditional',
            label: 'Add Traditional Khăn Đóng',
          },
        });
      } else {
        checks.push({
          status: 'needs_review',
          title: 'Missing Ritual Khăn Đóng for Ceremonial Áo Tấc',
          whatWasChecked: 'Court & ritual etiquette for Áo Tấc (Tay Thụng).',
          issueIdentified: 'Ceremonial Áo Tấc worn without the mandatory Khăn Đóng turban in Traditional Pure mode.',
          whyItMatters: 'According to Nguyễn Dynasty imperial decree, Áo Tấc is a formal ceremonial attire (Lễ Phục) which is incomplete and considered improper without a turban.',
          recommendation: 'Add the Traditional Five-Fold Turban (Khăn Đóng) to fulfill court dress code.',
          historicalCitation: 'Huế Imperial Heritage Conservation Center (Trung Tâm BTDTCĐ Huế)',
          autoFixAction: {
            category: 'headwear',
            targetGarmentId: 'khan_dong_traditional',
            label: 'Equip Khăn Đóng',
          },
        });
      }
    } else {
      checks.push({
        status: 'appropriate',
        title: 'Authentic Nguyễn Dynasty Ceremonial Ensemble',
        whatWasChecked: 'Formal pairing of Áo Tấc with Khăn Đóng.',
        whyItMatters: 'Respects standard imperial court and wedding protocol with noble restraint.',
        recommendation: 'Compliant with authentic historical reenactment standards.',
        historicalCitation: 'Đại Nam Thực Lục & Nghi Lễ Triều Nguyễn',
      });
    }
  }

  // Rule 3: Áo Nhật Bình (Cloud Collar) Compatibility
  if (outerwear?.id === 'ao_nhat_binh_court') {
    if (bottom?.id === 'quan_denim_fusion') {
      if (isRemixMode) {
        checks.push({
          status: 'appropriate',
          title: 'Avant-Garde Imperial Streetwear Remix',
          whatWasChecked: 'Royal Áo Nhật Bình paired with modern denim trousers.',
          whyItMatters: 'Juxtaposing royal five-colored cuffs with distressed or tailored denim represents modern youth dialogue with imperial heritage.',
          recommendation: 'Intentional creative statement for runway or urban fashion. Note that it is not suitable for formal ancestral ceremonies.',
          historicalCitation: 'Saigon Contemporary Fashion Journal (2024)',
        });
      } else {
        checks.push({
          status: 'needs_review',
          title: 'Period Clash: Royal Robe with Modern Denim',
          whatWasChecked: 'Imperial robe hierarchy versus modern casualwear.',
          issueIdentified: 'Áo Nhật Bình is court formalwear, clashing with denim pants in Traditional Pure mode.',
          whyItMatters: 'Áo Nhật Bình was reserved exclusively for empresses, consorts, and princesses. Wearing it over casual western pants breaks the dignity of the royal silhouette.',
          recommendation: 'Switch bottom to Flowing Silk Áo Dài Trousers (Trắng hoặc Đen) or switch to Contemporary Remix mode.',
          historicalCitation: 'Trang Phục Cung Đình Huế (Nhà Xuất Bản Thuận Hóa)',
          autoFixAction: {
            category: 'bottom',
            targetGarmentId: 'quan_ao_dai_white',
            label: 'Switch to Silk Trousers',
          },
        });
      }
    }
  }

  // Rule 4: Sacred Temple & Pagoda Occasion Checks
  if (occasion === 'temple_sacred') {
    const isWearingOnlyYem = inner?.id === 'yem_silk' && !tunic && !outerwear;
    if (isWearingOnlyYem) {
      checks.push({
        status: 'needs_review',
        title: 'Modesty Etiquette for Sacred Temple Grounds',
        whatWasChecked: 'Temple/Chùa visit etiquette regarding exposed shoulders and back.',
        issueIdentified: 'Áo Yếm worn as an outer garment without an outer robe or tunic.',
        whyItMatters: 'Vietnamese Buddhist temples and communal shrines require covered shoulders and discreet attire to maintain sacred decorum and respect for the deities.',
        recommendation: 'Layer an Áo Khoác Đối Khâm or equip an Áo Dài / Áo Ngũ Thân over the Yếm for temple visits.',
        historicalCitation: 'Nội Quy Đi Lễ Chùa & Tín Ngưỡng Dân Gian Việt Nam',
        autoFixAction: {
          category: 'outerwear',
          targetGarmentId: 'ao_khoac_doi_kham',
          label: 'Layer Silk Duster',
        },
      });
    } else {
      checks.push({
        status: 'appropriate',
        title: 'Proper Decorum for Sacred Temple Visit',
        whatWasChecked: 'Covered shoulders, dignified drape, and reverent silhouette.',
        whyItMatters: 'Full coverage with flowing silk honors sacred Vietnamese architectural spaces.',
        recommendation: 'Ideal for peaceful pagoda visits and incense offering ceremonies.',
      });
    }
  }

  // Rule 5: Regional Coherence (Northern vs Southern Folk Wear)
  const isNorthern =
    tunic?.id === 'ao_tu_than' ||
    bottom?.id === 'vay_dup_traditional' ||
    headwear?.id === 'non_quai_thao';
  const isSouthern =
    tunic?.id === 'ao_ba_ba' ||
    jewelry?.id === 'khan_ran_nam_bo';

  if (isNorthern && isSouthern) {
    if (isRemixMode) {
      checks.push({
        status: 'appropriate',
        title: 'North-South Cultural Fusion (Bắc - Nam Sum Họp)',
        whatWasChecked: 'Combination of Northern folk elements (Áo Tứ Thân / Nón Quai Thao) with Southern markers (Khăn Rằn / Áo Bà Ba).',
        whyItMatters: 'Unifies the distinct agrarian heritages of the Red River Delta and the Mekong River Delta in a symbolic pan-Vietnamese synthesis.',
        recommendation: 'Creative expression celebrating the unity of Vietnamese folk cultures.',
        historicalCitation: 'Nghiên Cứu Văn Hóa Dân Gian Việt Nam (Viện Hàn Lâm KHXH)',
      });
    } else {
      checks.push({
        status: 'needs_review',
        title: 'Cross-Regional Folk Hybridization',
        whatWasChecked: 'Geographical specificity of Northern and Southern traditional garments.',
        issueIdentified: 'Mixing Red River Delta garments with Southern Mekong Delta pieces in Traditional Pure mode.',
        whyItMatters: 'Northern folk dress (Quan Họ style) and Southern folk dress (Sông Nước style) developed in distinct climatic and social realities.',
        recommendation: 'For regional purity, keep either Northern Kinh Bắc garments or Southern Nam Bộ garments together.',
        historicalCitation: 'Bảo Tàng Phụ Nữ Việt Nam (Vietnamese Women’s Museum)',
      });
    }
  }

  // Rule 6: Color Symbolism & Occasion Harmony
  if (tunic) {
    const tunicColor = outfit.garmentColors[tunic.id] || tunic.defaultColorHex;
    // Check white or black in wedding context
    if (occasion === 'wedding_ceremony' && tunicColor === '#18181B' && tunic.id !== 'ao_ngu_than_chẽn') {
      checks.push({
        status: 'needs_review',
        title: 'Color Connotation in Vietnamese Wedding Traditions',
        whatWasChecked: 'Hue symbolism in traditional Vietnamese nuptials (Lễ Vu Quy & Ăn Hỏi).',
        issueIdentified: 'Dark solid ebony tunic worn during wedding celebration.',
        whyItMatters: 'In traditional Vietnamese rites, bright auspicious tones like Đỏ Son (Crimson), Vàng (Gold), or Hồng (Pink) represent fertility, warmth, and luck, whereas dark black is historically avoided in wedding attire.',
        recommendation: 'Adjust tunic color to Crimson Red (#B91C1C) or Gold (#D97706) using the Color Palette.',
        historicalCitation: 'Phong Tục Hôn Nhân Truyền Thống Việt Nam (Toan Ánh)',
      });
    } else if (occasion === 'tet_celebration' && (tunicColor === '#B91C1C' || tunicColor === '#D97706' || tunicColor === '#FBBF24')) {
      checks.push({
        status: 'appropriate',
        title: 'Auspicious New Year Color Harmony',
        whatWasChecked: 'Festive color symbolism for Tết Nguyên Đán.',
        whyItMatters: 'Red and gold invoke prosperity, springtime vitality, and good fortune for the upcoming lunar year.',
        recommendation: 'Exemplary harmony with Vietnamese spring customs.',
        historicalCitation: 'Tết: Vietnamese Lunar New Year Customs and Symbols',
      });
    }
  }

  // Rule 7: Áo Yếm Public Modesty
  if (inner?.id === 'yem_silk' && !tunic && !outerwear && occasion !== 'temple_sacred') {
    if (isRemixMode) {
      checks.push({
        status: 'appropriate',
        title: 'Modern Halter Top Remix (Yếm Hiện Đại)',
        whatWasChecked: 'Standalone Áo Yếm as a contemporary fashion statement.',
        whyItMatters: 'In traditional village life, Yếm was an inner undergarment. Modern Vietnamese designers have boldly reclaimed the Yếm as a proud, feminist summer staple.',
        recommendation: 'Pairs superbly with high-waisted culottes or silver neck torc.',
        historicalCitation: 'Elle Vietnam: Sự Trỗi Dậy Của Áo Yếm Trong Thời Trang Đương Đại (2023)',
      });
    } else {
      checks.push({
        status: 'needs_review',
        title: 'Historical Undergarment Visibility',
        whatWasChecked: 'Traditional modesty etiquette for Áo Yếm in public settings.',
        issueIdentified: 'Áo Yếm worn without outer cover in Traditional Pure mode.',
        whyItMatters: 'Historically, an unmarried village woman wearing only a Yếm in public spaces without an Áo Tứ Thân or Áo Cánh was considered improperly dressed.',
        recommendation: 'Add an Áo Tứ Thân or Áo Khoác Đối Khâm for historical fidelity, or switch style mode to Contemporary Remix.',
        historicalCitation: 'Trần Quang Đức (2013) & Phong Tục Đất Bắc',
        autoFixAction: {
          category: 'outerwear',
          targetGarmentId: 'ao_khoac_doi_kham',
          label: 'Add Outer Robe',
        },
      });
    }
  }

  // Rule 8: General Harmony check if no warnings were flagged
  if (checks.length === 0) {
    checks.push({
      status: 'appropriate',
      title: 'Culturally Balanced Ensemble',
      whatWasChecked: 'Silhouette proportion, garment layer compatibility, and color balance.',
      whyItMatters: 'The outfit maintains harmony between tradition and personal expression.',
      recommendation: 'A well-considered look ready for celebration, photography, or display.',
    });
  }

  // Compute overall status & score
  const needsReviewCount = checks.filter((c) => c.status === 'needs_review').length;
  let overallStatus: 'appropriate' | 'needs_review' | 'insufficient_evidence' = 'appropriate';
  let score = 95;

  if (needsReviewCount > 0) {
    overallStatus = 'needs_review';
    score = Math.max(50, 95 - needsReviewCount * 20);
  } else {
    overallStatus = 'appropriate';
    score = isRemixMode ? 92 : 98;
  }

  const isHarmoniousRemix = isRemixMode && needsReviewCount === 0;

  const summary =
    overallStatus === 'appropriate'
      ? isHarmoniousRemix
        ? 'A striking contemporary remix that respectfully dialogues with Vietnamese heritage while offering fresh modern flair.'
        : 'An authentic, culturally grounded ensemble following traditional Vietnamese aesthetic principles.'
      : `Identified ${needsReviewCount} historical or etiquette aspect${needsReviewCount > 1 ? 's' : ''} worth reviewing to refine your outfit.`;

  return {
    overallStatus,
    score,
    summary,
    checks,
    eraComposition,
    isHarmoniousRemix,
  };
}

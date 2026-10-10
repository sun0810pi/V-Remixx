import React, { useState, useEffect, useCallback } from 'react';
import { OutfitState, AvatarConfig, GarmentCategory, LookbookItem, AIOutfitConcept, OccasionType } from './types/fashion';
import { GARMENT_CATALOG } from './data/catalog';
import { runDeterministicCulturalReview } from './data/culturalRules';
import { WelcomeView } from './components/WelcomeView';
import { StudioView } from './components/StudioView';
import { WardrobeDrawer } from './components/WardrobeDrawer';
import { ColorPalettePicker } from './components/ColorPalettePicker';
import { AIStylistModal } from './components/AIStylistModal';
import { CulturalReviewModal } from './components/CulturalReviewModal';
import { LookbookDrawer } from './components/LookbookDrawer';
import { OutfitComparisonModal } from './components/OutfitComparisonModal';
import { SnapshotModal } from './components/SnapshotModal';
import { HeritageEncyclopedia } from './components/HeritageEncyclopedia';
import { playCelebrationSound, playEquipSound } from './utils/sound';
import confetti from 'canvas-confetti';

// Look 001 · The Modern Classic (Reference 2 Default)
const LOOK_001_TRADITIONAL: OutfitState = {
  avatar: {
    gender: 'female',
    skinTone: '#fed7aa',
    hairStyle: 'flowing_straight',
    hairColor: '#1c1917',
    expression: 'graceful',
    backdrop: 'minimalist_runway',
  },
  tryOnMode: 'avatar',
  userPhotoUrl: null,
  photoScale: 1,
  selectedGarments: {
    tunic: 'ao_dai_traditional',
    inner: null,
    bottom: 'quan_ao_dai_white',
    outerwear: null,
    headwear: 'non_la_hue',
    jewelry: null,
    footwear: 'guoc_moc_sen',
    handheld: 'nhanh_sen_ngoc',
  },
  garmentColors: {
    ao_dai_traditional: '#FAF8F5',
    quan_ao_dai_white: '#FAF8F5',
    non_la_hue: '#EADBCE',
    nhanh_sen_ngoc: '#FAF8F5',
    guoc_moc_sen: '#FFFFFF',
  },
  theme: 'tet_celebration',
  styleMode: 'traditional_pure',
};

// Look 002 · Contemporary Remix (Reference 1 Right Choice)
const LOOK_002_CONTEMPORARY: OutfitState = {
  avatar: {
    gender: 'female',
    skinTone: '#fed7aa',
    hairStyle: 'short_bob',
    hairColor: '#1c1917',
    expression: 'graceful',
    backdrop: 'minimalist_runway',
  },
  tryOnMode: 'avatar',
  userPhotoUrl: null,
  photoScale: 1,
  selectedGarments: {
    tunic: 'ao_dai_cachtan',
    inner: null,
    bottom: 'quan_culottes_modern',
    outerwear: 'ao_doi_kham_voan',
    headwear: null,
    jewelry: 'pearl_necklace_phuquoc',
    footwear: 'modern_leather_loafers',
    handheld: 'tui_coi_lotus',
  },
  garmentColors: {
    ao_dai_cachtan: '#7E2734',
    ao_doi_kham_voan: '#1E4738',
    quan_culottes_modern: '#FAF8F5',
    pearl_necklace_phuquoc: '#FAF8F5',
    modern_leather_loafers: '#18181B',
  },
  theme: 'street_chic',
  styleMode: 'contemporary_remix',
};

const RANDOM_PRESETS: Partial<OutfitState>[] = [
  // 1. Auspicious Crimson Tet
  {
    selectedGarments: {
      tunic: 'ao_dai_traditional',
      inner: null,
      bottom: 'quan_ao_dai_white',
      outerwear: null,
      headwear: 'man_nhung_pearl',
      jewelry: 'kieng_bac_lotus',
      footwear: 'hai_nhung_theu_gold',
      handheld: 'quat_lua_hac',
    },
    garmentColors: {
      ao_dai_traditional: '#8B2624',
      quan_ao_dai_white: '#FAF8F5',
      man_nhung_pearl: '#8B2624',
      kieng_bac_lotus: '#E2E8F0',
      hai_nhung_theu_gold: '#8B2624',
      quat_lua_hac: '#FEF3C7',
    },
    theme: 'tet_celebration',
    styleMode: 'traditional_pure',
  },
  // 2. Imperial Hue Court
  {
    selectedGarments: {
      tunic: 'ao_tac_royal',
      inner: 'ao_canh_inner',
      bottom: 'quan_ao_dai_white',
      outerwear: null,
      headwear: 'khan_dong_traditional',
      jewelry: 'kieng_bac_lotus',
      footwear: 'hai_nhung_theu_gold',
      handheld: 'nhanh_sen_ngoc',
    },
    garmentColors: {
      ao_tac_royal: '#C5A059',
      khan_dong_traditional: '#2C221E',
      quan_ao_dai_white: '#FAF8F5',
      ao_canh_inner: '#FAF8F5',
    },
    theme: 'royal_court',
    styleMode: 'traditional_pure',
  },
  // 3. Northern Folk Quan Ho
  {
    selectedGarments: {
      tunic: 'ao_tu_than',
      inner: 'yem_silk',
      bottom: 'vay_dup_traditional',
      outerwear: null,
      headwear: 'non_quai_thao',
      jewelry: 'kieng_bac_lotus',
      footwear: 'guoc_moc_sen',
      handheld: 'quat_lua_hac',
    },
    garmentColors: {
      ao_tu_than: '#6E3C29',
      yem_silk: '#8B2624',
      vay_dup_traditional: '#2C221E',
      non_quai_thao: '#DF9B38',
    },
    theme: 'festive',
    styleMode: 'traditional_pure',
  },
  // 4. Modern Saigon Street Remix
  {
    selectedGarments: {
      tunic: 'ao_dai_cachtan',
      inner: null,
      bottom: 'quan_culottes_modern',
      outerwear: null,
      headwear: null,
      jewelry: 'pearl_necklace_phuquoc',
      footwear: 'modern_leather_loafers',
      handheld: 'tui_coi_lotus',
    },
    garmentColors: {
      ao_dai_cachtan: '#CF8481',
      quan_culottes_modern: '#FAF8F5',
      modern_leather_loafers: '#2C221E',
    },
    theme: 'street_chic',
    styleMode: 'contemporary_remix',
  },
];

const STORAGE_KEY = 'v_remix_saved_looks_v2';

export default function App() {
  const [activeView, setActiveView] = useState<'welcome' | 'studio' | 'encyclopedia'>('welcome');
  const [outfit, setOutfit] = useState<OutfitState>(LOOK_001_TRADITIONAL);
  const [history, setHistory] = useState<OutfitState[]>([LOOK_001_TRADITIONAL]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [lookTitle, setLookTitle] = useState<string>('Look 001 · The Modern Classic');

  // Modals & Drawers state
  const [isWardrobeOpen, setIsWardrobeOpen] = useState(false);
  const [wardrobeCategory, setWardrobeCategory] = useState<GarmentCategory>('tunic');
  const [colorPickerGarmentId, setColorPickerGarmentId] = useState<string | null>(null);
  const [isAIStylistOpen, setIsAIStylistOpen] = useState(false);
  const [isCulturalReviewOpen, setIsCulturalReviewOpen] = useState(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [selectedComparisonLook, setSelectedComparisonLook] = useState<LookbookItem | null>(null);
  const [isSnapshotOpen, setIsSnapshotOpen] = useState(false);

  // Saved Lookbook storage
  const [savedLooks, setSavedLooks] = useState<LookbookItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedLooks));
    } catch (e) {
      console.error('Failed to save looks', e);
    }
  }, [savedLooks]);

  // Push new state to undo/redo history
  const updateOutfitWithHistory = useCallback(
    (newOutfit: OutfitState) => {
      setOutfit(newOutfit);
      setHistory((prev) => {
        const truncated = prev.slice(0, historyIndex + 1);
        return [...truncated, newOutfit];
      });
      setHistoryIndex((prev) => prev + 1);
    },
    [historyIndex]
  );

  // Undo
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const prevIdx = historyIndex - 1;
      setHistoryIndex(prevIdx);
      setOutfit(history[prevIdx]);
    }
  }, [historyIndex, history]);

  // Transition from Welcome to Studio
  const handleEnterStudio = (mode: 'traditional' | 'contemporary') => {
    if (mode === 'contemporary') {
      setOutfit(LOOK_002_CONTEMPORARY);
      setHistory([LOOK_002_CONTEMPORARY]);
      setHistoryIndex(0);
      setLookTitle('Look 002 · Saigon Contemporary Remix');
    } else {
      setOutfit(LOOK_001_TRADITIONAL);
      setHistory([LOOK_001_TRADITIONAL]);
      setHistoryIndex(0);
      setLookTitle('Look 001 · The Modern Classic');
    }
    setActiveView('studio');
  };

  // Open Wardrobe Drawer on specific category
  const handleOpenCategory = (cat: GarmentCategory) => {
    setWardrobeCategory(cat);
    setIsWardrobeOpen(true);
  };

  // Equip Garment
  const handleEquipGarment = (category: GarmentCategory, garmentId: string) => {
    const item = GARMENT_CATALOG.find((g) => g.id === garmentId);
    if (!item) return;

    const updated = {
      ...outfit,
      selectedGarments: {
        ...outfit.selectedGarments,
        [category]: garmentId,
      },
      garmentColors: {
        ...outfit.garmentColors,
        [garmentId]: outfit.garmentColors[garmentId] || item.defaultColorHex,
      },
    };
    updateOutfitWithHistory(updated);
  };

  // Unequip Garment
  const handleUnequipGarment = (category: GarmentCategory) => {
    const updated = {
      ...outfit,
      selectedGarments: {
        ...outfit.selectedGarments,
        [category]: null,
      },
    };
    updateOutfitWithHistory(updated);
  };

  // Color selection
  const handleSelectGarmentColor = (colorHex: string) => {
    if (!colorPickerGarmentId) return;
    const updated = {
      ...outfit,
      garmentColors: {
        ...outfit.garmentColors,
        [colorPickerGarmentId]: colorHex,
      },
    };
    updateOutfitWithHistory(updated);
    setColorPickerGarmentId(null);
  };

  // Randomize Outfit (Surprise Me)
  const handleRandomize = () => {
    const preset = RANDOM_PRESETS[Math.floor(Math.random() * RANDOM_PRESETS.length)];
    const merged: OutfitState = {
      ...outfit,
      selectedGarments: {
        ...outfit.selectedGarments,
        ...(preset.selectedGarments || {}),
      },
      garmentColors: {
        ...outfit.garmentColors,
        ...(preset.garmentColors || {}),
      },
      theme: preset.theme || outfit.theme,
      styleMode: preset.styleMode || outfit.styleMode,
    };
    playEquipSound();
    setLookTitle(`Look 00${Math.floor(Math.random() * 80 + 10)} · Vũ Điệu Lụa Là`);
    updateOutfitWithHistory(merged);
  };

  // Reset Outfit
  const handleResetOutfit = () => {
    setOutfit(LOOK_001_TRADITIONAL);
    setHistory([LOOK_001_TRADITIONAL]);
    setHistoryIndex(0);
    setLookTitle('Look 001 · The Modern Classic');
    playEquipSound();
  };

  // Save to Lookbook
  const handleSaveLook = () => {
    const review = runDeterministicCulturalReview(outfit);
    const newLook: LookbookItem = {
      id: `look_${Date.now()}`,
      title: lookTitle,
      createdAt: new Date().toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      outfit,
      culturalReview: review,
    };

    setSavedLooks((prev) => [newLook, ...prev]);
    playCelebrationSound();

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#4E1D24', '#D4AF37', '#FAF6F0'],
    });
  };

  // Apply AI Concept
  const handleApplyAIConcept = (concept: AIOutfitConcept) => {
    const newSelected = { ...outfit.selectedGarments };
    const newColors = { ...outfit.garmentColors };

    Object.entries(concept.garmentIds).forEach(([cat, gid]) => {
      if (gid) {
        newSelected[cat as GarmentCategory] = gid;
      }
    });

    if (concept.colorSuggestions) {
      Object.entries(concept.colorSuggestions).forEach(([gid, hex]) => {
        if (gid && hex) {
          newColors[gid] = hex;
        }
      });
    }

    const updated: OutfitState = {
      ...outfit,
      selectedGarments: newSelected,
      garmentColors: newColors,
    };

    setLookTitle(concept.vietnameseTitle || concept.conceptTitle);
    playEquipSound();
    updateOutfitWithHistory(updated);
  };

  // Apply Cultural Quick Fix
  const handleApplyAutoFix = (category: GarmentCategory, targetGarmentId: string | null) => {
    const updated = {
      ...outfit,
      selectedGarments: {
        ...outfit.selectedGarments,
        [category]: targetGarmentId,
      },
    };
    playEquipSound();
    updateOutfitWithHistory(updated);
  };

  // Cultural review summary
  const culturalReview = runDeterministicCulturalReview(outfit);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#241A16] font-sans antialiased">
      {/* 1. WELCOME VIEW (Reference 1) */}
      {activeView === 'welcome' && (
        <WelcomeView
          onEnterStudio={handleEnterStudio}
          onOpenLookbook={() => setIsLookbookOpen(true)}
          savedLooksCount={savedLooks.length}
        />
      )}

      {/* 2. STUDIO VIEW (Reference 2) */}
      {activeView === 'studio' && (
        <StudioView
          outfit={outfit}
          lookTitle={lookTitle}
          savedLooksCount={savedLooks.length}
          onUpdateOutfit={updateOutfitWithHistory}
          onOpenCategory={handleOpenCategory}
          onOpenColorPicker={(gid) => setColorPickerGarmentId(gid)}
          onOpenAIStylist={() => setIsAIStylistOpen(true)}
          onOpenCulturalReview={() => setIsCulturalReviewOpen(true)}
          onOpenLookbook={() => setIsLookbookOpen(true)}
          onOpenEncyclopedia={() => setActiveView('encyclopedia')}
          onUndo={handleUndo}
          onRandomize={handleRandomize}
          onResetOutfit={handleResetOutfit}
          onSaveLook={handleSaveLook}
          onSwitchToWelcome={() => setActiveView('welcome')}
        />
      )}

      {/* 3. HERITAGE ENCYCLOPEDIA VIEW */}
      {activeView === 'encyclopedia' && (
        <div className="min-h-screen bg-[#FBF9F5] p-4 sm:p-8">
          <div className="max-w-5xl mx-auto mb-6 flex items-center justify-between">
            <button
              onClick={() => setActiveView('studio')}
              className="text-xs font-semibold text-[#4E1D24] hover:underline cursor-pointer"
            >
              &larr; Trở lại Studio Phối Đồ
            </button>
            <h2 className="font-serif text-xl font-bold text-[#241A16]">
              Bách Khoa Di Sản &middot; Áo Dài Việt Nam
            </h2>
          </div>
          <HeritageEncyclopedia />
        </div>
      )}

      {/* MODALS & DRAWERS */}
      {/* Wardrobe Drawer */}
      <WardrobeDrawer
        isOpen={isWardrobeOpen}
        onClose={() => setIsWardrobeOpen(false)}
        activeCategory={wardrobeCategory}
        onSelectCategory={setWardrobeCategory}
        outfit={outfit}
        onEquipGarment={handleEquipGarment}
        onUnequipGarment={handleUnequipGarment}
        onOpenColorPicker={(gid) => setColorPickerGarmentId(gid)}
      />

      {/* Silk Color Palette Picker */}
      <ColorPalettePicker
        garmentId={colorPickerGarmentId}
        currentColorHex={
          colorPickerGarmentId
            ? outfit.garmentColors[colorPickerGarmentId] ||
              GARMENT_CATALOG.find((g) => g.id === colorPickerGarmentId)?.defaultColorHex ||
              '#8B2624'
            : '#8B2624'
        }
        onSelectColor={handleSelectGarmentColor}
        onClose={() => setColorPickerGarmentId(null)}
      />

      {/* AI Stylist Modal */}
      <AIStylistModal
        isOpen={isAIStylistOpen}
        onClose={() => setIsAIStylistOpen(false)}
        outfit={outfit}
        onApplyConcept={handleApplyAIConcept}
        onApplySingleGarment={handleEquipGarment}
      />

      {/* Cultural Review Modal */}
      <CulturalReviewModal
        isOpen={isCulturalReviewOpen}
        onClose={() => setIsCulturalReviewOpen(false)}
        review={culturalReview}
        outfit={outfit}
        onApplyAutoFix={handleApplyAutoFix}
      />

      {/* Lookbook / Collections Drawer */}
      <LookbookDrawer
        isOpen={isLookbookOpen}
        onClose={() => setIsLookbookOpen(false)}
        savedLooks={savedLooks}
        onLoadLook={(loadedOutfit) => {
          setOutfit(loadedOutfit);
          updateOutfitWithHistory(loadedOutfit);
          setIsLookbookOpen(false);
          setActiveView('studio');
        }}
        onDeleteLook={(id) => {
          setSavedLooks((prev) => prev.filter((l) => l.id !== id));
        }}
        onCompareLook={(look) => {
          setSelectedComparisonLook(look);
          setIsComparisonOpen(true);
          setIsLookbookOpen(false);
        }}
      />

      {/* Outfit Comparison Modal */}
      <OutfitComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        currentOutfit={outfit}
        comparisonLook={selectedComparisonLook}
        savedLooks={savedLooks}
        onSelectComparisonLook={setSelectedComparisonLook}
      />

      {/* Snapshot Modal */}
      <SnapshotModal
        isOpen={isSnapshotOpen}
        onClose={() => setIsSnapshotOpen(false)}
        outfit={outfit}
      />
    </div>
  );
}

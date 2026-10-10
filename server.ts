import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '15mb' }));

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'v-remix-server' });
});

// AI Outfit Suggestions Endpoint
app.post('/api/ai/outfit-suggestions', async (req: Request, res: Response) => {
  const { prompt, currentOutfit, availableGarmentIds } = req.body;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    console.log('[AI Stylist] GEMINI_API_KEY not configured, serving algorithmic curated concepts.');
    return res.json({ concepts: generateCuratedConcepts(prompt, currentOutfit) });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const catalogSummary = availableGarmentIds
      ? availableGarmentIds.map((g: any) => `${g.id} (${g.vietnameseName}, category: ${g.category}, era: ${g.era})`).join(', ')
      : '';

    const systemInstruction = `You are a high-fashion Vietnamese traditional and contemporary stylist for "V-Remix".
You must generate up to 3 distinct outfit concepts matching the user's styling request.
CRITICAL CONSTRAINT: You must ONLY select garment IDs from this exact available inventory:
${catalogSummary}
Do NOT invent IDs that do not exist.
Each concept must include:
- conceptId (string)
- conceptTitle (string in English)
- vietnameseTitle (string in Vietnamese)
- narrativeDescription (poetic yet wearable fashion description in Vietnamese)
- styleVibe (short 2-4 word descriptor)
- garmentIds: object with category keys (tunic, inner, bottom, outerwear, headwear, jewelry, footwear, handheld) pointing to valid inventory IDs or null
- colorSuggestions: map of garmentId to hex color string
- culturalRationale: 1-2 sentence explanation of historical or aesthetic harmony in Vietnamese.`;

    const userPrompt = `User Request: "${prompt || 'Tạo bộ trang phục di sản thanh lịch'}"
Current theme: ${currentOutfit?.theme || 'tet_celebration'}
Current style mode: ${currentOutfit?.styleMode || 'traditional_pure'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            concepts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  conceptId: { type: Type.STRING },
                  conceptTitle: { type: Type.STRING },
                  vietnameseTitle: { type: Type.STRING },
                  narrativeDescription: { type: Type.STRING },
                  styleVibe: { type: Type.STRING },
                  garmentIds: {
                    type: Type.OBJECT,
                    properties: {
                      tunic: { type: Type.STRING },
                      inner: { type: Type.STRING },
                      bottom: { type: Type.STRING },
                      outerwear: { type: Type.STRING },
                      headwear: { type: Type.STRING },
                      jewelry: { type: Type.STRING },
                      footwear: { type: Type.STRING },
                      handheld: { type: Type.STRING },
                    },
                  },
                  colorSuggestions: {
                    type: Type.OBJECT,
                    additionalProperties: { type: Type.STRING },
                  },
                  culturalRationale: { type: Type.STRING },
                },
                required: ['conceptId', 'vietnameseTitle', 'narrativeDescription', 'garmentIds', 'culturalRationale'],
              },
            },
          },
          required: ['concepts'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    if (parsed.concepts && Array.isArray(parsed.concepts) && parsed.concepts.length > 0) {
      const validIds = new Set([
        'ao_dai_traditional', 'ao_dai_cachtan', 'ao_ngu_than_chẽn', 'ao_tac_royal', 'ao_giao_linh', 'ao_ba_ba', 'ao_tu_than',
        'yem_silk', 'ao_canh_inner', 'quan_ao_dai_white', 'vay_dup_traditional', 'quan_culottes_modern', 'quan_denim_fusion',
        'ao_nhat_binh_court', 'ao_khoac_doi_kham', 'khan_dong_traditional', 'man_nhung_pearl', 'non_la_hue', 'non_quai_thao',
        'tram_cai_hoa_mai', 'kieng_bac_lotus', 'pearl_necklace_phuquoc', 'khan_ran_nam_bo', 'guoc_moc_sen', 'hai_nhung_theu_gold',
        'modern_leather_loafers', 'quat_lua_hac', 'tui_coi_lotus', 'nhanh_sen_ngoc',
      ]);

      const cleanedConcepts = parsed.concepts.map((concept: any, idx: number) => {
        const cleanedGarments: Record<string, string | null> = {};
        if (concept.garmentIds) {
          for (const [cat, rawId] of Object.entries(concept.garmentIds)) {
            if (typeof rawId === 'string') {
              if (validIds.has(rawId)) {
                cleanedGarments[cat] = rawId;
              } else {
                // Map partial matches
                const lower = rawId.toLowerCase();
                if (lower.includes('nhat_binh') || lower.includes('nhatbinh')) cleanedGarments[cat] = 'ao_nhat_binh_court';
                else if (lower.includes('tac') || lower.includes('thung')) cleanedGarments[cat] = 'ao_tac_royal';
                else if (lower.includes('ngu_than') || lower.includes('nguthan')) cleanedGarments[cat] = 'ao_ngu_than_chẽn';
                else if (lower.includes('cachtan') || lower.includes('cach_tan')) cleanedGarments[cat] = 'ao_dai_cachtan';
                else if (lower.includes('ao_dai') || lower.includes('aodai')) cleanedGarments[cat] = 'ao_dai_traditional';
                else if (lower.includes('ba_ba') || lower.includes('baba')) cleanedGarments[cat] = 'ao_ba_ba';
                else if (lower.includes('tu_than')) cleanedGarments[cat] = 'ao_tu_than';
                else if (lower.includes('giao_linh')) cleanedGarments[cat] = 'ao_giao_linh';
                else if (lower.includes('yem')) cleanedGarments[cat] = 'yem_silk';
                else if (lower.includes('canh')) cleanedGarments[cat] = 'ao_canh_inner';
                else if (lower.includes('khan_dong') || lower.includes('khandong')) cleanedGarments[cat] = 'khan_dong_traditional';
                else if (lower.includes('man_nhung') || lower.includes('mannhung')) cleanedGarments[cat] = 'man_nhung_pearl';
                else if (lower.includes('non_la') || lower.includes('nonla')) cleanedGarments[cat] = 'non_la_hue';
                else if (lower.includes('quai_thao')) cleanedGarments[cat] = 'non_quai_thao';
                else if (lower.includes('kieng')) cleanedGarments[cat] = 'kieng_bac_lotus';
                else if (lower.includes('pearl') || lower.includes('trai')) cleanedGarments[cat] = 'pearl_necklace_phuquoc';
                else if (lower.includes('khan_ran')) cleanedGarments[cat] = 'khan_ran_nam_bo';
                else if (lower.includes('guoc')) cleanedGarments[cat] = 'guoc_moc_sen';
                else if (lower.includes('hai_nhung')) cleanedGarments[cat] = 'hai_nhung_theu_gold';
                else if (lower.includes('loafer')) cleanedGarments[cat] = 'modern_leather_loafers';
                else if (lower.includes('quat')) cleanedGarments[cat] = 'quat_lua_hac';
                else if (lower.includes('tui_coi')) cleanedGarments[cat] = 'tui_coi_lotus';
                else if (lower.includes('sen')) cleanedGarments[cat] = 'nhanh_sen_ngoc';
                else if (cat === 'tunic') cleanedGarments[cat] = 'ao_dai_traditional';
                else if (cat === 'bottom') cleanedGarments[cat] = 'quan_ao_dai_white';
              }
            }
          }
        }
        return {
          ...concept,
          conceptId: concept.conceptId || `concept_${idx + 1}`,
          garmentIds: cleanedGarments,
        };
      });

      return res.json({ concepts: cleanedConcepts });
    } else {
      return res.json({ concepts: generateCuratedConcepts(prompt, currentOutfit) });
    }
  } catch (err: any) {
    console.error('[AI Stylist Error]', err?.message || err);
    return res.json({ concepts: generateCuratedConcepts(prompt, currentOutfit) });
  }
});

// AI Cultural Critique & Editorial Caption Endpoint
app.post('/api/ai/cultural-critique', async (req: Request, res: Response) => {
  const { outfit } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return res.json({
      editorialCaption: 'Tác phẩm thời trang tôn vinh đường nét duyên dáng của người Việt, giao hòa giữa vẻ đẹp cổ truyền và hơi thở hiện đại.',
      aiCommentary: 'Sự kết hợp giữa chất liệu lụa mềm mại và phom dáng đứng đắn phản ánh đúng tinh thần khiêm nhường nhưng quý phái của văn hóa trang phục Việt Nam.',
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const promptText = `Analyze this equipped Vietnamese outfit configuration:
Equipped garments: ${JSON.stringify(outfit?.selectedGarments || {})}
Style Mode: ${outfit?.styleMode || 'traditional_pure'}
Occasion: ${outfit?.theme || 'tet_celebration'}

Provide a 2-3 sentence cultural critique and an editorial caption in Vietnamese celebrating its aesthetic harmony and cultural heritage.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            editorialCaption: { type: Type.STRING },
            aiCommentary: { type: Type.STRING },
          },
          required: ['editorialCaption', 'aiCommentary'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('[AI Critique Error]', err?.message || err);
    return res.json({
      editorialCaption: 'Tác phẩm thời trang tôn vinh đường nét duyên dáng của người Việt, giao hòa giữa vẻ đẹp cổ truyền và hơi thở hiện đại.',
      aiCommentary: 'Sự kết hợp giữa chất liệu lụa mềm mại và phom dáng đứng đắn phản ánh đúng tinh thần khiêm nhường nhưng quý phái của văn hóa trang phục Việt Nam.',
    });
  }
});

function generateCuratedConcepts(prompt: string = '', outfit: any = {}): any[] {
  const p = prompt.toLowerCase();
  const isTet = p.includes('tết') || p.includes('tet') || outfit?.theme === 'tet_celebration';
  const isHue = p.includes('huế') || p.includes('hoàng gia') || p.includes('cung đình') || outfit?.theme === 'royal_court';

  return [
    {
      conceptId: 'curated_1',
      conceptTitle: 'Auspicious Spring Radiance',
      vietnameseTitle: 'Sắc Xuân Cát Tường (Tết Nguyên Đán)',
      narrativeDescription: 'Áo Dài truyền thống cổ đứng đỏ son rực rỡ phối cùng quần lụa trắng ngà, kết hợp mấn nhung đính ngọc và quạt lụa thêu hạc tiên.',
      styleVibe: 'Lễ Hội & Truyền Thống',
      garmentIds: {
        tunic: 'ao_dai_traditional',
        bottom: 'quan_ao_dai_white',
        headwear: 'man_nhung_pearl',
        handheld: 'quat_lua_hac',
        footwear: 'hai_nhung_theu_gold',
        jewelry: 'kieng_bac_lotus',
      },
      colorSuggestions: {
        ao_dai_traditional: '#B91C1C',
        quan_ao_dai_white: '#F8FAFC',
        man_nhung_pearl: '#B91C1C',
        quat_lua_hac: '#FEF3C7',
      },
      culturalRationale: 'Màu đỏ son biểu trưng cho may mắn, khởi đầu hanh thông. Kiềng bạc chạm sen gìn giữ cốt cách gia phong Thăng Long.',
    },
    {
      conceptId: 'curated_2',
      conceptTitle: 'Imperial Dignity of Hue',
      vietnameseTitle: 'Khí Chất Cung Đình Xứ Huế',
      narrativeDescription: 'Áo Tấc tay thụng vàng hoàng triều tôn nghiêm, trang nghiêm đội Khăn Đóng ngũ nếp và hài nhung thêu chỉ vàng.',
      styleVibe: 'Nghi Lễ Hoàng Gia',
      garmentIds: {
        tunic: 'ao_tac_royal',
        bottom: 'quan_ao_dai_white',
        headwear: 'khan_dong_traditional',
        footwear: 'hai_nhung_theu_gold',
        jewelry: 'kieng_bac_lotus',
        handheld: 'nhanh_sen_ngoc',
      },
      colorSuggestions: {
        ao_tac_royal: '#D97706',
        khan_dong_traditional: '#18181B',
        quan_ao_dai_white: '#F8FAFC',
      },
      culturalRationale: 'Tuân thủ nghiêm ngặt điển chế Lễ phục triều Nguyễn, đại diện cho phẩm hạnh Nhân - Lễ - Nghĩa - Trí - Tín.',
    },
    {
      conceptId: 'curated_3',
      conceptTitle: 'Contemporary Saigon Streetwear Remix',
      vietnameseTitle: 'Dấu Ấn Đương Đại Sài Gòn',
      narrativeDescription: 'Áo Dài Cách Tân tà lửng hồng cánh sen phối cùng quần culottes hiện đại, túi cói đan tay Kim Sơn và giày loafer da năng động.',
      styleVibe: 'Đương Đại & Phố Thị',
      garmentIds: {
        tunic: 'ao_dai_cachtan',
        bottom: 'quan_culottes_modern',
        footwear: 'modern_leather_loafers',
        handheld: 'tui_coi_lotus',
        jewelry: 'pearl_necklace_phuquoc',
      },
      colorSuggestions: {
        ao_dai_cachtan: '#EC4899',
        quan_culottes_modern: '#F8FAFC',
      },
      culturalRationale: 'Sự hòa quyện giữa nhịp sống đô thị trẻ trung và tình yêu di sản lụa là thủ công Việt Nam.',
    },
  ];
}

async function startServer() {
  // Always serve public assets
  app.use(express.static(path.resolve(__dirname, 'public')));

  if (process.env.NODE_ENV !== 'production') {
    // Mount Vite dev server middleware in dev mode
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[V-Remix Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Server Start Failure]', err);
  process.exit(1);
});

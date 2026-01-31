import { GoogleGenAI, Type } from "@google/genai";
import { WorkoutProgram, Exercise, UserPhysicalStats, HealthAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to fetch video links for a single exercise
export const fetchExerciseMedia = async (exerciseName: string): Promise<{ title: string; uri: string }[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Find "YouTube Shorts" or short video tutorials (under 1 minute) demonstrating the gym exercise: "${exerciseName}". Return only valid links.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const links = chunks
      .map(c => c.web)
      .filter(w => w && w.uri && w.title)
      .map(w => ({ title: w!.title, uri: w!.uri }))
      .slice(0, 2);

    return links;
  } catch (error) {
    console.warn(`Could not fetch media for ${exerciseName}`, error);
    return [];
  }
};

export const analyzeUserStats = async (stats: UserPhysicalStats): Promise<HealthAnalysis> => {
    const prompt = `
      Bir fitness uzmanı olarak aşağıdaki kullanıcı verilerini analiz et:
      Yaş: ${stats.age}
      Cinsiyet: ${stats.gender === 'male' ? 'Erkek' : 'Kadın'}
      Boy: ${stats.height} cm
      Kilo: ${stats.weight} kg
      Bel: ${stats.waist} cm
      Boyun: ${stats.neck} cm
      Kalça: ${stats.hip || 'Belirtilmedi'} cm

      Görevler:
      1. BMI Hesapla.
      2. Navy Tape Measure metoduna göre yaklaşık Yağ Oranı (%) tahmin et.
      3. Vücut tipini tahmin et.
      4. Bu verilere dayanarak kullanıcıya motive edici ama gerçekçi, kişisel bir yorum/tavsiye (feedback) yaz (maksimum 3-4 cümle).

      JSON formatında yanıt ver.
    `;
  
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            bmi: { type: Type.NUMBER, description: "Vücut Kitle İndeksi" },
            bodyFatEstimate: { type: Type.STRING, description: "Tahmini yağ oranı yüzdesi (örn: %15-18)" },
            bodyType: { type: Type.STRING, description: "Ectomorph, Endomorph, vs. veya açıklayıcı bir tanım" },
            status: { type: Type.STRING, description: "Genel durum (Fit, Fazla Kilolu, Zayıf vb.)" },
            feedback: { type: Type.STRING, description: "Kişisel tavsiye ve yorum" }
          }
        }
      }
    });
  
    if (!response.text) throw new Error("Analiz oluşturulamadı.");
    return JSON.parse(response.text) as HealthAnalysis;
  };

export const generateWorkoutProgram = async (
  goal: string,
  level: string,
  daysPerWeek: number,
  equipment: string,
  injuries: string,
  userStats?: UserPhysicalStats,
  customNarrative?: string
): Promise<WorkoutProgram> => {
  
  const userContext = userStats 
    ? `KULLANICI FİZİKSEL ÖZELLİKLERİ: Cinsiyet: ${userStats.gender}, Yaş: ${userStats.age}, Boy: ${userStats.height}cm, Kilo: ${userStats.weight}kg.` 
    : "";

  let promptContent = "";

  if (customNarrative && customNarrative.length > 50) {
      // ADVANCED MODE: User provided a detailed story
      promptContent = `
        GÖREV: Kullanıcının kendi cümleleriyle anlattığı detaylı biyografisine ve hedeflerine göre TAM NOKTA ATIŞI bir antrenman programı hazırla.
        
        KULLANICI HİKAYESİ VE DETAYLAR (ÇOK ÖNEMLİ):
        "${customNarrative}"

        ${userContext}

        DİKKAT EDİLMESİ GEREKEN KRİTİK NOKTALAR (BUNLARI ANALİZ ET):
        1. Eğer kullanıcı Kreatin kullanıyor ama su içmiyorsa, program notlarına mutlaka büyük harflerle SU UYARISI ekle.
        2. Eğer kullanıcının futbol maçı vb. varsa, bacak gününü maçtan önceki güne koyma (Program notlarında belirt).
        3. Menüsküs veya sakatlık varsa, dizlere aşırı yük binen hareketlere alternatif öner veya not düş.
        4. Düğün, tatil gibi özel hedef tarihleri varsa programı ona göre motive edici isimlendir.
        5. Ev ve Salon ekipmanlarını harmanla (hikayede belirtilmişse).

        ÇIKTI FORMATI:
        Yanıtı tamamen Türkçe ver ve aşağıdaki JSON şemasına sadık kal.
        Her egzersiz için "guide" alanına, o hareketin nasıl yapıldığını anlatan MAKSİMUM 15-20 KELİMELİK, çok kısa ve öz bir "püf nokta" açıklaması yaz.
      `;
  } else {
      // STANDARD MODE
      promptContent = `
        Kullanıcı için detaylı bir spor salonu (gym) antrenman programı oluştur.
        ${userContext}
        Hedef: ${goal}
        Seviye: ${level}
        Haftalık Gün Sayısı: ${daysPerWeek}
        Ekipman: ${equipment}
        Sakatlıklar/Notlar: ${injuries || "Yok"}

        Lütfen yanıtı tamamen Türkçe ver.
        ÖNEMLİ: Her egzersiz için "guide" alanına, o hareketin nasıl yapıldığını anlatan MAKSİMUM 15-20 KELİMELİK, çok kısa ve öz bir "püf nokta" açıklaması yaz. Uzun anlatımlardan kaçın.

        JSON Şemasına sadık kal.
      `;
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: promptContent,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          programName: { type: Type.STRING, description: "Programın havalı ve kişiye özel ismi" },
          targetGoal: { type: Type.STRING, description: "Programın ana hedefi" },
          difficulty: { type: Type.STRING, description: "Zorluk seviyesi" },
          days: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                dayName: { type: Type.STRING, description: "Örn: Gün 1 - Göğüs & Arka Kol" },
                exercises: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      sets: { type: Type.STRING },
                      reps: { type: Type.STRING },
                      rest: { type: Type.STRING },
                      notes: { type: Type.STRING, description: "Kullanıcının hikayesine özel uyarılar (Örn: Maç öncesi hafif çalış)" },
                      guide: {
                        type: Type.OBJECT,
                        properties: {
                            howTo: { type: Type.STRING, description: "Çok kısa yapılış ipuçları" },
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  if (!response.text) {
    throw new Error("Gemini yanıt oluşturamadı.");
  }

  // Robust JSON parsing to handle potential Markdown wrapping
  let jsonString = response.text.trim();
  
  // Remove markdown code blocks if present (e.g. ```json ... ```)
  if (jsonString.startsWith("```")) {
    jsonString = jsonString.replace(/^```(json)?/, "").replace(/```$/, "").trim();
  }

  let rawData;
  try {
    rawData = JSON.parse(jsonString);
  } catch (error) {
    console.error("JSON Parse Error:", error);
    console.error("Raw Text:", response.text);
    throw new Error("Program oluşturulurken bir hata meydana geldi (JSON Ayrıştırma Hatası). Lütfen tekrar deneyin.");
  }

  // Validation: Ensure rawData has the expected structure
  if (!rawData || typeof rawData !== 'object') {
     throw new Error("Yapay zeka geçerli bir format döndürmedi.");
  }

  // Handle potential structural hallucinations
  if (!Array.isArray(rawData.days)) {
     const possibleKeys = Object.keys(rawData);
     let found = false;
     for (const key of possibleKeys) {
        if (rawData[key] && Array.isArray(rawData[key].days)) {
            rawData = rawData[key];
            found = true;
            break;
        }
     }
     if (!found) {
         if (Array.isArray(rawData)) {
             rawData = { 
                programName: "Generated Program", 
                targetGoal: goal, 
                difficulty: level, 
                days: rawData 
             };
         } else {
             console.warn("Missing 'days' array in response:", rawData);
             rawData.days = []; 
         }
     }
  }

  // 2. Extract Unique Exercises to minimize API calls
  const allExercises: Exercise[] = [];
  
  if (Array.isArray(rawData.days)) {
    rawData.days.forEach((day: any) => {
        if (day.exercises && Array.isArray(day.exercises)) {
            day.exercises.forEach((ex: Exercise) => allExercises.push(ex));
        }
    });
  }

  const uniqueNames = [...new Set(allExercises.map(e => e.name).filter(n => n))];

  // 3. Batch Fetch Video Links
  const videoMap = new Map<string, { title: string; uri: string }[]>();
  const batchSize = 3;
  for (let i = 0; i < uniqueNames.length; i += batchSize) {
      const batch = uniqueNames.slice(i, i + batchSize);
      await Promise.all(batch.map(async (name) => {
          if (!name) return;
          const links = await fetchExerciseMedia(name);
          videoMap.set(name, links);
      }));
  }

  // 4. Enrich the original data
  if (Array.isArray(rawData.days)) {
    rawData.days.forEach((day: any) => {
        if (day.exercises && Array.isArray(day.exercises)) {
            day.exercises.forEach((ex: any) => {
                const links = videoMap.get(ex.name) || [];
                if (!ex.guide) ex.guide = { howTo: "Bilgi yok", videoLinks: [] };
                ex.guide.videoLinks = links;
            });
        }
    });
  }

  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...rawData
  };
};
import React, { useState } from 'react';
import { generateWorkoutProgram } from '../services/geminiService';
import { WorkoutProgram, AppView, UserProfile } from '../types';
import { saveProgram } from '../services/storageService';
import { Wand2, Loader2, CheckCircle2, Video, FileText, Settings2 } from 'lucide-react';

interface GeneratorProps {
  onProgramGenerated: (program: WorkoutProgram) => void;
  onChangeView: (view: AppView) => void;
  userProfile: UserProfile | null;
}

export const WorkoutGenerator: React.FC<GeneratorProps> = ({ onProgramGenerated, onChangeView, userProfile }) => {
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState("Program Hazırlanıyor...");
  const [mode, setMode] = useState<'standard' | 'story'>('standard');
  
  // Standard Form Data
  const [formData, setFormData] = useState({
    goal: 'Kas Kazanımı (Hypertrophy)',
    level: 'Orta Seviye',
    days: 4,
    equipment: 'Tam Donanımlı Spor Salonu',
    injuries: ''
  });

  // Story Mode Data (Default to empty, user can paste)
  const [userStory, setUserStory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusText("Kişisel hikayen analiz ediliyor ve program kurgulanıyor...");
    
    try {
      setTimeout(async () => {
         try {
            setStatusText("Egzersiz videoları ve ipuçları taranıyor... (Bu işlem 30-60sn sürebilir)");
            
            // If in Story mode, we pass the story. If in Standard mode, we pass undefined for story.
            const customNarrative = mode === 'story' ? userStory : undefined;

            const program = await generateWorkoutProgram(
                formData.goal,
                formData.level,
                formData.days,
                formData.equipment,
                formData.injuries,
                userProfile?.stats,
                customNarrative
            );
            saveProgram(program);
            onProgramGenerated(program);
            onChangeView(AppView.DASHBOARD);
         } catch (err) {
            console.error(err);
            alert("Hata oluştu: " + (err as Error).message);
            setLoading(false);
         }
      }, 100);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Wand2 className="text-gym-accent" />
          AI Antrenör
        </h2>
        <p className="text-gym-muted mt-2">
          {userProfile 
            ? `${userProfile.stats.weight}kg ağırlık ve vücut yapına uygun program hazırlanacak.` 
            : "Hedeflerini söyle, Gemini AI saniyeler içinde sana özel bilimsel bir program hazırlasın."}
        </p>
      </div>

      <div className="bg-gym-card rounded-xl border border-slate-700 overflow-hidden">
        
        {/* Tabs */}
        <div className="flex border-b border-slate-700">
            <button 
                onClick={() => setMode('standard')}
                className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${mode === 'standard' ? 'bg-slate-800 text-white border-b-2 border-gym-accent' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
            >
                <Settings2 size={16} /> Hızlı Seçim
            </button>
            <button 
                onClick={() => setMode('story')}
                className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${mode === 'story' ? 'bg-slate-800 text-white border-b-2 border-gym-accent' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
            >
                <FileText size={16} /> Detaylı Hikayem (Önerilen)
            </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {mode === 'standard' ? (
              <>
                <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Hedefin Nedir?</label>
                <select 
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-gym-accent outline-none"
                    value={formData.goal}
                    onChange={e => setFormData({...formData, goal: e.target.value})}
                >
                    <option>Kas Kazanımı (Hypertrophy)</option>
                    <option>Güç Artışı (Strength)</option>
                    <option>Yağ Yakımı & Kondisyon</option>
                    <option>Powerlifting</option>
                    <option>Calisthenics (Vücut Ağırlığı)</option>
                </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Seviyen</label>
                    <select 
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-gym-accent outline-none"
                    value={formData.level}
                    onChange={e => setFormData({...formData, level: e.target.value})}
                    >
                    <option>Başlangıç</option>
                    <option>Orta Seviye</option>
                    <option>İleri Seviye</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Haftalık Gün Sayısı</label>
                    <input 
                    type="number" 
                    min="1" 
                    max="7"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-gym-accent outline-none"
                    value={formData.days}
                    onChange={e => setFormData({...formData, days: parseInt(e.target.value)})}
                    />
                </div>
                </div>

                <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Ekipman Durumu</label>
                <input 
                    type="text" 
                    placeholder="Örn: Sadece dambıl, Tam spor salonu..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-gym-accent outline-none"
                    value={formData.equipment}
                    onChange={e => setFormData({...formData, equipment: e.target.value})}
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Varsa Sakatlıklar veya Özel Notlar</label>
                <textarea 
                    rows={3}
                    placeholder="Örn: Sol omuz hassasiyeti, bel fıtığı..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-gym-accent outline-none"
                    value={formData.injuries}
                    onChange={e => setFormData({...formData, injuries: e.target.value})}
                />
                </div>
            </>
          ) : (
            <div className="animate-fade-in">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Kendi Hikayeni Anlat
                </label>
                <p className="text-xs text-slate-400 mb-3">
                    Bize kendinden, spor geçmişinden, maç günlerinden, beslenmenden, sakatlıklarından ve hayalindeki vücuttan bahset. Ne kadar detay verirsen, Yapay Zeka o kadar sana özel (Kreatin-Su uyarısına kadar!) bir program hazırlar.
                </p>
                <textarea 
                    rows={12}
                    placeholder="Örn: 29 yaşındayım, haftada 1 halı saha maçım var, sağ dizimde menüsküs var. Amacım düğünüme kadar omuzları genişletmek..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 text-white focus:ring-2 focus:ring-gym-accent outline-none leading-relaxed text-sm"
                    value={userStory}
                    onChange={e => setUserStory(e.target.value)}
                />
            </div>
          )}

          <button
            type="submit"
            disabled={loading || (mode === 'story' && userStory.length < 10)}
            className="w-full bg-gym-accent hover:bg-gym-accentHover text-white font-bold py-4 rounded-lg shadow-lg shadow-gym-accent/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
                <>
                <Loader2 className="animate-spin" />
                {statusText}
                </>
            ) : (
                <>
                <CheckCircle2 />
                {mode === 'story' ? 'Analiz Et ve Kişisel Programı Yaz' : 'Programı Oluştur'}
                </>
            )}
          </button>
          
          {loading && (
              <p className="text-xs text-center text-slate-400 animate-pulse">
                  <Video size={12} className="inline mr-1"/>
                  En iyi YouTube Shorts videoları taranıyor...
              </p>
          )}
        </form>
      </div>
    </div>
  );
};
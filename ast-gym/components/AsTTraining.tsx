import React, { useState } from 'react';
import { sefaProgram } from '../data/sefaStaticData';
import { WorkoutProgram, AppView } from '../types';
import { saveProgram } from '../services/storageService';
import { Star, CheckCircle, Info, Droplets, Moon, Utensils, AlertTriangle } from 'lucide-react';

interface AsTTrainingProps {
  onProgramLoaded: (program: WorkoutProgram) => void;
  onChangeView: (view: AppView) => void;
}

export const AsTTraining: React.FC<AsTTrainingProps> = ({ onProgramLoaded, onChangeView }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'workout' | 'nutrition'>('overview');

  const handleLoadProgram = () => {
    saveProgram(sefaProgram);
    onProgramLoaded(sefaProgram);
    alert("SEFA ÖZEL Programı başarıyla yüklendi! Antrenman Yap menüsünden kayıt tutmaya başlayabilirsin.");
    onChangeView(AppView.DASHBOARD);
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Star size={120} className="text-gym-accent" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gym-accent/20 text-gym-accent rounded-full text-xs font-bold mb-3 uppercase tracking-wider">
            Sana Özel Hazırlandı
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">SEFA ÖZEL - 3 AYLIK GYM PROGRAMI</h1>
          <p className="text-slate-300">Body Recomposition - Kas Yapımı & Yağ Yakımı</p>
          
          <div className="mt-6 flex flex-wrap gap-4">
            <button 
                onClick={handleLoadProgram}
                className="bg-gym-accent hover:bg-gym-accentHover text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-gym-accent/20 transition-all"
            >
                <CheckCircle size={20} />
                PROGRAMI SİSTEME YÜKLE
            </button>
            <div className="flex items-center text-xs text-slate-400 gap-4">
                <span>Hedef Kilo: 68-72 kg</span>
                <span>•</span>
                <span>Süre: 12 Hafta</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'overview' ? 'text-white border-b-2 border-gym-accent' : 'text-slate-400 hover:text-white'}`}
        >
          Genel Bakış & Kurallar
        </button>
        <button 
          onClick={() => setActiveTab('workout')}
          className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'workout' ? 'text-white border-b-2 border-gym-accent' : 'text-slate-400 hover:text-white'}`}
        >
          Antrenman Takvimi
        </button>
        <button 
          onClick={() => setActiveTab('nutrition')}
          className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'nutrition' ? 'text-white border-b-2 border-gym-accent' : 'text-slate-400 hover:text-white'}`}
        >
          Beslenme & Supplement
        </button>
      </div>

      {/* Content */}
      <div className="bg-gym-card rounded-xl p-6 border border-slate-700">
        
        {activeTab === 'overview' && (
            <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Info className="text-gym-accent" /> Mevcut Durum Analizi
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-900/50 p-4 rounded-lg">
                            <p className="text-sm text-slate-400">Tahmini Yağ Oranı</p>
                            <p className="text-lg font-bold text-white">%20-22 (Skinny-fat)</p>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-lg">
                            <p className="text-sm text-slate-400">Hedef</p>
                            <p className="text-lg font-bold text-white">Yağ %15-17'ye düşüş, +3kg Kas</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-red-500 mb-4 flex items-center gap-2">
                        <AlertTriangle /> KRİTİK KURALLAR (Bunları Yapmazsan Çalışmaz!)
                    </h3>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                            <Droplets className="text-blue-400 flex-shrink-0" />
                            <span className="text-slate-200 text-sm"><strong className="text-white">GÜNDE MİNİMUM 2.5 LİTRE SU:</strong> Tartışmasız! Kreatin kullanıyorsun, su içmezsen böbrekleri yorarsın ve kasların büyümez.</span>
                        </li>
                        <li className="flex items-start gap-3 bg-slate-800 p-3 rounded-lg">
                            <Moon className="text-purple-400 flex-shrink-0" />
                            <span className="text-slate-200 text-sm"><strong className="text-white">UYKU:</strong> Günde 7-8 saat. Toparlanma uykuda olur.</span>
                        </li>
                        <li className="flex items-start gap-3 bg-slate-800 p-3 rounded-lg">
                            <Utensils className="text-green-400 flex-shrink-0" />
                            <span className="text-slate-200 text-sm"><strong className="text-white">PROTEİN:</strong> Günde 140-150g protein şart. Kasın hammaddesi bu.</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-white mb-4">12 Haftalık İlerleme Planı</h3>
                    <div className="space-y-4">
                        <div className="border-l-4 border-blue-500 pl-4">
                            <h4 className="font-bold text-white">Hafta 1-4: Adaptasyon</h4>
                            <p className="text-sm text-slate-400">Su içme alışkanlığı kazan, formları öğren, kreatin yüklemesi yap.</p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                            <h4 className="font-bold text-white">Hafta 5-8: Gelişim</h4>
                            <p className="text-sm text-slate-400">Ağırlıkları her hafta %5-10 artır. Omuzlar genişlemeye başlar.</p>
                        </div>
                        <div className="border-l-4 border-red-500 pl-4">
                            <h4 className="font-bold text-white">Hafta 9-12: Yağ Yakma</h4>
                            <p className="text-sm text-slate-400">Karbonhidratı akşam azalt, antrenman sonu 15dk kardiyo ekle.</p>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {activeTab === 'workout' && (
            <div>
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Haftalık Program</h3>
                    <button onClick={handleLoadProgram} className="text-xs bg-gym-accent px-3 py-1 rounded text-white">Bu Programı Kullan</button>
                 </div>
                 
                 <div className="grid gap-4">
                    {sefaProgram.days.map((day, idx) => (
                        <div key={idx} className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                            <h4 className="font-bold text-gym-accent mb-2">{day.dayName}</h4>
                            <div className="flex flex-wrap gap-2">
                                {day.exercises.map((ex, i) => (
                                    <span key={i} className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300">
                                        {ex.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                 </div>
                 <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-sm text-yellow-200">
                    <strong>Not:</strong> Cumartesi Futbol maçın olduğu için Bacak antrenmanı Cuma yerine Salı'ya veya maça göre ayarlanmıştır. Pazar tam dinlenme.
                 </div>
            </div>
        )}

        {activeTab === 'nutrition' && (
            <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">Örnek Günlük Beslenme (2200-2400 kcal)</h3>
                    <div className="space-y-4 text-sm text-slate-300">
                        <div className="flex gap-4 p-3 bg-slate-900/50 rounded-lg">
                            <span className="font-bold text-gym-accent w-24 flex-shrink-0">10:30 Kahvaltı</span>
                            <span>3 yumurta (omlet) + 2 dilim tam buğday ekmek + peynir + domates/salatalık + 1 bardak süt (300ml su iç!)</span>
                        </div>
                        <div className="flex gap-4 p-3 bg-slate-900/50 rounded-lg">
                            <span className="font-bold text-gym-accent w-24 flex-shrink-0">13:00 Ara</span>
                            <span>1 scoop whey protein + 1 muz + 10 badem</span>
                        </div>
                        <div className="flex gap-4 p-3 bg-slate-900/50 rounded-lg">
                            <span className="font-bold text-gym-accent w-24 flex-shrink-0">16:00 Öğle</span>
                            <span>150g Tavuk/Köfte + 1 kase pilav/makarna + salata (500ml su iç!)</span>
                        </div>
                        <div className="flex gap-4 p-3 bg-slate-900/50 rounded-lg">
                            <span className="font-bold text-gym-accent w-24 flex-shrink-0">18:30 Öncesi</span>
                            <span>1 dilim ekmek + bal + 5g KREATİN (Suyla)</span>
                        </div>
                        <div className="flex gap-4 p-3 bg-slate-900/50 rounded-lg">
                            <span className="font-bold text-gym-accent w-24 flex-shrink-0">20:00 Sonrası</span>
                            <span>1 scoop whey protein + 1 muz (Salonda hemen iç)</span>
                        </div>
                        <div className="flex gap-4 p-3 bg-slate-900/50 rounded-lg">
                            <span className="font-bold text-gym-accent w-24 flex-shrink-0">21:00 Akşam</span>
                            <span>150g Et/Balık/Tavuk + Sebze + 1 kase yoğurt</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-white mb-4">Supplement Kullanımı</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                            <h4 className="font-bold text-white mb-2">1. Whey Protein</h4>
                            <p className="text-sm text-slate-400">Antrenman sonrası 30dk içinde su ile. Sabahları kahvaltıda da içilebilir.</p>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                            <h4 className="font-bold text-white mb-2">2. Kreatin</h4>
                            <p className="text-sm text-slate-400">İlk hafta günde 4x5g (Yükleme). Sonra günde sadece 5g. <br/><span className="text-red-400">BOL SU İÇMEZSEN KRAMP GİRER!</span></p>
                        </div>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};
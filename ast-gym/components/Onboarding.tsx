import React, { useState } from 'react';
import { UserPhysicalStats, HealthAnalysis, UserProfile } from '../types';
import { analyzeUserStats } from '../services/geminiService';
import { saveUserProfile } from '../services/storageService';
import { Activity, Ruler, Weight, ArrowRight, Loader2, UserCircle } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'form' | 'analyzing' | 'result'>('form');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<HealthAnalysis | null>(null);
  
  // Pre-filled with user's provided data
  const [formData, setFormData] = useState<UserPhysicalStats>({
    age: 29,
    gender: 'male',
    height: 167,
    weight: 65,
    waist: 84.5,
    neck: 37.5,
    hip: 92
  });

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('analyzing');
    setLoading(true);

    try {
      const result = await analyzeUserStats(formData);
      setAnalysis(result);
      setStep('result');
    } catch (error) {
      console.error(error);
      alert("Analiz sırasında bir hata oluştu. Lütfen tekrar deneyin.");
      setStep('form');
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    if (analysis) {
      const profile: UserProfile = {
        stats: formData,
        analysis: analysis
      };
      saveUserProfile(profile);
      onComplete(profile);
    }
  };

  if (step === 'analyzing') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 animate-fade-in">
        <div className="relative">
          <div className="absolute inset-0 bg-gym-accent/20 blur-xl rounded-full"></div>
          <Loader2 className="relative text-gym-accent animate-spin mb-6" size={64} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Vücut Analizi Yapılıyor</h2>
        <p className="text-gym-muted max-w-md">
          Yapay zeka verilerini inceliyor, yağ oranı tahmini yapıyor ve sana özel öneriler hazırlıyor...
        </p>
      </div>
    );
  }

  if (step === 'result' && analysis) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in space-y-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-4">
            <Activity className="text-green-500" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white">Analiz Tamamlandı!</h2>
          <p className="text-gym-muted">İşte fiziksel durum raporun.</p>
        </div>

        <div className="bg-gym-card border border-slate-700 rounded-2xl p-6 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-900/50 p-4 rounded-xl text-center">
              <p className="text-xs text-slate-400 mb-1">BMI</p>
              <p className="text-xl font-bold text-white">{analysis.bmi.toFixed(1)}</p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl text-center">
              <p className="text-xs text-slate-400 mb-1">Yağ Oranı</p>
              <p className="text-xl font-bold text-gym-accent">{analysis.bodyFatEstimate}</p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl text-center col-span-2 md:col-span-2">
              <p className="text-xs text-slate-400 mb-1">Vücut Tipi</p>
              <p className="text-lg font-bold text-white">{analysis.bodyType}</p>
            </div>
          </div>

          <div className="bg-gym-accent/10 border border-gym-accent/20 p-5 rounded-xl mb-6">
            <h3 className="text-gym-accent font-bold mb-2 flex items-center gap-2">
              <UserCircle size={20} /> AI Antrenör Yorumu
            </h3>
            <p className="text-slate-200 leading-relaxed italic">
              "{analysis.feedback}"
            </p>
          </div>

          <button
            onClick={handleFinish}
            className="w-full bg-white text-gym-dark hover:bg-slate-200 font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            Antrenman Programı Oluştur <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gym-accent mb-3">
          Seni Tanıyalım
        </h1>
        <p className="text-gym-muted">
          En doğru programı oluşturmak ve gelişimini takip etmek için vücut ölçülerini gir.
        </p>
      </div>

      <form onSubmit={handleAnalyze} className="bg-gym-card p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Cinsiyet</label>
            <div className="flex bg-slate-900 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setFormData({...formData, gender: 'male'})}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${formData.gender === 'male' ? 'bg-slate-700 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Erkek
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, gender: 'female'})}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${formData.gender === 'female' ? 'bg-slate-700 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Kadın
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Yaş</label>
            <input
              type="number"
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-gym-accent outline-none"
              value={formData.age}
              onChange={e => setFormData({...formData, age: Number(e.target.value)})}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Boy (cm)</label>
            <div className="relative">
              <input
                type="number"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 pl-10 text-white focus:ring-2 focus:ring-gym-accent outline-none"
                value={formData.height}
                onChange={e => setFormData({...formData, height: Number(e.target.value)})}
              />
              <Ruler className="absolute left-3 top-3.5 text-slate-500" size={16} />
            </div>
          </div>
          <div className="relative">
            <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">Kilo (kg)</label>
            <div className="relative">
              <input
                type="number"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 pl-10 text-white focus:ring-2 focus:ring-gym-accent outline-none"
                value={formData.weight}
                onChange={e => setFormData({...formData, weight: Number(e.target.value)})}
              />
              <Weight className="absolute left-3 top-3.5 text-slate-500" size={16} />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800">
            <p className="text-xs text-gym-accent mb-4 font-medium">DAHA DOĞRU ANALİZ İÇİN (OPSİYONEL)</p>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Bel (cm)</label>
                    <input
                        type="number"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-gym-accent outline-none"
                        value={formData.waist}
                        onChange={e => setFormData({...formData, waist: Number(e.target.value)})}
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Boyun (cm)</label>
                    <input
                        type="number"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-gym-accent outline-none"
                        value={formData.neck}
                        onChange={e => setFormData({...formData, neck: Number(e.target.value)})}
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Kalça (cm)</label>
                    <input
                        type="number"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-gym-accent outline-none"
                        value={formData.hip || ''}
                        placeholder={formData.gender === 'male' ? 'Ops.' : ''}
                        onChange={e => setFormData({...formData, hip: Number(e.target.value)})}
                    />
                </div>
            </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gym-accent hover:bg-gym-accentHover text-white font-bold py-4 rounded-lg shadow-lg shadow-gym-accent/20 transition-all mt-4"
        >
          Analiz Et ve Devam Et
        </button>
      </form>
    </div>
  );
};
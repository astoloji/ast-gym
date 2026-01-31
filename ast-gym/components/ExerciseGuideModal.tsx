import React, { useEffect, useState } from 'react';
import { X, Youtube, ExternalLink, Dumbbell, Loader2 } from 'lucide-react';
import { Exercise } from '../types';
import { fetchExerciseMedia } from '../services/geminiService';

interface ExerciseGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  exercise: Exercise | null;
}

export const ExerciseGuideModal: React.FC<ExerciseGuideModalProps> = ({ isOpen, onClose, exercise }) => {
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [dynamicVideos, setDynamicVideos] = useState<{ title: string; uri: string }[]>([]);

  useEffect(() => {
    if (isOpen && exercise) {
        // Check if the exercise has pre-loaded videos. If not, fetch them.
        const existingLinks = exercise.guide?.videoLinks || [];
        if (existingLinks.length === 0) {
            setLoadingVideos(true);
            fetchExerciseMedia(exercise.name)
                .then(links => {
                    setDynamicVideos(links);
                    setLoadingVideos(false);
                })
                .catch(() => setLoadingVideos(false));
        } else {
            setDynamicVideos(existingLinks);
        }
    } else {
        setDynamicVideos([]);
    }
  }, [isOpen, exercise]);

  if (!isOpen || !exercise) return null;

  const guide = exercise.guide || { howTo: "Bu egzersiz için detaylı bilgi bulunamadı.", videoLinks: [] };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-gym-card w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-700 shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors z-10"
        >
          <X size={20} className="text-white" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 pr-8">
            <div className="p-2 bg-gym-accent/10 rounded-lg">
              <Dumbbell className="text-gym-accent" />
            </div>
            {exercise.name}
          </h2>

          <div className="space-y-6">
              
            {/* Quick Tips */}
            <div className="bg-blue-900/10 border border-blue-900/30 p-4 rounded-xl">
                <h3 className="text-xs font-bold text-gym-accent uppercase tracking-wider mb-2">Püf Noktalar</h3>
                <p className="text-slate-200 text-sm leading-relaxed">
                    {guide.howTo}
                </p>
                {exercise.notes && (
                    <p className="text-yellow-400 text-xs mt-2 pt-2 border-t border-blue-900/30 italic">
                        Not: {exercise.notes}
                    </p>
                )}
            </div>

            {/* Video Links */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Hızlı İzle (Shorts/Video)</h3>
              
              {loadingVideos ? (
                  <div className="flex items-center justify-center py-8 bg-slate-900/50 rounded-lg text-gym-accent">
                      <Loader2 className="animate-spin mr-2" /> Videolar aranıyor...
                  </div>
              ) : dynamicVideos.length > 0 ? (
                <div className="grid gap-3">
                    {dynamicVideos.map((link, idx) => (
                      <a 
                        key={idx} 
                        href={link.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-slate-800 hover:bg-slate-750 hover:border-gym-accent/50 rounded-lg border border-slate-700 transition-all group"
                      >
                        <div className="bg-red-600 p-2 rounded-md text-white shadow-md">
                          <Youtube size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-white truncate group-hover:text-gym-accent transition-colors">{link.title}</h4>
                          <p className="text-[10px] text-slate-500 truncate mt-0.5">YouTube'da İzle</p>
                        </div>
                        <ExternalLink size={14} className="text-slate-500 group-hover:text-white" />
                      </a>
                    ))}
                </div>
              ) : (
                <div className="text-center py-6 text-slate-500 bg-slate-900/50 rounded-lg text-sm">
                    Video bulunamadı.
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
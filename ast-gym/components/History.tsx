import React from 'react';
import { WorkoutLogEntry } from '../types';
import { Calendar, Dumbbell, History as HistoryIcon } from 'lucide-react';

interface HistoryProps {
  logs: WorkoutLogEntry[];
}

export const History: React.FC<HistoryProps> = ({ logs }) => {
  if (logs.length === 0) {
    return (
      <div className="text-center py-20 text-gym-muted">
        <HistoryIcon className="mx-auto mb-4 opacity-50" size={48} />
        <p className="text-lg">Henüz kayıtlı bir antrenman geçmişin yok.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Calendar className="text-gym-accent" />
        Antrenman Geçmişi
      </h2>

      <div className="space-y-4">
        {logs.map((log) => (
          <div key={log.id} className="bg-gym-card border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-colors">
            <div className="bg-slate-800/50 p-4 flex justify-between items-center border-b border-slate-700">
              <div>
                <h3 className="font-bold text-white">{log.dayName}</h3>
                <p className="text-xs text-gym-muted">{log.programName}</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-mono text-gym-accent">
                  {new Date(log.date).toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  {new Date(log.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
            
            <div className="p-4">
              <div className="grid gap-2">
                {log.exercisesCompleted.map((ex, i) => (
                  <div key={i} className="flex justify-between items-center text-sm py-1 border-b border-slate-800 last:border-0">
                    <span className="text-slate-300 flex items-center gap-2">
                      <Dumbbell size={14} className="text-slate-600" />
                      {ex.name}
                    </span>
                    <span className="font-mono text-white">
                      {ex.weight > 0 ? `${ex.weight}kg x ` : ''}{ex.reps} tekrar
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
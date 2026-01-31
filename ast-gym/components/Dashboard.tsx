import React, { useState } from 'react';
import { WorkoutProgram, WorkoutLogEntry, AppView, Exercise } from '../types';
import { Trophy, Flame, Activity, Dumbbell, Info } from 'lucide-react';
import { ExerciseGuideModal } from './ExerciseGuideModal';

interface DashboardProps {
  program: WorkoutProgram | null;
  logs: WorkoutLogEntry[];
  onChangeView: (view: AppView) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ program, logs, onChangeView }) => {
  const totalWorkouts = logs.length;
  const lastWorkout = logs.length > 0 ? logs[0] : null;
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  return (
    <div className="space-y-8 animate-fade-in">
      <ExerciseGuideModal 
        isOpen={!!selectedExercise} 
        onClose={() => setSelectedExercise(null)} 
        exercise={selectedExercise} 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gym-card p-6 rounded-xl border border-slate-700/50">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gym-muted text-sm">Toplam Antrenman</p>
              <h3 className="text-3xl font-bold text-white mt-1">{totalWorkouts}</h3>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Trophy className="text-blue-500" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gym-card p-6 rounded-xl border border-slate-700/50">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gym-muted text-sm">Aktif Program</p>
              <h3 className="text-xl font-bold text-white mt-1 truncate max-w-[150px]">
                {program ? program.programName : 'Yok'}
              </h3>
            </div>
            <div className="p-3 bg-gym-accent/10 rounded-lg">
              <Flame className="text-gym-accent" size={24} />
            </div>
          </div>
          {!program && (
            <button
              onClick={() => onChangeView(AppView.GENERATOR)}
              className="text-sm text-gym-accent hover:underline"
            >
              + Oluştur
            </button>
          )}
        </div>

        <div className="bg-gym-card p-6 rounded-xl border border-slate-700/50">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gym-muted text-sm">Son Aktivite</p>
              <h3 className="text-lg font-bold text-white mt-1">
                {lastWorkout ? new Date(lastWorkout.date).toLocaleDateString('tr-TR') : '-'}
              </h3>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Activity className="text-purple-500" size={24} />
            </div>
          </div>
        </div>
      </div>

      {program ? (
        <div className="bg-gym-card rounded-xl border border-slate-700/50 overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-xl font-bold">Haftalık Planım</h2>
            <p className="text-gym-muted text-sm mt-1">{program.programName} • {program.targetGoal}</p>
          </div>
          <div className="divide-y divide-slate-700">
            {program.days.map((day, idx) => (
              <div key={idx} className="p-4 hover:bg-slate-800/50 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group">
                <div className="flex-1">
                  <h4 className="font-medium text-white mb-2">{day.dayName}</h4>
                  <div className="flex flex-wrap gap-2">
                    {day.exercises.map((ex, i) => (
                      <button 
                        key={i} 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedExercise(ex);
                        }}
                        className="text-xs bg-slate-900 hover:bg-slate-700 hover:text-white px-2 py-1 rounded text-slate-400 border border-slate-800 transition-colors flex items-center gap-1"
                      >
                        {ex.name}
                        <Info size={10} className="text-gym-accent opacity-50" />
                      </button>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => onChangeView(AppView.LOGGER)}
                  className="px-4 py-2 text-sm bg-slate-800 hover:bg-gym-accent hover:text-white rounded-lg transition-colors w-full md:w-auto text-center"
                >
                  Başla
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-gym-card rounded-xl border border-dashed border-slate-700">
          <Dumbbell className="mx-auto text-slate-600 mb-4" size={48} />
          <h3 className="text-xl font-bold mb-2">Henüz bir programın yok</h3>
          <p className="text-gym-muted mb-6 max-w-md mx-auto">
            Yapay zeka asistanın senin hedeflerine özel bir program hazırlamaya hazır.
          </p>
          <button
            onClick={() => onChangeView(AppView.GENERATOR)}
            className="bg-gym-accent hover:bg-gym-accentHover text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Hemen Program Oluştur
          </button>
        </div>
      )}
    </div>
  );
};
import React, { useState } from 'react';
import { WorkoutProgram, AppView, WorkoutLogEntry, Exercise } from '../types';
import { saveLog } from '../services/storageService';
import { Save, ArrowLeft, Check, Plus, Info } from 'lucide-react';
import { ExerciseGuideModal } from './ExerciseGuideModal';

interface LoggerProps {
  program: WorkoutProgram;
  onChangeView: (view: AppView) => void;
  onLogSaved: () => void;
}

export const WorkoutLogger: React.FC<LoggerProps> = ({ program, onChangeView, onLogSaved }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [logData, setLogData] = useState<Record<string, { weight: string; reps: string }>>({});
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const handleDaySelect = (index: number) => {
    setSelectedDayIndex(index);
    // Reset log data when day changes
    setLogData({});
  };

  const handleInputChange = (exerciseName: string, field: 'weight' | 'reps', value: string) => {
    setLogData(prev => ({
      ...prev,
      [exerciseName]: {
        ...prev[exerciseName],
        [field]: value
      }
    }));
  };

  const handleSaveWorkout = () => {
    if (selectedDayIndex === null) return;

    const currentDay = program.days[selectedDayIndex];
    
    // Convert current input state to a log entry
    const exercisesCompleted = Object.entries(logData).map(([name, data]) => {
      const typedData = data as { weight: string; reps: string };
      return {
        name,
        weight: parseFloat(typedData.weight) || 0,
        reps: parseFloat(typedData.reps) || 0
      };
    }).filter(e => e.reps > 0); // Only save exercises with reps

    if (exercisesCompleted.length === 0) {
      alert("Lütfen en az bir egzersiz verisi girin.");
      return;
    }

    const entry: WorkoutLogEntry = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      programName: program.programName,
      dayName: currentDay.dayName,
      exercisesCompleted
    };

    saveLog(entry);
    onLogSaved();
    alert("Antrenman başarıyla kaydedildi!");
    onChangeView(AppView.HISTORY);
  };

  if (selectedDayIndex === null) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Bugün hangi antrenmanı yapacaksın?</h2>
        <div className="grid gap-4">
          {program.days.map((day, idx) => (
            <button
              key={idx}
              onClick={() => handleDaySelect(idx)}
              className="bg-gym-card hover:bg-slate-800 p-6 rounded-xl border border-slate-700 text-left transition-all group"
            >
              <h3 className="text-lg font-bold group-hover:text-gym-accent transition-colors">{day.dayName}</h3>
              <p className="text-sm text-gym-muted mt-2">{day.exercises.length} Hareket</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {day.exercises.slice(0, 3).map((ex, i) => (
                  <span key={i} className="text-xs bg-slate-900 px-2 py-1 rounded text-slate-400">
                    {ex.name}
                  </span>
                ))}
                {day.exercises.length > 3 && (
                  <span className="text-xs bg-slate-900 px-2 py-1 rounded text-slate-400">
                    +{day.exercises.length - 3}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const activeDay = program.days[selectedDayIndex];

  return (
    <div className="max-w-3xl mx-auto">
      <ExerciseGuideModal 
        isOpen={!!selectedExercise} 
        onClose={() => setSelectedExercise(null)} 
        exercise={selectedExercise} 
      />

      <button 
        onClick={() => setSelectedDayIndex(null)}
        className="flex items-center text-gym-muted hover:text-white mb-6 text-sm"
      >
        <ArrowLeft size={16} className="mr-1" /> Geri Dön
      </button>

      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">{activeDay.dayName}</h2>
          <p className="text-gym-accent text-sm mt-1">{program.programName}</p>
        </div>
        <button
          onClick={handleSaveWorkout}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 shadow-lg shadow-green-900/20"
        >
          <Save size={18} /> Antrenmanı Bitir
        </button>
      </div>

      <div className="space-y-6">
        {activeDay.exercises.map((exercise, idx) => {
          const currentLog = logData[exercise.name] || { weight: '', reps: '' };
          
          return (
            <div key={idx} className="bg-gym-card p-5 rounded-xl border border-slate-700">
              <div className="mb-4 flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-lg text-white flex items-center gap-2">
                    {exercise.name}
                  </h4>
                  <div className="flex gap-4 text-xs text-gym-muted mt-1">
                    <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">Hedef: {exercise.sets} Set x {exercise.reps} Tekrar</span>
                    {exercise.rest && <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">Dinlenme: {exercise.rest}</span>}
                  </div>
                  {exercise.notes && <p className="text-xs text-yellow-500/80 mt-2 italic">{exercise.notes}</p>}
                </div>
                
                <button 
                  onClick={() => setSelectedExercise(exercise)}
                  className="p-2 text-gym-accent hover:bg-gym-accent/10 rounded-full transition-colors"
                  title="Nasıl Yapılır?"
                >
                  <Info size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-slate-900/50 p-4 rounded-lg">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Ağırlık (kg)</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-gym-accent outline-none text-center"
                    value={currentLog.weight}
                    onChange={(e) => handleInputChange(exercise.name, 'weight', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Yapılan Tekrar</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-gym-accent outline-none text-center"
                    value={currentLog.reps}
                    onChange={(e) => handleInputChange(exercise.name, 'reps', e.target.value)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
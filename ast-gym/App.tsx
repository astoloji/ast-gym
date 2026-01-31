import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { WorkoutGenerator } from './components/WorkoutGenerator';
import { WorkoutLogger } from './components/WorkoutLogger';
import { History } from './components/History';
import { Onboarding } from './components/Onboarding';
import { AsTTraining } from './components/AsTTraining';
import { AppView, WorkoutProgram, WorkoutLogEntry, UserProfile } from './types';
import { getProgram, getLogs, getUserProfile } from './services/storageService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [program, setProgram] = useState<WorkoutProgram | null>(null);
  const [logs, setLogs] = useState<WorkoutLogEntry[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Load data on mount
  useEffect(() => {
    const savedProgram = getProgram();
    const savedLogs = getLogs();
    const savedProfile = getUserProfile();
    
    if (savedProgram) setProgram(savedProgram);
    if (savedLogs) setLogs(savedLogs);
    
    if (savedProfile) {
      setUserProfile(savedProfile);
    } else {
      // Force onboarding if no profile exists
      setCurrentView(AppView.ONBOARDING);
    }
  }, []);

  const handleProgramGenerated = (newProgram: WorkoutProgram) => {
    setProgram(newProgram);
    setLogs(getLogs());
  };

  const handleLogSaved = () => {
    setLogs(getLogs());
  };

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentView(AppView.DASHBOARD);
  };

  // If we are in ONBOARDING mode, we don't render the Layout (sidebar etc) yet
  if (currentView === AppView.ONBOARDING) {
     return (
        <div className="min-h-screen bg-gym-dark flex items-center justify-center p-4">
           <div className="w-full max-w-4xl">
              <Onboarding onComplete={handleOnboardingComplete} />
           </div>
        </div>
     )
  }

  const renderContent = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return (
          <Dashboard 
            program={program} 
            logs={logs} 
            onChangeView={setCurrentView} 
          />
        );
      case AppView.GENERATOR:
        return (
          <WorkoutGenerator 
            onProgramGenerated={handleProgramGenerated} 
            onChangeView={setCurrentView} 
            userProfile={userProfile}
          />
        );
      case AppView.LOGGER:
        if (!program) {
           return (
             <div className="text-center py-20">
               <h2 className="text-xl font-bold mb-4">Önce bir program oluşturmalısın.</h2>
               <button 
                onClick={() => setCurrentView(AppView.GENERATOR)}
                className="text-gym-accent hover:underline"
               >
                 Program Oluşturucuya Git
               </button>
             </div>
           )
        }
        return (
          <WorkoutLogger 
            program={program} 
            onChangeView={setCurrentView}
            onLogSaved={handleLogSaved}
          />
        );
      case AppView.HISTORY:
        return <History logs={logs} />;
      case AppView.AST_TRAINING:
        return (
            <AsTTraining 
                onProgramLoaded={handleProgramGenerated} 
                onChangeView={setCurrentView} 
            />
        );
      default:
        return <Dashboard program={program} logs={logs} onChangeView={setCurrentView} />;
    }
  };

  return (
    <Layout currentView={currentView} onChangeView={setCurrentView}>
      {renderContent()}
    </Layout>
  );
};

export default App;
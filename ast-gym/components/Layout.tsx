import React from 'react';
import { AppView } from '../types';
import { LayoutDashboard, Dumbbell, CalendarDays, History, Menu, Star } from 'lucide-react';

interface LayoutProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentView, onChangeView, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const NavItem = ({ view, icon: Icon, label }: { view: AppView; icon: any; label: string }) => (
    <button
      onClick={() => {
        onChangeView(view);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all duration-200 ${
        currentView === view
          ? 'bg-gym-accent text-white shadow-lg shadow-gym-accent/20'
          : 'text-gym-muted hover:bg-gym-card hover:text-white'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gym-dark flex flex-col md:flex-row">
      {/* Sidebar / Mobile Header */}
      <div className="md:w-64 bg-gym-card border-r border-slate-800 flex-shrink-0">
        <div className="p-6 flex justify-between items-center md:block">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-gym-accent to-purple-500 rounded-lg flex items-center justify-center">
              <Dumbbell className="text-white" size={18} />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              AI GymTracker
            </h1>
          </div>
          <button 
            className="md:hidden text-gray-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu />
          </button>
        </div>

        <nav className={`px-4 pb-4 md:block ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="space-y-2">
            <NavItem view={AppView.AST_TRAINING} icon={Star} label="AsT Training (ÖZEL)" />
            <div className="h-px bg-slate-700 my-2 mx-4 opacity-50"></div>
            <NavItem view={AppView.DASHBOARD} icon={LayoutDashboard} label="Panel" />
            <NavItem view={AppView.GENERATOR} icon={Dumbbell} label="AI Program Oluştur" />
            <NavItem view={AppView.LOGGER} icon={CalendarDays} label="Antrenman Yap" />
            <NavItem view={AppView.HISTORY} icon={History} label="Geçmiş" />
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-700 px-4">
            <p className="text-xs text-slate-500 text-center">
              Wordpress Eklentisi Prototipi v1.2
              <br />Powered by Gemini AI
            </p>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
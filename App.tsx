
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Inspiration from './components/Inspiration';
import PaletteTool from './components/PaletteTool';
import ChatRoom from './components/ChatRoom';
import Business from './components/Business';
import Login from './components/Login';
import Reels from './components/Reels';
import ProfileEdit from './components/ProfileEdit';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('feed');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const renderView = () => {
    switch (currentView) {
      case 'feed':
        return <Feed />;
      case 'reels':
        return <Reels />;
      case 'inspiration':
        return <Inspiration />;
      case 'palettes':
        return <PaletteTool />;
      case 'chat':
        return <ChatRoom />;
      case 'business':
        return <Business />;
      case 'profile':
        return <ProfileEdit />;
      default:
        return <Feed />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex bg-[#fbfcfd]">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">
              {currentView === 'feed' && 'Designer Hub'}
              {currentView === 'reels' && 'DU Reels'}
              {currentView === 'inspiration' && 'Criatividade IA'}
              {currentView === 'palettes' && 'Cromia Digital'}
              {currentView === 'chat' && 'Consultoria'}
              {currentView === 'business' && 'Hub de Negócios'}
              {currentView === 'profile' && 'Perfil Global'}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Provided by Suquina Designer</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all shadow-sm hover:shadow-md">
              <i className="fa-regular fa-bell text-xl"></i>
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-10 w-[1px] bg-slate-100 mx-2 hidden md:block"></div>
            <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl hover:bg-indigo-600 transition-all hover:-translate-y-1 active:translate-y-0">
              <i className="fa-solid fa-plus-circle text-lg"></i>
              <span className="hidden md:inline">Novo Briefing</span>
            </button>
          </div>
        </header>

        <div className="animate-fadeIn">
          {renderView()}
        </div>
      </main>

      {/* Persistent CTA / Magic Button */}
      <div className="fixed bottom-10 right-10 z-50">
        <button 
          onClick={() => setCurrentView('inspiration')}
          className="w-18 h-18 w-20 h-20 bg-indigo-600 text-white rounded-[2rem] shadow-[0_20px_50px_rgba(79,70,229,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
          title="Inspiração IA"
        >
          <i className="fa-solid fa-wand-magic-sparkles text-3xl group-hover:rotate-12 transition-transform"></i>
        </button>
      </div>
    </div>
  );
};

export default App;

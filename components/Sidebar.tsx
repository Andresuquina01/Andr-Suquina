
import React from 'react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const menuItems = [
    { id: 'feed', icon: 'fa-house', label: 'Início' },
    { id: 'reels', icon: 'fa-clapperboard', label: 'Reels' },
    { id: 'inspiration', icon: 'fa-lightbulb', label: 'Inspiração' },
    { id: 'palettes', icon: 'fa-palette', label: 'Paletas' },
    { id: 'business', icon: 'fa-briefcase', label: 'Negócios' },
    { id: 'chat', icon: 'fa-comments', label: 'Comunidade' },
    { id: 'profile', icon: 'fa-user-gear', label: 'Perfil' },
  ];

  return (
    <aside className="fixed bottom-0 w-full bg-white border-t md:border-t-0 md:border-r border-slate-100 md:h-screen md:sticky md:top-0 md:w-20 lg:w-64 flex md:flex-col transition-all duration-500 z-[60] shadow-2xl md:shadow-none">
      {/* Brand Header - Hidden on mobile bottom bar */}
      <div className="hidden md:flex p-6 items-center gap-3 mb-4">
        <div className="bg-black w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6">
          <span className="font-serif text-xl font-bold">DU</span>
        </div>
        <div className="hidden lg:block overflow-hidden">
          <span className="font-black text-lg text-slate-900 tracking-tight leading-none block">Designer</span>
          <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase">US Platform</span>
        </div>
      </div>

      <nav className="flex flex-row md:flex-col flex-1 px-2 md:px-3 py-2 md:py-0 space-x-1 md:space-x-0 md:space-y-1 items-center md:items-stretch justify-around md:justify-start w-full">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id as View)}
            className={`flex items-center md:gap-4 px-3 md:px-4 py-3 rounded-2xl transition-all duration-300 group ${
              currentView === item.id
                ? 'bg-slate-950 text-white shadow-xl scale-105 md:scale-100'
                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-lg w-6 flex justify-center ${currentView === item.id ? 'animate-pulse' : 'group-hover:scale-110'}`}></i>
            <span className="hidden lg:block font-black text-[10px] uppercase tracking-[0.2em]">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Profile Shortcut - Hidden on mobile bar */}
      <div className="hidden md:block p-4 border-t border-slate-50">
        <div 
          onClick={() => setCurrentView('profile')}
          className="flex items-center gap-3 p-2 lg:p-3 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer group"
        >
          <img
            src="https://picsum.photos/seed/user123/100/100"
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm group-hover:scale-110 transition-transform"
            alt="Profile"
          />
          <div className="hidden lg:block overflow-hidden">
            <p className="text-xs font-black text-slate-900 truncate">S. Designer</p>
            <p className="text-[8px] text-indigo-600 font-black uppercase tracking-widest">Global Reach</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;


import React, { useState } from 'react';
import { User } from '../types';

const INITIAL_USER: User = {
  id: 'me',
  name: 'Seu Nome de Designer',
  username: 'suquina_creations',
  email: 'design@suquina.com',
  phone: '+351 900 000 000',
  bio: 'Criando mundos visuais através do Suquina Designer. Especialista em Branding e UI de alta performance.',
  avatar: 'https://picsum.photos/seed/user123/200/200',
  location: 'Global / Remote',
  isPro: true
};

const ProfileEdit: React.FC = () => {
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [isSaved, setIsSaved] = useState(false);
  const [isGlobalVisible, setIsGlobalVisible] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    // In a real app, logic for updating global visibility settings would go here.
  };

  return (
    <div className="max-w-4xl mx-auto pb-24 animate-fadeIn">
      <div className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden">
        {/* Profile Banner */}
        <div className="h-56 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600 to-transparent"></div>
          </div>
          <div className="absolute -bottom-16 left-12">
            <div className="relative group">
              <img 
                src={user.avatar} 
                className="w-36 h-36 rounded-[2.8rem] border-8 border-white shadow-2xl object-cover transition-transform group-hover:scale-105 duration-500"
                alt="Profile"
              />
              <button className="absolute inset-0 bg-black/40 rounded-[2.8rem] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white backdrop-blur-sm">
                <i className="fa-solid fa-camera-retro text-2xl"></i>
              </button>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSave} className="pt-24 px-8 md:px-14 pb-14 space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Gestão de Identidade</h2>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Configurações de visibilidade em todos os dispositivos</p>
            </div>
            <div className="flex items-center gap-3">
               <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Alcance Global</span>
                  <button 
                    type="button"
                    onClick={() => setIsGlobalVisible(!isGlobalVisible)}
                    className={`w-10 h-5 rounded-full transition-all relative ${isGlobalVisible ? 'bg-indigo-600' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isGlobalVisible ? 'right-1' : 'left-1'}`}></div>
                  </button>
               </div>
               {isSaved && (
                <span className="bg-emerald-500 text-white px-5 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-emerald-200 animate-bounce">
                  Sucesso!
                </span>
               )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 group-focus-within:text-indigo-600 transition-colors">Nome de Apresentação</label>
              <input 
                type="text" 
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
              />
            </div>
            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 group-focus-within:text-indigo-600 transition-colors">Username (@)</label>
              <input 
                type="text" 
                name="username"
                value={user.username}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
              />
            </div>
            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 group-focus-within:text-indigo-600 transition-colors">Email Corporativo</label>
              <input 
                type="email" 
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
              />
            </div>
            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 group-focus-within:text-indigo-600 transition-colors">Telemóvel Global</label>
              <div className="relative">
                <input 
                  type="text" 
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                />
                <i className="fa-solid fa-phone absolute right-6 top-1/2 -translate-y-1/2 text-slate-300"></i>
              </div>
            </div>
          </div>

          <div className="space-y-2 group">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 group-focus-within:text-indigo-600 transition-colors">Mini Biografia Profissional</label>
            <textarea 
              name="bio"
              value={user.bio}
              onChange={handleChange}
              rows={4}
              className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] py-5 px-8 text-slate-900 font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none leading-relaxed"
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 pt-6">
            <button 
              type="submit"
              className="flex-1 bg-black text-white px-10 py-5 rounded-[2rem] text-xs font-black uppercase tracking-[0.25em] shadow-2xl hover:bg-indigo-600 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <i className="fa-solid fa-cloud-arrow-up"></i>
              Publicar Ajustes
            </button>
            <button 
              type="button"
              className="flex-1 bg-slate-100 text-slate-500 px-10 py-5 rounded-[2rem] text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-3"
            >
              <i className="fa-solid fa-rotate-left"></i>
              Reverter
            </button>
          </div>
        </form>
      </div>
      
      <div className="mt-8 text-center p-8 bg-slate-950/5 rounded-[2.5rem] border border-slate-100">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Compatibilidade Verificada</p>
        <div className="flex justify-center gap-8 text-slate-300 text-2xl">
          <i className="fa-brands fa-apple" title="iOS v3+"></i>
          <i className="fa-brands fa-android" title="Android All Versions"></i>
          <i className="fa-solid fa-desktop" title="PC/Web Optimized"></i>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;

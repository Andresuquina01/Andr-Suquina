
import React, { useState } from 'react';

const REELS_DATA = [
  {
    id: '1',
    creator: 'Suquina Designer',
    avatar: 'https://picsum.photos/seed/sp/100/100',
    description: 'Processo de criação do novo logo minimalista. #Branding #DesignProcess',
    videoThumb: 'https://picsum.photos/seed/reel1/400/700',
    likes: '12.4K',
    comments: '842',
    shares: '3.1K'
  },
  {
    id: '2',
    creator: 'Creative Mind',
    avatar: 'https://picsum.photos/seed/cm/100/100',
    description: 'Dica rápida de tipografia no Figma! 🔥 #UIDesign #Tips',
    videoThumb: 'https://picsum.photos/seed/reel2/400/700',
    likes: '8.2K',
    comments: '215',
    shares: '1.2K'
  },
  {
    id: '3',
    creator: 'Motion Master',
    avatar: 'https://picsum.photos/seed/mm/100/100',
    description: 'Animação fluida feita em 30 minutos. #AfterEffects #Motion',
    videoThumb: 'https://picsum.photos/seed/reel3/400/700',
    likes: '45.1K',
    comments: '2.4K',
    shares: '12K'
  }
];

const Reels: React.FC = () => {
  return (
    <div className="flex justify-center h-[calc(100vh-140px)] overflow-y-scroll snap-y snap-mandatory no-scrollbar pb-20">
      <div className="w-full max-w-[420px] space-y-4">
        {REELS_DATA.map(reel => (
          <div key={reel.id} className="relative aspect-[9/16] bg-black rounded-[2.5rem] overflow-hidden snap-start shadow-2xl">
            <img src={reel.videoThumb} className="w-full h-full object-cover opacity-80" alt="Reel content" />
            
            {/* Overlay Info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <img src={reel.avatar} className="w-10 h-10 rounded-full border-2 border-white" alt={reel.creator} />
                <span className="font-bold text-lg">{reel.creator}</span>
                <button className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold border border-white/30 hover:bg-white/40 transition-all">Seguir</button>
              </div>
              <p className="text-sm line-clamp-2 mb-4 leading-relaxed opacity-90">{reel.description}</p>
              
              <div className="flex items-center gap-4 text-xs font-bold text-white/60">
                <span className="flex items-center gap-1"><i className="fa-solid fa-music"></i> Audio Original</span>
              </div>
            </div>

            {/* Interaction Sidebar */}
            <div className="absolute right-4 bottom-24 flex flex-col gap-6 text-white items-center">
              <div className="flex flex-col items-center">
                <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl hover:bg-rose-500 transition-colors">
                  <i className="fa-solid fa-heart"></i>
                </button>
                <span className="text-xs font-bold mt-1">{reel.likes}</span>
              </div>
              <div className="flex flex-col items-center">
                <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl hover:bg-indigo-500 transition-colors">
                  <i className="fa-solid fa-comment"></i>
                </button>
                <span className="text-xs font-bold mt-1">{reel.comments}</span>
              </div>
              <div className="flex flex-col items-center">
                <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl hover:bg-emerald-500 transition-colors">
                  <i className="fa-solid fa-share"></i>
                </button>
                <span className="text-xs font-bold mt-1">{reel.shares}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reels;

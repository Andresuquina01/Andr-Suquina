
import React, { useState } from 'react';
import { Post } from '../types';

const MOCK_POSTS: Post[] = [
  {
    id: 'featured-1',
    author: 'Suquina Designer',
    authorId: 'sp',
    avatar: 'https://picsum.photos/seed/sp/100/100',
    title: 'Masterclass: O Futuro da Identidade Visual',
    image: 'https://picsum.photos/seed/featured/800/600',
    isFollowing: true,
    isFeatured: true,
    reactions: { amei: 1245, preciso: 812, farei: 450, negocio: 89, gostei: 3200 },
    comments: 418,
    tags: ['Estratégia', 'Branding', 'DesignHub']
  },
  {
    id: '1',
    author: 'Alex Rivera',
    authorId: 'u1',
    avatar: 'https://picsum.photos/seed/alex/100/100',
    title: 'Minimalist Brand Identity for "Lumina"',
    image: 'https://picsum.photos/seed/design1/800/600',
    isFollowing: false,
    reactions: { amei: 45, preciso: 12, farei: 8, negocio: 3, gostei: 112 },
    comments: 18,
    tags: ['Branding', 'Minimalism', 'Logo']
  },
  {
    id: '2',
    author: 'Sofia Chen',
    authorId: 'u2',
    avatar: 'https://picsum.photos/seed/sofia/100/100',
    title: 'Retro UI Exploration: 80s Synthwave Vibes',
    image: 'https://picsum.photos/seed/design2/800/600',
    isFollowing: true,
    reactions: { amei: 89, preciso: 34, farei: 15, negocio: 7, gostei: 245 },
    comments: 42,
    tags: ['UI Design', 'Retro', 'Synthwave']
  }
];

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [critiqueId, setCritiqueId] = useState<string | null>(null);

  const toggleFollow = (postId: string) => {
    setPosts(prev => prev.map(p => 
      p.id === postId ? { ...p, isFollowing: !p.isFollowing } : p
    ));
  };

  const addReaction = (postId: string, type: keyof Post['reactions']) => {
    setPosts(prev => prev.map(p => 
      p.id === postId ? { ...p, reactions: { ...p.reactions, [type]: p.reactions[type] + 1 } } : p
    ));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      {/* Search and Featured Filter */}
      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2">
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-full text-xs font-extrabold whitespace-nowrap shadow-lg shadow-indigo-100">Explorar Tudo</button>
        <button className="bg-white text-slate-500 border border-slate-200 px-6 py-2 rounded-full text-xs font-extrabold whitespace-nowrap hover:bg-slate-50">Trendings</button>
        <button className="bg-white text-slate-500 border border-slate-200 px-6 py-2 rounded-full text-xs font-extrabold whitespace-nowrap hover:bg-slate-50">Logotipos</button>
        <button className="bg-white text-slate-500 border border-slate-200 px-6 py-2 rounded-full text-xs font-extrabold whitespace-nowrap hover:bg-slate-50">Web Design</button>
      </div>

      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 mb-8">
        <div className="flex gap-4">
          <img src="https://picsum.photos/seed/user123/100/100" className="w-12 h-12 rounded-full" alt="Me" />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-800 mb-2 tracking-tight leading-none">Crie sua próxima obra-prima...</h2>
            <div className="bg-slate-50 rounded-2xl p-4 flex items-center text-slate-400 cursor-pointer hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200">
              Compartilhe seu progresso com a Designer US Community...
            </div>
          </div>
        </div>
      </div>

      {posts.map(post => (
        <div key={post.id} className={`bg-white rounded-[3rem] overflow-hidden shadow-sm border ${post.isFeatured ? 'border-indigo-100 ring-2 ring-indigo-50' : 'border-slate-100'} group transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-50/50 relative`}>
          {post.isFeatured && (
            <div className="absolute top-0 right-0 p-6 z-10">
              <span className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-xl animate-pulse">
                Destaque Especial
              </span>
            </div>
          )}
          
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img src={post.avatar} className="w-14 h-14 rounded-2xl object-cover border-4 border-white shadow-md rotate-3 group-hover:rotate-0 transition-transform" alt={post.author} />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-indigo-500 border-2 border-white rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-check text-[10px] text-white"></i>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <p className="font-black text-slate-800 text-xl tracking-tight leading-none">{post.author}</p>
                  <button 
                    onClick={() => toggleFollow(post.id)}
                    className={`text-[10px] font-extrabold uppercase px-3 py-1 rounded-full transition-all tracking-wider ${
                      post.isFollowing 
                        ? 'bg-slate-100 text-slate-500 border border-slate-200' 
                        : 'bg-black text-white shadow-xl hover:scale-105 active:scale-95'
                    }`}
                  >
                    {post.isFollowing ? 'Seguindo' : '+ Seguir'}
                  </button>
                </div>
                <p className="text-xs text-indigo-500 mt-1 font-bold uppercase tracking-widest">
                  {post.authorId === 'sp' ? 'Top Influencer / App Creator' : 'Professional Creator'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
               <button 
                 onClick={() => setCritiqueId(critiqueId === post.id ? null : post.id)}
                 className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-2xl hover:bg-indigo-600 transition-all flex items-center gap-2 shadow-lg"
                 title="Fazer uma crítica técnica"
               >
                 <i className="fa-solid fa-shield-halved"></i> Crítica
               </button>
            </div>
          </div>

          <div className="relative overflow-hidden aspect-[4/3] mx-6 rounded-[2.5rem]">
            <img 
              src={post.image} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              alt={post.title} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
               <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                 <h3 className="text-3xl font-black mb-3 tracking-tight leading-tight">{post.title}</h3>
                 <div className="flex gap-3">
                   {post.tags.map(tag => (
                     <span key={tag} className="text-[11px] font-black uppercase tracking-widest bg-white/10 backdrop-blur-xl px-4 py-1.5 rounded-xl border border-white/20">#{tag}</span>
                   ))}
                 </div>
               </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button onClick={() => addReaction(post.id, 'amei')} className="flex items-center gap-2 bg-slate-50 hover:bg-rose-50 text-slate-800 hover:text-rose-600 px-4 py-2 rounded-2xl text-xs font-black transition-all active:scale-90 border border-slate-100">
                ❤️ AMEI <span className="opacity-40">{post.reactions.amei}</span>
              </button>
              <button onClick={() => addReaction(post.id, 'preciso')} className="flex items-center gap-2 bg-slate-50 hover:bg-indigo-50 text-slate-800 hover:text-indigo-600 px-4 py-2 rounded-2xl text-xs font-black transition-all active:scale-90 border border-slate-100">
                💎 PRECISO <span className="opacity-40">{post.reactions.preciso}</span>
              </button>
              <button onClick={() => addReaction(post.id, 'farei')} className="flex items-center gap-2 bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-600 px-4 py-2 rounded-2xl text-xs font-black transition-all active:scale-90 border border-slate-100">
                🛠️ FAREI <span className="opacity-40">{post.reactions.farei}</span>
              </button>
              <button onClick={() => addReaction(post.id, 'negocio')} className="flex items-center gap-2 bg-slate-50 hover:bg-amber-50 text-slate-800 hover:text-amber-600 px-4 py-2 rounded-2xl text-xs font-black transition-all active:scale-90 border border-slate-100">
                🤝 NEGÓCIO <span className="opacity-40">{post.reactions.negocio}</span>
              </button>
              <button onClick={() => addReaction(post.id, 'gostei')} className="flex items-center gap-2 bg-slate-50 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-2xl text-xs font-black transition-all active:scale-90 border border-slate-100">
                👍 GOSTEI <span className="opacity-40">{post.reactions.gostei}</span>
              </button>
            </div>

            {critiqueId === post.id && (
              <div className="mb-8 p-6 bg-slate-900 rounded-3xl border border-slate-800 animate-slideDown shadow-2xl">
                <h4 className="text-white font-black text-sm mb-4 flex items-center gap-3 tracking-widest uppercase">
                   <i className="fa-solid fa-pen-nib text-indigo-400"></i> Crítica Técnica Especializada
                </h4>
                <textarea 
                  placeholder="Seja construtivo: o que pode melhorar em composição, tipografia ou hierarquia?"
                  className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-2xl p-5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none placeholder:text-slate-600"
                  rows={4}
                ></textarea>
                <div className="flex justify-end mt-4">
                  <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl text-xs font-black tracking-widest uppercase hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20">Enviar Feedback</button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <div className="flex items-center gap-8">
                <button className="flex items-center gap-3 text-slate-400 hover:text-indigo-600 transition-colors">
                  <i className="fa-regular fa-comment text-2xl"></i>
                  <span className="text-xs font-black uppercase tracking-widest">{post.comments} Comentários</span>
                </button>
                <button className="flex items-center gap-3 text-slate-400 hover:text-emerald-500 transition-colors">
                  <i className="fa-regular fa-paper-plane text-2xl"></i>
                  <span className="text-xs font-black uppercase tracking-widest">Partilhar</span>
                </button>
              </div>
              <button className="text-slate-300 hover:text-indigo-600 transition-colors">
                <i className="fa-regular fa-bookmark text-2xl"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;

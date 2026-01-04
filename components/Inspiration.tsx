
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';

interface Idea {
  title: string;
  description: string;
  keywords: string[];
}

const Inspiration: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const result = await geminiService.generateDesignInspiration(topic);
      setIdeas(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-800">Encontre sua Próxima Grande Ideia</h1>
        <p className="text-slate-500 max-w-xl mx-auto">Use a inteligência artificial para quebrar o bloqueio criativo e descobrir novos conceitos de design.</p>
        
        <div className="flex max-w-2xl mx-auto mt-8 bg-white p-2 rounded-2xl shadow-xl border border-slate-100">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ex: App de delivery ecológico, Branding para café futurista..."
            className="flex-1 bg-transparent px-4 outline-none text-slate-700"
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all disabled:opacity-50"
          >
            {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-sparkles"></i>}
            Inspirar
          </button>
        </div>
      </div>

      {ideas.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
          {ideas.map((idea, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 text-xl">
                {idx === 0 ? <i className="fa-solid fa-wand-sparkles"></i> : idx === 1 ? <i className="fa-solid fa-pen-nib"></i> : <i className="fa-solid fa-layer-group"></i>}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{idea.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{idea.description}</p>
              <div className="flex flex-wrap gap-2">
                {idea.keywords.map(kw => (
                  <span key={kw} className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {ideas.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-300">
          <i className="fa-solid fa-lightbulb text-6xl mb-4"></i>
          <p className="text-lg font-medium">Digite um tema acima para começar</p>
        </div>
      )}
    </div>
  );
};

export default Inspiration;

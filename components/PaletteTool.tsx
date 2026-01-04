
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';

interface Palette {
  name: string;
  description: string;
  colors: string[];
}

const PaletteTool: React.FC = () => {
  const [mood, setMood] = useState('');
  const [palette, setPalette] = useState<Palette | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!mood) return;
    setLoading(true);
    try {
      const result = await geminiService.generateColorPalette(mood);
      setPalette(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    alert(`Cor ${color} copiada!`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-extrabold text-slate-800">Gerador Cromático Inteligente</h1>
          <p className="text-lg text-slate-600">Transforme emoções e conceitos em paletas profissionais harmonizadas com IA.</p>
          
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-500 uppercase tracking-widest">Descreva o Clima</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                placeholder="Ex: Verão Tropical, Minimalismo Escandinavo..."
                className="flex-1 bg-white border border-slate-200 px-5 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
              />
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 disabled:opacity-50 shadow-lg shadow-indigo-100"
              >
                {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : 'Gerar'}
              </button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2">
           {palette ? (
             <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 animate-fadeIn">
               <div className="h-64 flex rounded-2xl overflow-hidden mb-6 shadow-inner">
                 {palette.colors.map((color, i) => (
                   <div
                     key={i}
                     style={{ backgroundColor: color }}
                     onClick={() => copyToClipboard(color)}
                     className="flex-1 group relative cursor-pointer flex items-end justify-center pb-4 transition-all hover:flex-[1.5]"
                   >
                     <span className="opacity-0 group-hover:opacity-100 bg-black/30 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded transition-opacity">
                       {color}
                     </span>
                   </div>
                 ))}
               </div>
               <h3 className="text-2xl font-bold text-slate-800">{palette.name}</h3>
               <p className="text-slate-500 mt-3 text-sm leading-relaxed">{palette.description}</p>
             </div>
           ) : (
             <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl h-80 flex items-center justify-center text-slate-400">
                Sua paleta aparecerá aqui
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default PaletteTool;

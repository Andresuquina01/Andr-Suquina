
import React, { useState } from 'react';
import { Negotiation, ScheduledPost } from '../types';
import { geminiService } from '../services/geminiService';

const Business: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'negotiations' | 'scheduler'>('negotiations');
  const [adviceRequest, setAdviceRequest] = useState('');
  const [adviceResponse, setAdviceResponse] = useState('');
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  const [negotiations] = useState<Negotiation[]>([
    { id: '1', clientName: 'Studio Fit', projectTitle: 'Branding Completo', status: 'Ativa', value: 'R$ 2.500', deadline: '15/06' },
    { id: '2', clientName: 'EcoWorld NGO', projectTitle: 'Campanha Social Media', status: 'Pendente', value: 'R$ 1.200', deadline: '02/06' },
    { id: '3', clientName: 'Cyber Cafè', projectTitle: 'Logo & Cardápio', status: 'Concluída', value: 'R$ 800', deadline: '20/05' },
  ]);

  const [schedules] = useState<ScheduledPost[]>([
    { id: '1', title: 'Lançamento Coleção Outono', platform: 'Instagram', date: '2024-05-25', time: '18:00', status: 'Agendado' },
    { id: '2', title: 'Tutorial Photoshop Tips', platform: 'LinkedIn', date: '2024-05-26', time: '10:00', status: 'Rascunho' },
    { id: '3', title: 'Showcase Portfólio 2024', platform: 'Behance', date: '2024-05-28', time: '09:00', status: 'Agendado' },
  ]);

  const handleGetAdvice = async () => {
    if (!adviceRequest) return;
    setLoadingAdvice(true);
    try {
      const res = await geminiService.getBusinessAdvice(adviceRequest);
      setAdviceResponse(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAdvice(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex gap-1 bg-white p-1 rounded-2xl shadow-sm border border-slate-100 mb-8 w-fit">
        <button
          onClick={() => setActiveTab('negotiations')}
          className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'negotiations' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <i className="fa-solid fa-handshake-angle mr-2"></i> Negociações
        </button>
        <button
          onClick={() => setActiveTab('scheduler')}
          className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'scheduler' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <i className="fa-solid fa-calendar-days mr-2"></i> Agendamentos
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'negotiations' ? (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Cliente</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Projeto</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Valor</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {negotiations.map(neg => (
                    <tr key={neg.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-800">{neg.clientName}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600">{neg.projectTitle}</p>
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-emerald-600">{neg.value}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide ${
                          neg.status === 'Ativa' ? 'bg-indigo-50 text-indigo-600' : 
                          neg.status === 'Pendente' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          {neg.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-indigo-600"><i className="fa-solid fa-message"></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-center">
                <button className="text-indigo-600 font-bold text-sm hover:underline">Abrir Nova Negociação +</button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {schedules.map(post => (
                <div key={post.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${
                      post.platform === 'Instagram' ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600' :
                      post.platform === 'LinkedIn' ? 'bg-blue-600' : 'bg-slate-900'
                    }`}>
                      <i className={`fa-brands fa-${post.platform.toLowerCase()}`}></i>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                      post.status === 'Agendado' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">{post.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span><i className="fa-regular fa-calendar mr-1"></i> {post.date}</span>
                    <span><i className="fa-regular fa-clock mr-1"></i> {post.time}</span>
                  </div>
                  <button className="w-full mt-6 py-2 bg-slate-50 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-100 transition-colors">
                    Editar Publicação
                  </button>
                </div>
              ))}
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-slate-400 cursor-pointer hover:border-indigo-300 hover:text-indigo-400 transition-all">
                <i className="fa-solid fa-circle-plus text-3xl mb-2"></i>
                <p className="font-bold">Agendar Publicidade</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 text-white shadow-xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <i className="fa-solid fa-robot"></i> Assistente de Propostas
            </h3>
            <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
              Descreva o trabalho que deseja cobrar e nossa IA ajudará com valores de mercado e argumentos de venda.
            </p>
            <textarea
              value={adviceRequest}
              onChange={(e) => setAdviceRequest(e.target.value)}
              placeholder="Ex: Identidade visual para uma cafeteria artesanal em SP..."
              className="w-full h-32 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-sm placeholder:text-indigo-200 outline-none focus:ring-2 focus:ring-white/50 mb-4"
            ></textarea>
            <button
              onClick={handleGetAdvice}
              disabled={loadingAdvice || !adviceRequest}
              className="w-full bg-white text-indigo-600 py-3 rounded-2xl font-bold hover:bg-indigo-50 transition-colors disabled:opacity-50"
            >
              {loadingAdvice ? <i className="fa-solid fa-spinner animate-spin"></i> : 'Gerar Orçamento Base'}
            </button>
          </div>

          {adviceResponse && (
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm animate-fadeIn">
              <h4 className="font-bold text-slate-800 mb-4 border-b pb-2">Análise Estratégica</h4>
              <div className="prose prose-sm text-slate-600 max-h-60 overflow-y-auto custom-scrollbar">
                {adviceResponse.split('\n').map((line, i) => (
                  <p key={i} className="mb-2">{line}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Business;

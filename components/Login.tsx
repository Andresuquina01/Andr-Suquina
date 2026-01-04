
import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'credentials' | 'social'>('credentials');
  const [formData, setFormData] = useState({
    identifier: '',
    phone: '',
    password: '',
    name: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="fixed inset-0 bg-slate-950 flex items-center justify-center p-4 overflow-y-auto custom-scrollbar">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-indigo-600/20 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-rose-600/20 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="bg-white/5 backdrop-blur-3xl w-full max-w-lg rounded-[3rem] shadow-[0_0_120px_rgba(0,0,0,0.6)] border border-white/10 z-10 my-10 animate-fadeIn">
        <div className="p-8 md:p-14">
          <header className="text-center mb-10">
            <div className="inline-flex bg-white w-20 h-20 rounded-[2.2rem] flex-col items-center justify-center text-black shadow-2xl mb-6 transform hover:scale-110 transition-transform duration-500 cursor-pointer">
              <span className="font-serif text-3xl font-black leading-none">DU</span>
              <span className="text-[7px] font-black uppercase tracking-tighter">Designer US</span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Designer US</h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-2">By Suquina Designer</p>
          </header>

          <div className="flex bg-white/5 p-1.5 rounded-2xl mb-8 border border-white/5">
            <button 
              onClick={() => setIsRegistering(false)}
              className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${!isRegistering ? 'bg-white text-black shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              Entrar
            </button>
            <button 
              onClick={() => setIsRegistering(true)}
              className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isRegistering ? 'bg-white text-black shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              Registar
            </button>
          </div>

          {loginMethod === 'credentials' ? (
            <form onSubmit={handleSubmit} className="space-y-5 animate-fadeIn">
              {isRegistering && (
                <div className="space-y-2 group">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-4 group-focus-within:text-indigo-400 transition-colors">Nome Completo</label>
                  <input 
                    type="text" 
                    placeholder="Como o mundo deve te chamar?"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-sm font-medium"
                    required
                  />
                </div>
              )}
              
              <div className="space-y-2 group">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-4 group-focus-within:text-indigo-400 transition-colors">
                  {isRegistering ? 'Email ou Telemóvel' : 'Usuário, Email ou Telemóvel'}
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder={isRegistering ? "+351 9xx xxx xxx ou email..." : "Seu identificador global..."}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm font-medium"
                    required
                  />
                  <i className="fa-solid fa-globe absolute right-6 top-1/2 -translate-y-1/2 text-slate-700"></i>
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-4 group-focus-within:text-indigo-400 transition-colors">Senha de Acesso</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm font-medium"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-indigo-600 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] text-white hover:bg-indigo-500 transition-all shadow-[0_20px_40px_rgba(79,70,229,0.3)] active:scale-95 mt-4"
              >
                {isRegistering ? 'Criar Perfil Global' : 'Aceder ao Hub'}
              </button>
              
              <div className="text-center pt-4">
                 <button 
                  type="button"
                  onClick={() => setLoginMethod('social')}
                  className="text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
                 >
                   Ou use Redes Sociais
                 </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              <button onClick={onLogin} className="w-full flex items-center justify-center gap-4 bg-white py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest text-black hover:bg-slate-100 transition-all active:scale-95 shadow-xl">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                Google Global
              </button>
              <button onClick={onLogin} className="w-full flex items-center justify-center gap-4 bg-[#1877F2] py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest text-white hover:bg-opacity-90 transition-all active:scale-95 shadow-xl">
                <i className="fa-brands fa-facebook text-xl"></i>
                Facebook Hub
              </button>
              <button onClick={onLogin} className="w-full flex items-center justify-center gap-4 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest text-white hover:opacity-90 transition-all active:scale-95 shadow-xl">
                <i className="fa-brands fa-instagram text-xl"></i>
                Instagram Connect
              </button>
              <div className="text-center pt-4">
                 <button 
                  type="button"
                  onClick={() => setLoginMethod('credentials')}
                  className="text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
                 >
                   Voltar para login direto
                 </button>
              </div>
            </div>
          )}

          <footer className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em] leading-relaxed">
              Disponível para iOS, Android & PC <br/>
              <span className="text-white opacity-40">Versão 3.0.4 Global Reach</span>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;

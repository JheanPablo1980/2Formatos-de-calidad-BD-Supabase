import React from 'react';
import { LogIn, ShieldAlert, Users, Info, ArrowRight, Zap, Database, Camera, FileText, Layout, AlertCircle } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { motion } from 'motion/react';
import { isSupabaseConfigured } from '../lib/supabase';

export const Login: React.FC = () => {
  const { signIn, devLogin } = useAppStore();

  return (
    <div className="min-h-screen bg-[#07090d] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side: Impactful Visual */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex flex-col space-y-8"
        >
          <div className="space-y-4">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10 }}
              className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/50"
            >
              <Zap size={32} className="text-white fill-white" />
            </motion.div>
            <h1 className="text-6xl font-black text-white tracking-tighter leading-none italic uppercase">
              Protocolos <br />
              <span className="text-blue-500">Inteligentes</span>
            </h1>
            <p className="text-slate-400 text-xl font-medium max-w-md leading-relaxed">
              Gestión avanzada de activos e instrumentación industrial para plantas Smurfit Westrock.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Database, label: 'Centralizado', desc: 'Base de datos en tiempo real' },
              { icon: Camera, label: 'Foto-Log', desc: 'Evidencia visual instantánea' },
              { icon: FileText, label: 'Reportes', desc: 'Exportación a Excel / PDF' },
              { icon: Layout, label: 'Multiperfil', desc: 'Control de accesos dinámico' }
            ].map((f, i) => (
              <motion.div 
                key={f.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors"
              >
                <f.icon className="text-blue-500 mb-2" size={24} />
                <h3 className="text-white font-bold text-sm">{f.label}</h3>
                <p className="text-slate-500 text-[10px] font-medium leading-tight">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Login Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 sm:p-10 space-y-8 border border-white/20 relative">
            <div className="text-center space-y-3">
              <img 
                src="https://www.smurfitkappa.com/favicon.ico" 
                alt="Logo" 
                className="w-12 h-12 mx-auto filter grayscale opacity-80" 
              />
              <h2 className="text-3xl font-black text-slate-900 tracking-tight italic uppercase">Smurfit Westrock</h2>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] px-4 py-1 bg-slate-100 rounded-full inline-block">
                Portal de Usuarios
              </p>
            </div>

            {!isSupabaseConfigured && (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3">
                <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={18} />
                <div className="space-y-1">
                  <p className="text-amber-900 text-xs font-bold uppercase tracking-tight">Supabase no configurado</p>
                  <p className="text-[10px] text-amber-700 leading-tight">
                    Por favor, configura las variables <code className="font-mono bg-white/50 px-1 rounded">VITE_SUPABASE_URL</code> y <code className="font-mono bg-white/50 px-1 rounded">VITE_SUPABASE_ANON_KEY</code> en el panel de Secrets de AI Studio.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={signIn}
                disabled={!isSupabaseConfigured}
                className={`w-full text-white py-4 rounded-2xl font-black text-lg shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-4 group h-auto ${
                  isSupabaseConfigured 
                    ? 'bg-[#4285F4] hover:bg-[#357ae8] shadow-blue-500/30' 
                    : 'bg-slate-300 cursor-not-allowed shadow-none'
                }`}
              >
                <div className="bg-white p-1 rounded-lg">
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                </div>
                ENTRAR CON GOOGLE
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
              <p className="text-[10px] text-[#1F3864] font-bold flex items-center gap-2 mb-1 uppercase tracking-wider">
                <Info size={12} /> Nota de Seguridad
              </p>
              <p className="text-[10px] text-slate-500 leading-tight">
                El acceso Administrador está restringido únicamente a usuarios autorizados mediante validación de correo corporativo.
              </p>
            </div>

            <div className="text-center">
              <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest">
                © 2026 Instrumentation Hub • v2.1.0
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

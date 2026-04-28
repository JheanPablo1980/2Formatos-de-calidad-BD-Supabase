import React from 'react';
import { useAppStore, UserRole } from '../store/useAppStore';
import { motion } from 'motion/react';
import { ShieldCheck, UserCheck, Eye, LogOut, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/Button';

export const RoleSelection: React.FC = () => {
  const { session, rolePermissions, enterApp, signOut } = useAppStore();

  if (!session) return null;

  const role = session.role as UserRole;
  const permissions = rolePermissions[role];
  
  const roleInfo = {
    ADMIN: {
      label: 'Administrador Principal',
      description: 'Acceso total a configuración, gestión de datos y seguridad.',
      icon: ShieldCheck,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200'
    },
    TECNICO: {
      label: 'Técnico de Campo',
      description: 'Habilitado para captura de fotos, registros y protocolos.',
      icon: UserCheck,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200'
    },
    INVITADO: {
      label: 'Acceso Invitado',
      description: 'Visualización de perfiles, galería y exportación de reportes.',
      icon: Eye,
      color: 'text-slate-600',
      bg: 'bg-slate-50',
      border: 'border-slate-200'
    }
  };

  const info = roleInfo[role] || roleInfo.INVITADO;
  const Icon = info.icon;

  const unlockedModules = Object.entries(permissions)
    .filter(([key, val]) => val && key !== 'admin')
    .map(([key]) => {
      const labels: Record<string, string> = {
        nuevo: 'Nuevo Registro',
        fotos: 'Cámara de Registro',
        galeria: 'Galería de Fotos',
        perfiles: 'Gestión de Perfiles',
        historial: 'Historial de Logs',
        generar: 'Exportación de Datos'
      };
      return labels[key] || key;
    });

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center p-4 sm:p-6 overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10 flex flex-col md:flex-row">
          {/* Left Panel: User Info */}
          <div className="bg-[#1F3864] p-8 md:w-1/3 flex flex-col items-center justify-center text-center space-y-4">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="relative"
            >
              <img 
                src={session.user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${session.user.email}&background=random`} 
                alt="Avatar" 
                className="w-24 h-24 rounded-full border-4 border-white/20 shadow-xl"
              />
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-[#1F3864]" />
            </motion.div>
            
            <div className="space-y-1">
              <h2 className="text-white font-bold text-lg truncate w-full max-w-[150px]">
                {session.user.user_metadata?.full_name || session.user.email?.split('@')[0]}
              </h2>
              <p className="text-blue-200 text-xs truncate w-full max-w-[150px] opacity-70">
                {session.user.email}
              </p>
            </div>

            <button 
              onClick={signOut}
              className="flex items-center gap-2 text-white/50 hover:text-white text-xs font-bold transition-colors mt-4"
            >
              <LogOut size={14} /> Salir
            </button>
          </div>

          {/* Right Panel: Role & Modules */}
          <div className="p-8 md:w-2/3 space-y-6 flex flex-col justify-center">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Acceso Verificado</span>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none italic">
                {info.label}
              </h1>
            </div>

            <div className={`p-4 rounded-2xl border ${info.border} ${info.bg} flex items-start gap-4`}>
              <div className={`${info.color} mt-1`}>
                <Icon size={24} />
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {info.description}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                Módulos Habilitados
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {unlockedModules.map((m, i) => (
                  <motion.div 
                    key={m}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (i * 0.05) }}
                    className="flex items-center gap-2 text-[11px] font-bold text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100"
                  >
                    <CheckCircle2 size={12} className="text-green-500" />
                    {m}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <Button 
                onClick={enterApp}
                className="w-full bg-[#1F3864] hover:bg-[#2a4d86] text-white py-6 rounded-2xl font-black text-lg shadow-xl shadow-blue-900/20 group h-auto"
              >
                ENTRAR AL WORKSPACE
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="flex items-center gap-4 py-2 opacity-50">
                <div className="h-px bg-slate-200 flex-1"></div>
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-none">Simular otro Acceso (Admin)</span>
                <div className="h-px bg-slate-200 flex-1"></div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {(['ADMIN', 'TECNICO', 'INVITADO'] as const).map(r => (
                  <button 
                    key={r}
                    onClick={() => {
                        const { devLogin } = useAppStore.getState();
                        devLogin(r);
                        enterApp();
                    }}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all hover:bg-white hover:shadow-md ${r === role ? 'bg-blue-50 border-blue-200 scale-105' : 'bg-slate-50 border-transparent text-slate-400'}`}
                  >
                    <span className="text-[8px] font-black tracking-tighter uppercase">{r}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

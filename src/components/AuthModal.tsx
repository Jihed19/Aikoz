import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import { auth, db, googleProvider, getFirebaseAuthErrorMessage } from '../firebase';
import { triggerConfetti } from '../utils/formatters';
import { AikozLogo } from './AikozLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onAuthSuccess?: (userName: string, userEmail: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [unauthorizedDomain, setUnauthorizedDomain] = useState<string | null>(null);
  const [copiedDomain, setCopiedDomain] = useState(false);

  // Reset states when opening
  React.useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrorMessage(null);
      setSuccessMessage(null);
      setUnauthorizedDomain(null);
      setCopiedDomain(false);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  // Sign In / Register with Google
  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setUnauthorizedDomain(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Persist profile in Firestore
      try {
        await setDoc(
          doc(db, 'users', user.uid),
          {
            userId: user.uid,
            name: user.displayName || 'Socio Aikoz',
            email: user.email || '',
            memberTier: 'Oro',
            avatarUrl: user.photoURL || '',
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      } catch (fsErr) {
        console.warn('Firestore user doc init:', fsErr);
      }

      triggerConfetti();
      onAuthSuccess?.(user.displayName || 'Socio Aikoz', user.email || '');
      onClose();
    } catch (err: any) {
      console.error('Google auth error:', err);
      if (err?.code === 'auth/unauthorized-domain') {
        const currentHost = typeof window !== 'undefined' ? window.location.hostname : '';
        setUnauthorizedDomain(currentHost);
        setErrorMessage(
          `Para usar Google Sign-In, debes autorizar "${currentHost}" en Firebase Console. Puedes ingresar inmediatamente abajo usando Correo y Contraseña.`
        );
      } else {
        setErrorMessage(getFirebaseAuthErrorMessage(err?.code || ''));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Sign In with Email & Password
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMessage('Por favor ingresa tu correo y contraseña.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      triggerConfetti();
      onAuthSuccess?.(cred.user.displayName || 'Socio Aikoz', cred.user.email || email.trim());
      onClose();
    } catch (err: any) {
      console.error('Email login error:', err);
      setErrorMessage(getFirebaseAuthErrorMessage(err?.code || ''));
    } finally {
      setIsLoading(false);
    }
  };

  // Register with Email & Password
  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Por favor ingresa tu nombre completo.');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('Por favor ingresa un correo electrónico válido.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('La contraseña debe tener un mínimo de 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden. Por favor verifícalas.');
      return;
    }
    if (!acceptTerms) {
      setErrorMessage('Debes aceptar los términos y condiciones de Socio Aikoz.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = cred.user;

      // Update user display name in Firebase Auth
      await updateProfile(user, {
        displayName: name.trim(),
      });

      // Save initial profile in Firestore
      try {
        await setDoc(doc(db, 'users', user.uid), {
          userId: user.uid,
          name: name.trim(),
          email: email.trim(),
          memberTier: 'Oro',
          ticketsCount: 0,
          clubPoints: 50, // Welcome gift points
          giftCardBalance: 0,
          createdAt: new Date().toISOString(),
        });
      } catch (fsErr) {
        console.warn('Firestore initial profile setup notice:', fsErr);
      }

      triggerConfetti();
      onAuthSuccess?.(name.trim(), email.trim());
      onClose();
    } catch (err: any) {
      console.error('Email registration error:', err);
      setErrorMessage(getFirebaseAuthErrorMessage(err?.code || ''));
    } finally {
      setIsLoading(false);
    }
  };

  // Send Password Reset Email
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage('Por favor ingresa el correo asociado a tu cuenta.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setSuccessMessage(
        'Hemos enviado un enlace a tu correo para restablecer tu contraseña. Revisa tu bandeja de entrada o spam.'
      );
    } catch (err: any) {
      console.error('Password reset error:', err);
      setErrorMessage(getFirebaseAuthErrorMessage(err?.code || ''));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150">
        {/* Header Bar */}
        <div className="px-5 pt-5 pb-3 border-b border-slate-100 flex items-center justify-between bg-linear-to-b from-slate-50 to-white">
          <div className="flex items-center gap-2">
            <AikozLogo size="sm" showSubtitle={false} />
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Cuenta Aikoz
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto px-5 py-4 space-y-4">
          {/* Title and Mode Switcher */}
          {mode !== 'forgot' ? (
            <div>
              <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl mb-4">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMessage(null);
                  }}
                  className={`py-2 text-xs font-black rounded-xl transition-all ${
                    mode === 'login'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Iniciar Sesión
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setErrorMessage(null);
                  }}
                  className={`py-2 text-xs font-black rounded-xl transition-all ${
                    mode === 'register'
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Crear Cuenta
                </button>
              </div>

              <h2 className="text-base font-black text-slate-900 leading-tight">
                {mode === 'login'
                  ? 'Bienvenido de nuevo a Aikoz'
                  : 'Crea tu cuenta de Socio Aikoz'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {mode === 'login'
                  ? 'Accede con Google o tu correo para sincronizar tus boletos y pedidos.'
                  : 'Regístrate y recibe 50 Puntos Club de bienvenida para tus compras.'}
              </p>
            </div>
          ) : (
            <div>
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver a iniciar sesión</span>
              </button>
              <h2 className="text-base font-black text-slate-900">Recuperar Contraseña</h2>
              <p className="text-xs text-slate-500 mt-1">
                Ingresa tu correo registrado y te enviaremos las instrucciones de restablecimiento.
              </p>
            </div>
          )}

          {/* Quick Google Auth Button */}
          {mode !== 'forgot' && (
            <div>
              <button
                id="btn-auth-google"
                type="button"
                onClick={handleGoogleAuth}
                disabled={isLoading}
                className="w-full py-3 px-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-2xl text-xs font-bold flex items-center justify-center gap-3 shadow-2xs hover:shadow-xs transition-all active:scale-[0.99] disabled:opacity-60"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>
                  {mode === 'login' ? 'Continuar con Google' : 'Crear cuenta con Google'}
                </span>
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-400">
                  <span className="bg-white px-2">o con tu correo</span>
                </div>
              </div>
            </div>
          )}

          {/* Feedback Messages */}
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-2.5 text-red-700 text-xs animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>
          )}

          {/* Actionable Authorized Domain Guide */}
          {unauthorizedDomain && (
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl space-y-2.5 text-xs text-amber-900 animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-black text-[10px] flex items-center justify-center shrink-0">
                  !
                </span>
                <span className="font-extrabold text-[11px] text-amber-900">
                  Habilita Google OAuth en Firebase Console:
                </span>
              </div>
              <p className="text-[10px] text-amber-800 leading-snug">
                1. Entra a <a href="https://console.firebase.google.com/project/aikoz-b44be/authentication/settings" target="_blank" rel="noreferrer" className="underline font-bold text-amber-950 hover:text-black">Firebase Console › Auth › Settings › Authorized domains</a><br />
                2. Haz clic en <strong>"Add domain"</strong> y pega este dominio:
              </p>
              <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-xl border border-amber-300 shadow-2xs">
                <code className="text-[10px] font-mono text-slate-800 flex-1 truncate px-1 select-all font-bold">
                  {unauthorizedDomain}
                </code>
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(unauthorizedDomain);
                    }
                    setCopiedDomain(true);
                    setTimeout(() => setCopiedDomain(false), 2000);
                  }}
                  className="px-2.5 py-1 bg-amber-200 hover:bg-amber-300 text-amber-950 rounded-lg text-[10px] font-black shrink-0 transition-colors"
                >
                  {copiedDomain ? '¡Copiado!' : 'Copiar'}
                </button>
              </div>
              <div className="bg-emerald-100/70 border border-emerald-300 text-emerald-950 p-2.5 rounded-xl text-[11px] font-semibold flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  <strong>¡Sin esperas!</strong> Puedes iniciar sesión o crear cuenta ahora mismo con <strong>Correo Electrónico</strong> aquí abajo. No requiere autorizaciones de dominio.
                </span>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-2.5 text-emerald-800 text-xs animate-in fade-in duration-150">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
              <div className="flex-1 font-medium">{successMessage}</div>
            </div>
          )}

          {/* Mode 1: LOGIN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleEmailLogin} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nombre@ejemplo.com"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-hidden transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold text-slate-700">
                    Contraseña
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot');
                      setErrorMessage(null);
                      setSuccessMessage(null);
                    }}
                    className="text-[10px] font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-hidden transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                id="btn-submit-login"
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#5DBB63] hover:bg-[#4ea854] text-white rounded-2xl text-xs font-black shadow-md hover:shadow-lg transition-all active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <span>Iniciar Sesión</span>
                )}
              </button>
            </form>
          )}

          {/* Mode 2: REGISTER FORM */}
          {mode === 'register' && (
            <form onSubmit={handleEmailRegister} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Nombre Completo
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Juan Pérez"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-hidden transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nombre@ejemplo.com"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-hidden transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Contraseña (mínimo 6 caracteres)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Crea una contraseña segura"
                    className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-hidden transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repite la contraseña"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-hidden transition-all"
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  id="chk-terms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-0.5 rounded-sm border-slate-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                />
                <label htmlFor="chk-terms" className="text-[10px] text-slate-500 leading-tight">
                  Acepto los términos del Club Aikoz y participar en el sorteo de premios y rifa 0 KM.
                </label>
              </div>

              <button
                id="btn-submit-register"
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#5DBB63] hover:bg-[#4ea854] text-white rounded-2xl text-xs font-black shadow-md hover:shadow-lg transition-all active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <span>Crear Cuenta en Aikoz</span>
                )}
              </button>
            </form>
          )}

          {/* Mode 3: FORGOT PASSWORD */}
          {mode === 'forgot' && (
            <form onSubmit={handlePasswordReset} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Correo Electrónico Registrado
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nombre@ejemplo.com"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-hidden transition-all"
                  />
                </div>
              </div>

              <button
                id="btn-submit-forgot"
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#5DBB63] hover:bg-[#4ea854] text-white rounded-2xl text-xs font-black shadow-md hover:shadow-lg transition-all active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <span>Enviar Enlace de Recuperación</span>
                )}
              </button>
            </form>
          )}

          {/* Benefits Feature Footer */}
          <div className="pt-3 border-t border-slate-100">
            <div className="bg-slate-50 rounded-2xl p-3 space-y-1.5 text-[10px] text-slate-500">
              <div className="flex items-center gap-2 text-slate-700 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Beneficios de tu Cuenta Aikoz:</span>
              </div>
              <p className="flex items-center gap-1.5 pl-1">
                <span className="text-emerald-600 font-bold">✓</span> Boletos del Sorteo 0 KM respaldados en la nube
              </p>
              <p className="flex items-center gap-1.5 pl-1">
                <span className="text-emerald-600 font-bold">✓</span> Acumula Puntos Club y cupones exclusivos
              </p>
              <p className="flex items-center gap-1.5 pl-1">
                <span className="text-emerald-600 font-bold">✓</span> Saldo digital de tu Gift Card seguro
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

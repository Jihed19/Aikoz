import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  FileText,
  HelpCircle,
  Lock,
  LogOut,
  MapPin,
  MessageCircle,
  Navigation,
  Pencil,
  RotateCcw,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Ticket,
  Truck,
  User,
} from 'lucide-react';
import { StoreLocation, UserProfile } from '../types';
import { formatUSD } from '../utils/formatters';

interface CuentaViewProps {
  user: UserProfile;
  currentStore: StoreLocation;
  onChangeStore: () => void;
  onOpenSorteo: () => void;
  onOpenOrders: () => void;
  onOpenCasheaInfo: () => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onLogout?: () => void;
  isFirebaseUser?: boolean;
}

export const CuentaView: React.FC<CuentaViewProps> = ({
  user,
  currentStore,
  onChangeStore,
  onOpenSorteo,
  onOpenOrders,
  onOpenCasheaInfo,
  onOpenAuth,
  onLogout,
  isFirebaseUser = false,
}) => {
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <div className="pb-28 space-y-4">
      {/* 1. USER PROFILE HEADER */}
      <div className="px-4 pt-3">
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xs">
          <div className="flex items-center justify-between">
            {/* User Avatar + Details */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500 shadow-xs"
                />
                <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-[8px] font-black text-slate-900">
                  ★
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-base font-black text-slate-900 leading-tight">
                    {user.name}
                  </h2>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                </div>
                <span className="text-xs text-slate-400 block mt-0.5">
                  {user.email}
                </span>
                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider mt-1">
                  <span>★</span>
                  <span>SOCIO CLUB VIP {user.memberTier.toUpperCase()}</span>
                </span>
              </div>
            </div>

            {/* Edit Profile Button */}
            <button
              id="btn-edit-profile"
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
              title="Editar Perfil"
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>

          {/* 3 Stats Bar */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 text-center">
            <div
              onClick={onOpenSorteo}
              className="cursor-pointer hover:bg-slate-50 p-1.5 rounded-xl transition-colors"
            >
              <div className="flex items-center justify-center text-blue-600 mb-1">
                <Ticket className="w-4 h-4" />
              </div>
              <span className="text-base font-black text-slate-900 leading-none block">
                {user.ticketsCount}
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase mt-0.5 block">
                BOLETOS 0 KM
              </span>
            </div>

            <div className="p-1.5">
              <div className="flex items-center justify-center text-emerald-600 mb-1">
                <Star className="w-4 h-4" />
              </div>
              <span className="text-base font-black text-slate-900 leading-none block">
                {user.clubPoints}
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase mt-0.5 block">
                PUNTOS CLUB
              </span>
            </div>

            <div className="p-1.5">
              <div className="flex items-center justify-center text-amber-500 mb-1">
                <CreditCard className="w-4 h-4" />
              </div>
              <span className="text-base font-black text-slate-900 leading-none block">
                {formatUSD(user.giftCardBalance)}
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase mt-0.5 block">
                GIFT CARD
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AUTHENTICATION: INICIAR SESIÓN O CREAR CUENTA */}
      <div className="px-4">
        {!isFirebaseUser ? (
          <div className="bg-linear-to-br from-emerald-800 via-emerald-700 to-green-700 text-white rounded-3xl p-4.5 shadow-md border border-emerald-600/40 relative overflow-hidden">
            {/* Background decorative pattern */}
            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-400 text-slate-900 text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                    CLUB AIKOZ
                  </span>
                  <span className="text-[10px] text-emerald-200 font-semibold">
                    Google & Correo
                  </span>
                </div>
                <h3 className="text-sm font-black text-white mt-1 leading-tight">
                  Inicia sesión o crea tu cuenta en Aikoz
                </h3>
                <p className="text-[11px] text-emerald-100/90 mt-1 leading-snug">
                  Guarda tus boletos del Sorteo 0 KM en la nube, acumula Puntos Club y accede a cupones exclusivos.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 mt-3.5 pt-3 border-t border-white/15">
              <button
                id="btn-cuenta-login"
                type="button"
                onClick={() => onOpenAuth('login')}
                className="py-2.5 px-3 bg-white hover:bg-emerald-50 text-emerald-900 rounded-xl text-xs font-black text-center shadow-xs transition-all active:scale-[0.98]"
              >
                Iniciar Sesión
              </button>
              <button
                id="btn-cuenta-register"
                type="button"
                onClick={() => onOpenAuth('register')}
                className="py-2.5 px-3 bg-emerald-950/70 hover:bg-emerald-950 text-white rounded-xl text-xs font-black text-center border border-white/20 transition-all active:scale-[0.98]"
              >
                Crear Cuenta
              </button>
            </div>

            {/* Quick Google Access Pill */}
            <button
              id="btn-cuenta-google-direct"
              type="button"
              onClick={() => onOpenAuth('login')}
              className="w-full mt-2 py-2 px-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[11px] font-bold flex items-center justify-center gap-2 border border-white/15 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
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
              <span>Acceder rápido con Google o Correo</span>
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-4 border border-emerald-100 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    Cuenta Aikoz Sincronizada
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Sesión activa: <strong className="text-slate-700">{user.email}</strong>
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                Verificado
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 2. VIP MEMBERSHIP BANNER */}
      <div className="px-4">
        <div
          id="banner-vip-membership"
          className="bg-linear-to-br from-[#1E3A8A] via-[#2563EB] to-[#1D4ED8] text-white rounded-3xl p-4 shadow-md border border-blue-400/30 relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="bg-[#FFA500] text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                MEMBRESÍA ACTIVA
              </span>
              <span className="bg-white/20 text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase">
                NIVEL ORO
              </span>
            </div>
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-black">
              ★
            </span>
          </div>

          <h3 className="text-sm font-black tracking-tight leading-tight mt-1 text-white">
            ¡Multiplica x2 tus opciones de ganar el 0 KM!
          </h3>
          <p className="text-[11px] text-blue-100 leading-snug mt-1">
            Disfruta de doble cupón en compras mayores a $30, fila express en caja en Sede Venecia y promociones quincenales del folleto.
          </p>

          <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-blue-400/30 text-[10px] font-bold text-center">
            <span className="bg-white/10 rounded-lg py-1 px-2">🗎 2x Boletos</span>
            <span className="bg-white/10 rounded-lg py-1 px-2">⚡ Caja Exclusiva</span>
            <span className="bg-white/10 rounded-lg py-1 px-2">🏷 Precios VIP</span>
          </div>
        </div>
      </div>

      {/* 3. MI HIPERMERCADO HABITUAL */}
      <div className="px-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-900">
            Mi Hipermercado Habitual
          </h3>
          <button
            id="btn-change-habitual-store"
            onClick={onChangeStore}
            className="text-xs font-bold text-[#0F7638] hover:underline"
          >
            Cambiar
          </button>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-2xs">
          <div className="relative h-28 bg-slate-900">
            <img
              src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=700&auto=format&fit=crop&q=80"
              alt={currentStore.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
              <div className="flex items-center justify-between w-full">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-white font-extrabold text-xs leading-tight">
                      {currentStore.name}
                    </h4>
                    {currentStore.isMain && (
                      <span className="bg-[#0F7638] text-white text-[8px] font-black px-1.5 py-0.5 rounded-sm uppercase">
                        PRINCIPAL
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-200 block mt-0.5">
                    📍 {currentStore.address}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-[#82C91E] animate-pulse"></span>
              <span className="text-[11px] font-medium">
                Abierto hoy: {currentStore.hours}
              </span>
            </div>
            <button
              onClick={onChangeStore}
              className="text-[#0F7638] font-bold text-[11px] flex items-center gap-1 hover:underline"
            >
              <Navigation className="w-3 h-3" />
              <span>Ver mapa</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. COMPRAS & DOCUMENTOS */}
      <div className="px-4 space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Compras & Documentos
        </h3>

        <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100 shadow-2xs">
          {/* Mis Pedidos Online */}
          <button
            id="row-mis-pedidos"
            onClick={onOpenOrders}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#0F7638] flex items-center justify-center">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Mis Pedidos Online
                </span>
                <span className="text-[11px] text-slate-400 block">
                  1 pedido en camino a Lechería
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                EN RUTA
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </button>

          {/* Facturas Fiscales & Tickets */}
          <button
            id="row-facturas-fiscales"
            onClick={onOpenOrders}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Facturas Fiscales & Tickets
                </span>
                <span className="text-[11px] text-slate-400 block">
                  Descarga comprobantes de tienda física y web
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* Mi Mercado Frecuente */}
          <button
            id="row-mercado-frecuente"
            onClick={onOpenOrders}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Mi Mercado Frecuente
                </span>
                <span className="text-[11px] text-slate-400 block">
                  18 productos guardados para recompra rápida
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* 5. PAGOS & DIRECCIONES */}
      <div className="px-4 space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Pagos & Direcciones
        </h3>

        <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100 shadow-2xs">
          {/* Métodos de Pago */}
          <button
            id="row-metodos-pago"
            onClick={onOpenCasheaInfo}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800">
                    Métodos de Pago
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-[8px] font-black px-1.5 py-0.5 rounded-sm uppercase">
                    CASHEA ACTIVO
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 block">
                  Pago Móvil, Zelle, Tarjetas y Cuotas
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* Direcciones de Entrega */}
          <button
            id="row-direcciones"
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Direcciones de Entrega
                </span>
                <span className="text-[11px] text-slate-400 block">
                  Lechería (Casa), Barcelona (Oficina)
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-500">2 guardadas</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </button>
        </div>
      </div>

      {/* 6. AJUSTES & SEGURIDAD */}
      <div className="px-4 space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Ajustes & Seguridad
        </h3>

        <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100 shadow-2xs">
          {/* Alertas */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Alertas de Sorteos y Ofertas
                </span>
                <span className="text-[11px] text-slate-400 block">
                  Novedades del carro 0 KM y rebajas flash
                </span>
              </div>
            </div>
            <button
              onClick={() => setAlertsEnabled(!alertsEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                alertsEnabled ? 'bg-[#0F7638]' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  alertsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Seguridad & Biometría */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Seguridad & Biometría
                </span>
                <span className="text-[11px] text-slate-400 block">
                  Autenticación huella y cambio de clave
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* 7. ATENCIÓN AIKOZ */}
      <div className="px-4 space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Atención Aikoz
        </h3>

        <div className="grid grid-cols-2 gap-2.5">
          {/* WhatsApp Card */}
          <a
            id="btn-whatsapp-support"
            href="https://wa.me/584140000000?text=Hola%20Aikoz%20Hipermercado,%20necesito%20asistencia%20con%20mi%20cuenta%20Club%20VIP"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-emerald-50/50 p-3.5 rounded-2xl border border-slate-100 shadow-2xs text-left transition-all group block"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#0F7638] flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="bg-[#0F7638] text-white text-[8px] font-black px-1.5 py-0.5 rounded-sm uppercase">
                EN LÍNEA
              </span>
            </div>
            <h4 className="text-xs font-black text-slate-900 group-hover:text-[#0F7638] transition-colors">
              WhatsApp Aikoz
            </h4>
            <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">
              Atención y pedidos por chat
            </p>
          </a>

          {/* Preguntas Sorteo FAQ */}
          <button
            id="btn-sorteo-faq"
            onClick={onOpenSorteo}
            className="bg-white hover:bg-blue-50/50 p-3.5 rounded-2xl border border-slate-100 shadow-2xs text-left transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <span className="text-slate-400 text-[9px] font-bold uppercase">
                FAQ
              </span>
            </div>
            <h4 className="text-xs font-black text-slate-900 group-hover:text-blue-700 transition-colors">
              Preguntas Sorteo
            </h4>
            <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">
              Bases legales y canjes
            </p>
          </button>
        </div>
      </div>

      {/* 8. CERRAR SESIÓN */}
      <div className="px-4 pt-1">
        <button
          id="btn-logout"
          onClick={() => setShowLogoutModal(true)}
          className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 border border-red-200/60 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar Sesión</span>
        </button>

        <p className="text-center text-[10px] text-slate-400 mt-3">
          Aikoz Hipermercado v2.4.1 (Anzoátegui) • RIF: J-40891234-0
        </p>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full shadow-2xl space-y-3 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
              <LogOut className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-black text-slate-900">¿Cerrar Sesión?</h3>
            <p className="text-xs text-slate-500">
              Tus boletos del sorteo 0 KM y saldo en la Gift Card permanecerán seguros en tu cuenta.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  onLogout?.();
                }}
                className="py-2.5 px-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold"
              >
                Sí, salir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

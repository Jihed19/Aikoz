import React, { useState } from 'react';
import {
  Camera,
  Check,
  CheckCircle2,
  Gift,
  PlusCircle,
  QrCode,
  Send,
  Sparkles,
  Star,
  Ticket,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import { COUPON_HISTORY } from '../data/mockData';
import { Coupon, Ticket as TicketType, UserProfile } from '../types';
import { formatBS, formatUSD } from '../utils/formatters';

interface CuponesViewProps {
  user: UserProfile;
  tickets: TicketType[];
  coupons: Coupon[];
  onApplyCoupon: (coupon: Coupon) => void;
  onOpenScanner: () => void;
  onOpenGiftCardAction: (action: 'recharge' | 'transfer') => void;
  onOpenTicketDetails: (ticket: TicketType) => void;
}

export const CuponesView: React.FC<CuponesViewProps> = ({
  user,
  tickets,
  coupons,
  onApplyCoupon,
  onOpenScanner,
  onOpenGiftCardAction,
  onOpenTicketDetails,
}) => {
  const [filterType, setFilterType] = useState<'todo' | 'sorteo' | 'cupones'>('todo');

  return (
    <div className="pb-28 space-y-4">
      {/* 1. RECOMPENSAS AIKOZ HEADER CARD */}
      <div className="px-4 pt-3">
        <div
          id="card-recompensas-header"
          className="bg-linear-to-br from-[#0B5426] via-[#0F7638] to-[#083D1B] text-white rounded-3xl p-4 shadow-lg border border-emerald-500/30 relative overflow-hidden"
        >
          {/* Top Row: Title & Tier Badge */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#F1A811] text-slate-950 flex items-center justify-center text-[10px] font-black shadow-xs">
                ★
              </span>
              <span className="font-extrabold text-xs tracking-wider uppercase text-amber-300">
                RECOMPENSAS AIKOZ
              </span>
            </div>
            <span className="bg-white/20 backdrop-blur-xs text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-white/10">
              NIVEL {user.memberTier.toUpperCase()}
            </span>
          </div>

          {/* 2 Stats Columns */}
          <div className="grid grid-cols-2 gap-2.5 mb-3">
            {/* Stat 1: Sorteo 0 KM */}
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-2.5 border border-white/10">
              <div className="flex items-center gap-1.5 text-emerald-100 text-[10px] font-bold uppercase">
                <Ticket className="w-3.5 h-3.5 text-amber-400" />
                <span>Sorteo 0 KM</span>
              </div>
              <div className="mt-1 text-lg font-black text-white leading-none">
                {tickets.length} boletos
              </div>
              <span className="text-[10px] text-emerald-200 font-medium mt-0.5 block">
                Vigentes y activos
              </span>
            </div>

            {/* Stat 2: Puntos Fidelidad */}
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-2.5 border border-white/10">
              <div className="flex items-center gap-1.5 text-emerald-100 text-[10px] font-bold uppercase">
                <Star className="w-3.5 h-3.5 text-amber-400" />
                <span>Puntos Fidelidad</span>
              </div>
              <div className="mt-1 text-lg font-black text-white leading-none">
                {user.clubPoints} Pts
              </div>
              <span className="text-[10px] text-amber-300 font-medium mt-0.5 block">
                ≈ {formatUSD(user.clubPoints / 100)} de ahorro
              </span>
            </div>
          </div>

          {/* Bottom helper text */}
          <p className="text-[10px] text-emerald-100/90 leading-tight">
            Cada compra en tienda o app suma boletos y desbloquea descuentos directos.
          </p>
        </div>
      </div>

      {/* 2. FILTER PILLS */}
      <div className="px-4">
        <div className="flex items-center gap-2">
          <button
            id="filter-todo"
            onClick={() => setFilterType('todo')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              filterType === 'todo'
                ? 'bg-[#0F7638] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            ∞ Todo
          </button>
          <button
            id="filter-sorteo"
            onClick={() => setFilterType('sorteo')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              filterType === 'sorteo'
                ? 'bg-[#0F7638] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            🚗 Sorteo 0 KM ({tickets.length})
          </button>
          <button
            id="filter-cupones"
            onClick={() => setFilterType('cupones')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              filterType === 'cupones'
                ? 'bg-[#0F7638] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            🏷 Cupones ({coupons.length})
          </button>
        </div>
      </div>

      {/* 3. BOLETOS MANOS AL VOLANTE (HORIZONTAL CARDS) */}
      {(filterType === 'todo' || filterType === 'sorteo') && (
        <div className="space-y-2">
          <div className="px-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-900 leading-tight">
                Boletos Manos al Volante
              </h3>
              <p className="text-[11px] text-slate-500">
                Sorteo de vehículo 0 KM
              </p>
            </div>
            <button
              id="btn-cupones-escanear-ticket"
              onClick={onOpenScanner}
              className="bg-emerald-50 hover:bg-emerald-100 text-[#0F7638] border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Escanear Ticket</span>
            </button>
          </div>

          {/* Horizontal scroll of ticket certificates */}
          <div className="px-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-3 min-w-max py-1">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  id={`ticket-card-${ticket.id}`}
                  onClick={() => onOpenTicketDetails(ticket)}
                  className="w-64 bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  {/* Card Blue Header */}
                  <div className="bg-[#1E40AF] text-white px-3 py-2 flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-[10px] tracking-wider uppercase text-blue-200 font-sans">
                      BOLETO OFICIAL
                    </span>
                    <span className="text-amber-300 font-black">#{ticket.code}</span>
                  </div>

                  {/* Body */}
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">
                        Compra asociada:
                      </span>
                      <span className="text-sm font-extrabold text-slate-900">
                        {formatUSD(ticket.purchaseAmount)}
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        {ticket.date} • {ticket.store.split(' ')[1] || 'Venecia'}
                      </span>
                    </div>

                    {/* QR Code Graphic Box */}
                    <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center p-1 text-center">
                      <QrCode className="w-6 h-6 text-slate-800" />
                      <span className="text-[7px] font-black text-emerald-600 uppercase">
                        VALIDADO
                      </span>
                    </div>
                  </div>

                  {/* Footer status */}
                  <div className="px-3 py-1.5 bg-emerald-50/70 border-t border-emerald-100 flex items-center justify-between text-[10px] font-bold text-emerald-800">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#5DBB63]" />
                      <span>En la tómbola</span>
                    </div>
                    <span>{ticket.opportunities} oportunidad</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. GIFT CARD DIGITAL */}
      <div className="px-4">
        <div
          id="card-gift-card-digital"
          className="bg-linear-to-br from-[#E6F9EA] via-[#EDFAF0] to-[#DCF5E3] border border-[#A7E5B5] rounded-3xl p-4 shadow-xs relative overflow-hidden"
        >
          {/* Header Row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#0F7638] text-white flex items-center justify-center text-xs font-black">
                a
              </div>
              <div>
                <span className="font-black text-xs text-[#0F7638] tracking-tight">
                  aikoz <strong className="text-slate-800">GIFT CARD</strong>
                </span>
                <span className="text-[9px] text-slate-500 block leading-tight">
                  Premia tu Fidelidad
                </span>
              </div>
            </div>
            <span className="bg-[#5DBB63]/20 text-[#0F7638] border border-[#5DBB63]/40 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              ACTIVA
            </span>
          </div>

          {/* Balance Amount */}
          <div className="mb-3">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
              Saldo disponible para gastar:
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black text-[#0F7638] tracking-tight">
                {formatUSD(user.giftCardBalance)}
              </span>
              <span className="text-xs font-extrabold text-slate-700">
                USD ≈ {formatBS(user.giftCardBalance)}
              </span>
            </div>
            <span className="text-[10px] text-slate-500 mt-0.5 block">
              Tasa oficial BCV • Válido en cajas y plataforma web
            </span>
          </div>

          {/* Recharge & Transfer Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              id="btn-recharge-giftcard"
              onClick={() => onOpenGiftCardAction('recharge')}
              className="py-2.5 px-3 bg-[#0F7638] hover:bg-[#0D622F] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs active:scale-98 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Recargar Saldo</span>
            </button>

            <button
              id="btn-transfer-giftcard"
              onClick={() => onOpenGiftCardAction('transfer')}
              className="py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 active:scale-98 transition-all"
            >
              <Send className="w-3.5 h-3.5 text-blue-600" />
              <span>Transferir</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. CUPONES DE TIENDA */}
      {(filterType === 'todo' || filterType === 'cupones') && (
        <div className="px-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                %
              </div>
              <h3 className="text-sm font-black text-slate-900">
                Cupones de Tienda
              </h3>
            </div>
            <span className="text-[11px] text-slate-500 font-semibold">
              {coupons.length} Disponibles
            </span>
          </div>

          <div className="space-y-2.5">
            {coupons.map((coupon) => {
              const borderClass =
                coupon.borderColor === 'orange'
                  ? 'border-l-4 border-l-[#FFA500] border-y border-r border-slate-200'
                  : coupon.borderColor === 'blue'
                  ? 'border-l-4 border-l-blue-600 border-y border-r border-slate-200'
                  : 'border-l-4 border-l-[#5DBB63] border-y border-r border-slate-200';

              return (
                <div
                  key={coupon.id}
                  id={`coupon-card-${coupon.id}`}
                  className={`bg-white rounded-2xl p-3.5 shadow-2xs flex items-center justify-between gap-3 ${borderClass}`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase ${
                          coupon.borderColor === 'orange'
                            ? 'bg-amber-100 text-amber-900'
                            : coupon.borderColor === 'blue'
                            ? 'bg-blue-100 text-blue-900'
                            : 'bg-emerald-100 text-emerald-900'
                        }`}
                      >
                        {coupon.tag}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{coupon.expiresText}</span>
                      </span>
                    </div>

                    <h4 className="text-xs font-extrabold text-slate-900 leading-tight">
                      {coupon.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      {coupon.description}
                    </p>
                  </div>

                  {/* Apply Button */}
                  <button
                    id={`btn-apply-coupon-${coupon.id}`}
                    onClick={() => onApplyCoupon(coupon)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black shrink-0 transition-all active:scale-95 ${
                      coupon.isApplied
                        ? 'bg-slate-100 text-slate-700 border border-slate-200'
                        : 'bg-[#0F7638] hover:bg-[#0D622F] text-white shadow-2xs'
                    }`}
                  >
                    {coupon.isApplied ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Listo</span>
                      </span>
                    ) : (
                      'Aplicar'
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. HISTORIAL DE CUPONES CANJEADOS */}
      <div className="px-4 pt-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Historial de Cupones Canjeados
          </h3>
          <span className="text-[10px] text-slate-400">Últimos 30 días</span>
        </div>

        <div className="space-y-2">
          {COUPON_HISTORY.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-3 border border-slate-100 shadow-2xs flex items-center justify-between text-xs"
            >
              <div>
                <span className="font-extrabold text-slate-800 block">
                  {item.title}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  {item.date}
                </span>
              </div>
              <span className="text-xs font-black text-[#0F7638] bg-emerald-50 px-2 py-1 rounded-lg">
                Ahorraste {formatUSD(item.savedUSD)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

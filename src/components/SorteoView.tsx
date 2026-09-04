import React, { useState } from 'react';
import {
  Award,
  Calendar,
  Camera,
  CheckCircle2,
  ChevronDown,
  Download,
  ExternalLink,
  FileCheck,
  FileText,
  Flame,
  Info,
  QrCode,
  ShieldCheck,
  Sparkles,
  Ticket as TicketIcon,
  Video,
} from 'lucide-react';
import { Ticket } from '../types';
import { formatUSD, triggerConfetti } from '../utils/formatters';
import { AikozLogo } from './AikozLogo';

interface SorteoViewProps {
  tickets: Ticket[];
  onOpenScanner: () => void;
  onOpenTicketDetails: (ticket: Ticket) => void;
  onDownloadPDF: () => void;
}

export const SorteoView: React.FC<SorteoViewProps> = ({
  tickets,
  onOpenScanner,
  onOpenTicketDetails,
  onDownloadPDF,
}) => {
  const [showLegalTerms, setShowLegalTerms] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Progress to next ticket calculation
  const nextTicketNumber = tickets.length + 1;
  const currentSpent = 22.50;
  const targetSpent = 30.00;
  const needed = targetSpent - currentSpent;
  const progressPercent = Math.round((currentSpent / targetSpent) * 100);

  const handleLiveTuneIn = () => {
    window.open('https://instagram.com', '_blank');
  };

  return (
    <div className="pb-28 space-y-4">
      {/* 1. HERO EMERALD & GOLD BRAND HEADER */}
      <div
        id="section-sorteo-hero"
        className="bg-linear-to-b from-[#0B5426] via-[#0F7638] to-[#093F1C] text-white pt-4 pb-6 px-4 rounded-b-3xl shadow-lg border-b border-emerald-400/20"
      >
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <AikozLogo variant="white" size="sm" showSubtitle={false} />
          </div>
          <span className="flex items-center gap-1 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider animate-pulse shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            <span>18 NOV • 4:00 PM</span>
          </span>
        </div>

        {/* Title */}
        <div className="mt-2 text-center sm:text-left">
          <span className="text-[10px] font-black text-amber-300 tracking-widest uppercase block">
            GRAN SORTEO ANIVERSARIO
          </span>
          <h1 className="text-3xl font-black tracking-tight leading-tight mt-0.5 text-white">
            ¡MANOS AL VOLANTE!
          </h1>
          <p className="text-xs text-emerald-100 mt-1 leading-relaxed font-medium">
            El sedán 0 KM que siempre soñaste puede ser tuyo. Cada $30 en compras suman 1 boleto digital.
          </p>
        </div>

        {/* Car Card Preview */}
        <div className="mt-4 bg-linear-to-br from-[#1E40AF]/60 to-[#0F172A]/80 border border-blue-400/30 rounded-2xl p-4 shadow-xl relative overflow-hidden backdrop-blur-xs">
          {/* Floating Badges */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="bg-[#FFA500] text-slate-900 text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow-2xs">
              0 KM • MODELO 2026
            </span>
            <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
              <span>📍</span> Aikoz Venecia
            </span>
          </div>

          {/* Car Image with Promotional Text */}
          <div className="relative rounded-xl overflow-hidden mb-3 bg-slate-900">
            <img
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80"
              alt="Sedán 0 KM Manos al Volante Aikoz"
              className="w-full h-44 object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-3">
              <span className="text-amber-400 text-xs font-black tracking-wider uppercase">
                ¡Llegó el Gran Día!
              </span>
              <p className="text-white text-xs font-bold leading-tight mt-0.5">
                En solo horas podrás conocer al ganador/a de un carro 0 KM.
              </p>
            </div>
          </div>

          {/* Sintonizar Row */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <div className="flex items-center gap-1.5 text-blue-200">
              <Video className="w-4 h-4 text-red-400" />
              <span className="text-[11px] font-medium">Transmisión en vivo por IG & YouTube</span>
            </div>
            <button
              id="btn-sintonizar-live"
              onClick={handleLiveTuneIn}
              className="bg-white text-blue-900 hover:bg-blue-50 px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1 transition-transform active:scale-95 shadow-xs"
            >
              <span>Sintonizar</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. TUS BOLETOS REGISTRADOS CARD */}
      <div className="px-4">
        <div
          id="card-boletos-registrados"
          className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <TicketIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  Tus Boletos Registrados
                </span>
                <h3 className="text-base font-black text-slate-900 leading-none mt-0.5">
                  {tickets.length} Boletos Activos
                </h3>
              </div>
            </div>
            <span className="flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>VALIDADOS</span>
            </span>
          </div>

          {/* Ticket Codes Grid */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Números de Serie Electrónicos
            </span>
            <div className="grid grid-cols-2 gap-2">
              {tickets.map((t, idx) => (
                <div
                  key={t.id}
                  id={`ticket-badge-${t.id}`}
                  onClick={() => onOpenTicketDetails(t)}
                  className="bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 rounded-xl px-3 py-2 flex items-center justify-between cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-2">
                    {idx === tickets.length - 1 ? (
                      <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                    ) : (
                      <FileText className="w-4 h-4 text-blue-600" />
                    )}
                    <span className="text-xs font-black text-slate-800 group-hover:text-emerald-900 tracking-wide font-mono">
                      {t.code}
                    </span>
                  </div>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5DBB63]" />
                </div>
              ))}
            </div>
          </div>

          {/* Progress to Next Ticket */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-slate-700">Progreso al Boleto #{nextTicketNumber}</span>
              <span className="text-[#0F7638] font-black">
                {formatUSD(currentSpent)} / {formatUSD(targetSpent)}
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden p-0.5">
              <div
                className="bg-linear-to-r from-[#FFA500] to-[#5DBB63] h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-2.5 flex items-center gap-2 text-xs text-amber-800 bg-amber-50/80 p-2 rounded-xl border border-amber-200/60">
              <span className="text-base">🐷</span>
              <span className="text-[11px] leading-tight font-medium">
                ¡Te faltan solo <strong className="font-black text-amber-950">{formatUSD(needed)}</strong> en tu próxima compra para generar otro cupón!
              </span>
            </div>
          </div>

          {/* Action Buttons: Scanner & PDF */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <button
              id="btn-scan-receipt"
              onClick={onOpenScanner}
              className="w-full py-2.5 px-4 bg-linear-to-r from-[#FFA500] to-[#F58220] hover:from-amber-500 hover:to-orange-600 text-slate-950 rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all"
            >
              <Camera className="w-4 h-4 text-slate-950" />
              <span>Escanear Factura de Caja</span>
            </button>

            <button
              id="btn-download-pdf"
              onClick={onDownloadPDF}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 active:scale-98 transition-all"
            >
              <Download className="w-4 h-4 text-blue-600" />
              <span>PDF Oficial</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. MECÁNICA OFICIAL: ¿CÓMO PARTICIPAR Y GANAR? */}
      <div className="px-4 pt-1">
        <div className="mb-3">
          <span className="text-[10px] uppercase font-bold text-[#0F7638] tracking-wider block">
            Mecánica Oficial
          </span>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">
            ¿Cómo Participar y Ganar?
          </h2>
          <p className="text-xs text-slate-500 leading-snug">
            Cada ticket acumulado es una oportunidad directa frente al notario público.
          </p>
        </div>

        <div className="space-y-2.5">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-2xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E8F8EA] text-[#0F7638] font-black text-sm flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-900 leading-tight">
                Compra en Tienda o en la App
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                Por cada <strong className="text-slate-800">$30.00 de compra</strong> (tasa oficial BCV) en cualquiera de nuestras cajas físicas o pedido online, generas 1 cupón digital automático.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-2xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-black text-sm flex items-center justify-center shrink-0">
              2
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold text-slate-900 leading-tight">
                  Multiplica x2 con Marca Aikoz
                </h4>
                <span className="bg-amber-900 text-amber-100 text-[8px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                  DOBLE CUPÓN
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                Incluye al menos 3 productos de la <strong className="text-slate-800">Marca Aikoz</strong> en tu factura y obtén un boleto adicional de bonificación instantánea.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-2xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-900 leading-tight">
                Escaneo Directo de Tickets
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                ¿Compraste directo en sucursal? Escanea el código QR de control fiscal impreso al pie de tu factura para registrarlo al instante.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. TRANSPARENCIA & CONFIANZA: GANADORES ANTERIORES */}
      <div className="px-4 pt-2">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider block">
              Transparencia & Confianza
            </span>
            <h3 className="text-sm font-black text-slate-900">
              Ganadores de Ediciones Anteriores
            </h3>
          </div>
          <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-black">
            ★
          </span>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-xs">
          {/* Winner Image Header */}
          <div className="relative h-36 bg-slate-900">
            <img
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=700&auto=format&fit=crop&q=80"
              alt="Ganadora Sorteo Mariana Rivas"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
              <span className="bg-white/20 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                Edición Aikoz Anzoátegui • Ganadora: Mariana Rivas
              </span>
            </div>
          </div>

          {/* Quote & Details */}
          <div className="p-3.5 space-y-2">
            <p className="text-xs text-slate-600 italic leading-relaxed">
              &quot;Hice mis compras del mes en Aikoz Venecia y no lo podía creer cuando me llamaron durante la transmisión en vivo. ¡El carro nos cambió la vida por completo!&quot;
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <div>
                <span className="font-bold text-slate-800 block">
                  Mariana Rivas (C.I. V-18.429.102)
                </span>
                <span className="text-emerald-700 font-bold">
                  Boleto ganador anterior: #AKZ-04812
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. BASES LEGALES Y TÉRMINOS ACCORDION */}
      <div className="px-4 pt-1">
        <button
          id="btn-accordion-bases-legales"
          onClick={() => setShowLegalTerms(!showLegalTerms)}
          className="w-full bg-slate-100 hover:bg-slate-200/80 rounded-2xl px-4 py-3 flex items-center justify-between text-xs font-bold text-slate-700 transition-colors"
        >
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-blue-600" />
            <span>Bases Legales y Términos Autorizados</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${showLegalTerms ? 'rotate-180' : ''}`} />
        </button>

        {showLegalTerms && (
          <div className="mt-2 bg-white rounded-2xl p-4 text-[11px] text-slate-500 space-y-2 border border-slate-100 animate-in fade-in">
            <p>
              • Sorteo autorizado conforme a la legislación mercantil vigente en la República Bolivariana de Venezuela, con certificación notarial en el Municipio Diego Bautista Urbaneja (Lechería).
            </p>
            <p>
              • Válido para personas naturales mayores de 18 años residentes en territorio venezolano con documento de identidad laminado vigente.
            </p>
            <p>
              • Cada factura con monto igual o superior a $30,00 calculado a la tasa oficial del Banco Central de Venezuela (BCV) del día de emisión genera un (1) cupón electrónico.
            </p>
            <p>
              • El premio consiste en un vehículo sedán marca autorizada modelo 2026 0 KM, con gastos de traspaso y matriculación incluidos por cuenta de Aikoz Hipermercado C.A.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

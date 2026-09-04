import React from 'react';
import { Award, CheckCircle2, Download, QrCode, Share2, ShieldCheck, X } from 'lucide-react';
import { Ticket } from '../types';
import { formatUSD } from '../utils/formatters';
import { AikozLogo } from './AikozLogo';

interface TicketDetailsModalProps {
  ticket: Ticket | null;
  onClose: () => void;
}

export const TicketDetailsModal: React.FC<TicketDetailsModalProps> = ({
  ticket,
  onClose,
}) => {
  if (!ticket) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-500 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Certificate Layout */}
        <div className="border-2 border-dashed border-emerald-500 rounded-2xl p-4 bg-linear-to-b from-emerald-50/50 to-white text-center space-y-3">
          <div className="flex flex-col items-center justify-center gap-1">
            <AikozLogo size="sm" showSubtitle={true} />
            <div className="flex items-center gap-1 text-[#0F7638] text-[10px] font-black uppercase tracking-wider mt-1">
              <Award className="w-3.5 h-3.5" />
              <span>Certificado Digital Oficial</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Sorteo Manos al Volante 0 KM
            </span>
            <div className="text-2xl font-black text-slate-900 tracking-wider font-mono mt-0.5">
              #{ticket.code}
            </div>
            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase mt-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Validado en Tómbola Notariada</span>
            </span>
          </div>

          <div className="w-28 h-28 bg-white border border-slate-200 rounded-2xl mx-auto flex flex-col items-center justify-center p-2 shadow-xs">
            <QrCode className="w-20 h-20 text-slate-900" />
            <span className="text-[8px] font-mono text-slate-500 mt-1">
              SENIAT-AKZ-VERIFIED
            </span>
          </div>

          <div className="text-left text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Sucursal Emisora:</span>
              <span className="font-bold text-slate-800">{ticket.store}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Fecha de Emisión:</span>
              <span className="font-bold text-slate-800">{ticket.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Monto Asociado:</span>
              <span className="font-bold text-emerald-700">{formatUSD(ticket.purchaseAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Oportunidades:</span>
              <span className="font-bold text-slate-800">{ticket.opportunities} Cupón en Urna</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={handlePrint}
            className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4 text-blue-600" />
            <span>Descargar / Imprimir</span>
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-3 bg-[#0F7638] hover:bg-[#0D622F] text-white rounded-xl text-xs font-bold transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

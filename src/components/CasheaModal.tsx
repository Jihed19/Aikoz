import React from 'react';
import { CheckCircle2, ShieldCheck, Sparkles, X } from 'lucide-react';

interface CasheaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CasheaModal: React.FC<CasheaModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-500 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E8F1FD] flex items-center justify-center text-xl font-black text-[#2563EB] shrink-0">
            C
          </div>
          <div>
            <span className="bg-blue-100 text-blue-800 text-[9px] font-black px-2 py-0.5 rounded-md uppercase">
              ALIANZA OFICIAL AIKOZ
            </span>
            <h3 className="text-base font-black text-slate-900 leading-tight mt-0.5">
              Paga en 3 Cuotas sin Interés
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          En Aikoz Hipermercado puedes llevarte hoy tus compras de víveres, bodegón, cuidado personal y panadería con <strong>Cashea</strong> pagando solo la cuota inicial.
        </p>

        <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-3.5 space-y-2 text-xs">
          <div className="flex items-start gap-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              <strong>0% de Interés</strong> garantizado a tasa oficial BCV.
            </span>
          </div>
          <div className="flex items-start gap-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              <strong>Paga la inicial hoy</strong> (25% del total de tu orden).
            </span>
          </div>
          <div className="flex items-start gap-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              <strong>3 cuotas iguales</strong> diferidas cada 14 días automáticamente.
            </span>
          </div>
          <div className="flex items-start gap-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              <strong>¡Suma boletos al Sorteo 0 KM!</strong> Todas las compras con Cashea participan en la rifa del carro.
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-black shadow-md transition-colors"
        >
          ¡Excelente, entendido!
        </button>
      </div>
    </div>
  );
};

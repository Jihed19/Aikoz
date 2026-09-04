import React, { useState } from 'react';
import { Camera, CheckCircle2, QrCode, Sparkles, Upload, X } from 'lucide-react';
import { Ticket } from '../types';
import { formatUSD, triggerConfetti } from '../utils/formatters';

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTicketScanned: (newTicket: Ticket) => void;
}

export const ScannerModal: React.FC<ScannerModalProps> = ({
  isOpen,
  onClose,
  onTicketScanned,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState<Ticket | null>(null);

  if (!isOpen) return null;

  const simulateScan = (storeName = 'Aikoz Venecia', amount = 38.50) => {
    setIsScanning(true);
    setTimeout(() => {
      const randomCode = `AKZ-${Math.floor(10000 + Math.random() * 90000)}`;
      const newTicket: Ticket = {
        id: `t-${Date.now()}`,
        code: randomCode,
        date: 'Hoy, ' + new Date().toLocaleDateString('es-VE', { day: 'numeric', month: 'short' }),
        store: storeName,
        purchaseAmount: amount,
        isValidated: true,
        source: 'fiscal_ticket',
        opportunities: 1,
      };
      setIsScanning(false);
      setScanSuccess(newTicket);
      triggerConfetti();
      onTicketScanned(newTicket);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl space-y-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-500 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Title */}
        <div>
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
            <QrCode className="w-4 h-4" />
            <span>Escáner Fiscal SENIAT</span>
          </div>
          <h3 className="text-base font-black text-slate-900 mt-0.5">
            Escanear Factura de Caja
          </h3>
          <p className="text-xs text-slate-500 mt-1 leading-snug">
            Apunta la cámara al código QR impreso al pie de tu factura física de Aikoz Hipermercado para registrar tu boleto del sorteo 0 KM.
          </p>
        </div>

        {/* Camera Viewfinder Simulator */}
        <div className="relative w-full h-52 bg-slate-950 rounded-2xl overflow-hidden flex flex-col items-center justify-center border-2 border-slate-800">
          {isScanning ? (
            <div className="text-center space-y-2">
              <div className="w-12 h-12 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-emerald-400 font-bold">
                Validando firma fiscal SENIAT...
              </p>
            </div>
          ) : scanSuccess ? (
            <div className="text-center p-4 space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-white font-black text-sm">¡Factura Validada!</h4>
              <p className="text-xs text-emerald-300 font-mono font-bold">
                Boleto #{scanSuccess.code}
              </p>
              <span className="text-[10px] text-slate-300 block">
                Monto: {formatUSD(scanSuccess.purchaseAmount)} • 1 Oportunidad
              </span>
            </div>
          ) : (
            <>
              {/* Scan target grid */}
              <div className="w-36 h-36 border-2 border-dashed border-[#5DBB63] rounded-2xl relative flex items-center justify-center">
                <div className="absolute inset-x-0 h-0.5 bg-[#82C91E] shadow-[0_0_8px_#82C91E] animate-bounce" />
                <QrCode className="w-16 h-16 text-slate-600 opacity-40" />
              </div>
              <span className="text-[10px] text-slate-400 mt-2 font-mono">
                Enfoca el código QR fiscal
              </span>
            </>
          )}
        </div>

        {/* Sample Simulators / File Upload */}
        {!scanSuccess ? (
          <div className="space-y-2 pt-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block text-center">
              O prueba un ticket de prueba rápido:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                id="btn-sample-receipt-1"
                onClick={() => simulateScan('Aikoz Venecia', 38.50)}
                disabled={isScanning}
                className="p-2.5 bg-slate-100 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl text-left transition-all text-xs"
              >
                <span className="font-bold text-slate-800 block">Ticket Venecia</span>
                <span className="text-[10px] text-emerald-700 font-bold">$38.50 (1 boleto)</span>
              </button>
              <button
                id="btn-sample-receipt-2"
                onClick={() => simulateScan('Aikoz Lechería', 64.00)}
                disabled={isScanning}
                className="p-2.5 bg-slate-100 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl text-left transition-all text-xs"
              >
                <span className="font-bold text-slate-800 block">Ticket Lechería</span>
                <span className="text-[10px] text-emerald-700 font-bold">$64.00 (2 boletos)</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-2">
            <button
              onClick={() => {
                setScanSuccess(null);
                onClose();
              }}
              className="w-full py-2.5 bg-[#0F7638] text-white rounded-xl text-xs font-black"
            >
              Ver mis boletos registrados
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

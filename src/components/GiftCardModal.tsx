import React, { useState } from 'react';
import { CreditCard, Gift, Send, Sparkles, X } from 'lucide-react';
import { formatBS, formatUSD, triggerConfetti } from '../utils/formatters';

interface GiftCardModalProps {
  isOpen: boolean;
  action: 'recharge' | 'transfer' | null;
  currentBalance: number;
  onClose: () => void;
  onUpdateBalance: (newBalance: number) => void;
}

export const GiftCardModal: React.FC<GiftCardModalProps> = ({
  isOpen,
  action,
  currentBalance,
  onClose,
  onUpdateBalance,
}) => {
  const [amount, setAmount] = useState<number>(25);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [rechargeSuccess, setRechargeSuccess] = useState(false);

  if (!isOpen || !action) return null;

  const handleRecharge = () => {
    onUpdateBalance(currentBalance + amount);
    setRechargeSuccess(true);
    triggerConfetti();
    setTimeout(() => {
      setRechargeSuccess(false);
      onClose();
    }, 1500);
  };

  const handleTransfer = () => {
    if (amount > currentBalance) return;
    onUpdateBalance(currentBalance - amount);
    setTransferSuccess(true);
    triggerConfetti();
    setTimeout(() => {
      setTransferSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-500 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
          <Gift className="w-4 h-4" />
          <span>Aikoz Gift Card Digital</span>
        </div>

        {action === 'recharge' ? (
          <div>
            <h3 className="text-base font-black text-slate-900 leading-tight">
              Recargar Billetera Digital
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Saldo actual: <strong>{formatUSD(currentBalance)}</strong> ({formatBS(currentBalance)})
            </p>

            {rechargeSuccess ? (
              <div className="py-6 text-center space-y-2">
                <span className="text-3xl">🎉</span>
                <h4 className="text-sm font-black text-emerald-700">¡Recarga Exitosa!</h4>
                <p className="text-xs text-slate-600">
                  Se acreditaron {formatUSD(amount)} a tu Gift Card.
                </p>
              </div>
            ) : (
              <div className="space-y-3 mt-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Selecciona el monto a recargar:
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 25, 50, 100].map((val) => (
                    <button
                      key={val}
                      onClick={() => setAmount(val)}
                      className={`py-2 rounded-xl text-xs font-black transition-all ${
                        amount === val
                          ? 'bg-[#0F7638] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      ${val}
                    </button>
                  ))}
                </div>

                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs">
                  <span className="text-slate-500 block">Total a transferir:</span>
                  <div className="text-lg font-black text-[#0F7638] mt-0.5">
                    {formatUSD(amount)} ≈ {formatBS(amount)}
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Vía Pago Móvil BDV / Banesco a tasa oficial BCV
                  </span>
                </div>

                <button
                  onClick={handleRecharge}
                  className="w-full py-2.5 bg-[#0F7638] hover:bg-[#0D622F] text-white rounded-xl text-xs font-black shadow-md transition-all"
                >
                  Confirmar Recarga de {formatUSD(amount)}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h3 className="text-base font-black text-slate-900 leading-tight">
              Transferir Saldo a un Amigo
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Envía saldo digital instantáneo a cualquier socio del Club Aikoz.
            </p>

            {transferSuccess ? (
              <div className="py-6 text-center space-y-2">
                <span className="text-3xl">🚀</span>
                <h4 className="text-sm font-black text-emerald-700">¡Transferencia Enviada!</h4>
                <p className="text-xs text-slate-600">
                  {formatUSD(amount)} enviados a {recipientEmail}.
                </p>
              </div>
            ) : (
              <div className="space-y-3 mt-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Correo del Destinatario:
                  </label>
                  <input
                    type="email"
                    placeholder="amigo@email.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="w-full bg-slate-100 rounded-xl px-3 py-2 text-xs font-medium outline-hidden border border-slate-200 focus:border-[#0F7638]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Monto en USD (Máx. {formatUSD(currentBalance)}):
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    max={currentBalance}
                    min={1}
                    className="w-full bg-slate-100 rounded-xl px-3 py-2 text-xs font-bold outline-hidden border border-slate-200 focus:border-[#0F7638]"
                  />
                </div>

                <button
                  onClick={handleTransfer}
                  disabled={!recipientEmail || amount > currentBalance}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-black shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transferir {formatUSD(amount)}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

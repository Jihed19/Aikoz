import React from 'react';
import { Car, Grid, Home, ShoppingBag, Ticket, User } from 'lucide-react';
import { formatBS, formatUSD } from '../utils/formatters';

export type TabType = 'inicio' | 'pasillos' | 'sorteo' | 'cupones' | 'cuenta' | 'carrito';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  cartItemCount: number;
  cartTotalUSD: number;
  showFloatingCart?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  cartItemCount,
  cartTotalUSD,
  showFloatingCart = true,
}) => {
  return (
    <>
      {/* Floating Cart Button (Pill with total USD and Bs.) */}
      {showFloatingCart && cartItemCount > 0 && activeTab !== 'carrito' && (
        <div className="fixed bottom-20 right-4 z-40 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <button
            id="btn-floating-cart"
            onClick={() => onSelectTab('carrito')}
            className="flex items-center gap-2.5 bg-[#0F7638] hover:bg-[#0D622F] text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-xl hover:shadow-2xl active:scale-95 transition-all border border-emerald-400/30"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-white" />
              <span className="absolute -top-1.5 -right-2 bg-[#FFA500] text-slate-900 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {cartItemCount}
              </span>
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="text-xs font-black tracking-tight">{formatUSD(cartTotalUSD)}</span>
              <span className="text-[10px] text-emerald-100 font-medium tracking-tighter mt-0.5">
                {formatBS(cartTotalUSD)}
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Fixed Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 max-w-lg mx-auto">
        <div className="flex items-center justify-around px-2 py-1.5">
          {/* Tab 1: Inicio */}
          <button
            id="tab-btn-inicio"
            onClick={() => onSelectTab('inicio')}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors ${
              activeTab === 'inicio' ? 'text-[#0F7638] font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-medium">Inicio</span>
          </button>

          {/* Tab 2: Pasillos */}
          <button
            id="tab-btn-pasillos"
            onClick={() => onSelectTab('pasillos')}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors ${
              activeTab === 'pasillos' ? 'text-[#0F7638] font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Grid className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-medium">Pasillos</span>
          </button>

          {/* Tab 3: Sorteo 0 KM (Special Icon with Badge) */}
          <button
            id="tab-btn-sorteo"
            onClick={() => onSelectTab('sorteo')}
            className={`flex flex-col items-center justify-center py-1 px-3 relative transition-colors ${
              activeTab === 'sorteo' ? 'text-[#0F7638] font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className="relative">
              <Car className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-2.5 bg-[#FFA500] text-slate-900 text-[8px] font-black px-1 rounded-full border border-white">
                0 KM
              </span>
            </div>
            <span className="text-[10px] mt-1 font-medium">Sorteo</span>
          </button>

          {/* Tab 4: Cupones */}
          <button
            id="tab-btn-cupones"
            onClick={() => onSelectTab('cupones')}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors ${
              activeTab === 'cupones' ? 'text-[#0F7638] font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Ticket className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-medium">Cupones</span>
          </button>

          {/* Tab 5: Cuenta */}
          <button
            id="tab-btn-cuenta"
            onClick={() => onSelectTab('cuenta')}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors ${
              activeTab === 'cuenta' ? 'text-[#0F7638] font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-medium">Cuenta</span>
          </button>
        </div>
      </nav>
    </>
  );
};

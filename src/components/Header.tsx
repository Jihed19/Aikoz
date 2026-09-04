import React, { useState } from 'react';
import { ChevronDown, MapPin, QrCode, Search, Sparkles, X } from 'lucide-react';
import { StoreLocation } from '../types';
import { AikozLogo } from './AikozLogo';

interface HeaderProps {
  currentStore: StoreLocation;
  stores: StoreLocation[];
  onSelectStore: (store: StoreLocation) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenScanner: () => void;
  onOpenSorteo: () => void;
  onOpenCasheaInfo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStore,
  stores,
  onSelectStore,
  searchQuery,
  onSearchChange,
  onOpenScanner,
  onOpenSorteo,
  onOpenCasheaInfo,
}) => {
  const [showStoreDropdown, setShowStoreDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-emerald-50">
      {/* Top row with official Aikoz Brand Identity, Store Selector, and Cashea */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between gap-2">
        {/* Official Aikoz Logo */}
        <div className="shrink-0 flex items-center">
          <AikozLogo size="md" showSubtitle={true} />
        </div>

        {/* Right Actions: Sede Selector & Cashea Badge */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Store Selector Pill */}
          <div className="relative">
            <button
              id="btn-store-selector"
              onClick={() => setShowStoreDropdown(!showStoreDropdown)}
              className="flex items-center gap-1.5 bg-emerald-50/80 hover:bg-emerald-100/70 border border-emerald-200/60 px-2.5 py-1.5 rounded-full text-left transition-all group"
            >
              <span className="w-2 h-2 rounded-full bg-[#6FA638] animate-pulse"></span>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-slate-800 text-[11px] leading-tight">
                    {currentStore.name.replace('Aikoz ', '')}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-emerald-700 transition-transform ${showStoreDropdown ? 'rotate-180' : ''}`} />
                </div>
                <span className="text-[9px] text-[#0F7638] font-semibold -mt-0.5">
                  Abierto
                </span>
              </div>
            </button>

            {/* Store Dropdown Modal */}
            {showStoreDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-black/20"
                  onClick={() => setShowStoreDropdown(false)}
                />
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider">
                    Sedes Oficiales Aikoz
                  </div>
                  {stores.map((s) => (
                    <button
                      key={s.id}
                      id={`btn-select-store-${s.id}`}
                      onClick={() => {
                        onSelectStore(s);
                        setShowStoreDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-start justify-between transition-colors ${
                        s.id === currentStore.id
                          ? 'bg-emerald-50 text-[#0F7638] font-bold'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span>{s.name}</span>
                          {s.isMain && (
                            <span className="text-[9px] bg-[#6FA638] text-white px-1.5 py-0.5 rounded-md font-extrabold">
                              Sede Principal
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">{s.address}</p>
                      </div>
                      {s.id === currentStore.id && (
                        <span className="text-[#6FA638] text-xs font-bold">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Cashea Integration Badge */}
          <button
            id="btn-cashea-badge"
            onClick={onOpenCasheaInfo}
            className="flex items-center gap-1.5 bg-[#EBF3FF] hover:bg-[#DCEBFE] border border-[#BFDBFE] text-[#1E40AF] px-2 py-1.5 rounded-full text-xs font-black transition-all shadow-2xs"
            title="Paga en cuotas sin interés con Cashea"
          >
            <span className="w-3.5 h-3.5 bg-[#2563EB] text-white rounded-full text-[8px] flex items-center justify-center font-black">
              C
            </span>
            <span className="text-[10px] font-black tracking-wide hidden sm:inline">CASHEA</span>
          </button>
        </div>
      </div>

      {/* Search Bar with QR/Barcode Scanner Button */}
      <div className="px-4 pb-2.5">
        <div className="relative flex items-center">
          <div className="absolute left-3.5 text-slate-400 pointer-events-none">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="input-header-search"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={`Busca en ${currentStore.name}...`}
            className="w-full bg-slate-100 hover:bg-slate-200/70 focus:bg-white text-xs text-slate-800 placeholder:text-slate-400 rounded-full pl-9 pr-10 py-2.5 outline-hidden border border-transparent focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 transition-all"
          />
          {searchQuery ? (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="btn-scan-qr"
              onClick={onOpenScanner}
              className="absolute right-2.5 p-1.5 text-[#5DBB63] hover:text-[#137333] hover:bg-emerald-50 rounded-full transition-colors"
              title="Escanear código de barras o QR fiscal"
            >
              <QrCode className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Ticker: Sorteo Notification Marquee */}
      <div
        id="banner-ticker-sorteo"
        onClick={onOpenSorteo}
        className="bg-linear-to-r from-[#0F7638] via-[#148340] to-[#0D6330] hover:brightness-105 text-white text-[11px] font-semibold py-1.5 px-4 flex items-center justify-between cursor-pointer transition-all shadow-inner"
      >
        <div className="flex items-center gap-2 truncate">
          <span className="w-4 h-4 rounded-full bg-[#F1A811] text-slate-900 flex items-center justify-center text-[9px] font-black shrink-0 shadow-xs">
            ★
          </span>
          <span className="truncate font-medium text-emerald-50">
            <strong className="text-white font-black">¡Manos al Volante!</strong> Cada $30 en compras suman +1 boleto al Sedán 0 KM
          </span>
        </div>
        <span className="text-amber-300 text-xs font-black pl-2 shrink-0">›</span>
      </div>
    </header>
  );
};

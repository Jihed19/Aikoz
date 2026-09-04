import React, { useState } from 'react';
import {
  Car,
  ChevronRight,
  Info,
  Sparkles,
  Zap,
  ShoppingBag,
  Wine,
  Pill,
  Utensils,
  Croissant,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { CartItem, Product } from '../types';
import { formatUSD } from '../utils/formatters';
import { ProductCard } from './ProductCard';
import { AikozLogo } from './AikozLogo';
import { HeroBannerSkeleton, ProductGridSkeleton } from './Skeletons';

interface HomeViewProps {
  products: Product[];
  cart: CartItem[];
  ticketsCount: number;
  isLoading?: boolean;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (product: Product, quantity: number) => void;
  onNavigateTab: (tab: 'inicio' | 'pasillos' | 'sorteo' | 'cupones' | 'cuenta' | 'carrito') => void;
  onOpenCasheaInfo: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  cart,
  ticketsCount,
  isLoading = false,
  onAddToCart,
  onUpdateQuantity,
  onNavigateTab,
  onOpenCasheaInfo,
}) => {
  const [activeChip, setActiveChip] = useState('todos');
  const [heroSlide, setHeroSlide] = useState(0);

  // Cart total to compute dynamic progress
  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.product.priceUSD * item.quantity,
    0
  );
  // Target is $30
  const progressTarget = 30.0;
  const currentProgress = cartSubtotal > 0 ? (cartSubtotal % progressTarget) : 24.80;
  const remaining = Math.max(0, progressTarget - currentProgress);
  const progressPercent = Math.min(100, Math.round((currentProgress / progressTarget) * 100));

  // Category chips
  const chips = [
    { id: 'todos', label: 'Lo Más Vendido', icon: '★' },
    { id: 'viveres', label: 'Víveres', icon: '🍴' },
    { id: 'bodegon', label: 'Bodegón', icon: '🍾' },
    { id: 'farmacia', label: 'Farmacia', icon: '💊' },
    { id: 'carnes', label: 'Carnes', icon: '🥩' },
    { id: 'panaderia', label: 'Panadería', icon: '🥐' },
  ];

  // Filter products
  const filteredProducts = products.filter((p) => {
    if (activeChip === 'todos') return true;
    if (activeChip === 'viveres') return p.category.toLowerCase().includes('víveres');
    if (activeChip === 'bodegon') return p.category.toLowerCase().includes('bodegón');
    if (activeChip === 'farmacia') return p.category.toLowerCase().includes('farmacia');
    if (activeChip === 'carnes') return p.category.toLowerCase().includes('carne');
    if (activeChip === 'panaderia') return p.category.toLowerCase().includes('panader');
    return true;
  });

  const getQuantityInCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="pb-28 space-y-4">
      {/* 1. EMOTIONAL BRAND HERO EXPERIENCE */}
      <div className="px-4 pt-3">
        {isLoading ? (
          <HeroBannerSkeleton />
        ) : (
          <>
            {heroSlide === 0 ? (
              /* Slide 0: Flagship Store & Living Garden Wall Welcome Experience */
              <div
                id="hero-banner-experiencia-aikoz"
                className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#0B5426] via-[#0F7638] to-[#083D1B] text-white p-5 shadow-xl border border-emerald-500/20 transition-all"
              >
                {/* Ambient botanical background texture */}
                <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-[#73A338]/20 blur-2xl pointer-events-none" />
                <div className="absolute -left-8 -bottom-8 w-44 h-44 rounded-full bg-[#F1A811]/15 blur-2xl pointer-events-none" />

                {/* Badges row */}
                <div className="relative z-10 flex items-center gap-2 mb-3">
                  <span className="bg-[#F1A811] text-slate-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    VIVE LA EXPERIENCIA
                  </span>
                  <span className="bg-white/15 backdrop-blur-md text-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    SEDE VENECIA
                  </span>
                </div>

                {/* Store Title & Emotional Tagline */}
                <div className="relative z-10 space-y-1">
                  <div className="flex items-center gap-2">
                    <AikozLogo variant="white" size="lg" showSubtitle={false} />
                  </div>
                  <h1 className="text-2xl font-black tracking-tight leading-tight pt-1">
                    Donde Comprar es <br />
                    <span className="text-amber-300">una Gran Experiencia</span>
                  </h1>
                  <p className="text-xs text-emerald-100 mt-1 max-w-[260px] leading-relaxed font-medium">
                    La más alta calidad en frescos, bodegón premium y víveres con precios oficiales BCV garantizados.
                  </p>
                </div>

                {/* Store Guarantees row */}
                <div className="relative z-10 mt-4 pt-3 border-t border-white/15 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#F1A811]" />
                    <span>Precios Justos BCV</span>
                  </div>
                  <button
                    id="btn-hero-explore"
                    onClick={() => onNavigateTab('pasillos')}
                    className="bg-white text-[#0F7638] hover:bg-amber-50 px-4 py-2 rounded-full text-xs font-black flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                  >
                    <span>Entrar a Comprar</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : heroSlide === 1 ? (
              /* Slide 1: Ofertas Insuperables (Inspired by official campaign image) */
              <div
                id="hero-banner-ofertas-insuperables"
                className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#E09200] via-[#F1A811] to-[#C87B00] text-slate-900 p-5 shadow-xl border border-amber-300/40 transition-all"
              >
                <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-white/20 blur-xl pointer-events-none" />

                <div className="relative z-10 flex items-center gap-2 mb-2">
                  <span className="bg-[#0F7638] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    TODOS LOS FIN DE SEMANA
                  </span>
                  <span className="bg-white/80 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    ★ AHORRO MÁXIMO
                  </span>
                </div>

                <h2 className="relative z-10 text-2xl font-black tracking-tight leading-tight text-slate-950 uppercase">
                  OFERTAS <br />
                  <span className="text-white drop-shadow-sm">INSUPERABLES</span>
                </h2>
                <p className="relative z-10 text-xs text-slate-900 mt-1 max-w-[260px] leading-relaxed font-semibold">
                  Descuentos insuperables de hasta 35% en marcas seleccionadas y productos exclusivos Aikoz.
                </p>

                <div className="relative z-10 mt-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black tracking-wider uppercase text-slate-800">
                      Descuento exclusivo
                    </span>
                    <span className="text-lg font-black text-slate-950 leading-none">
                      Hasta -35%
                    </span>
                  </div>
                  <button
                    id="btn-hero-ofertas"
                    onClick={() => onNavigateTab('pasillos')}
                    className="bg-[#0F7638] hover:bg-[#0D622F] text-white px-4 py-2 rounded-full text-xs font-black shadow-md active:scale-95 transition-all flex items-center gap-1"
                  >
                    <span>Ver Ofertas</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              /* Slide 2: Sorteo Sedán 0 KM */
              <div
                id="hero-banner-sorteo-carro"
                className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#0F7638] via-[#15803D] to-[#09461F] text-white p-5 shadow-xl border border-emerald-400/30 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#F1A811] text-slate-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Gran Rifa Anual
                  </span>
                  <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                    ● 18 NOV
                  </span>
                </div>
                <h2 className="text-2xl font-black tracking-tight leading-tight">
                  ¡Manos al Volante!
                </h2>
                <p className="text-xs text-emerald-100 mt-1 max-w-[260px] leading-relaxed">
                  El sedán 0 KM que siempre soñaste te espera en Aikoz Venecia. ¡Cada $30 suma +1 boleto digital!
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300">
                    Llevas {ticketsCount} boletos activos
                  </span>
                  <button
                    onClick={() => onNavigateTab('sorteo')}
                    className="bg-[#F1A811] text-slate-900 hover:bg-amber-400 px-4 py-2 rounded-full text-xs font-black shadow-md active:scale-95 transition-all"
                  >
                    Ver Boletos
                  </button>
                </div>
              </div>
            )}

            {/* Slider Dots */}
            <div className="flex items-center justify-center gap-1.5 mt-2.5">
              <button
                onClick={() => setHeroSlide(0)}
                className={`h-1.5 rounded-full transition-all ${
                  heroSlide === 0 ? 'w-6 bg-[#0F7638]' : 'w-2 bg-slate-300'
                }`}
              />
              <button
                onClick={() => setHeroSlide(1)}
                className={`h-1.5 rounded-full transition-all ${
                  heroSlide === 1 ? 'w-6 bg-[#F1A811]' : 'w-2 bg-slate-300'
                }`}
              />
              <button
                onClick={() => setHeroSlide(2)}
                className={`h-1.5 rounded-full transition-all ${
                  heroSlide === 2 ? 'w-6 bg-[#0F7638]' : 'w-2 bg-slate-300'
                }`}
              />
            </div>
          </>
        )}
      </div>

      {/* 2. HORIZONTAL CATEGORY CHIPS */}
      <div className="px-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 min-w-max py-1">
          {chips.map((chip) => {
            const isActive = activeChip === chip.id;
            return (
              <button
                key={chip.id}
                id={`chip-category-${chip.id}`}
                onClick={() => setActiveChip(chip.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#0F7638] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span className="text-sm">{chip.icon}</span>
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. SORTEO 0 KM PROGRESS CARD */}
      <div className="px-4">
        <div
          id="card-sorteo-progress"
          onClick={() => onNavigateTab('sorteo')}
          className="bg-linear-to-r from-[#0F7638] via-[#12803E] to-[#0D622F] text-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-all relative overflow-hidden border border-emerald-500/30"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0 border border-white/20">
                <Car className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-black text-sm leading-tight text-white flex items-center gap-1.5">
                  ¡Gana el Sedán 0 KM!
                </h3>
                <p className="text-[11px] text-emerald-100 font-medium">
                  Sorteo Especial Gran Aniversario Aikoz
                </p>
              </div>
            </div>
            <span className="bg-[#F1A811] text-slate-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0 shadow-2xs">
              {ticketsCount} BOLETOS
            </span>
          </div>

          {/* Progress labels */}
          <div className="mt-3 flex items-center justify-between text-[11px] font-bold">
            <span className="text-emerald-50">
              Compras actuales: <span className="text-white font-extrabold underline">{formatUSD(currentProgress)}</span>
            </span>
            <span className="text-amber-300 font-bold">
              Meta boleto: {formatUSD(progressTarget)}
            </span>
          </div>

          {/* Progress bar track */}
          <div className="mt-1.5 w-full bg-black/25 rounded-full h-2.5 overflow-hidden p-0.5 border border-white/10">
            <div
              className="bg-linear-to-r from-[#F1A811] to-[#FFCA28] h-full rounded-full transition-all duration-500 ease-out shadow-xs"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Helper tip */}
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-emerald-100">
            <Info className="w-3.5 h-3.5 shrink-0 text-amber-300" />
            <span>
              Te faltan solo <strong className="text-white font-black">{formatUSD(remaining)}</strong> para ganar tu próximo boleto digital.
            </span>
          </div>
        </div>
      </div>

      {/* 4. FEATURED AISLE BANNERS (Bodegón & Farmacia) */}
      <div className="px-4 grid grid-cols-1 gap-2.5">
        {/* Bodegón & Licores */}
        <div
          id="banner-bodegon-card"
          onClick={() => onNavigateTab('pasillos')}
          className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between cursor-pointer group"
        >
          <div className="space-y-1">
            <span className="text-[9px] font-black tracking-wider text-[#FFA500] bg-orange-50 px-2 py-0.5 rounded-md uppercase">
              FIN DE SEMANA
            </span>
            <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#0F7638] transition-colors">
              Bodegón & Licores
            </h4>
            <p className="text-[11px] text-slate-500 max-w-[200px] leading-tight">
              Vinos, snacks importados y licores premium.
            </p>
            <div className="pt-1 flex items-center gap-1 text-[11px] font-bold text-[#0F7638]">
              <span>Ver pasillo</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="w-20 h-16 rounded-xl bg-slate-50 overflow-hidden flex items-center justify-center shrink-0">
            <img
              src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300&auto=format&fit=crop&q=80"
              alt="Bodegón Aikoz"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
            />
          </div>
        </div>

        {/* Farmacia Aikoz 24H */}
        <div
          id="banner-farmacia-card"
          onClick={() => onNavigateTab('pasillos')}
          className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between cursor-pointer group"
        >
          <div className="space-y-1">
            <span className="text-[9px] font-black tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase">
              24 HORAS
            </span>
            <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#0F7638] transition-colors">
              Farmacia Aikoz
            </h4>
            <p className="text-[11px] text-slate-500 max-w-[200px] leading-tight">
              Medicamentos y cuidado de la salud con delivery gratis.
            </p>
            <div className="pt-1 flex items-center gap-1 text-[11px] font-bold text-[#0F7638]">
              <span>Consultar</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="w-20 h-16 rounded-xl bg-slate-50 overflow-hidden flex items-center justify-center shrink-0">
            <img
              src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80"
              alt="Farmacia Aikoz"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
            />
          </div>
        </div>
      </div>

      {/* 5. VÍVERES BÁSICOS PRODUCTS GRID */}
      <div className="px-4 pt-2">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#FFA500] fill-[#FFA500]" />
              <h2 className="text-base font-black text-slate-900">Víveres Básicos</h2>
            </div>
            <p className="text-[11px] text-slate-500">
              Precios BCV oficiales garantizados
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('pasillos')}
            className="text-xs font-black text-[#0F7638] hover:underline uppercase tracking-wider"
          >
            Ver Todos
          </button>
        </div>

        {/* 2-Column Product Grid or Skeleton Loader */}
        {isLoading ? (
          <ProductGridSkeleton count={4} columns={2} />
        ) : filteredProducts.length === 0 ? (
          <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-6 text-center">
            <p className="text-xs text-slate-500 font-medium">No se encontraron productos en esta categoría</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantityInCart={getQuantityInCart(product.id)}
                onAddToCart={onAddToCart}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))}
          </div>
        )}
      </div>

      {/* 6. CASHEA BANNER */}
      <div className="px-4 pt-2">
        <div
          id="banner-cashea-home"
          onClick={onOpenCasheaInfo}
          className="bg-[#EBF3FF] border border-[#BFDBFE] rounded-2xl p-3.5 flex items-center justify-between gap-3 cursor-pointer shadow-2xs hover:bg-[#E1EDFE] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#2563EB] text-white flex items-center justify-center font-black text-sm shrink-0">
              C
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1E3A8A] leading-tight">
                Paga con Cashea
              </h4>
              <p className="text-[11px] text-blue-800 leading-snug">
                Llévatelo hoy y paga en 3 cuotas sin interés
              </p>
            </div>
          </div>
          <button
            id="btn-cashea-activate"
            onClick={(e) => {
              e.stopPropagation();
              onOpenCasheaInfo();
            }}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-black px-3.5 py-1.5 rounded-full shrink-0 shadow-2xs"
          >
            Activar
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Car,
  ChevronRight,
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Check,
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { CartItem, Category, Product } from '../types';
import { ProductCard } from './ProductCard';
import { ProductGridSkeleton } from './Skeletons';

interface PasillosViewProps {
  products: Product[];
  cart: CartItem[];
  isLoading?: boolean;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (product: Product, quantity: number) => void;
  onOpenSorteo: () => void;
  onOpenCasheaInfo: () => void;
}

export const PasillosView: React.FC<PasillosViewProps> = ({
  products,
  cart,
  isLoading = false,
  onAddToCart,
  onUpdateQuantity,
  onOpenSorteo,
  onOpenCasheaInfo,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Sub-categories chips
  const subCategories = [
    { label: 'Snacks & Galletas', icon: '🍿' },
    { label: 'Bebidas & Jugos', icon: '🥤' },
    { label: 'Limpieza del Hogar', icon: '🧹' },
    { label: 'Lácteos & Huevos', icon: '🧀' },
    { label: 'Congelados', icon: '❄️' },
  ];

  const getQuantityInCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const getCategoryProducts = (category: Category) => {
    return products.filter(
      (p) =>
        p.category.toLowerCase().includes(category.name.toLowerCase().split(' ')[0]) ||
        (category.id === 'marca-propia' && p.isAikozBrand) ||
        (category.id === 'viveres' && p.category.includes('Víveres'))
    );
  };

  return (
    <div className="pb-28 space-y-4">
      {/* 1. TOP PROMO BANNER: PUNTOS PARA SORTEO 0 KM */}
      <div className="px-4 pt-3">
        <div
          id="banner-pasillos-sorteo"
          onClick={onOpenSorteo}
          className="bg-linear-to-r from-[#0F7638] via-[#148340] to-[#0D6330] text-white rounded-2xl p-3.5 shadow-sm flex items-center justify-between gap-2 cursor-pointer hover:shadow-md transition-all border border-emerald-400/20"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Car className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs leading-tight">
                Gana Puntos para el Sorteo 0 KM
              </h4>
              <p className="text-[10px] text-emerald-100 leading-snug">
                Cada pasillo visitado acumula boletos y beneficios VIP
              </p>
            </div>
          </div>
          <span className="bg-[#F1A811] text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 shadow-2xs">
            X2 BOLETOS
          </span>
        </div>
      </div>

      {/* 2. PASILLOS PRINCIPALES HEADER */}
      <div className="px-4 flex items-center justify-between">
        <h2 className="text-base font-black text-slate-900 tracking-tight">
          Pasillos Principales
        </h2>
        <span className="text-xs font-black text-[#0F7638] flex items-center gap-1">
          <span>8 SECCIONES</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>

      {/* 3. 2-COLUMN GRID OF CATEGORIES */}
      <div className="px-4 grid grid-cols-2 gap-3">
        {CATEGORIES.map((cat) => {
          const tagBg =
            cat.tagColor === 'orange'
              ? 'bg-[#FFA500] text-slate-900'
              : cat.tagColor === 'green'
              ? 'bg-[#5DBB63] text-white'
              : cat.tagColor === 'blue'
              ? 'bg-[#2563EB] text-white'
              : 'bg-slate-900 text-white';

          return (
            <div
              key={cat.id}
              id={`cat-card-${cat.id}`}
              onClick={() => setSelectedCategory(cat)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              {/* Category Image with Tag Overlay */}
              <div className="relative h-24 w-full bg-slate-100 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <span
                  className={`absolute top-2 left-2 text-[8px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider shadow-2xs ${tagBg}`}
                >
                  {cat.tag}
                </span>
                <h3 className="absolute bottom-2 left-2.5 right-2 text-white font-extrabold text-xs leading-tight drop-shadow-xs">
                  {cat.name}
                </h3>
              </div>

              {/* Subtitle & Footer */}
              <div className="p-2.5 flex-1 flex flex-col justify-between">
                <p className="text-[10px] text-slate-500 leading-snug line-clamp-2">
                  {cat.subtitle}
                </p>
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-[#0F7638]">
                  <span>{cat.footerText}</span>
                  <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#0F7638] group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. SUB-CATEGORÍAS FRECUENTES (HORIZONTAL SCROLL) */}
      <div className="pt-2">
        <div className="px-4 flex items-center justify-between mb-2">
          <h3 className="text-sm font-black text-slate-900">
            Sub-categorías Frecuentes
          </h3>
          <span className="text-[11px] text-slate-400">Desliza para ver más</span>
        </div>
        <div className="px-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max py-1">
            {subCategories.map((sub, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const match = CATEGORIES.find((c) =>
                    c.name.toLowerCase().includes(sub.label.toLowerCase().split(' ')[0])
                  );
                  if (match) setSelectedCategory(match);
                }}
                className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-full text-xs font-bold text-slate-700 shadow-2xs transition-colors"
              >
                <span>{sub.icon}</span>
                <span>{sub.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. ALIANZA CASHEA BANNER */}
      <div className="px-4 pt-2">
        <div
          id="banner-alianza-cashea"
          onClick={onOpenCasheaInfo}
          className="bg-white border border-blue-100 rounded-2xl p-4 shadow-xs flex items-center gap-3.5 cursor-pointer hover:border-blue-200 transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-[#E8F1FD] flex items-center justify-center shrink-0">
            <span className="font-black text-[#2563EB] text-base">C</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[9px] font-black uppercase tracking-wider text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-md">
                ALIANZA CASHEA
              </span>
              <span className="text-[9px] font-bold text-slate-500">
                0% Interés
              </span>
            </div>
            <h4 className="text-xs font-bold text-slate-900 leading-tight">
              Paga en 3 cuotas sin interés
            </h4>
            <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
              Llévate tus compras de Bodegón, Cuidado Personal y Hogar pagando solo la inicial hoy.
            </p>
          </div>
        </div>
      </div>

      {/* MODAL: CATEGORY PRODUCTS DRILLDOWN */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-slate-50 w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  Pasillo
                </span>
                <h3 className="text-base font-black text-slate-900">
                  {selectedCategory.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCategory(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-600"
              >
                ✕
              </button>
            </div>

            {/* Modal Products List */}
            <div className="p-4 overflow-y-auto space-y-3">
              <p className="text-xs text-slate-500">
                {selectedCategory.subtitle}. Selecciona los productos que deseas agregar a tu carrito:
              </p>
              {isLoading ? (
                <ProductGridSkeleton count={4} columns={2} />
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {getCategoryProducts(selectedCategory).map((product) => (
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

            {/* Modal Footer */}
            <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">
                {selectedCategory.footerText} disponibles
              </span>
              <button
                onClick={() => setSelectedCategory(null)}
                className="bg-[#0F7638] text-white px-4 py-2 rounded-xl text-xs font-bold"
              >
                Volver a Pasillos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

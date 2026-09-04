import React from 'react';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { formatBS, formatUSD } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (product: Product, newQuantity: number) => void;
  onProductClick?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantityInCart,
  onAddToCart,
  onUpdateQuantity,
  onProductClick,
}) => {
  return (
    <div
      id={`card-product-${product.id}`}
      className="bg-white rounded-2xl p-3 border border-slate-100 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between relative group"
    >
      {/* Optional Badge */}
      {product.badge && (
        <div className="absolute top-2.5 left-2.5 z-10">
          <span
            className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-2xs ${
              product.badgeType === 'orange'
                ? 'bg-[#FFA500] text-slate-900'
                : product.badgeType === 'green'
                ? 'bg-[#5DBB63] text-white'
                : product.badgeType === 'blue'
                ? 'bg-[#2563EB] text-white'
                : 'bg-slate-800 text-white'
            }`}
          >
            {product.badge}
          </span>
        </div>
      )}

      {/* Product Image */}
      <div
        className="w-full h-32 rounded-xl bg-slate-50 overflow-hidden flex items-center justify-center cursor-pointer mb-2 relative"
        onClick={() => onProductClick?.(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-bold tracking-wider text-emerald-700 uppercase">
            {product.brand}
          </span>
          <h3
            onClick={() => onProductClick?.(product)}
            className="text-xs font-bold text-slate-800 line-clamp-2 mt-0.5 leading-snug cursor-pointer hover:text-emerald-700"
          >
            {product.name}
          </h3>
        </div>

        {/* Pricing */}
        <div className="mt-2 mb-2.5">
          <div className="text-base font-extrabold text-slate-900 leading-none">
            {formatUSD(product.priceUSD)}
          </div>
          <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
            {formatBS(product.priceUSD)}
          </div>
        </div>

        {/* Add to Cart or Stepper */}
        {quantityInCart === 0 ? (
          <button
            id={`btn-add-${product.id}`}
            onClick={() => onAddToCart(product)}
            className="w-full py-2 px-3 bg-[#0F7638] hover:bg-[#0D622F] active:scale-98 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Agregar</span>
          </button>
        ) : (
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-1">
            <button
              id={`btn-dec-${product.id}`}
              onClick={() => onUpdateQuantity(product, quantityInCart - 1)}
              className="w-7 h-7 rounded-lg bg-white text-emerald-800 flex items-center justify-center hover:bg-emerald-100 shadow-2xs active:scale-95 transition-all"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-extrabold text-xs text-emerald-950 px-2">
              {quantityInCart}
            </span>
            <button
              id={`btn-inc-${product.id}`}
              onClick={() => onUpdateQuantity(product, quantityInCart + 1)}
              className="w-7 h-7 rounded-lg bg-[#0F7638] text-white flex items-center justify-center hover:bg-[#0D622F] shadow-2xs active:scale-95 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

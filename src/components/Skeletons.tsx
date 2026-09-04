import React from 'react';

/**
 * Shimmering skeleton loader for the Home Hero Banner.
 * Accurately replicates the dimensions, hierarchy, and micro-elements
 * of the Aikoz brand hero carousel with a sleek, premium shimmer effect.
 */
export const HeroBannerSkeleton: React.FC = () => {
  return (
    <div
      id="hero-banner-skeleton"
      aria-label="Cargando contenido destacado..."
      className="relative overflow-hidden rounded-3xl bg-slate-100 p-5 shadow-sm border border-slate-200/60 animate-pulse transition-all"
    >
      {/* Ambient shimmer gradient */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

      {/* Top Badges Row */}
      <div className="flex items-center gap-2 mb-3">
        <div className="h-5 w-28 rounded-full bg-slate-200/90" />
        <div className="h-5 w-24 rounded-full bg-slate-200/70" />
      </div>

      {/* Logo & Headline Skeleton */}
      <div className="space-y-2">
        <div className="h-7 w-32 rounded-lg bg-slate-300/80" />
        <div className="h-6 w-3/4 rounded-lg bg-slate-200/90" />
        <div className="h-6 w-1/2 rounded-lg bg-slate-200/80" />
      </div>

      {/* Subtitle / Paragraph Skeleton */}
      <div className="mt-3 space-y-1.5 max-w-[260px]">
        <div className="h-3 w-full rounded bg-slate-200/70" />
        <div className="h-3 w-4/5 rounded bg-slate-200/60" />
      </div>

      {/* Footer Row: Guarantee pill & CTA button */}
      <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-slate-200" />
          <div className="h-3.5 w-24 rounded-full bg-slate-200" />
        </div>
        <div className="h-8 w-32 rounded-full bg-slate-300/80" />
      </div>

      {/* Slider Dots Placeholder */}
      <div className="flex items-center justify-center gap-1.5 mt-3 pt-1">
        <div className="h-1.5 w-6 rounded-full bg-slate-300" />
        <div className="h-1.5 w-2 rounded-full bg-slate-200" />
        <div className="h-1.5 w-2 rounded-full bg-slate-200" />
      </div>
    </div>
  );
};

/**
 * Skeleton loader for a single Product Card.
 * Matches the exact height, border radius, padding, and layout of ProductCard.
 */
export const ProductCardSkeleton: React.FC = () => {
  return (
    <div
      className="bg-white rounded-2xl p-3 border border-slate-100 shadow-2xs flex flex-col justify-between relative animate-pulse overflow-hidden"
      aria-label="Cargando producto..."
    >
      {/* Subtle Shimmer Overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

      <div>
        {/* Badge Placeholder */}
        <div className="h-4 w-16 rounded-md bg-slate-100 mb-2" />

        {/* Product Image Placeholder */}
        <div className="w-full h-32 rounded-xl bg-slate-100 mb-2 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-slate-200/70" />
        </div>

        {/* Brand & Title Placeholder */}
        <div className="h-2.5 w-14 rounded bg-slate-200/60 mb-1.5" />
        <div className="space-y-1 mb-2">
          <div className="h-3 w-full rounded bg-slate-200/80" />
          <div className="h-3 w-3/4 rounded bg-slate-200/70" />
        </div>
      </div>

      <div>
        {/* Price Placeholder */}
        <div className="mt-2 mb-2.5 space-y-1">
          <div className="h-4 w-20 rounded bg-slate-300/80" />
          <div className="h-2.5 w-14 rounded bg-slate-200/60" />
        </div>

        {/* Add-to-cart Button Placeholder */}
        <div className="w-full h-8 rounded-xl bg-slate-200/90" />
      </div>
    </div>
  );
};

interface ProductGridSkeletonProps {
  count?: number;
  columns?: 2 | 3;
}

/**
 * Skeleton loader for a grid of products.
 * Replaces any generic loading text with clean, elegant placeholders.
 */
export const ProductGridSkeleton: React.FC<ProductGridSkeletonProps> = ({
  count = 4,
  columns = 2,
}) => {
  const items = Array.from({ length: count });

  return (
    <div
      id="product-grid-skeleton"
      className={`grid ${columns === 3 ? 'grid-cols-3' : 'grid-cols-2'} gap-3`}
    >
      {items.map((_, index) => (
        <ProductCardSkeleton key={`product-skeleton-${index}`} />
      ))}
    </div>
  );
};

/**
 * Skeleton loader for featured aisle cards (e.g. Bodegón & Farmacia)
 */
export const AisleBannerSkeleton: React.FC = () => {
  return (
    <div className="space-y-2.5 animate-pulse">
      {[1, 2].map((idx) => (
        <div
          key={`aisle-skeleton-${idx}`}
          className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-2xs flex items-center justify-between"
        >
          <div className="space-y-2 flex-1">
            <div className="h-3.5 w-20 rounded bg-slate-100" />
            <div className="h-4 w-32 rounded bg-slate-200/90" />
            <div className="h-3 w-40 rounded bg-slate-100" />
            <div className="h-3 w-16 rounded bg-slate-100 mt-1" />
          </div>
          <div className="w-20 h-16 rounded-xl bg-slate-100 shrink-0 ml-3" />
        </div>
      ))}
    </div>
  );
};

/**
 * Skeleton loader for horizontal Category Chips
 */
export const CategoryChipsSkeleton: React.FC = () => {
  return (
    <div className="flex items-center gap-2 overflow-hidden py-1 animate-pulse">
      {[70, 85, 90, 80, 75, 85].map((width, idx) => (
        <div
          key={`chip-skeleton-${idx}`}
          className="h-8 rounded-full bg-slate-100 border border-slate-200/60 shrink-0"
          style={{ width: `${width}px` }}
        />
      ))}
    </div>
  );
};

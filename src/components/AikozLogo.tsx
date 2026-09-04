import React from 'react';

interface AikozLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'white' | 'badge';
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const AikozLogo: React.FC<AikozLogoProps> = ({
  className = '',
  variant = 'full',
  showSubtitle = true,
  size = 'md',
}) => {
  // Height presets
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
    xl: 'h-14',
  };

  const currentHeight = sizeClasses[size] || 'h-8';

  // Exact Brand Colors from official branding assets:
  // Yellow/Gold: #F1A811
  // Leaf Green: #6FA638
  // Dark Green Accent: #0F7638
  const yellowColor = variant === 'white' ? '#FFFFFF' : '#F1A811';
  const greenColor = variant === 'white' ? '#FFFFFF' : '#6FA638';

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white shadow-xs border border-emerald-100 ${className}`}>
        <svg viewBox="0 0 110 40" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 'a' - yellow */}
          <text x="5" y="24" fontFamily="'Outfit', 'Poppins', 'Century Gothic', system-ui, sans-serif" fontWeight="800" fontSize="22" fill={yellowColor}>
            a
          </text>
          {/* 'i' stem green, dot yellow */}
          <text x="21" y="24" fontFamily="'Outfit', 'Poppins', 'Century Gothic', system-ui, sans-serif" fontWeight="800" fontSize="22" fill={greenColor}>
            ı
          </text>
          <circle cx="23.5" cy="8.5" r="2.5" fill={yellowColor} />
          {/* 'k' - green */}
          <text x="29" y="24" fontFamily="'Outfit', 'Poppins', 'Century Gothic', system-ui, sans-serif" fontWeight="800" fontSize="22" fill={greenColor}>
            k
          </text>
          {/* 'o' - green */}
          <text x="44" y="24" fontFamily="'Outfit', 'Poppins', 'Century Gothic', system-ui, sans-serif" fontWeight="800" fontSize="22" fill={greenColor}>
            o
          </text>
          {/* 'z' - yellow */}
          <text x="60" y="24" fontFamily="'Outfit', 'Poppins', 'Century Gothic', system-ui, sans-serif" fontWeight="800" fontSize="22" fill={yellowColor}>
            z
          </text>
          {/* Iconic Smile Curve */}
          <path
            d="M 6 30 C 25 38, 55 38, 73 30 C 55 35, 25 35, 6 30 Z"
            fill={greenColor}
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-col items-start select-none ${className}`}>
      <div className="flex items-center">
        <svg
          viewBox="0 0 130 42"
          className={`${currentHeight} w-auto`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="aikoz-glow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="1" stdDeviation="0.5" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Letter a (Warm Golden Yellow) */}
          <path
            d="M 12 28 C 12 29 13.5 29.5 15.5 29.5 C 19 29.5 22 27 22 23.5 L 22 13 C 22 11.5 21 10.5 19.5 10.5 C 17.5 10.5 16 11.5 15 12.5 C 13.5 11 11.5 10.5 9 10.5 C 4 10.5 0.5 14.5 0.5 20 C 0.5 25.5 4 29.5 9.5 29.5 C 12.5 29.5 14.5 28 15.5 26.5 L 15.5 28 C 15.5 29.5 14 30.5 12 30.5 L 12 28 Z M 15.5 20 C 15.5 23.5 13.5 25.5 10 25.5 C 6.5 25.5 4.8 23 4.8 20 C 4.8 17 6.5 14.5 10 14.5 C 13.5 14.5 15.5 16.5 15.5 20 Z"
            fill={yellowColor}
            transform="translate(4, 0)"
          />

          {/* Letter i: Yellow circular dot + Green stem */}
          <circle cx="34" cy="9.5" r="3.2" fill={yellowColor} />
          <rect x="31" y="15" width="6" height="14" rx="3" fill={greenColor} />

          {/* Letter k: Green */}
          <path
            d="M 43 5 C 43 3.5 44.5 2.5 46 2.5 C 47.5 2.5 49 3.5 49 5 L 49 18.5 L 56.5 14 C 58 13 60 14 60.5 15.5 C 61 17 60 18.5 58.5 19.5 L 52.5 23 L 60.5 28 C 62 29 62 31 60.5 32 C 59.5 32.8 58 32.5 57 31.5 L 49 26 L 49 28 C 49 29.5 47.5 30.5 46 30.5 C 44.5 30.5 43 29.5 43 28 L 43 5 Z"
            fill={greenColor}
          />

          {/* Letter o: Green round bowl */}
          <path
            d="M 75 10.5 C 69.5 10.5 65 15 65 20.5 C 65 26 69.5 30.5 75 30.5 C 80.5 30.5 85 26 85 20.5 C 85 15 80.5 10.5 75 10.5 Z M 75 25.5 C 72 25.5 69.8 23.3 69.8 20.5 C 69.8 17.7 72 15.5 75 15.5 C 78 15.5 80.2 17.7 80.2 20.5 C 80.2 23.3 78 25.5 75 25.5 Z"
            fill={greenColor}
          />

          {/* Letter z: Yellow */}
          <path
            d="M 91 14.5 C 91 13 92.5 12 94 12 L 104.5 12 C 106 12 107 13.5 106.2 14.8 L 97.5 26 L 105 26 C 106.5 26 107.5 27 107.5 28.5 C 107.5 30 106.5 31 105 31 L 93.5 31 C 92 31 91 29.5 91.8 28.2 L 100.5 17 L 94 17 C 92.5 17 91 16 91 14.5 Z"
            fill={yellowColor}
          />

          {/* The Iconic Smile Arc (spans from underneath 'a' to 'z') */}
          <path
            d="M 6 34.5 C 32 43, 82 43, 108 34.5 C 82 39.5, 32 39.5, 6 34.5 Z"
            fill={greenColor}
          />
        </svg>
      </div>

      {/* Official Slogan / Tagline */}
      {showSubtitle && (
        <div className="flex items-center gap-1 -mt-0.5 pl-1.5">
          <span
            className={`text-[8.5px] font-black tracking-[0.28em] uppercase ${
              variant === 'white' ? 'text-white/90' : 'text-[#0F7638]'
            }`}
          >
            HIPERMERCADO
          </span>
        </div>
      )}
    </div>
  );
};

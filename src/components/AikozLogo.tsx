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

  // Exact Brand Colors from the uploaded brand logo:
  // Warm Golden Yellow: #E5A114
  // Fresh Leaf Green: #78AB3E
  const yellowColor = variant === 'white' ? '#FFFFFF' : '#E5A114';
  const greenColor = variant === 'white' ? '#FFFFFF' : '#78AB3E';

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white shadow-xs border border-emerald-100 ${className}`}>
        <svg viewBox="0 0 160 85" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 'a' - Warm Yellow */}
          <path
            d="M 39 27.5 L 39 49.5 C 39 50 38.6 50.4 38.1 50.4 L 35.8 50.4 C 34.8 50.4 34.3 49.7 34 48.9 C 32.4 50.2 30 51 27 51 C 20 51 15 45.6 15 38.5 C 15 31.4 20 26 27 26 C 30.2 26 32.6 27.1 34 28.8 L 34.2 27.5 C 34.2 27 34.6 26.4 35.4 26.4 L 38.2 26.4 C 38.7 26.4 39 27 39 27.5 Z M 33.8 38.5 C 33.8 34.2 30.6 31.2 27 31.2 C 23.2 31.2 20.3 34.2 20.3 38.5 C 20.3 42.8 23.2 45.8 27 45.8 C 30.6 45.8 33.8 42.8 33.8 38.5 Z"
            fill={yellowColor}
          />
          {/* 'i' - Square yellow dot, green stem */}
          <rect x="48" y="16.5" width="5.5" height="5.5" rx="0.5" fill={yellowColor} />
          <rect x="48" y="26.5" width="5.5" height="24" rx="0.5" fill={greenColor} />
          {/* 'k' - Green */}
          <path
            d="M 61.5 16.5 L 67 16.5 L 67 33.5 L 77.5 26.5 L 84.5 26.5 L 73.5 37 L 85.5 50.5 L 78 50.5 L 67 38.5 L 67 50.5 L 61.5 50.5 Z"
            fill={greenColor}
          />
          {/* 'o' - Green */}
          <path
            d="M 104.5 26 C 111.7 26 117 31.6 117 38.5 C 117 45.4 111.7 51 104.5 51 C 97.3 51 92 45.4 92 38.5 C 92 31.6 97.3 26 104.5 26 Z M 104.5 31.2 C 100.4 31.2 97.3 34.4 97.3 38.5 C 97.3 42.6 100.4 45.8 104.5 45.8 C 108.6 45.8 111.7 42.6 111.7 38.5 C 111.7 34.4 108.6 31.2 104.5 31.2 Z"
            fill={greenColor}
          />
          {/* 'z' - Yellow */}
          <path
            d="M 124.5 26.5 L 147 26.5 L 147 31.5 L 132 45.5 L 147.5 45.5 L 147.5 50.5 L 123.5 50.5 L 123.5 45.5 L 138 31.5 L 124.5 31.5 Z"
            fill={yellowColor}
          />
          {/* Smile Curve */}
          <path
            d="M 23 58 C 36 82, 120 82, 135 58"
            stroke={greenColor}
            strokeWidth="5.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <div className="flex items-center">
        <svg
          viewBox="0 0 170 95"
          className={`${currentHeight} w-auto`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 'a' - Warm Yellow (#E5A114) */}
          <path
            d="M 41.5 29 L 41.5 53 C 41.5 53.6 41.1 54 40.5 54 L 38 54 C 36.9 54 36.4 53.2 36 52.3 C 34.3 53.7 31.6 54.6 28.5 54.6 C 20.8 54.6 15.2 48.7 15.2 41 C 15.2 33.3 20.8 27.4 28.5 27.4 C 32 27.4 34.6 28.6 36.2 30.5 L 36.4 29 C 36.4 28.4 36.9 27.8 37.8 27.8 L 40.8 27.8 C 41.3 27.8 41.5 28.4 41.5 29 Z M 35.8 41 C 35.8 36.3 32.3 33 28.4 33 C 24.3 33 21.2 36.3 21.2 41 C 21.2 45.7 24.3 49 28.4 49 C 32.3 49 35.8 45.7 35.8 41 Z"
            fill={yellowColor}
          />

          {/* 'i' - Square Yellow Dot, Leaf Green Stem (#78AB3E) */}
          <rect x="51.5" y="17" width="6" height="6" rx="0.5" fill={yellowColor} />
          <rect x="51.5" y="27.8" width="6" height="26.2" rx="0.5" fill={greenColor} />

          {/* 'k' - Leaf Green (#78AB3E), top aligned with i dot */}
          <path
            d="M 66 17 L 72 17 L 72 35.5 L 83.5 27.8 L 91 27.8 L 79 39.5 L 92 54 L 84 54 L 72 41 L 72 54 L 66 54 Z"
            fill={greenColor}
          />

          {/* 'o' - Leaf Green (#78AB3E) */}
          <path
            d="M 113 27.4 C 120.9 27.4 126.8 33.5 126.8 41 C 126.8 48.5 120.9 54.6 113 54.6 C 105.1 54.6 99.2 48.5 99.2 41 C 99.2 33.5 105.1 27.4 113 27.4 Z M 113 33 C 108.6 33 105.2 36.5 105.2 41 C 105.2 45.5 108.6 49 113 49 C 117.4 49 120.8 45.5 120.8 41 C 120.8 36.5 117.4 33 113 33 Z"
            fill={greenColor}
          />

          {/* 'z' - Warm Yellow (#E5A114) */}
          <path
            d="M 135 27.8 L 159.5 27.8 L 159.5 33.2 L 143.5 48.6 L 160 48.6 L 160 54 L 134 54 L 134 48.6 L 150 33.2 L 135 33.2 Z"
            fill={yellowColor}
          />

          {/* Smile Arc - Fresh Leaf Green (#78AB3E) */}
          <path
            d="M 24 62 C 38 88, 130 88, 147 62"
            stroke={greenColor}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Optional Brand Slogan / Subtitle */}
      {showSubtitle && (
        <div className="w-full flex items-center justify-center -mt-0.5">
          <span
            className={`text-[8.5px] font-black tracking-[0.26em] uppercase ${
              variant === 'white' ? 'text-white/90' : 'text-[#78AB3E]'
            }`}
          >
            HIPERMERCADO
          </span>
        </div>
      )}
    </div>
  );
};

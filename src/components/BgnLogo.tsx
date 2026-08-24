import React from 'react';

interface BgnLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export const BgnLogo: React.FC<BgnLogoProps> = ({ size = 90, className = '', showText = false }) => {
  return (
    <div className={`inline-flex flex-col items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm select-none"
      >
        <defs>
          {/* Gold Gradient Outer Rings */}
          <linearGradient id="bgnGoldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d5b46b" />
            <stop offset="35%" stopColor="#8a692c" />
            <stop offset="70%" stopColor="#f3de9e" />
            <stop offset="100%" stopColor="#75521b" />
          </linearGradient>

          <linearGradient id="bgnGoldGaruda" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fed049" />
            <stop offset="50%" stopColor="#d99b1a" />
            <stop offset="100%" stopColor="#b47805" />
          </linearGradient>

          <linearGradient id="bgnGoldPeople" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c5994e" />
            <stop offset="100%" stopColor="#9a6e27" />
          </linearGradient>

          <linearGradient id="bgnGreenLeaves" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8be364" />
            <stop offset="100%" stopColor="#55b331" />
          </linearGradient>

          {/* Curved Text Paths */}
          <path
            id="textPathTop"
            d="M 68 200 A 132 132 0 0 1 332 200"
            fill="none"
          />
          <path
            id="textPathBottom"
            d="M 332 200 A 132 132 0 0 1 68 200"
            fill="none"
          />
        </defs>

        {/* 1. Outer Dark Bronze & Gold Beveled Rings */}
        <circle cx="200" cy="200" r="192" fill="#584218" />
        <circle cx="200" cy="200" r="188" fill="url(#bgnGoldBorder)" />
        <circle cx="200" cy="200" r="177" fill="#3e2d10" />
        <circle cx="200" cy="200" r="172" fill="#c39d48" />

        {/* 2. Circular Light Cyan / Sky Blue Outer Ring Banner */}
        <circle cx="200" cy="200" r="168" fill="#b9e7f5" stroke="#3e2d10" strokeWidth="2" />

        {/* Navy Ring separator */}
        <circle cx="200" cy="200" r="126" fill="#0b1e3f" stroke="#c39d48" strokeWidth="4" />

        {/* 3. Text on Arc: BADAN GIZI NASIONAL */}
        <text
          fill="#0b1e3f"
          fontSize="24.5"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="4"
        >
          <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
            BADAN GIZI NASIONAL
          </textPath>
        </text>

        {/* Left & Right Decorative Dots */}
        <circle cx="56" cy="200" r="9" fill="#0b1e3f" />
        <circle cx="344" cy="200" r="9" fill="#0b1e3f" />

        {/* Text on Arc: REPUBLIK INDONESIA */}
        <text
          fill="#0b1e3f"
          fontSize="24.5"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="4"
        >
          <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
            REPUBLIK INDONESIA
          </textPath>
        </text>

        {/* 4. Center Navy Field (#0b1e3f) */}
        {/* Gold Silhouettes of People / Beneficiaries reaching hands up */}
        {/* Left Person Silhouette */}
        <path
          d="M 126 220 C 126 200, 114 205, 105 215 C 96 225, 90 245, 92 278 C 100 270, 110 260, 122 250 C 126 238, 126 225, 126 220 Z"
          fill="url(#bgnGoldPeople)"
          opacity="0.95"
        />
        <circle cx="106" cy="225" r="14" fill="url(#bgnGoldPeople)" />
        <path
          d="M 106 239 C 114 250, 124 265, 134 290 C 108 285, 95 285, 84 278 C 88 255, 96 242, 106 239 Z"
          fill="url(#bgnGoldPeople)"
        />
        {/* Left Raised Arm */}
        <path
          d="M 124 190 Q 128 220 134 260 Q 120 230 118 192 Q 120 188 124 190 Z"
          fill="url(#bgnGoldPeople)"
        />

        {/* Right Person Silhouette */}
        <path
          d="M 274 220 C 274 200, 286 205, 295 215 C 304 225, 310 245, 308 278 C 300 270, 290 260, 278 250 C 274 238, 274 225, 274 220 Z"
          fill="url(#bgnGoldPeople)"
          opacity="0.95"
        />
        <circle cx="294" cy="225" r="14" fill="url(#bgnGoldPeople)" />
        <path
          d="M 294 239 C 286 250, 276 265, 266 290 C 292 285, 305 285, 316 278 C 312 255, 304 242, 294 239 Z"
          fill="url(#bgnGoldPeople)"
        />
        {/* Right Raised Arm */}
        <path
          d="M 276 190 Q 272 220 266 260 Q 280 230 282 192 Q 280 188 276 190 Z"
          fill="url(#bgnGoldPeople)"
        />

        {/* 5. Center Bottom Two Green Nutrition Leaves */}
        <g transform="translate(0, 10)">
          {/* Left Leaf */}
          <path
            d="M 200 310 C 175 315, 145 295, 142 275 C 165 270, 190 288, 200 310 Z"
            fill="url(#bgnGreenLeaves)"
            stroke="#2e6d19"
            strokeWidth="1.5"
          />
          {/* Right Leaf */}
          <path
            d="M 200 310 C 225 315, 255 295, 258 275 C 235 270, 210 288, 200 310 Z"
            fill="url(#bgnGreenLeaves)"
            stroke="#2e6d19"
            strokeWidth="1.5"
          />
          {/* Center Leaf Stem Line */}
          <path d="M 200 310 Q 170 285 152 280" stroke="#3f8825" strokeWidth="1.5" fill="none" />
          <path d="M 200 310 Q 230 285 248 280" stroke="#3f8825" strokeWidth="1.5" fill="none" />
        </g>

        {/* 6. Official Center GARUDA PANCASILA */}
        <g id="GarudaEmblem" transform="translate(200, 192) scale(0.96)">
          {/* Garuda Wings Golden Splendor */}
          {/* Left Wing (17 Feathers) */}
          <path
            d="M -14 -10 Q -58 -65 -105 -52 Q -88 -20 -82 5 Q -70 28 -40 45 Q -25 38 -15 22 Z"
            fill="url(#bgnGoldGaruda)"
            stroke="#8d5f06"
            strokeWidth="1"
          />
          <path
            d="M -10 -15 C -45 -55 -95 -50 -105 -48 C -85 -10 -75 25 -42 42"
            stroke="#5f3e03"
            strokeWidth="1"
            fill="none"
          />
          {/* Wing feather divisions */}
          <path d="M -75 -40 L -30 5 M -85 -22 L -35 15 M -78 0 L -38 25" stroke="#ffe082" strokeWidth="1" />

          {/* Right Wing (17 Feathers) */}
          <path
            d="M 14 -10 Q 58 -65 105 -52 Q 88 -20 82 5 Q 70 28 40 45 Q 25 38 15 22 Z"
            fill="url(#bgnGoldGaruda)"
            stroke="#8d5f06"
            strokeWidth="1"
          />
          <path
            d="M 10 -15 C 45 -55 95 -50 105 -48 C 85 -10 75 25 42 42"
            stroke="#5f3e03"
            strokeWidth="1"
            fill="none"
          />
          {/* Right Wing feather divisions */}
          <path d="M 75 -40 L 30 5 M 85 -22 L 35 15 M 78 0 L 38 25" stroke="#ffe082" strokeWidth="1" />

          {/* Garuda Tail (8 Feathers) */}
          <path
            d="M -18 35 L -22 62 L -10 68 L 0 72 L 10 68 L 22 62 L 18 35 Z"
            fill="url(#bgnGoldGaruda)"
            stroke="#754b03"
            strokeWidth="1"
          />
          <path d="M -12 40 L -14 64 M -5 42 L -4 68 M 5 42 L 4 68 M 12 40 L 14 64" stroke="#5f3e03" strokeWidth="1" />

          {/* Garuda Head & Crown facing Right */}
          <path
            d="M 0 -22 C -6 -35 0 -58 10 -55 C 16 -54 22 -46 20 -40 C 28 -40 24 -34 18 -30 C 14 -22 8 -18 0 -22 Z"
            fill="url(#bgnGoldGaruda)"
            stroke="#754b03"
            strokeWidth="1"
          />
          {/* Beak */}
          <path d="M 16 -46 Q 26 -44 22 -38 Q 15 -38 14 -42 Z" fill="#d97706" stroke="#754b03" strokeWidth="0.8" />
          {/* Eye */}
          <circle cx="8" cy="-44" r="1.8" fill="#1e293b" />
          {/* Feathers crest */}
          <path d="M -2 -50 Q 4 -62 10 -56 M 3 -48 Q 10 -58 15 -50" stroke="#ffd54f" strokeWidth="1.2" fill="none" />

          {/* Garuda Legs & Claws holding Ribbon */}
          <path d="M -24 38 Q -28 50 -32 55 L -16 52" stroke="#754b03" strokeWidth="2.5" fill="none" />
          <path d="M 24 38 Q 28 50 32 55 L 16 52" stroke="#754b03" strokeWidth="2.5" fill="none" />

          {/* White Ribbon: BHINNEKA TUNGGAL IKA */}
          <g transform="translate(0, 52)">
            {/* White Ribbon banner */}
            <path
              d="M -52 0 Q -26 8 0 4 Q 26 8 52 0 L 48 10 Q 24 16 0 12 Q -24 16 -48 10 Z"
              fill="#ffffff"
              stroke="#64748b"
              strokeWidth="0.8"
            />
            {/* Ribbon notch tails */}
            <path d="M -52 0 L -62 -4 L -58 6 L -48 10 Z" fill="#e2e8f0" stroke="#64748b" strokeWidth="0.8" />
            <path d="M 52 0 L 62 -4 L 58 6 L 48 10 Z" fill="#e2e8f0" stroke="#64748b" strokeWidth="0.8" />
            {/* Text */}
            <text
              x="0"
              y="9"
              textAnchor="middle"
              fill="#0f172a"
              fontSize="5.2"
              fontWeight="900"
              fontFamily="system-ui, sans-serif"
              letterSpacing="0.4"
            >
              BHINNEKA TUNGGAL IKA
            </text>
          </g>

          {/* Center PANCASILA SHIELD */}
          <g transform="translate(0, 0)">
            {/* Shield Outline */}
            <path
              d="M 0 -22 Q 22 -22 26 -2 Q 28 20 0 34 Q -28 20 -26 -2 Q -22 -22 0 -22 Z"
              fill="#000000"
              stroke="#D4AF37"
              strokeWidth="2.5"
            />

            {/* 4 Quarters of the Shield */}
            {/* Top-Left: Banteng Head (Red background) */}
            <path d="M 0 -21 L 0 6 L -25 6 Q -24 -16 0 -21 Z" fill="#dc2626" />
            {/* Top-Right: Pohon Beringin (White background) */}
            <path d="M 0 -21 L 0 6 L 25 6 Q 24 -16 0 -21 Z" fill="#ffffff" />
            {/* Bottom-Left: Padi & Kapas (White background) */}
            <path d="M 0 6 L 0 32 Q -24 18 -25 6 Z" fill="#ffffff" />
            {/* Bottom-Right: Rantai Emas (Red background) */}
            <path d="M 0 6 L 0 32 Q 24 18 25 6 Z" fill="#dc2626" />

            {/* Black Cross Divider Line */}
            <line x1="-25" y1="6" x2="25" y2="6" stroke="#0f172a" strokeWidth="2.5" />
            <line x1="0" y1="-21" x2="0" y2="33" stroke="#0f172a" strokeWidth="2.5" />

            {/* Top-Left Emblem: Kepala Banteng (Black) */}
            <path
              d="M -13 -8 Q -13 -15 -18 -16 M -13 -8 Q -13 -15 -8 -16 M -16 -8 Q -13 -3 -10 -8 Q -13 -12 -16 -8 Z"
              stroke="#0f172a"
              strokeWidth="1.5"
              fill="#0f172a"
            />

            {/* Top-Right Emblem: Pohon Beringin (Green) */}
            <path
              d="M 13 -6 C 8 -6 8 -16 13 -16 C 18 -16 18 -6 13 -6 Z"
              fill="#15803d"
            />
            <line x1="13" y1="-6" x2="13" y2="2" stroke="#78350f" strokeWidth="1.5" />

            {/* Bottom-Left Emblem: Padi & Kapas (Yellow/Gold & Green) */}
            <path d="M -15 12 Q -18 20 -12 24" stroke="#eab308" strokeWidth="1.5" fill="none" />
            <circle cx="-16" cy="14" r="1.2" fill="#22c55e" />
            <circle cx="-17" cy="18" r="1.2" fill="#eab308" />

            {/* Bottom-Right Emblem: Rantai Emas (Gold Ring) */}
            <circle cx="13" cy="18" r="4.5" stroke="#f59e0b" strokeWidth="1.5" fill="none" />

            {/* Center Heart Emblem: Gold Star on Black Shield */}
            <polygon
              points="0,-4 3,3 -3,3"
              fill="#000000"
            />
            <polygon
              points="0,-3 2,3 -2,3"
              fill="#000000"
            />
            {/* Center Star in Gold */}
            <polygon
              points="0,-2 1.2,1 3.5,1 1.7,2.4 2.3,4.5 0,3.2 -2.3,4.5 -1.7,2.4 -3.5,1 -1.2,1"
              fill="#fbbf24"
              stroke="#b45309"
              strokeWidth="0.4"
            />
          </g>
        </g>
      </svg>
      {showText && (
        <span className="mt-1.5 text-xs font-black tracking-wider text-blue-950 uppercase">
          Badan Gizi Nasional RI
        </span>
      )}
    </div>
  );
};

import React from 'react';
import { BgnLogo } from './BgnLogo';
import { Calendar, Sparkles } from 'lucide-react';

interface HeaderBGNProps {
  hari: string;
  tanggal: string;
  isReadOnly?: boolean;
}

export const HeaderBGN: React.FC<HeaderBGNProps> = ({ hari, tanggal }) => {
  return (
    <header className="w-full flex flex-col items-center justify-center text-center pt-6 pb-4 px-4">
      {/* 1. Logo BGN di tengah halaman atas */}
      <div className="relative mb-3 flex items-center justify-center">
        <div className="absolute -inset-2 bg-gradient-to-r from-amber-300/30 via-blue-300/30 to-emerald-300/30 rounded-full blur-md" />
        <div className="relative bg-white p-2.5 rounded-full shadow-lg border-2 border-amber-200/80 hover:scale-105 transition-transform duration-300">
          <BgnLogo size={104} showText={false} />
        </div>
      </div>

      {/* 2. Di bawahnya dan di tengah halaman terdapat tulisan: SPPG Palasari Cibiru Kota Bandung - Yayasan Almadinah I */}
      <div className="max-w-2xl">
        <p className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-800 bg-slate-100/90 py-1.5 px-4 rounded-full inline-block border border-slate-200/80 shadow-2xs">
          SPPG Palasari Cibiru Kota Bandung - Yayasan Almadinah I
        </p>
      </div>

      {/* 3. Diberi jarak, tambahkan tulisan untuk judul: "Menu MBG SPPG Palasari Cibiru Kota Bandung" */}
      <div className="mt-4 mb-3">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-950 tracking-tight leading-tight">
          Menu MBG SPPG Palasari Cibiru Kota Bandung
        </h1>
        <p className="text-xs text-emerald-800 font-bold mt-1.5 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 inline" /> Program Makan Bergizi Gratis • Badan Gizi Nasional RI
        </p>
      </div>

      {/* 4. Hari & Tanggal info pill / badges */}
      <div className="mt-2.5 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-2 text-slate-800">
        <div className="flex items-center gap-1.5 font-bold text-sm sm:text-base text-blue-950">
          <span className="text-slate-500 font-semibold text-xs uppercase tracking-wider">Hari :</span>
          <span className="bg-blue-50 text-blue-900 px-3 py-0.5 rounded-md border border-blue-200">
            {hari || 'Senin'}
          </span>
        </div>
        <div className="h-4 w-px bg-slate-300 hidden sm:block" />
        <div className="flex items-center gap-1.5 font-bold text-sm sm:text-base text-slate-900">
          <Calendar className="w-4 h-4 text-emerald-700" />
          <span className="text-slate-500 font-semibold text-xs uppercase tracking-wider">Tanggal :</span>
          <span className="bg-emerald-50 text-emerald-950 px-3 py-0.5 rounded-md border border-emerald-200">
            {tanggal || '24 Agustus 2026'}
          </span>
        </div>
      </div>
    </header>
  );
};

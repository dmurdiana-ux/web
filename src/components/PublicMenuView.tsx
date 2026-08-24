import React, { useState } from 'react';
import { MenuMBGData, GiziItem } from '../types';
import { HeaderBGN } from './HeaderBGN';
import {
  Utensils,
  Wheat,
  Drumstick,
  Salad,
  Apple,
  AlertTriangle,
  Sparkles,
  Printer,
  Share2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Flame,
  Info,
  Maximize2,
  X,
  Droplets,
  HeartHandshake
} from 'lucide-react';

interface PublicMenuViewProps {
  data: MenuMBGData;
  onOpenAdmin?: () => void;
  showAdminSwitch?: boolean;
}

export const PublicMenuView: React.FC<PublicMenuViewProps> = ({
  data,
  onOpenAdmin,
  showAdminSwitch = true,
}) => {
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Menu MBG SPPG Palasari Cibiru - ${data.hari}, ${data.tanggal}`,
          text: `Menu MBG Hari Ini (${data.hari}, ${data.tanggal}): ${data.rincian.karbohidrat}, ${data.rincian.proteinHewani}, ${data.rincian.proteinNabati}, ${data.rincian.sayuran}, ${data.rincian.buah}. Segera dimakan maksimal 2 jam!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share dismissed');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    }
  };

  const renderGiziCard = (title: string, subtitle: string, gizi: GiziItem, badgeColor: string, borderColor: string, iconColor: string) => {
    return (
      <div className={`bg-white rounded-xl border ${borderColor} shadow-xs p-3.5 sm:p-4 flex flex-col justify-between transition-all hover:shadow-sm`}>
        <div className="border-b border-slate-100 pb-2 mb-2.5 flex items-start justify-between gap-2">
          <div>
            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${badgeColor} inline-block mb-1`}>
              {subtitle}
            </span>
            <h4 className="text-xs sm:text-sm font-black text-slate-800 leading-tight">
              {title}
            </h4>
          </div>
          <div className={`p-1.5 rounded-lg bg-slate-50 ${iconColor}`}>
            <Flame className="w-4 h-4" />
          </div>
        </div>

        {/* Nutritional list items */}
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between py-0.5 border-b border-slate-50">
            <span className="text-slate-500 font-medium">Energi :</span>
            <span className="font-extrabold text-amber-950 bg-amber-50 px-2 py-0.5 rounded text-xs border border-amber-200/50">
              {gizi.energi || '-'}
            </span>
          </div>
          <div className="flex items-center justify-between py-0.5 border-b border-slate-50">
            <span className="text-slate-500 font-medium">Protein :</span>
            <span className="font-bold text-red-900 bg-red-50/70 px-2 py-0.5 rounded">
              {gizi.protein || '-'}
            </span>
          </div>
          <div className="flex items-center justify-between py-0.5 border-b border-slate-50">
            <span className="text-slate-500 font-medium">Lemak :</span>
            <span className="font-bold text-yellow-900 bg-yellow-50/70 px-2 py-0.5 rounded">
              {gizi.lemak || '-'}
            </span>
          </div>
          <div className="flex items-center justify-between py-0.5 border-b border-slate-50">
            <span className="text-slate-500 font-medium">Karbohidrat :</span>
            <span className="font-bold text-blue-900 bg-blue-50/70 px-2 py-0.5 rounded">
              {gizi.karbohidrat || '-'}
            </span>
          </div>
          <div className="flex items-center justify-between py-0.5">
            <span className="text-slate-500 font-medium">Serat :</span>
            <span className="font-bold text-emerald-900 bg-emerald-50/70 px-2 py-0.5 rounded">
              {gizi.serat || '-'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 pb-16">
      {/* Top Floating Bar for View / Actions (No edit on public page) */}
      <div className="bg-blue-950 text-white px-4 py-2.5 sticky top-0 z-30 shadow-md no-print">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold tracking-wide uppercase">
              Halaman Publik Resmi MBG (Hasil Scan)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1 text-xs font-semibold bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-md transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{shareSuccess ? 'Tersalin!' : 'Bagikan'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1 text-xs font-semibold bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-md transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cetak</span>
            </button>
            {showAdminSwitch && onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-blue-950 px-3 py-1 rounded-md transition-colors shadow-2xs"
              >
                Panel Admin
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto p-3 sm:p-6">
        <div className="bg-white rounded-2xl shadow-md border border-slate-200/80 overflow-hidden print:shadow-none print:border-none">
          {/* Header BGN */}
          <HeaderBGN hari={data.hari} tanggal={data.tanggal} isReadOnly={true} />

          <div className="p-4 sm:p-6 sm:pt-2 space-y-6">
            
            {/* 1. SECTION: UPLOAD 2 FOTO MENU HARIAN (FOTO MAKANAN RESMI) */}
            <section className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-emerald-700 text-white rounded-lg">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-black text-slate-900">
                      Dokumentasi Foto Menu Harian
                    </h2>
                    <p className="text-xs text-slate-500">
                      Foto hidangan aktual sajian Makan Bergizi Gratis (MBG) hari ini
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Terverifikasi SPPG
                </span>
              </div>

              {/* 2 Food Photos Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Foto 1 */}
                <div className="relative group bg-slate-900 rounded-xl overflow-hidden shadow-sm aspect-4/3 border border-slate-200">
                  {data.foto1 ? (
                    <img
                      src={data.foto1}
                      alt="Foto Menu MBG 1"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100">
                      <Utensils className="w-10 h-10 mb-2 text-slate-300" />
                      <span className="text-xs font-semibold">Foto Menu 1 Belum Diunggah</span>
                    </div>
                  )}
                  {data.foto1 && (
                    <button
                      onClick={() => setActivePhotoModal(data.foto1)}
                      className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-lg text-xs backdrop-blur-xs flex items-center gap-1 transition-all opacity-90 group-hover:opacity-100 no-print"
                      title="Perbesar Foto"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold">Perbesar</span>
                    </button>
                  )}
                  <div className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-black px-2 py-0.5 rounded-md backdrop-blur-xs">
                    Foto 1: Sajian Ompreng
                  </div>
                </div>

                {/* Foto 2 */}
                <div className="relative group bg-slate-900 rounded-xl overflow-hidden shadow-sm aspect-4/3 border border-slate-200">
                  {data.foto2 ? (
                    <img
                      src={data.foto2}
                      alt="Foto Menu MBG 2"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100">
                      <Utensils className="w-10 h-10 mb-2 text-slate-300" />
                      <span className="text-xs font-semibold">Foto Menu 2 Belum Diunggah</span>
                    </div>
                  )}
                  {data.foto2 && (
                    <button
                      onClick={() => setActivePhotoModal(data.foto2)}
                      className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-lg text-xs backdrop-blur-xs flex items-center gap-1 transition-all opacity-90 group-hover:opacity-100 no-print"
                      title="Perbesar Foto"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold">Perbesar</span>
                    </button>
                  )}
                  <div className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-black px-2 py-0.5 rounded-md backdrop-blur-xs">
                    Foto 2: Menu & Buah
                  </div>
                </div>
              </div>
            </section>

            {/* 2. SECTION: RINCIAN MENU */}
            <section className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5 mb-4">
                <div className="p-1.5 bg-blue-900 text-white rounded-lg">
                  <Utensils className="w-4 h-4" />
                </div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  RINCIAN MENU
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {/* Karbohidrat */}
                <div className="bg-amber-50/50 border border-amber-200/70 rounded-xl p-3 flex items-start gap-3">
                  <div className="p-2 bg-amber-100 text-amber-800 rounded-lg shrink-0">
                    <Wheat className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block">
                      Karbohidrat
                    </span>
                    <p className="text-sm font-extrabold text-slate-900 mt-0.5 break-words">
                      {data.rincian.karbohidrat || 'Nasi'}
                    </p>
                  </div>
                </div>

                {/* Protein Hewani */}
                <div className="bg-red-50/50 border border-red-200/70 rounded-xl p-3 flex items-start gap-3">
                  <div className="p-2 bg-red-100 text-red-800 rounded-lg shrink-0">
                    <Drumstick className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-red-800 block">
                      Protein Hewani
                    </span>
                    <p className="text-sm font-extrabold text-slate-900 mt-0.5 break-words">
                      {data.rincian.proteinHewani || 'Ayam'}
                    </p>
                  </div>
                </div>

                {/* Protein Nabati */}
                <div className="bg-yellow-50/60 border border-yellow-200/70 rounded-xl p-3 flex items-start gap-3">
                  <div className="p-2 bg-yellow-100 text-yellow-800 rounded-lg shrink-0">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-yellow-800 block">
                      Protein Nabati
                    </span>
                    <p className="text-sm font-extrabold text-slate-900 mt-0.5 break-words">
                      {data.rincian.proteinNabati || 'Tempe'}
                    </p>
                  </div>
                </div>

                {/* Sayuran */}
                <div className="bg-emerald-50/50 border border-emerald-200/70 rounded-xl p-3 flex items-start gap-3">
                  <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg shrink-0">
                    <Salad className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                      Sayuran
                    </span>
                    <p className="text-sm font-extrabold text-slate-900 mt-0.5 break-words">
                      {data.rincian.sayuran || '-'}
                    </p>
                  </div>
                </div>

                {/* Buah */}
                <div className="bg-orange-50/50 border border-orange-200/70 rounded-xl p-3 flex items-start gap-3 sm:col-span-2 md:col-span-2">
                  <div className="p-2 bg-orange-100 text-orange-800 rounded-lg shrink-0">
                    <Apple className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-orange-800 block">
                      Buah
                    </span>
                    <p className="text-sm font-extrabold text-slate-900 mt-0.5 break-words">
                      {data.rincian.buah || '-'}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. SECTION: KANDUNGAN GIZI */}
            <section className="bg-gradient-to-br from-slate-50 to-blue-50/30 border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-amber-500 text-slate-950 rounded-lg">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      KANDUNGAN GIZI
                    </h2>
                    <p className="text-xs text-slate-500">
                      Standar pemenuhan angka kecukupan gizi per porsi penerima manfaat
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid 4 Kategori (Baris 1 & Baris 2) */}
              <div className="space-y-4">
                {/* Baris Ke 1 (Porsi Besar: Bumil/Busui & Siswa SD 4-6, SMP, SMA) */}
                <div>
                  <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-slate-600 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    Baris 1 — Kategori Porsi Besar
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {renderGiziCard(
                      'Porsi Besar (Bumil/Busui)',
                      'Ibu Hamil & Menyusui',
                      data.gizi.porsiBesarBumil,
                      'bg-purple-100 text-purple-800',
                      'border-purple-200/80',
                      'text-purple-600'
                    )}
                    {renderGiziCard(
                      'Porsi Besar Siswa',
                      'SD 4-6, SMP & SMA',
                      data.gizi.porsiBesarSiswa,
                      'bg-blue-100 text-blue-800',
                      'border-blue-200/80',
                      'text-blue-600'
                    )}
                  </div>
                </div>

                {/* Baris Ke 2 (Porsi Kecil: Balita & Siswa SD 1-3) */}
                <div>
                  <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-slate-600 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    Baris 2 — Kategori Porsi Kecil
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {renderGiziCard(
                      'Porsi Kecil (Balita)',
                      'Balita & Anak Usia Dini',
                      data.gizi.porsiKecilBalita,
                      'bg-emerald-100 text-emerald-800',
                      'border-emerald-200/80',
                      'text-emerald-600'
                    )}
                    {renderGiziCard(
                      'Porsi Kecil Siswa',
                      'SD Kelas 1 - 3',
                      data.gizi.porsiKecilSiswa,
                      'bg-teal-100 text-teal-800',
                      'border-teal-200/80',
                      'text-teal-600'
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* 4. SECTION: CATATAN ALERGEN & PENGINGAT */}
            <section className="space-y-3">
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 shadow-xs">
                <div className="flex items-center gap-2 text-amber-900 font-black text-sm uppercase tracking-wide mb-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  CATATAN ALERGEN & PENGINGAT
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  {/* Alergen */}
                  <div className="flex items-start gap-2 text-slate-800 bg-white/80 p-2.5 rounded-xl border border-amber-200">
                    <span className="text-base shrink-0">⚠️</span>
                    <div>
                      <strong className="font-bold text-amber-950">Alergen: </strong>
                      <span className="font-semibold text-slate-800">
                        {data.catatanAlergen || 'Mengandung kedelai (tahu/tempe).'}
                      </span>
                    </div>
                  </div>

                  {/* Pengingat cuci tangan */}
                  <div className="flex items-start gap-2 text-slate-800 bg-white/80 p-2.5 rounded-xl border border-amber-200">
                    <span className="text-base shrink-0">🧼</span>
                    <div>
                      <strong className="font-bold text-blue-950">Penting: </strong>
                      <span className="font-semibold text-slate-800">
                        {data.catatanPengingat || 'Harap mencuci tangan dengan sabun sebelum makan!'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Highlight Banner: Batas Waktu Santap Ompreng */}
              <div className="bg-gradient-to-r from-red-600 via-red-500 to-rose-600 text-white rounded-2xl p-4 shadow-md text-center">
                <div className="inline-flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-1.5">
                  <Clock className="w-3.5 h-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
                  Instruksi Higienitas & Keamanan Pangan
                </div>
                <p className="text-sm sm:text-base md:text-lg font-black tracking-tight leading-snug">
                  "{data.pesanWaktuHabis || 'Untuk Segera dimakan maksimal 2 Jam Setelah Ompreng sampai di Sekolah dan Tidak untuk di bawa pulang'}"
                </p>
              </div>
            </section>

            {/* 5. SECTION: TANDA TANGAN (TTD) KASPPG */}
            <section className="border-t border-slate-200 pt-6 mt-6 page-break-avoid">
              <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6">
                
                {/* Verification Meta */}
                <div className="text-center sm:text-left text-xs text-slate-500 space-y-1">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-800 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Menu Terbitan Resmi MBG SPPG
                  </div>
                  <p>Wilayah: {data.lokasiKasppg || 'Palasari Cibiru Kota Bandung'}</p>
                  <p className="text-[11px] text-slate-400">
                    ID Verifikasi: {data.nipKasppg || 'KASPPG-PLSR-042'} • Update: {new Date(data.lastUpdated).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                  </p>
                </div>

                {/* Official Signature Box */}
                <div className="w-64 text-center bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-2xs">
                  <p className="text-xs font-semibold text-slate-600">TTD</p>
                  
                  {/* Digital Signature representation or stamp */}
                  <div className="h-16 my-1 flex items-center justify-center relative">
                    {/* Stamp Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                      <div className="border-2 border-blue-900 rounded-full w-14 h-14 flex items-center justify-center text-[8px] font-black text-blue-900 uppercase transform -rotate-12">
                        BGN VALID
                      </div>
                    </div>
                    {/* Stylized cursive signature */}
                    <span className="font-serif italic text-2xl font-bold text-blue-900 tracking-wider">
                      Mulyana.
                    </span>
                  </div>

                  <div className="border-t border-slate-300 pt-1.5">
                    <p className="text-xs font-black text-slate-900 uppercase">
                      KASPPG
                    </p>
                    <p className="text-xs font-extrabold text-blue-900">
                      {data.lokasiKasppg || 'Palasari Cibiru Kota Bandung'}
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      {data.namaKasppg || 'Drs. H. Mulyana S., M.Pd.'}
                    </p>
                  </div>
                </div>

              </div>
            </section>

          </div>
        </div>
      </main>

      {/* Lightbox Photo Zoom Modal */}
      {activePhotoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActivePhotoModal(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-slate-950 rounded-2xl overflow-hidden shadow-2xl p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhotoModal(null)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full z-10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activePhotoModal}
              alt="Detail Menu MBG"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <div className="p-3 text-center text-white text-xs font-semibold">
              Dokumentasi Sajian MBG SPPG Palasari Cibiru Kota Bandung
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useRef } from 'react';
import { MenuMBGData, GiziItem } from '../types';
import { MENU_PRESETS } from '../data/defaultMenu';
import { DynamicQRCode } from './DynamicQRCode';
import { BgnLogo } from './BgnLogo';
import {
  Save,
  Upload,
  Camera,
  Trash2,
  Sparkles,
  Eye,
  QrCode as QrIcon,
  RefreshCw,
  CheckCircle2,
  Calendar,
  Utensils,
  Wheat,
  Drumstick,
  HeartHandshake,
  Salad,
  Apple,
  AlertTriangle,
  Clock,
  UserCheck,
  FileCheck
} from 'lucide-react';

interface AdminMenuFormProps {
  data: MenuMBGData;
  onSave: (newData: MenuMBGData) => void;
  onViewPublic: () => void;
}

export const AdminMenuForm: React.FC<AdminMenuFormProps> = ({
  data,
  onSave,
  onViewPublic,
}) => {
  const [formData, setFormData] = useState<MenuMBGData>(data);
  const [savedNotification, setSavedNotification] = useState(false);
  const [activeTab, setActiveTab] = useState<'form' | 'qr'>('form');

  const fileInputRef1 = useRef<HTMLInputElement | null>(null);
  const fileInputRef2 = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (field: keyof MenuMBGData, value: any) => {
    const updated = { ...formData, [field]: value, lastUpdated: new Date().toISOString() };
    setFormData(updated);
    onSave(updated);
    triggerAutoSave();
  };

  const handleRincianChange = (field: keyof MenuMBGData['rincian'], value: string) => {
    const updated = {
      ...formData,
      rincian: {
        ...formData.rincian,
        [field]: value,
      },
      lastUpdated: new Date().toISOString(),
    };
    setFormData(updated);
    onSave(updated);
    triggerAutoSave();
  };

  const handleGiziChange = (category: keyof MenuMBGData['gizi'], field: keyof GiziItem, value: string) => {
    const updated = {
      ...formData,
      gizi: {
        ...formData.gizi,
        [category]: {
          ...formData.gizi[category],
          [field]: value,
        },
      },
      lastUpdated: new Date().toISOString(),
    };
    setFormData(updated);
    onSave(updated);
    triggerAutoSave();
  };

  const triggerAutoSave = () => {
    setSavedNotification(true);
    setTimeout(() => {
      setSavedNotification(false);
    }, 1500);
  };

  // Handle Photo Upload with Image Compression (to ensure smooth localStorage saving)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, photoKey: 'foto1' | 'foto2') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1000;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          handleInputChange(photoKey, compressedDataUrl);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const applyPreset = (preset: typeof MENU_PRESETS[0]) => {
    const updated: MenuMBGData = {
      ...formData,
      rincian: { ...preset.rincian },
      foto1: preset.foto1,
      foto2: preset.foto2,
      catatanAlergen: preset.alergen,
      gizi: { ...preset.gizi },
      lastUpdated: new Date().toISOString(),
    };
    setFormData(updated);
    onSave(updated);
    triggerAutoSave();
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-20">
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white sticky top-0 z-30 shadow-md border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <BgnLogo size={38} />
            <div>
              <h1 className="text-sm sm:text-base font-black tracking-tight leading-none text-white">
                Admin Panel MBG
              </h1>
              <p className="text-[11px] text-amber-400 font-semibold mt-0.5">
                SPPG Palasari Cibiru Kota Bandung
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedNotification && (
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-500/40 animate-fade-in">
                <CheckCircle2 className="w-3.5 h-3.5" /> Tersimpan Otomatis
              </span>
            )}

            <button
              onClick={onViewPublic}
              className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm transition-all active:scale-95"
            >
              <Eye className="w-3.5 h-3.5" />
              Lihat Tampilan Publik
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="max-w-5xl mx-auto px-4 flex gap-1 border-t border-slate-800 pt-1">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-4 py-2 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'form'
                ? 'border-amber-400 text-amber-300 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" /> Form Input Menu & Foto
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`px-4 py-2 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'qr'
                ? 'border-amber-400 text-amber-300 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <QrIcon className="w-3.5 h-3.5" /> QR Code Dinamis (Logo BGN)
          </button>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-5xl mx-auto p-4 sm:p-6">
        {activeTab === 'qr' ? (
          <div className="space-y-6">
            <DynamicQRCode />
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <h4 className="text-sm font-bold text-slate-800 mb-1">Kemudahan Operasional Harian</h4>
              <p className="text-xs text-slate-500 max-w-xl mx-auto mb-4">
                Anda tidak perlu mengganti atau mencetak ulang QR Code setiap hari! QR code di atas adalah QR Dinamis tetap yang akan selalu menampilkan menu hari ini yang Anda inputkan di Form Admin.
              </p>
              <button
                onClick={() => setActiveTab('form')}
                className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold px-4 py-2 rounded-lg"
              >
                <Utensils className="w-3.5 h-3.5" /> Kembali ke Form Input Menu
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Quick Presets Bar */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-2xl p-4 text-white shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-black flex items-center gap-1.5 text-amber-300">
                    <Sparkles className="w-4 h-4" /> Template Cepat Menu MBG
                  </h3>
                  <p className="text-xs text-slate-300">
                    Pilih template rekomendasi untuk mengisi otomatis form menu & nilai gizi:
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {MENU_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => applyPreset(preset)}
                      className="text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-lg transition-all active:scale-95"
                    >
                      {preset.nama}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* SECTION 1: HEADER & TANGGAL */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-900" />
                1. Informasi Waktu & Tanggal Sajian
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Hari :
                  </label>
                  <select
                    value={formData.hari}
                    onChange={(e) => handleInputChange('hari', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-800"
                  >
                    <option value="Senin">Senin</option>
                    <option value="Selasa">Selasa</option>
                    <option value="Rabu">Rabu</option>
                    <option value="Kamis">Kamis</option>
                    <option value="Jumat">Jumat</option>
                    <option value="Sabtu">Sabtu</option>
                    <option value="Minggu">Minggu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Tanggal :
                  </label>
                  <input
                    type="text"
                    value={formData.tanggal}
                    onChange={(e) => handleInputChange('tanggal', e.target.value)}
                    placeholder="Contoh: 24 Agustus 2026"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: UPLOAD 2 FOTO MENU HARIAN */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <Camera className="w-4 h-4 text-emerald-700" />
                  2. Upload 2 Foto Menu Harian (Tersimpan Otomatis)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Foto 1 Upload */}
                <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-black text-slate-800 block mb-1">
                      Foto 1 (Sajian Lengkap Ompreng)
                    </span>
                    <div className="relative aspect-4/3 bg-slate-200 rounded-lg overflow-hidden border border-slate-300 mb-3">
                      {formData.foto1 ? (
                        <img
                          src={formData.foto1}
                          alt="Preview Foto 1"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                          <Camera className="w-8 h-8 mb-1" />
                          <span className="text-xs font-semibold">Belum Ada Foto</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={fileInputRef1}
                      accept="image/*"
                      onChange={(e) => handlePhotoUpload(e, 'foto1')}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef1.current?.click()}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold py-2 px-3 rounded-lg shadow-2xs transition-all active:scale-95"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      {formData.foto1 ? 'Ganti Foto 1' : 'Pilih Foto 1'}
                    </button>
                    {formData.foto1 && (
                      <button
                        type="button"
                        onClick={() => handleInputChange('foto1', '')}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg border border-red-200"
                        title="Hapus Foto 1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Foto 2 Upload */}
                <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-black text-slate-800 block mb-1">
                      Foto 2 (Detail Hidangan / Buah)
                    </span>
                    <div className="relative aspect-4/3 bg-slate-200 rounded-lg overflow-hidden border border-slate-300 mb-3">
                      {formData.foto2 ? (
                        <img
                          src={formData.foto2}
                          alt="Preview Foto 2"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                          <Camera className="w-8 h-8 mb-1" />
                          <span className="text-xs font-semibold">Belum Ada Foto</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={fileInputRef2}
                      accept="image/*"
                      onChange={(e) => handlePhotoUpload(e, 'foto2')}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef2.current?.click()}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold py-2 px-3 rounded-lg shadow-2xs transition-all active:scale-95"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      {formData.foto2 ? 'Ganti Foto 2' : 'Pilih Foto 2'}
                    </button>
                    {formData.foto2 && (
                      <button
                        type="button"
                        onClick={() => handleInputChange('foto2', '')}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg border border-red-200"
                        title="Hapus Foto 2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3: RINCIAN MENU */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-amber-700" />
                3. RINCIAN MENU
              </h3>

              <div className="space-y-3">
                {/* Karbohidrat */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <label className="sm:w-44 text-xs font-extrabold text-amber-900 flex items-center gap-1.5">
                    <Wheat className="w-4 h-4" /> Karbohidrat :
                  </label>
                  <input
                    type="text"
                    value={formData.rincian.karbohidrat}
                    onChange={(e) => handleRincianChange('karbohidrat', e.target.value)}
                    placeholder="Contoh: Nasi Putih Pulen"
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Protein Hewani */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <label className="sm:w-44 text-xs font-extrabold text-red-900 flex items-center gap-1.5">
                    <Drumstick className="w-4 h-4" /> Protein Hewani :
                  </label>
                  <input
                    type="text"
                    value={formData.rincian.proteinHewani}
                    onChange={(e) => handleRincianChange('proteinHewani', e.target.value)}
                    placeholder="Contoh: Ayam Ungkep Goreng Lengkuas"
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Protein Nabati */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <label className="sm:w-44 text-xs font-extrabold text-yellow-900 flex items-center gap-1.5">
                    <HeartHandshake className="w-4 h-4" /> Protein Nabati :
                  </label>
                  <input
                    type="text"
                    value={formData.rincian.proteinNabati}
                    onChange={(e) => handleRincianChange('proteinNabati', e.target.value)}
                    placeholder="Contoh: Tempe Orek Manis Gurih"
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                {/* Sayuran */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <label className="sm:w-44 text-xs font-extrabold text-emerald-900 flex items-center gap-1.5">
                    <Salad className="w-4 h-4" /> Sayuran :
                  </label>
                  <input
                    type="text"
                    value={formData.rincian.sayuran}
                    onChange={(e) => handleRincianChange('sayuran', e.target.value)}
                    placeholder="Contoh: Sayur Sop Wortel & Buncis"
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Buah */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <label className="sm:w-44 text-xs font-extrabold text-orange-900 flex items-center gap-1.5">
                    <Apple className="w-4 h-4" /> Buah :
                  </label>
                  <input
                    type="text"
                    value={formData.rincian.buah}
                    onChange={(e) => handleRincianChange('buah', e.target.value)}
                    placeholder="Contoh: Pisang Barangan Manis"
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 4: KANDUNGAN GIZI */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-indigo-700" />
                4. KANDUNGAN GIZI (4 Kategori)
              </h3>

              <div className="space-y-6">
                
                {/* Baris 1: Porsi Besar (Bumil/Busui) */}
                <div className="bg-purple-50/50 border border-purple-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-purple-950 uppercase tracking-wide">
                      Porsi Besar (Bumil/Busui) — Posisi (Baris ke 1)
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Energi :</label>
                      <input
                        type="text"
                        value={formData.gizi.porsiBesarBumil.energi}
                        onChange={(e) => handleGiziChange('porsiBesarBumil', 'energi', e.target.value)}
                        placeholder="720 kkal"
                        className="w-full bg-white border border-purple-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Protein :</label>
                      <input
                        type="text"
                        value={formData.gizi.porsiBesarBumil.protein}
                        onChange={(e) => handleGiziChange('porsiBesarBumil', 'protein', e.target.value)}
                        placeholder="32 g"
                        className="w-full bg-white border border-purple-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Lemak :</label>
                      <input
                        type="text"
                        value={formData.gizi.porsiBesarBumil.lemak}
                        onChange={(e) => handleGiziChange('porsiBesarBumil', 'lemak', e.target.value)}
                        placeholder="22 g"
                        className="w-full bg-white border border-purple-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Karbohidrat :</label>
                      <input
                        type="text"
                        value={formData.gizi.porsiBesarBumil.karbohidrat}
                        onChange={(e) => handleGiziChange('porsiBesarBumil', 'karbohidrat', e.target.value)}
                        placeholder="96 g"
                        className="w-full bg-white border border-purple-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Serat :</label>
                      <input
                        type="text"
                        value={formData.gizi.porsiBesarBumil.serat}
                        onChange={(e) => handleGiziChange('porsiBesarBumil', 'serat', e.target.value)}
                        placeholder="7.5 g"
                        className="w-full bg-white border border-purple-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Baris 1: Porsi Besar Siswa (SD 4-6, SMP & SMA) */}
                <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-blue-950 uppercase tracking-wide">
                      Porsi Besar Siswa (SD 4-6, SMP & SMA) — Posisi (Baris ke 1)
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Energi :</label>
                      <input
                        type="text"
                        value={formData.gizi.porsiBesarSiswa.energi}
                        onChange={(e) => handleGiziChange('porsiBesarSiswa', 'energi', e.target.value)}
                        placeholder="680 kkal"
                        className="w-full bg-white border border-blue-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Protein :</label>
                      <input
                        type="text"
                        value={formData.gizi.porsiBesarSiswa.protein}
                        onChange={(e) => handleGiziChange('porsiBesarSiswa', 'protein', e.target.value)}
                        placeholder="29 g"
                        className="w-full bg-white border border-blue-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Lemak :</label>
                      <input
                        type="text"
                        value={formData.gizi.porsiBesarSiswa.lemak}
                        onChange={(e) => handleGiziChange('porsiBesarSiswa', 'lemak', e.target.value)}
                        placeholder="20 g"
                        className="w-full bg-white border border-blue-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Karbohidrat :</label>
                      <input
                        type="text"
                        value={formData.gizi.porsiBesarSiswa.karbohidrat}
                        onChange={(e) => handleGiziChange('porsiBesarSiswa', 'karbohidrat', e.target.value)}
                        placeholder="92 g"
                        className="w-full bg-white border border-blue-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Serat :</label>
                      <input
                        type="text"
                        value={formData.gizi.porsiBesarSiswa.serat}
                        onChange={(e) => handleGiziChange('porsiBesarSiswa', 'serat', e.target.value)}
                        placeholder="6.8 g"
                        className="w-full bg-white border border-blue-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Baris 2: Porsi Kecil (Balita) */}
                <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-emerald-950 uppercase tracking-wide">
                      Porsi Kecil (Balita) — Posisi (Baris ke 2)
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Energi :</label>
                      <input
                        type="text"
                        value={formData.gizi.porsiKecilBalita.energi}
                        onChange={(e) => handleGiziChange('porsiKecilBalita', 'energi', e.target.value)}
                        placeholder="380 kkal"
                        className="w-full bg-white border border-emerald-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Protein :</label>
                      <input
                        type="text"
                        value={formData.gizi.porsiKecilBalita.protein}
                        onChange={(e) => handleGiziChange('porsiKecilBalita', 'protein', e.target.value)}
                        placeholder="16 g"
                        className="w-full bg-white border border-emerald-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Lemak :</label>
                      <input
                        type="text"
                        value={formData.gizi.porsiKecilBalita.lemak}
                        onChange={(e) => handleGiziChange('porsiKecilBalita', 'lemak', e.target.value)}
                        placeholder="12 g"
                        className="w-full bg-white border border-emerald-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Karbohidrat :</label>
                      <input
                        type="text"
                        value={formData.gizi.porsiKecilBalita.karbohidrat}
                        onChange={(e) => handleGiziChange('porsiKecilBalita', 'karbohidrat', e.target.value)}
                        placeholder="52 g"
                        className="w-full bg-white border border-emerald-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Serat :</label>
                      <input
                        type="text"
                        value={formData.gizi.porsiKecilBalita.serat}
                        onChange={(e) => handleGiziChange('porsiKecilBalita', 'serat', e.target.value)}
                        placeholder="3.8 g"
                        className="w-full bg-white border border-emerald-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Baris 2: Porsi Kecil Siswa (SD 1-3) */}
                <div className="bg-teal-50/50 border border-teal-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-teal-950 uppercase tracking-wide">
                      Porsi Kecil Siswa (SD 1-3) — Posisi (Baris ke 2)
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Energi :</label>
                      <input
                        type="text"
                        value={formData.gizi.porsiKecilSiswa.energi}
                        onChange={(e) => handleGiziChange('porsiKecilSiswa', 'energi', e.target.value)}
                        placeholder="490 kkal"
                        className="w-full bg-white border border-teal-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Protein :</label>
                      <input
                        type="text"
                        value={formData.gizi.porsiKecilSiswa.protein}
                        onChange={(e) => handleGiziChange('porsiKecilSiswa', 'protein', e.target.value)}
                        placeholder="21 g"
                        className="w-full bg-white border border-teal-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Lemak :</label>
                      <input
                        type="text"
                        value={formData.gizi.porsiKecilSiswa.lemak}
                        onChange={(e) => handleGiziChange('porsiKecilSiswa', 'lemak', e.target.value)}
                        placeholder="15 g"
                        className="w-full bg-white border border-teal-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Karbohidrat :</label>
                      <input
                        type="text"
                        value={formData.gizi.porsiKecilSiswa.karbohidrat}
                        onChange={(e) => handleGiziChange('porsiKecilSiswa', 'karbohidrat', e.target.value)}
                        placeholder="68 g"
                        className="w-full bg-white border border-teal-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Serat :</label>
                      <input
                        type="text"
                        value={formData.gizi.porsiKecilSiswa.serat}
                        onChange={(e) => handleGiziChange('porsiKecilSiswa', 'serat', e.target.value)}
                        placeholder="4.9 g"
                        className="w-full bg-white border border-teal-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* SECTION 5: CATATAN ALERGEN & PENGINGAT & HIGHLIGHT PESAN */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                5. CATATAN ALERGEN & PENGINGAT
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <span>⚠️ Alergen:</span>
                  </label>
                  <input
                    type="text"
                    value={formData.catatanAlergen}
                    onChange={(e) => handleInputChange('catatanAlergen', e.target.value)}
                    placeholder="Mengandung kedelai (tahu/tempe)."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <span>🧼 Penting:</span>
                  </label>
                  <input
                    type="text"
                    value={formData.catatanPengingat}
                    onChange={(e) => handleInputChange('catatanPengingat', e.target.value)}
                    placeholder="Harap mencuci tangan dengan sabun sebelum makan!"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-red-700 mb-1 flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> Pesan Waktu Konsumsi & Larangan Membawa Pulang:
                  </label>
                  <textarea
                    rows={2}
                    value={formData.pesanWaktuHabis}
                    onChange={(e) => handleInputChange('pesanWaktuHabis', e.target.value)}
                    placeholder="Untuk Segera dimakan maksimal 2 Jam Setelah Ompreng sampai di Sekolah dan Tidak untuk di bawa pulang"
                    className="w-full bg-red-50/50 border border-red-300 rounded-xl px-3.5 py-2 text-sm font-bold text-red-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 6: TTD KASPPG */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-blue-900" />
                6. Pejabat Penandatangan (TTD KASPPG)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Wilayah KASPPG :
                  </label>
                  <input
                    type="text"
                    value={formData.lokasiKasppg}
                    onChange={(e) => handleInputChange('lokasiKasppg', e.target.value)}
                    placeholder="Palasari Cibiru Kota Bandung"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Kepala SPPG :
                  </label>
                  <input
                    type="text"
                    value={formData.namaKasppg}
                    onChange={(e) => handleInputChange('namaKasppg', e.target.value)}
                    placeholder="Drs. H. Mulyana S., M.Pd."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-900 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  onSave(formData);
                  triggerAutoSave();
                }}
                className="inline-flex items-center gap-2 bg-blue-950 hover:bg-blue-900 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all active:scale-95"
              >
                <Save className="w-4 h-4 text-amber-400" /> Simpan Perubahan Menu
              </button>

              <button
                type="button"
                onClick={onViewPublic}
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all active:scale-95"
              >
                <Eye className="w-4 h-4" /> Buka Tampilan Hasil Scan
              </button>
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

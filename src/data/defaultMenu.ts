import { MenuMBGData } from '../types';

export const DEFAULT_MENU: MenuMBGData = {
  id: 'mbg-palasari-cibiru-latest',
  hari: 'Senin',
  tanggal: '24 Agustus 2026',
  // High quality sample food photos (Indonesian complete MBG meal with chicken, tempeh, rice, soup, banana)
  foto1: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
  foto2: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
  keteranganFoto1: 'Paket Menu Ompreng Lengkap MBG Hari Ini',
  keteranganFoto2: 'Tampak Menu Utama & Buah Pencuci Mulut',
  rincian: {
    karbohidrat: 'Nasi Putih Pulen Wangi',
    proteinHewani: 'Ayam Ungkep Goreng Lengkuas',
    proteinNabati: 'Tempe Goreng Tepung Gurih & Bacem',
    sayuran: 'Sayur Sop Wortel Buncis & Kembang Kol Segar',
    buah: 'Pisang Barangan Manis / Jeruk Segar',
  },
  gizi: {
    porsiBesarBumil: {
      energi: '720 kkal',
      protein: '32 g',
      lemak: '22 g',
      karbohidrat: '96 g',
      serat: '7.5 g',
    },
    porsiKecilBalita: {
      energi: '380 kkal',
      protein: '16 g',
      lemak: '12 g',
      karbohidrat: '52 g',
      serat: '3.8 g',
    },
    porsiBesarSiswa: {
      energi: '680 kkal',
      protein: '29 g',
      lemak: '20 g',
      karbohidrat: '92 g',
      serat: '6.8 g',
    },
    porsiKecilSiswa: {
      energi: '490 kkal',
      protein: '21 g',
      lemak: '15 g',
      karbohidrat: '68 g',
      serat: '4.9 g',
    },
  },
  catatanAlergen: 'Mengandung kedelai (tahu/tempe).',
  catatanPengingat: 'Harap mencuci tangan dengan sabun sebelum makan!',
  pesanWaktuHabis: 'Untuk Segera dimakan maksimal 2 Jam Setelah Ompreng sampai di Sekolah dan Tidak untuk di bawa pulang',
  namaKasppg: 'Drs. H. Mulyana S., M.Pd.',
  nipKasppg: 'KASPPG-PLSR-042',
  lokasiKasppg: 'Palasari Cibiru Kota Bandung',
  lastUpdated: new Date().toISOString(),
};

export const MENU_PRESETS = [
  {
    nama: 'Paket A (Ayam & Tempe)',
    rincian: {
      karbohidrat: 'Nasi Putih Pulen Wangi',
      proteinHewani: 'Ayam Ungkep Goreng Lengkuas',
      proteinNabati: 'Tempe Orek Manis Gurih',
      sayuran: 'Sayur Sop Wortel, Buncis & Bakso Sapi',
      buah: 'Pisang Barangan Segar',
    },
    foto1: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    foto2: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
    alergen: 'Mengandung kedelai (tahu/tempe).',
    gizi: {
      porsiBesarBumil: { energi: '720 kkal', protein: '32 g', lemak: '22 g', karbohidrat: '96 g', serat: '7.5 g' },
      porsiKecilBalita: { energi: '380 kkal', protein: '16 g', lemak: '12 g', karbohidrat: '52 g', serat: '3.8 g' },
      porsiBesarSiswa: { energi: '680 kkal', protein: '29 g', lemak: '20 g', karbohidrat: '92 g', serat: '6.8 g' },
      porsiKecilSiswa: { energi: '490 kkal', protein: '21 g', lemak: '15 g', karbohidrat: '68 g', serat: '4.9 g' },
    }
  },
  {
    nama: 'Paket B (Ikan Fillet & Tahu)',
    rincian: {
      karbohidrat: 'Nasi Putih Pulen',
      proteinHewani: 'Ikan Fillet Nila Saus Asam Manis',
      proteinNabati: 'Tahu Goreng Kuning Sumedang',
      sayuran: 'Tumis Capcay Sayur Campur Segar',
      buah: 'Jeruk Manis Medan',
    },
    foto1: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    foto2: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
    alergen: 'Mengandung ikan laut/tawar dan kedelai (tahu).',
    gizi: {
      porsiBesarBumil: { energi: '710 kkal', protein: '34 g', lemak: '19 g', karbohidrat: '98 g', serat: '8.0 g' },
      porsiKecilBalita: { energi: '370 kkal', protein: '18 g', lemak: '10 g', karbohidrat: '51 g', serat: '4.0 g' },
      porsiBesarSiswa: { energi: '670 kkal', protein: '31 g', lemak: '18 g', karbohidrat: '94 g', serat: '7.2 g' },
      porsiKecilSiswa: { energi: '480 kkal', protein: '22 g', lemak: '13 g', karbohidrat: '69 g', serat: '5.1 g' },
    }
  },
  {
    nama: 'Paket C (Telur Balado & Perkedel Tahu)',
    rincian: {
      karbohidrat: 'Nasi Putih Organik',
      proteinHewani: 'Telur Ayam Bulat Bumbu Balado Manis',
      proteinNabati: 'Perkedel Tahu Campur Jagung Manis',
      sayuran: 'Sayur Bening Bayam Jagung Manis',
      buah: 'Semangka Potong Segar',
    },
    foto1: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    foto2: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    alergen: 'Mengandung telur ayam dan kedelai.',
    gizi: {
      porsiBesarBumil: { energi: '695 kkal', protein: '28 g', lemak: '21 g', karbohidrat: '95 g', serat: '6.9 g' },
      porsiKecilBalita: { energi: '360 kkal', protein: '15 g', lemak: '11 g', karbohidrat: '50 g', serat: '3.5 g' },
      porsiBesarSiswa: { energi: '650 kkal', protein: '26 g', lemak: '19 g', karbohidrat: '91 g', serat: '6.4 g' },
      porsiKecilSiswa: { energi: '465 kkal', protein: '19 g', lemak: '14 g', karbohidrat: '66 g', serat: '4.5 g' },
    }
  },
];

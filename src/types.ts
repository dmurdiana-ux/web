export interface GiziItem {
  energi: string;      // e.g. "650 kkal" or "650"
  protein: string;     // e.g. "28 gram" or "28"
  lemak: string;       // e.g. "18 gram" or "18"
  karbohidrat: string; // e.g. "85 gram" or "85"
  serat: string;       // e.g. "6.5 gram" or "6.5"
}

export interface KandunganGizi {
  // Baris ke 1: Porsi Besar (Bumil/Busui)
  porsiBesarBumil: GiziItem;
  // Baris ke 2: Porsi Kecil (Balita)
  porsiKecilBalita: GiziItem;
  // Baris ke 1: Porsi Besar Siswa (SD 4-6, SMP & SMA)
  porsiBesarSiswa: GiziItem;
  // Baris ke 2: Porsi Kecil Siswa (SD 1-3)
  porsiKecilSiswa: GiziItem;
}

export interface RincianMenu {
  karbohidrat: string;
  proteinHewani: string;
  proteinNabati: string;
  sayuran: string;
  buah: string;
}

export interface MenuMBGData {
  id: string;
  hari: string;
  tanggal: string;
  foto1: string;
  foto2: string;
  keteranganFoto1?: string;
  keteranganFoto2?: string;
  rincian: RincianMenu;
  gizi: KandunganGizi;
  catatanAlergen: string;
  catatanPengingat: string;
  pesanWaktuHabis: string;
  namaKasppg: string;
  nipKasppg: string;
  lokasiKasppg: string;
  signatureImage?: string;
  lastUpdated: string;
}

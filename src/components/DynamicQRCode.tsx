import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Download, ExternalLink, Printer, QrCode as QrIcon, Check, Copy, Share2 } from 'lucide-react';
import { BgnLogo } from './BgnLogo';

interface DynamicQRCodeProps {
  publicUrl?: string;
  className?: string;
  showCardWrapper?: boolean;
}

export const DynamicQRCode: React.FC<DynamicQRCodeProps> = ({
  publicUrl,
  className = '',
  showCardWrapper = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [qrReady, setQrReady] = useState(false);

  // Compute the target public scan URL
  const targetUrl = React.useMemo(() => {
    if (publicUrl) return publicUrl;
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('view', 'public');
      return url.toString();
    }
    return 'https://ais-dev-hisqcdek3kxi73sqdizcz5-558852600716.asia-southeast1.run.app/?view=public';
  }, [publicUrl]);

  useEffect(() => {
    const generateQRWithBgnLogo = async () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const size = 480; // High-res canvas
      canvas.width = size;
      canvas.height = size;

      // 1. Generate QR Code with high error correction (H - 30% recovery) so center logo never breaks scanning
      await QRCode.toCanvas(canvas, targetUrl, {
        width: size,
        margin: 2,
        errorCorrectionLevel: 'H',
        color: {
          dark: '#0b1e3f',
          light: '#ffffff',
        },
      });

      // 2. Draw Center BGN Logo onto Canvas
      const center = size / 2;
      const logoRadius = size * 0.165; // ~80px radius

      // Draw white circular backdrop for scanning clearance
      ctx.save();
      ctx.beginPath();
      ctx.arc(center, center, logoRadius + 6, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
      ctx.shadowBlur = 10;
      ctx.fill();

      // Outer Bronze/Gold Rim
      ctx.beginPath();
      ctx.arc(center, center, logoRadius + 2, 0, 2 * Math.PI);
      ctx.fillStyle = '#584218';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(center, center, logoRadius, 0, 2 * Math.PI);
      ctx.fillStyle = '#d5b46b';
      ctx.fill();

      // Cyan / Sky Blue Outer Ring
      ctx.beginPath();
      ctx.arc(center, center, logoRadius - 2, 0, 2 * Math.PI);
      ctx.fillStyle = '#b9e7f5';
      ctx.fill();

      // Inner Navy Circle
      const innerNavyRadius = logoRadius * 0.72;
      ctx.beginPath();
      ctx.arc(center, center, innerNavyRadius, 0, 2 * Math.PI);
      ctx.fillStyle = '#0b1e3f';
      ctx.fill();

      // Gold Ring border
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#c39d48';
      ctx.stroke();

      // Curved text or circular lettering: BADAN GIZI NASIONAL & REPUBLIK INDONESIA
      ctx.fillStyle = '#0b1e3f';
      ctx.font = `bold ${Math.round(logoRadius * 0.16)}px system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Left & Right Navy Dots
      ctx.beginPath();
      ctx.arc(center - logoRadius * 0.85, center, 3, 0, 2 * Math.PI);
      ctx.arc(center + logoRadius * 0.85, center, 3, 0, 2 * Math.PI);
      ctx.fillStyle = '#0b1e3f';
      ctx.fill();

      // Central Golden Garuda Representation
      // Golden Wings
      ctx.fillStyle = '#fed049';
      ctx.beginPath();
      // Garuda head & crest
      ctx.arc(center, center - innerNavyRadius * 0.45, 4, 0, 2 * Math.PI);
      ctx.fill();

      // Wings arc
      ctx.beginPath();
      ctx.ellipse(center, center - innerNavyRadius * 0.15, innerNavyRadius * 0.7, innerNavyRadius * 0.35, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#d99b1a';
      ctx.fill();

      // Pancasila Shield in Center
      ctx.beginPath();
      ctx.arc(center, center - innerNavyRadius * 0.05, innerNavyRadius * 0.32, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      // Red/White shield halves
      ctx.beginPath();
      ctx.arc(center, center - innerNavyRadius * 0.05, innerNavyRadius * 0.28, Math.PI, 0);
      ctx.fillStyle = '#dc2626';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(center, center - innerNavyRadius * 0.05, innerNavyRadius * 0.28, 0, Math.PI);
      ctx.fillStyle = '#f8fafc';
      ctx.fill();

      // Golden Star center
      ctx.beginPath();
      ctx.arc(center, center - innerNavyRadius * 0.05, 3.5, 0, 2 * Math.PI);
      ctx.fillStyle = '#000000';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(center, center - innerNavyRadius * 0.05, 2, 0, 2 * Math.PI);
      ctx.fillStyle = '#fbbf24';
      ctx.fill();

      // Bottom Green Nutrition Leaves
      ctx.beginPath();
      ctx.ellipse(center - 8, center + innerNavyRadius * 0.52, 9, 5, -0.4, 0, 2 * Math.PI);
      ctx.ellipse(center + 8, center + innerNavyRadius * 0.52, 9, 5, 0.4, 0, 2 * Math.PI);
      ctx.fillStyle = '#65a30d';
      ctx.fill();

      // Banner text ribbon BGN
      ctx.fillStyle = '#ffffff';
      ctx.font = `900 ${Math.round(logoRadius * 0.22)}px system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('BGN', center, center + innerNavyRadius * 0.85);

      ctx.restore();
      setQrReady(true);
    };

    generateQRWithBgnLogo();
  }, [targetUrl]);

  const downloadPNG = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'QR-Menu-MBG-SPPG-Palasari-Cibiru-BGN.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const qrElement = (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Canvas container with BGN theme framing & center badge overlay */}
      <div className="relative p-4 bg-white rounded-2xl border-2 border-amber-400 shadow-xl inline-block">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-950 text-amber-300 text-[10px] font-black tracking-widest px-3.5 py-0.5 rounded-full uppercase border border-amber-300 shadow-xs flex items-center gap-1.5 whitespace-nowrap">
          <QrIcon className="w-3.5 h-3.5 text-amber-400" /> QR Dinamis Logo BGN
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-60 h-60 sm:w-72 sm:h-72 rounded-xl cursor-pointer transition-transform hover:scale-[1.01]"
            title="Klik untuk membuka menu publik"
            onClick={() => window.open(targetUrl, '_blank')}
          />

          {/* Interactive Crisp BGN Center Logo Overlay */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 pointer-events-none flex items-center justify-center"
          >
            <div className="bg-white rounded-full p-0.5 shadow-md border border-slate-100">
              <BgnLogo size={80} showText={false} />
            </div>
          </div>
        </div>

        <div className="mt-2.5 text-center">
          <p className="text-xs font-black text-slate-900 tracking-tight uppercase">
            Scan untuk Menu Harian MBG
          </p>
          <p className="text-[11px] text-slate-600 font-bold">
            SPPG Palasari Cibiru Kota Bandung
          </p>
          <p className="text-[10px] text-blue-900 font-extrabold uppercase mt-0.5">
            Badan Gizi Nasional RI
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 no-print">
        <button
          type="button"
          onClick={downloadPNG}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-all active:scale-95"
        >
          <Download className="w-3.5 h-3.5 text-blue-600" />
          Download QR PNG
        </button>

        <button
          type="button"
          onClick={copyUrl}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-all active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              Tersalin!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              Salin Link
            </>
          )}
        </button>

        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-blue-950 hover:bg-blue-900 rounded-lg shadow-sm transition-all active:scale-95"
        >
          <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          Buka Halaman Publik
        </a>
      </div>
    </div>
  );

  if (!showCardWrapper) {
    return <div className={className}>{qrElement}</div>;
  }

  return (
    <div className={`bg-gradient-to-b from-blue-50/80 via-slate-50 to-amber-50/30 border border-blue-100 rounded-2xl p-4 sm:p-6 shadow-sm ${className}`}>
      <div className="flex items-center justify-between border-b border-blue-100 pb-3 mb-3">
        <div className="flex items-center gap-2.5">
          <BgnLogo size={32} />
          <div>
            <h3 className="text-sm font-black text-slate-900">QR Code Dinamis (Logo BGN di Tengah)</h3>
            <p className="text-xs text-slate-500">QR Code tidak berubah, menu harian otomatis tersinkronisasi</p>
          </div>
        </div>
      </div>

      {qrElement}

      <div className="mt-3 bg-amber-50/90 border border-amber-200 rounded-xl p-3 text-center">
        <p className="text-xs text-amber-950 font-medium">
          💡 <strong>Petunjuk:</strong> Cetak QR Code berlogo BGN ini dan tempel di standee ruang makan atau mading sekolah. Siswa, guru, dan wali murid dapat memindai untuk melihat menu dan nilai gizi yang selalu terbaru.
        </p>
      </div>
    </div>
  );
};

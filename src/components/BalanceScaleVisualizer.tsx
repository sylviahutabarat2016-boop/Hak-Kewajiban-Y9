import React from 'react';
import { Scale, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { CardPair } from '../data/cardsData';

interface BalanceScaleProps {
  cardLeft: CardPair | null;
  cardRight: CardPair | null;
  status: 'empty' | 'left_only' | 'right_only' | 'balanced' | 'mismatched';
  onReset?: () => void;
  interactive?: boolean;
}

export const BalanceScaleVisualizer: React.FC<BalanceScaleProps> = ({
  cardLeft,
  cardRight,
  status,
  interactive = false,
}) => {
  // Compute rotation angle
  let rotationDeg = 0;
  if (status === 'left_only') {
    rotationDeg = -14; // Left pan goes down
  } else if (status === 'right_only') {
    rotationDeg = 14; // Right pan goes down
  } else if (status === 'mismatched') {
    rotationDeg = -8; // Slightly unstable
  } else if (status === 'balanced') {
    rotationDeg = 0; // Perfectly horizontal
  }

  // Left and Right pan vertical offsets to counteract rotation for realistic hang
  const leftPanTranslateY = Math.sin((-rotationDeg * Math.PI) / 180) * 130;
  const rightPanTranslateY = Math.sin((rotationDeg * Math.PI) / 180) * 130;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-xl border border-slate-700/60">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-36 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />
      
      {/* Status banner */}
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-amber-400" />
          <span className="font-display font-semibold tracking-wide text-sm text-amber-300">
            SIMULATOR TIMBANGAN TAKDIR
          </span>
        </div>

        <div>
          {status === 'balanced' && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SEIMBANG SEMPURNA: HAK & KEWAJIBAN SELARAS!</span>
            </div>
          )}
          {status === 'mismatched' && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 bg-rose-950/80 border border-rose-500/40 px-3 py-1 rounded-full">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>TIMPANG: BUKAN PASANGAN YANG SESUAI</span>
            </div>
          )}
          {status === 'left_only' && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 bg-amber-950/80 border border-amber-500/40 px-3 py-1 rounded-full">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>BERAT KE HAK: EGOIS MENUNTUT TANPA MENUNAIKAN</span>
            </div>
          )}
          {status === 'right_only' && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 bg-cyan-950/80 border border-cyan-500/40 px-3 py-1 rounded-full">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>BERAT KE KEWAJIBAN: TERBEBANI TANPA HAK TERPENUHI</span>
            </div>
          )}
          {status === 'empty' && (
            <span className="text-xs text-slate-400">
              Letakkan Kartu A (Hak) dan Kartu B (Kewajiban) pada piringan timbangan
            </span>
          )}
        </div>
      </div>

      {/* Interactive Scale Graphic */}
      <div className="relative h-64 md:h-72 w-full flex items-center justify-center select-none">
        {/* Central Stand / Fulcrum */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
          {/* Top Brass Finial */}
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-200 to-amber-600 shadow-md shadow-amber-500/40 z-10" />
          {/* Pillar */}
          <div className="w-3 h-44 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-700 rounded-t-sm shadow-inner" />
          {/* Base */}
          <div className="w-28 h-5 bg-gradient-to-t from-slate-950 via-amber-700 to-amber-500 rounded-t-lg border-t border-amber-300/40 shadow-lg" />
          <div className="w-40 h-2 bg-slate-950 rounded-full blur-[1px]" />
        </div>

        {/* Rotating Beam Container */}
        <div
          className="absolute top-10 left-1/2 -translate-x-1/2 w-[340px] md:w-[480px] h-6 flex items-center justify-center transition-transform duration-700 ease-out z-20"
          style={{ transform: `translateX(-50%) rotate(${rotationDeg}deg)` }}
        >
          {/* Fulcrum Bearing Pivot */}
          <div className="absolute w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-amber-200 border border-amber-100 shadow-md z-30" />

          {/* Horizontal Beam */}
          <div className="w-full h-2.5 bg-gradient-to-r from-amber-600 via-amber-200 to-amber-600 rounded-full shadow-md shadow-amber-900/50 flex items-center justify-between px-2">
            {/* Left suspension hook */}
            <div className="w-2.5 h-2.5 rounded-full bg-amber-200 border border-amber-700 shadow-sm" />
            {/* Center mark */}
            <div className="w-1.5 h-1.5 rounded-full bg-amber-900" />
            {/* Right suspension hook */}
            <div className="w-2.5 h-2.5 rounded-full bg-amber-200 border border-amber-700 shadow-sm" />
          </div>

          {/* LEFT PAN ASSEMBLY (HAK) */}
          <div
            className="absolute left-0 top-3 flex flex-col items-center transition-transform duration-700 ease-out origin-top"
            style={{ transform: `rotate(${-rotationDeg}deg) translateY(${leftPanTranslateY * 0.25}px)` }}
          >
            {/* Chains (SVG) */}
            <svg className="w-20 md:w-28 h-20 text-amber-300/80" viewBox="0 0 100 80">
              <line x1="50" y1="0" x2="10" y2="78" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3" />
              <line x1="50" y1="0" x2="50" y2="78" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="50" y1="0" x2="90" y2="78" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3" />
            </svg>
            {/* Pan Plate */}
            <div className="w-24 md:w-32 h-4 rounded-b-2xl bg-gradient-to-b from-amber-300 via-amber-600 to-amber-800 border-t-2 border-amber-200 shadow-lg shadow-black/60 flex items-center justify-center -mt-1">
              <span className="text-[10px] font-bold tracking-wider text-amber-950 uppercase">
                HAK
              </span>
            </div>
            {/* Card on Pan */}
            <div className="mt-1 w-28 md:w-36 text-center">
              {cardLeft ? (
                <div className="bg-blue-600/90 text-white rounded-lg p-2 text-xs shadow-md border border-blue-400 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
                  <div className="text-[9px] uppercase font-bold text-blue-200">Kartu A</div>
                  <div className="font-semibold line-clamp-2 leading-tight">{cardLeft.kartuA.nama.replace('Kartu A: ', '')}</div>
                </div>
              ) : (
                <div className="border border-dashed border-blue-400/40 rounded-lg p-1.5 text-[11px] text-blue-300/60 bg-blue-950/20">
                  Piringan Hak Kosong
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PAN ASSEMBLY (KEWAJIBAN) */}
          <div
            className="absolute right-0 top-3 flex flex-col items-center transition-transform duration-700 ease-out origin-top"
            style={{ transform: `rotate(${-rotationDeg}deg) translateY(${rightPanTranslateY * 0.25}px)` }}
          >
            {/* Chains (SVG) */}
            <svg className="w-20 md:w-28 h-20 text-amber-300/80" viewBox="0 0 100 80">
              <line x1="50" y1="0" x2="10" y2="78" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3" />
              <line x1="50" y1="0" x2="50" y2="78" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="50" y1="0" x2="90" y2="78" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3" />
            </svg>
            {/* Pan Plate */}
            <div className="w-24 md:w-32 h-4 rounded-b-2xl bg-gradient-to-b from-amber-300 via-amber-600 to-amber-800 border-t-2 border-amber-200 shadow-lg shadow-black/60 flex items-center justify-center -mt-1">
              <span className="text-[10px] font-bold tracking-wider text-amber-950 uppercase">
                KEWAJIBAN
              </span>
            </div>
            {/* Card on Pan */}
            <div className="mt-1 w-28 md:w-36 text-center">
              {cardRight ? (
                <div className="bg-emerald-600/90 text-white rounded-lg p-2 text-xs shadow-md border border-emerald-400 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
                  <div className="text-[9px] uppercase font-bold text-emerald-200">Kartu B</div>
                  <div className="font-semibold line-clamp-2 leading-tight">{cardRight.kartuB.nama.replace('Kartu B: ', '')}</div>
                </div>
              ) : (
                <div className="border border-dashed border-emerald-400/40 rounded-lg p-1.5 text-[11px] text-emerald-300/60 bg-emerald-950/20">
                  Piringan Kewajiban Kosong
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Equilibrium Insights Footer */}
      {status === 'balanced' && cardLeft && (
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-950/90 via-slate-900 to-emerald-950/90 border border-emerald-500/50 text-emerald-100 flex flex-col md:flex-row items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom duration-500">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-display font-bold text-sm text-emerald-200">
                Keseimbangan Konstitusi Terwujud!
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {cardLeft.kaitanPasalNilai}
              </p>
              <p className="text-xs text-emerald-300/90 italic mt-1 font-serif">
                "{cardLeft.kartuB.alasanSeimbang}"
              </p>
            </div>
          </div>
          {interactive && (
            <div className="shrink-0 text-xs font-semibold px-3 py-1.5 bg-emerald-500 text-slate-950 rounded-lg">
              Harmonis & Beradab
            </div>
          )}
        </div>
      )}

      {status === 'mismatched' && cardLeft && cardRight && (
        <div className="mt-4 p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
          <div>
            <span className="font-bold">Kewajiban ini belum pas:</span> Kewajiban tersebut tidak menjawab secara langsung hak yang sedang diperjuangkan. Carilah kewajiban yang merupakan timbal balik logis dari "{cardLeft.kartuA.nama}"!
          </div>
        </div>
      )}

      {status === 'left_only' && cardLeft && (
        <div className="mt-4 p-3 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-200 text-xs">
          <span className="font-bold">Peringatan Timbangan Takdir:</span> Menuntut <em>"{cardLeft.kartuA.ringkasanSiswa}"</em> tanpa menjalankan kewajibannya akan menciptakan ketidakadilan dan kekacauan. Pasangkan dengan Kartu B yang tepat!
        </div>
      )}
    </div>
  );
};

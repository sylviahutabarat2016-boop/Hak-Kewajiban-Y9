import React, { useState } from 'react';
import { CARDS_DATA } from '../data/cardsData';
import { Printer, Scissors, BookOpen, Scale } from 'lucide-react';

export const PrintableCardsSheet: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'hak' | 'kewajiban'>('all');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Print Control Toolbar (Hidden during print) */}
      <div className="no-print p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-slate-900 text-base flex items-center gap-2">
            <Printer className="w-5 h-5 text-blue-600" />
            <span>Lembar Cetak Kartu Fisik untuk Kelas 9</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Format siap cetak di kertas A4 untuk aktivitas permainan kartu meja atau metode <em>Make a Match</em> di kelas.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Filter options */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filterType === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua (40 Kartu)
            </button>
            <button
              onClick={() => setFilterType('hak')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filterType === 'hak' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hanya Kartu A (Hak)
            </button>
            <button
              onClick={() => setFilterType('kewajiban')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filterType === 'kewajiban' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hanya Kartu B (Kewajiban)
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors whitespace-nowrap"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>

      {/* Guide Banner (Hidden during print) */}
      <div className="no-print p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-center gap-2">
        <Scissors className="w-4 h-4 text-amber-700 shrink-0" />
        <span>
          <strong>Petunjuk Guru:</strong> Cetak lembar ini pada kertas tebal (BC / Concorde / HVS 100gr) lalu gunting di sepanjang garis putus-putus. Bagikan secara acak kepada siswa untuk mencari pasangannya dalam hitungan waktu!
        </span>
      </div>

      {/* Printable Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CARDS_DATA.map((card) => {
          const showCardA = filterType === 'all' || filterType === 'hak';
          const showCardB = filterType === 'all' || filterType === 'kewajiban';

          return (
            <React.Fragment key={card.id}>
              {/* KARTU A: HAK (Warna Biru / Navy) */}
              {showCardA && (
                <div className="print-card-break relative border-2 border-dashed border-blue-300 rounded-xl p-4 bg-white flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow h-64">
                  {/* Card Header */}
                  <div>
                    <div className="flex items-center justify-between border-b border-blue-100 pb-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-6 h-6 rounded-md bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                          A{card.id}
                        </span>
                        <span className="font-display font-bold text-xs uppercase text-blue-900">
                          HAK SISWA
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-medium bg-blue-50 px-2 py-0.5 rounded">
                        {card.categoryLabel}
                      </span>
                    </div>

                    {/* Card Title */}
                    <div className="font-display font-bold text-xs text-blue-950 mb-1 leading-tight">
                      {card.kartuA.nama.replace('Kartu A: ', '')}
                    </div>

                    {/* Card Body */}
                    <p className="text-[11px] text-slate-700 leading-relaxed line-clamp-4">
                      {card.kartuA.hak}
                    </p>
                  </div>

                  {/* Card Footer (Pasal UUD) */}
                  <div className="pt-2 border-t border-blue-100 text-[10px] flex items-center justify-between text-blue-800">
                    <span className="font-mono font-medium truncate max-w-[170px]">
                      {card.pasalUUD}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-[9px] uppercase tracking-wide text-blue-700">
                      <Scale className="w-3 h-3" /> Pasangan B{card.id}
                    </span>
                  </div>
                </div>
              )}

              {/* KARTU B: KEWAJIBAN (Warna Hijau Zamrud) */}
              {showCardB && (
                <div className="print-card-break relative border-2 border-dashed border-emerald-300 rounded-xl p-4 bg-white flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow h-64">
                  {/* Card Header */}
                  <div>
                    <div className="flex items-center justify-between border-b border-emerald-100 pb-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-6 h-6 rounded-md bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                          B{card.id}
                        </span>
                        <span className="font-display font-bold text-xs uppercase text-emerald-900">
                          KEWAJIBAN SISWA
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                        {card.categoryLabel}
                      </span>
                    </div>

                    {/* Card Title */}
                    <div className="font-display font-bold text-xs text-emerald-950 mb-1 leading-tight">
                      {card.kartuB.nama.replace('Kartu B: ', '')}
                    </div>

                    {/* Card Body */}
                    <p className="text-[11px] text-slate-700 leading-relaxed line-clamp-4">
                      {card.kartuB.kewajiban}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-2 border-t border-emerald-100 text-[10px] flex items-center justify-between text-emerald-800">
                    <span className="italic truncate max-w-[170px]">
                      Kunci: {card.nilaiPancasila}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-[9px] uppercase tracking-wide text-emerald-700">
                      <BookOpen className="w-3 h-3" /> Penyeimbang A{card.id}
                    </span>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

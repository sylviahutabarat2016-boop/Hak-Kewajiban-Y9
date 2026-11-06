import React, { useState } from 'react';
import { CardPair, CARDS_DATA } from '../data/cardsData';
import { Search, Filter, Copy, Check, ChevronDown, ChevronUp, BookOpen, AlertCircle, Sparkles } from 'lucide-react';

interface CardTableProps {
  onSelectForScale?: (pair: CardPair) => void;
}

export const CardTable: React.FC<CardTableProps> = ({ onSelectForScale }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [copiedStatus, setCopiedStatus] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'Semua Kategori (20 Pasang)' },
    { id: 'sekolah', label: 'Lingkungan Sekolah' },
    { id: 'medsos', label: 'Dunia Digital & Medsos' },
    { id: 'keluarga', label: 'Keluarga & Rumah' },
    { id: 'pergaulan', label: 'Pergaulan & Agama' },
    { id: 'kebangsaan', label: 'Kehidupan Berbangsa' },
  ];

  const filteredCards = CARDS_DATA.filter((pair) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'pergaulan' && (pair.category === 'pergaulan' || pair.categoryLabel.includes('Agama'))) ||
      pair.category === selectedCategory;

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      pair.kartuA.nama.toLowerCase().includes(query) ||
      pair.kartuA.hak.toLowerCase().includes(query) ||
      pair.kartuB.nama.toLowerCase().includes(query) ||
      pair.kartuB.kewajiban.toLowerCase().includes(query) ||
      pair.kaitanPasalNilai.toLowerCase().includes(query) ||
      pair.pasalUUD.toLowerCase().includes(query) ||
      pair.id.toString() === query;

    return matchesCategory && matchesSearch;
  });

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleCopyMarkdown = () => {
    let md = '| No | Kartu A (Hak Siswa / Warga Negara) | Kartu B (Kewajiban Pasangannya) | Kaitan Nilai / Pasal UUD 1945 |\n';
    md += '|---|---|---|---|\n';
    CARDS_DATA.forEach((card) => {
      const cleanA = `**${card.kartuA.nama}**<br>${card.kartuA.hak}`;
      const cleanB = `**${card.kartuB.nama}**<br>${card.kartuB.kewajiban}`;
      const cleanPasal = card.kaitanPasalNilai;
      md += `| ${card.id} | ${cleanA.replace(/\|/g, '\\|')} | ${cleanB.replace(/\|/g, '\\|')} | ${cleanPasal.replace(/\|/g, '\\|')} |\n`;
    });

    navigator.clipboard.writeText(md).then(() => {
      setCopiedStatus(true);
      setTimeout(() => setCopiedStatus(false), 2500);
    });
  };

  return (
    <div className="space-y-6">
      {/* Search and Action Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari kata kunci hak, kewajiban, atau pasal UUD (misal: medsos, 28E, piket, bullying)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Copy Markdown Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors whitespace-nowrap"
            title="Salin semua 20 baris tabel dalam format Markdown untuk RPP / Dokumen Guru"
          >
            {copiedStatus ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Tersalin ke Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-600" />
                <span>Salin Format Tabel Markdown</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Category Filter Pills (Functional Buttons) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-xs font-medium scrollbar-thin">
        <span className="text-slate-500 flex items-center gap-1 pr-2">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === cat.id
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Table Presentation (Strictly answering the user format requirement) */}
      <div className="overflow-hidden bg-white border border-slate-200 rounded-xl shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-xs uppercase tracking-wider font-display">
                <th className="py-3.5 px-3 w-12 text-center border-r border-slate-800">
                  No
                </th>
                <th className="py-3.5 px-5 w-5/12 border-r border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" />
                    <span>Kartu A (Hak Siswa / Warga Negara)</span>
                  </div>
                </th>
                <th className="py-3.5 px-5 w-5/12 border-r border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                    <span>Kartu B (Kewajiban Pasangannya)</span>
                  </div>
                </th>
                <th className="py-3.5 px-4 w-2/12">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>Kaitan Nilai / Pasal UUD 1945</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {filteredCards.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500">
                    Tidak ditemukan kartu yang cocok dengan pencarian "{searchQuery}".
                  </td>
                </tr>
              ) : (
                filteredCards.map((card) => {
                  const isExpanded = expandedRow === card.id;
                  return (
                    <React.Fragment key={card.id}>
                      <tr
                        className={`transition-colors hover:bg-slate-50/80 ${
                          isExpanded ? 'bg-blue-50/40' : ''
                        }`}
                      >
                        {/* Kolom 1: No */}
                        <td className="py-4 px-3 text-center font-mono font-bold text-slate-700 border-r border-slate-100 align-top">
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-800 text-xs">
                            {card.id}
                          </span>
                        </td>

                        {/* Kolom 2: Kartu A (Hak) */}
                        <td className="py-4 px-5 border-r border-slate-100 align-top space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-semibold text-blue-900 leading-snug">
                              {card.kartuA.nama}
                            </span>
                            <span className="text-[11px] text-slate-500 whitespace-nowrap">
                              {card.categoryLabel}
                            </span>
                          </div>
                          <p className="text-slate-700 text-xs leading-relaxed bg-blue-50/50 p-2.5 rounded-lg border border-blue-100/70">
                            {card.kartuA.hak}
                          </p>
                          <div className="text-[11px] text-slate-500">
                            <span className="font-medium text-slate-700">Konteks: </span>
                            {card.kartuA.konteks}
                          </div>
                        </td>

                        {/* Kolom 3: Kartu B (Kewajiban) */}
                        <td className="py-4 px-5 border-r border-slate-100 align-top space-y-2">
                          <div className="font-semibold text-emerald-900 leading-snug">
                            {card.kartuB.nama}
                          </div>
                          <p className="text-slate-700 text-xs leading-relaxed bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100/70">
                            {card.kartuB.kewajiban}
                          </p>
                          <div className="text-[11px] text-slate-600 italic">
                            <span className="font-medium text-emerald-800">Alasan Keseimbangan: </span>
                            "{card.kartuB.alasanSeimbang}"
                          </div>
                        </td>

                        {/* Kolom 4: Kaitan Nilai / Pasal UUD 1945 */}
                        <td className="py-4 px-4 align-top space-y-2">
                          <div className="text-xs font-semibold text-amber-900 bg-amber-50/80 p-2 rounded-lg border border-amber-200/80">
                            {card.kaitanPasalNilai}
                          </div>
                          
                          <div className="flex items-center justify-between pt-1">
                            <button
                              onClick={() => toggleRow(card.id)}
                              className="text-[11px] font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
                            >
                              <span>{isExpanded ? 'Tutup Telaah' : 'Telaah Takdir & Refleksi'}</span>
                              {isExpanded ? (
                                <ChevronUp className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5" />
                              )}
                            </button>

                            {onSelectForScale && (
                              <button
                                onClick={() => onSelectForScale(card)}
                                className="text-[11px] font-semibold text-slate-700 hover:text-blue-600 flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded"
                                title="Uji pasangan ini di Simulator Timbangan Takdir"
                              >
                                <Sparkles className="w-3 h-3 text-amber-500" />
                                <span>Uji Timbangan</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>

                      {/* Expandable Pedagogical Deep-Dive Row */}
                      {isExpanded && (
                        <tr className="bg-slate-50/90 border-b border-slate-200 animate-in fade-in duration-200">
                          <td colSpan={4} className="p-4 pl-14">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-900 space-y-1">
                                <div className="flex items-center gap-1.5 font-bold text-rose-800">
                                  <AlertCircle className="w-4 h-4 text-rose-600" />
                                  <span>Bahaya Timbangan Timpang (Jika Hanya Menuntut Hak):</span>
                                </div>
                                <p className="leading-relaxed text-rose-800/90">
                                  {card.akibatTimpang}
                                </p>
                              </div>

                              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-900 space-y-1">
                                <div className="flex items-center gap-1.5 font-bold text-indigo-800">
                                  <Sparkles className="w-4 h-4 text-indigo-600" />
                                  <span>Pemantik Refleksi Kritis Siswa Kelas 9:</span>
                                </div>
                                <p className="leading-relaxed text-indigo-800/90 italic">
                                  "{card.refleksiKritis}"
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer tally */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500">
          <div>
            Menampilkan <span className="font-semibold text-slate-800">{filteredCards.length}</span> dari{' '}
            <span className="font-semibold text-slate-800">{CARDS_DATA.length}</span> pasang kartu (Total 40 Kartu)
          </div>
          <div>
            Kurikulum Merdeka PPKn SMP Fase D / UUD NRI 1945
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { CardTable } from './components/CardTable';
import { InteractiveScaleGame } from './components/InteractiveScaleGame';
import { FlashcardStudyMode } from './components/FlashcardStudyMode';
import { PrintableCardsSheet } from './components/PrintableCardsSheet';
import { TeacherGuideModal } from './components/TeacherGuideModal';
import { BalanceScaleVisualizer } from './components/BalanceScaleVisualizer';
import { CardPair, CARDS_DATA } from './data/cardsData';
import { Scale, Table, Gamepad2, Layers, Printer, BookOpen, Sparkles, GraduationCap } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'table' | 'game' | 'flashcard' | 'print'>('table');
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [selectedPairForScale, setSelectedPairForScale] = useState<CardPair | null>(null);

  const handleSelectForScale = (pair: CardPair) => {
    setSelectedPairForScale(pair);
    // Smooth scroll to scale showcase
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Bar (§2: Single-line brand, clean nav, 1 primary action) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3 transition-colors no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Wordmark */}
          <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 text-white flex items-center justify-center shadow-xs">
              <Scale className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            </div>
            <a href="#" className="font-display font-extrabold text-slate-900 text-base tracking-tight hover:text-blue-600 transition-colors">
              Timbangan Takdir
            </a>
          </div>

          {/* Zone 2: Navigation Links / Mode Switcher */}
          <nav className="hidden md:flex items-center gap-2 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('table')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'table'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Tabel 20 Pasang Kartu</span>
            </button>

            <button
              onClick={() => setActiveTab('game')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'game'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Game Timbangan Takdir</span>
            </button>

            <button
              onClick={() => setActiveTab('flashcard')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'flashcard'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Kartu Telaah (Flashcards)</span>
            </button>

            <button
              onClick={() => setActiveTab('print')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'print'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Kartu Fisik</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsGuideOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors whitespace-nowrap"
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Panduan Guru PPKn</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-around gap-1 pt-2 border-t border-slate-100 mt-2 text-xs">
          <button
            onClick={() => setActiveTab('table')}
            className={`p-1.5 px-2 rounded-md font-medium text-center ${activeTab === 'table' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
          >
            Tabel
          </button>
          <button
            onClick={() => setActiveTab('game')}
            className={`p-1.5 px-2 rounded-md font-medium text-center ${activeTab === 'game' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
          >
            Game
          </button>
          <button
            onClick={() => setActiveTab('flashcard')}
            className={`p-1.5 px-2 rounded-md font-medium text-center ${activeTab === 'flashcard' ? 'bg-purple-600 text-white' : 'text-slate-600'}`}
          >
            Flashcard
          </button>
          <button
            onClick={() => setActiveTab('print')}
            className={`p-1.5 px-2 rounded-md font-medium text-center ${activeTab === 'print' ? 'bg-emerald-600 text-white' : 'text-slate-600'}`}
          >
            Cetak
          </button>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
        {/* Hero Section Banner (Hidden during print) */}
        <div className="no-print relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 md:p-8 border border-slate-800 shadow-sm">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gamifikasi Pembelajaran PPKn Kelas 9 SMP · Kurikulum Merdeka</span>
            </div>

            <h1 className="font-display font-extrabold text-2xl md:text-3xl text-white tracking-tight leading-tight">
              Timbangan Takdir: Hak vs Kewajiban Warga Negara
            </h1>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-2xl">
              20 pasang kartu kontekstual remaja yang menghubungkan hak siswa dengan kewajiban penyeimbangnya berdasarkan UUD NRI 1945. Menuntut hak tanpa menunaikan kewajiban membuat timbangan keadilan sosial timpang dan rusak!
            </p>

            {/* Micro Metadata Strip (Zero-pill text separators) */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400 font-medium">
              <span>20 Pasang Kartu (40 Total)</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>5 Ranah Remaja (Sekolah, Medsos, Keluarga, Pergaulan, Kebangsaan)</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Pasal 27–34 UUD NRI 1945</span>
            </div>
          </div>
        </div>

        {/* Selected Pair Quick Scale Inspector (If user clicks 'Uji Timbangan' in Table) */}
        {selectedPairForScale && activeTab === 'table' && (
          <div className="no-print space-y-2 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-600" />
                <span>Simulasi Langsung: Kartu Pasangan #{selectedPairForScale.id}</span>
              </div>
              <button
                onClick={() => setSelectedPairForScale(null)}
                className="text-xs text-slate-500 hover:text-slate-800 underline"
              >
                Tutup Simulasi
              </button>
            </div>
            <BalanceScaleVisualizer
              cardLeft={selectedPairForScale}
              cardRight={selectedPairForScale}
              status="balanced"
            />
          </div>
        )}

        {/* Active View Container */}
        <div>
          {activeTab === 'table' && (
            <CardTable onSelectForScale={handleSelectForScale} />
          )}

          {activeTab === 'game' && (
            <InteractiveScaleGame />
          )}

          {activeTab === 'flashcard' && (
            <FlashcardStudyMode />
          )}

          {activeTab === 'print' && (
            <PrintableCardsSheet />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="no-print bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <strong>Timbangan Takdir: Hak vs Kewajiban</strong> · Media Pembelajaran PPKn SMP Kelas 9
          </div>
          <div className="text-slate-400">
            Berdasarkan UUD NRI 1945 & Nilai-Nilai Luhur Pancasila
          </div>
        </div>
      </footer>

      {/* Teacher Guide Modal */}
      <TeacherGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}

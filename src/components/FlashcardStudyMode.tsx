import React, { useState } from 'react';
import { CardPair, CARDS_DATA } from '../data/cardsData';
import { ArrowLeft, ArrowRight, RotateCw, CheckCircle, HelpCircle, Shuffle, Scale, Bookmark, BookmarkCheck } from 'lucide-react';

export const FlashcardStudyMode: React.FC = () => {
  const [cards, setCards] = useState<CardPair[]>(CARDS_DATA);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<number[]>([]);

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...cards].sort(() => 0.5 - Math.random());
    setCards(shuffled);
    setCurrentIndex(0);
  };

  const toggleMastered = (id: number) => {
    setMasteredIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isMastered = masteredIds.includes(currentCard.id);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Top Controller */}
      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="font-display font-bold text-slate-900 text-base">
            Mode Kartu Telaah Interaktif (Flashcard)
          </h2>
          <div className="text-xs text-slate-500">
            Kartu {currentIndex + 1} dari {cards.length} · Ketuk kartu untuk membalik
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            title="Acak Urutan Kartu"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Acak Kartu</span>
          </button>

          <button
            onClick={() => toggleMastered(currentCard.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              isMastered
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            {isMastered ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Dikuasai</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                <span>Tandai Paham</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Interactive Flippable Card Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="cursor-pointer select-none perspective-1000 min-h-[380px] w-full"
      >
        <div
          className={`relative w-full min-h-[380px] rounded-2xl transition-all duration-500 transform shadow-md hover:shadow-xl p-8 flex flex-col justify-between border ${
            !isFlipped
              ? 'bg-gradient-to-br from-blue-900 via-blue-950 to-slate-900 border-blue-500/40 text-white'
              : 'bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-900 border-emerald-500/40 text-white'
          }`}
        >
          {/* Card Top Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span
                className={`w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center ${
                  !isFlipped ? 'bg-blue-500 text-white' : 'bg-emerald-500 text-slate-950'
                }`}
              >
                {!isFlipped ? `A${currentCard.id}` : `B${currentCard.id}`}
              </span>
              <span className="font-display font-bold text-xs uppercase tracking-wider text-slate-300">
                {!isFlipped ? 'SISI A: HAK SISWA & WARGA NEGARA' : 'SISI B: KEWAJIBAN PENYEIMBANG'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 font-medium">
                {currentCard.categoryLabel}
              </span>
              <RotateCw className="w-4 h-4 text-slate-400 animate-spin-slow" />
            </div>
          </div>

          {/* Card Center Content */}
          <div className="my-auto py-4 space-y-4">
            {!isFlipped ? (
              /* FRONT: HAK */
              <>
                <h3 className="font-display font-bold text-xl md:text-2xl text-blue-200 leading-snug">
                  {currentCard.kartuA.nama}
                </h3>
                <p className="text-sm md:text-base text-slate-200 leading-relaxed font-sans">
                  {currentCard.kartuA.hak}
                </p>
                <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-500/30 text-xs text-blue-200">
                  <span className="font-semibold text-blue-300">Landasan Konstitusi: </span>
                  {currentCard.kartuA.pasal}
                </div>
              </>
            ) : (
              /* BACK: KEWAJIBAN */
              <>
                <h3 className="font-display font-bold text-xl md:text-2xl text-emerald-200 leading-snug">
                  {currentCard.kartuB.nama}
                </h3>
                <p className="text-sm md:text-base text-slate-200 leading-relaxed font-sans">
                  {currentCard.kartuB.kewajiban}
                </p>
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs text-emerald-200 space-y-1">
                  <div>
                    <span className="font-semibold text-emerald-300">Mengapa Ini Penyeimbang yang Tepat? </span>
                    {currentCard.kartuB.alasanSeimbang}
                  </div>
                  <div className="pt-1 text-[11px] text-slate-300 font-medium border-t border-emerald-500/20">
                    Nilai Karakter: {currentCard.nilaiPancasila}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Card Bottom Hint */}
          <div className="border-t border-white/10 pt-3 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-amber-400" />
              <span>{isFlipped ? 'Klik untuk kembali ke Hak' : 'Klik kartu untuk melihat Kewajiban pasangannya'}</span>
            </span>
            <span className="text-[11px]">
              {isMastered && <span className="text-emerald-400 font-medium">✓ Sudah Dipahami</span>}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          className="flex-1 py-3 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="flex-1 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
        >
          <RotateCw className="w-4 h-4" />
          <span>{isFlipped ? 'Lihat Hak (Depan)' : 'Balik Kartu (Kewajiban)'}</span>
        </button>

        <button
          onClick={handleNext}
          className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
        >
          <span>Berikutnya</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

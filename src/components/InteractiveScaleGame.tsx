import React, { useState, useEffect } from 'react';
import { CardPair, CARDS_DATA } from '../data/cardsData';
import { BalanceScaleVisualizer } from './BalanceScaleVisualizer';
import { Trophy, Flame, RotateCcw, ArrowRight, CheckCircle, XCircle, Sparkles, Volume2, VolumeX, HelpCircle } from 'lucide-react';

export const InteractiveScaleGame: React.FC = () => {
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [totalRounds] = useState<number>(5);
  const [selectedPairs, setSelectedPairs] = useState<CardPair[]>([]);
  const [currentCardA, setCurrentCardA] = useState<CardPair | null>(null);
  const [options, setOptions] = useState<CardPair[]>([]);
  const [selectedOption, setSelectedOption] = useState<CardPair | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Sound synthesis using Web Audio API
  const playSound = (type: 'correct' | 'wrong' | 'fanfare') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      const ctx = new AudioContext();

      if (type === 'correct') {
        // High harmonic chime
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else if (type === 'wrong') {
        // Low discordant buzz
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(160, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === 'fanfare') {
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
          gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.1 + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.1);
          osc.stop(ctx.currentTime + idx * 0.1 + 0.3);
        });
      }
    } catch {
      // Audio not supported or blocked by user gesture
    }
  };

  // Start / Reset Game
  const startNewGame = () => {
    // Shuffle and pick 5 distinct pairs for the session
    const shuffled = [...CARDS_DATA].sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, totalRounds);
    setSelectedPairs(picked);
    setCurrentRound(0);
    setScore(0);
    setStreak(0);
    setGameOver(false);
    setupRound(0, picked);
  };

  const setupRound = (roundIdx: number, pairsList: CardPair[]) => {
    const targetPair = pairsList[roundIdx];
    setCurrentCardA(targetPair);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setShowHint(false);

    // Pick 3 distractors from the remaining cards
    const otherCards = CARDS_DATA.filter((p) => p.id !== targetPair.id);
    const shuffledOthers = otherCards.sort(() => 0.5 - Math.random()).slice(0, 3);
    const roundOptions = [targetPair, ...shuffledOthers].sort(() => 0.5 - Math.random());
    setOptions(roundOptions);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleSelectOption = (option: CardPair) => {
    if (isAnswered || !currentCardA) return;

    setSelectedOption(option);
    setIsAnswered(true);

    if (option.id === currentCardA.id) {
      setIsCorrect(true);
      const pointsGained = 100 + streak * 25;
      setScore((prev) => prev + pointsGained);
      setStreak((prev) => prev + 1);
      playSound('correct');
    } else {
      setIsCorrect(false);
      setStreak(0);
      playSound('wrong');
    }
  };

  const handleNextRound = () => {
    const nextIdx = currentRound + 1;
    if (nextIdx < totalRounds) {
      setCurrentRound(nextIdx);
      setupRound(nextIdx, selectedPairs);
    } else {
      setGameOver(true);
      playSound('fanfare');
    }
  };

  // Determine current scale status
  let scaleStatus: 'left_only' | 'balanced' | 'mismatched' = 'left_only';
  if (isAnswered && selectedOption && currentCardA) {
    if (selectedOption.id === currentCardA.id) {
      scaleStatus = 'balanced';
    } else {
      scaleStatus = 'mismatched';
    }
  }

  // Determine badge title
  const getWisdomTitle = () => {
    const percentage = (score / (totalRounds * 100)) * 100;
    if (percentage >= 100) return 'Hakim Agung Konstitusi Muda (Luar Biasa!)';
    if (percentage >= 80) return 'Penjaga Keseimbangan Bangsa (Sangat Baik)';
    if (percentage >= 60) return 'Duta Keadilan Pelajar (Cukup Baik)';
    return 'Pelajar Perlu Belajar Keseimbangan';
  };

  return (
    <div className="space-y-6">
      {/* Game Header Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-slate-900 text-base">
              Tantangan Timbangan Takdir
            </h2>
            <div className="text-xs text-slate-500">
              Ronde {currentRound + 1} dari {totalRounds} · Pasangkan Kewajiban yang Tepat!
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 font-semibold">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>Skor: {score}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-lg text-orange-800 font-semibold">
            <Flame className="w-4 h-4 text-orange-600" />
            <span>Streak: {streak}x</span>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200"
            title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {!gameOver ? (
        <>
          {/* Real-time Dynamic Balance Scale */}
          <BalanceScaleVisualizer
            cardLeft={currentCardA}
            cardRight={selectedOption}
            status={scaleStatus}
            interactive={true}
          />

          {/* Current Challenge: Card A Description */}
          {currentCardA && (
            <div className="p-5 bg-blue-50/70 border border-blue-200 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Kartu A yang Diletakkan di Piringan Kiri (HAK SISWA):
                </span>
                <span className="text-xs text-blue-600 font-medium">
                  {currentCardA.categoryLabel}
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-blue-950 mb-1">
                {currentCardA.kartuA.nama}
              </h3>
              <p className="text-sm text-blue-900 leading-relaxed mb-3">
                {currentCardA.kartuA.hak}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-2 border-t border-blue-200/60">
                <span className="font-semibold text-blue-950">Pasal UUD NRI 1945:</span>
                <span className="bg-white/80 px-2.5 py-0.5 rounded border border-blue-200 text-blue-900 font-medium">
                  {currentCardA.kartuA.pasal}
                </span>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="ml-auto text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showHint ? 'Tutup Petunjuk Guru' : 'Butuh Petunjuk Guru?'}</span>
                </button>
              </div>

              {showHint && (
                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 animate-in fade-in">
                  <span className="font-bold">Petunjuk Guru PPKn: </span>
                  Kewajiban penyeimbangnya berkaitan erat dengan nilai "{currentCardA.nilaiPancasila}". Pilihlah kewajiban yang langsung mencegah timbulnya kerugian pada konteks {currentCardA.categoryLabel.toLowerCase()}.
                </div>
              )}
            </div>
          )}

          {/* Decision Choices: Card B Candidates */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-display font-semibold text-slate-800 text-sm">
                Pilihlah Kartu B (Kewajiban) yang merupakan Pasangan Logis Penyeimbangnya:
              </h4>
              <span className="text-xs text-slate-500">
                {isAnswered ? 'Jawaban telah dikunci' : 'Klik satu kartu di bawah untuk menyeimbangkan'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {options.map((option, idx) => {
                const isSelected = selectedOption?.id === option.id;
                const isThisTheCorrectOne = currentCardA && option.id === currentCardA.id;

                let cardStyle = 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-sm text-slate-800';

                if (isAnswered) {
                  if (isThisTheCorrectOne) {
                    cardStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20';
                  } else if (isSelected && !isThisTheCorrectOne) {
                    cardStyle = 'bg-rose-50 border-rose-400 text-rose-950 opacity-75';
                  } else {
                    cardStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-50';
                  }
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option)}
                    disabled={isAnswered}
                    className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between ${cardStyle}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-bold text-slate-500">
                          PILIHAN {String.fromCharCode(65 + idx)}
                        </span>
                        {isAnswered && isThisTheCorrectOne && (
                          <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                            <CheckCircle className="w-4 h-4" /> Pasangan Tepat!
                          </span>
                        )}
                        {isAnswered && isSelected && !isThisTheCorrectOne && (
                          <span className="flex items-center gap-1 text-xs font-bold text-rose-600">
                            <XCircle className="w-4 h-4" /> Tidak Seimbang
                          </span>
                        )}
                      </div>

                      <div className="font-semibold text-sm mb-1.5">
                        {option.kartuB.nama}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {option.kartuB.kewajiban}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                      Konteks: {option.categoryLabel}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Answer Feedback & Next Action */}
          {isAnswered && (
            <div
              className={`p-5 rounded-xl border animate-in fade-in duration-300 ${
                isCorrect
                  ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50/90 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-display font-bold text-base">
                    {isCorrect ? (
                      <>
                        <Sparkles className="w-5 h-5 text-emerald-600" />
                        <span>Timbangan Takdir Seimbang Sempurna! (+100 Poin)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-600" />
                        <span>Timbangan Masih Berat Sebelah!</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed max-w-2xl">
                    {isCorrect
                      ? `Hebat! ${currentCardA?.kartuB.alasanSeimbang} Nilai ini ditegaskan dalam ${currentCardA?.kaitanPasalNilai}.`
                      : `Pilihanmu belum menjadi timbal balik seimbang dari hak ini. Pasangan sesungguhnya adalah: "${currentCardA?.kartuB.nama}".`}
                  </p>
                </div>

                <button
                  onClick={handleNextRound}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-2 whitespace-nowrap shadow-sm transition-colors"
                >
                  <span>{currentRound + 1 < totalRounds ? 'Ronde Selanjutnya' : 'Lihat Hasil Akhir'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Game Over Screen */
        <div className="p-8 bg-white border border-slate-200 rounded-2xl text-center space-y-6 shadow-sm">
          <div className="w-20 h-20 rounded-full bg-amber-100 border border-amber-300 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
            <Trophy className="w-10 h-10 animate-bounce" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Hasil Permainan Timbangan Takdir
            </span>
            <h3 className="font-display font-bold text-2xl text-slate-900">
              {getWisdomTitle()}
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Kamu berhasil menuntaskan {totalRounds} tantangan keseimbangan hak dan kewajiban warga negara muda.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-center">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="text-xs text-slate-500">Total Skor</div>
              <div className="font-display font-bold text-2xl text-slate-900 mt-1">
                {score}
              </div>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="text-xs text-slate-500">Keseimbangan Sukses</div>
              <div className="font-display font-bold text-2xl text-emerald-600 mt-1">
                {Math.round((score / (totalRounds * 100)) * totalRounds)} / {totalRounds}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={startNewGame}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl flex items-center gap-2 mx-auto shadow-md transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Mainkan Tantangan Baru (Acak Kartu)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

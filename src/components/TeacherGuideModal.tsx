import React from 'react';
import { X, BookOpen, GraduationCap, Users, Trophy, Sparkles, CheckCircle2 } from 'lucide-react';

interface TeacherGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherGuideModal: React.FC<TeacherGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-bold text-slate-900 text-lg">
                Panduan Fasilitator & Gamifikasi Guru PPKn SMP
              </h2>
              <div className="text-xs text-slate-500">
                Strategi Pembelajaran "Timbangan Takdir" untuk Kelas 9 (Fase D)
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-sm text-slate-700 leading-relaxed">
          {/* Section 1: Filosofi Gamifikasi */}
          <div className="space-y-2">
            <h3 className="font-display font-bold text-slate-900 text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>1. Filosofi Gamifikasi: Mengapa "Timbangan Takdir"?</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Siswa usia remaja (SMP Kelas 9) sering kali sangat vokal dalam menuntut hak mereka (seperti kebebasan medsos, privasi HP, fasilitas kelas), namun kerap abai terhadap kewajiban penyeimbangnya. Konsep metafora <strong>Timbangan Takdir</strong> mengubah materi hafalan pasal UUD 1945 menjadi konsep visual-kinestetik: <em>setiap hak memiliki beban tanggung jawab moral yang setara; jika salah satu sisi diabaikan, timbangan keadilan sosial akan miring dan membawa kekacauan.</em>
            </p>
          </div>

          {/* Section 2: Tiga Model Permainan di Kelas */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-slate-900 text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>2. Tiga Skenario Pembelajaran di Kelas</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1.5">
                <div className="font-bold text-blue-950">Metode 1: Make a Match Fisik</div>
                <p className="text-slate-600 leading-relaxed">
                  Cetak 20 pasang kartu (tab "Cetak Kartu"). Bagikan Kartu A (Hak) ke kelompok laki-laki dan Kartu B (Kewajiban) ke kelompok perempuan. Dalam 3 menit, siswa harus bergerak mencari pasangannya dan memvalidasi kecocokannya di depan kelas!
                </p>
              </div>

              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1.5">
                <div className="font-bold text-emerald-950">Metode 2: Proyektor Kelas Interaktif</div>
                <p className="text-slate-600 leading-relaxed">
                  Tampilkan tab "Game Timbangan" di proyektor kelas. Bentuk 4 regu belajar. Setiap regu bergantian memilih kewajiban penyeimbang. Perhatikan reaksi timbangan yang berayun seimbang saat jawaban benar!
                </p>
              </div>

              <div className="p-3.5 bg-purple-50/70 border border-purple-200 rounded-xl space-y-1.5">
                <div className="font-bold text-purple-950">Metode 3: Debat Skenario Timpang</div>
                <p className="text-slate-600 leading-relaxed">
                  Pilih salah satu kartu hak lalu buka kolom telaah "Bahaya Timbangan Timpang". Minta siswa mendiskusikan studi kasus nyata: apa yang terjadi jika remaja hanya menuntut hak medsos tanpa tanggung jawab etika saring sebelum sharing?
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Integrasi Kurikulum & Profil Pelajar Pancasila */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Keterkaitan Kurikulum Merdeka (Fase D - Kelas 9):</span>
            </h4>
            <ul className="space-y-1.5 text-slate-600 list-disc pl-4">
              <li>
                <strong>Capaian Pembelajaran (CP) UUD NRI 1945:</strong> Peserta didik mampu menganalisis hak dan kewajiban warga negara yang diatur dalam UUD NRI 1945 serta mempraktikkannya dalam kehidupan sehari-hari di lingkungan sekolah, keluarga, dan masyarakat.
              </li>
              <li>
                <strong>Dimensi Profil Pelajar Pancasila:</strong>
                <span className="block mt-0.5 text-slate-700">
                  • <em>Bernalar Kritis:</em> Mampu mengidentifikasi konsekuensi logis antara hak dan kewajiban.<br />
                  • <em>Gotong Royong:</em> Menghormati hak orang lain dan berkolaborasi dalam menegakkan aturan.<br />
                  • <em>Berakhlak Mulia:</em> Menjunjung etika kesopanan, anti-bullying, dan adab digital.
                </span>
              </li>
            </ul>
          </div>

          {/* Section 4: Tips Debriefing Refleksi Guru */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Pertanyaan Penutup Refleksi Kelas (Debriefing):</span>
            </h4>
            <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-lg text-amber-950 space-y-1 italic">
              <p>"Anak-anak hebat kelas 9, setelah melihat timbangan takdir tadi berayun seimbang, manakah yang harus didahulukan: menuntut hak atau menunaikan kewajiban terlebih dahulu? Mengapa?"</p>
              <p>"Jika kita menuntut ruang kelas yang nyaman tetapi kita membuang sampah di kolong meja, apa sebutan moral bagi perilaku kita?"</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Tutup Panduan & Mulai Game
          </button>
        </div>
      </div>
    </div>
  );
};

import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import NameInput from "../components/NameInput";
import VerseDisplay from "../components/VerseDisplay";
import themes from "../data/themes";
import { getRandomVerse } from "../services/verseService";
import {
  getSavedVerse,
  isToday,
  saveUserName,
  getSavedUserName,
} from "../utils/storage";

const getSeasonalKey = () => {
  const month = new Date().getMonth() + 1;
  if (month === 12) return "christmas";
  if (month === 4) return "easter";
  if (month === 9) return "churchBirthday";
  return "default";
};

const PublicHome = () => {
  const [name, setName] = useState("");
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("landing");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const seasonalKey = useMemo(() => getSeasonalKey(), []);
  const seasonalBg = themes[seasonalKey] || themes.default;

  useEffect(() => {
    const savedName = getSavedUserName();
    const savedData = getSavedVerse();

    if (savedName && savedData && isToday(savedData.date)) {
      setName(savedName);
      setVerse(savedData.verse);
      setView("generate");
    }
  }, []);

  const handleNameSubmit = (inputName) => {
    setName(inputName);
    saveUserName(inputName);
  };

  const handleGenerateVerse = async () => {
    setLoading(true);
    try {
      const selectedVerse = await getRandomVerse(seasonalKey);
      setVerse(selectedVerse);
    } catch (err) {
      console.error("Failed to select a verse:", err);
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();

  const greetingLabel =
    seasonalBg?.label && seasonalBg.label !== "Halo"
      ? `${seasonalBg.label} ${currentYear}`
      : seasonalBg?.label || "Halo";

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-950 text-white font-sans">
      {/* NAVBAR */}
      <nav className="absolute top-0 w-full flex justify-between items-center px-4 md:px-8 py-5 z-50">
        <div className="text-xl md:text=2xl font-extrabold tracking-wider text-yellow-400 drop-shadow-lg z-50">
          God's Whisper
        </div>

        <button
          className="md:hidden text-2xl text-white z-50 focus:outline-none cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div
          className={`flex flex-col md:flex-row items-center justify-center gap-6 fixed md:relative top-0 left-0 w-full md:w-auto h-screen md:h-auto bg-slate-950/95 md:bg-transparent backdrop-blur-lg md:backdrop-blur-none transition-transform duration-300 ease-in-out z-40 ${isMenuOpen ? "translate-y-0" : "-translate-y-full md:translate-y-0"}`}
        >
          <Link
            to="/login"
            onClick={() => setIsMenuOpen(false)}
            className="text-lg md:text-base font-semibold md:font-medium text-white hover:text-yellow-300 transition"
          >
            Login Admin
          </Link>
          <Link
            to="/register"
            className="text-lg md:text-base px-6 md:px-4 py-3 md:py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg transition-transform active:scale-95 shadow-lg w-[80%] md:w-auto text-center"
          >
            Daftar Gereja
          </Link>
        </div>
      </nav>

      {/* BACKGROUND */}
      {seasonalBg?.src && seasonalBg.type === "video" && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105 filter brightness-50"
          >
            <source src={seasonalBg.src} type="video/mp4" />
          </video>
        </div>
      )}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-0 pointer-events-none" />

      {/* MAIN CONTENT */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center px-6 py-4 mt-20 md:mt-16 flex-1">
        {/* MODE LANDING */}
        {view === "landing" && (
          <div className="max-w-3xl text-center flex flex-col items-center animate-fade-in w-full">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 md:mb-6 leading-tight drop-shadow-xl text-white">
              Dengarkan <span className="text-yellow-400">Suara Tuhan </span>
              <br className="hidden sm:block" />
              Setiap Hari
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 md:mb-10 leading-relaxed drop-shadow-md px-2">
              God's Whisper adalah platform interaktif yang membagikan ayat emas
              harian untuk menguatkan iman Anda. Gereja Anda juga dapat
              menggunakan platform ini untuk membuat link pembagian ayat khusus
              pada event seperti Natal, Paskah, atau Perayaan Ulang Tahun
              Gereja.
            </p>
            <button
              onClick={() => setView("generate")}
              className="w-full sm:w-auto px-6 md:px-8 py-4 bg-purple-900 hover:bg-purple-950 text-yellow-300 text-base md:text-lg md:text-xl font-bold rounded-xl shadow-2xl transition-all active:scale-95 cursor-pointer"
            >
              Terima Ayat Emas Hari Ini ✨
            </button>
          </div>
        )}

        {view === "generate" && (
          <div className="w-full animate-fade-in flex flex-col items-center flex-1 justify-center pb-10">
            {!name ? (
              <NameInput
                onSubmit={handleNameSubmit}
                theme={seasonalBg?.theme}
              />
            ) : (
              <div className="w-full flex flex-col justify-center items-center md:px-4">
                <h2
                  className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center drop-shadow-lg ${seasonalBg?.theme?.label || "text-white"}`}
                >
                  {greetingLabel}, {name}!
                </h2>

                {!verse ? (
                  <button
                    onClick={handleGenerateVerse}
                    disabled={loading}
                    className={`w-full sm:w-auto px-4 md:px-8 py-4 rounded-xl text-lg md:text-xl font-bold shadow-2xl cursor-pointer duration-200 active:scale-95 transition-all disabled:opacity-50 ${seasonalBg?.theme?.button || "bg-yellow-400 hover:bg-yellow-500 text-slate-950"}`}
                  >
                    {loading ? "Menyiapkan Ayat..." : "Ambil ayat emasmu ✨"}
                  </button>
                ) : (
                  <VerseDisplay verse={verse} theme={seasonalBg?.theme} />
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="absolute bottom-4 w-full text-center text-[10px] md:text-xs text-white/50 z-10 tracking-widest uppercase">
        God&apos;s Whisper &bull; {currentYear}
      </footer>
    </main>
  );
};

export default PublicHome;

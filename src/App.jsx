import { useState, useEffect, useMemo } from "react";
import NameInput from "./components/NameInput";
import VerseDisplay from "./components/VerseDisplay";

import themes from "./data/themes";
import { getRandomVerse } from "./services/verseService";
import {
  getSavedVerse,
  isToday,
  saveUserName,
  getSavedUserName,
} from "./utils/storage";

const getSeasonalKey = () => {
  const month = new Date().getMonth() + 1;
  if (month === 12) return "christmas";
  if (month === 4) return "easter";
  if (month === 9) return "churchBirthday";
  return "default";
};

function App() {
  const [name, setName] = useState("");
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(false);

  const seasonalKey = useMemo(() => getSeasonalKey(), []);
  const seasonalBg = themes[seasonalKey] || themes.default;

  useEffect(() => {
    const savedName = getSavedUserName();
    const savedData = getSavedVerse();

    if (savedName) {
      setName(savedName);
    }

    if (savedData && isToday(savedData.date)) {
      setVerse(savedData.verse);
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
      {/* Background */}
      {seasonalBg?.src && seasonalBg.type === "video" && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105 filter brightness-75"
          >
            <source src={seasonalBg.src} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Overlay background for text */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-0 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center p-4">
        {!name ? (
          <NameInput onSubmit={handleNameSubmit} theme={seasonalBg?.theme} />
        ) : (
          <div className="w-full flex flex-col justify-center items-center">
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center drop-shadow-lg ${seasonalBg?.theme?.label || "text-white"}`}
            >
              {greetingLabel}, {name}!
            </h2>

            {!verse ? (
              <button
                onClick={handleGenerateVerse}
                disabled={loading}
                className={`px-8 py-4 rounded-xl text-lg md:text-xl font-bold shadow-2xl cursor-pointer duration-200 active:scale-95 transition-all disabled:opacity-50 ${seasonalBg?.theme?.button || "bg-yellow-400 hover:bg-yellow-500 text-slate-950"}`}
              >
                {loading ? "Menyiapkan Ayat..." : "Ambil ayat emasmu ✨"}
              </button>
            ) : (
              <VerseDisplay verse={verse} theme={seasonalBg?.theme} />
            )}
          </div>
        )}
      </div>

      <footer className="absolute bottom-3  text-xs text-white/50 z-10 tracking-widest uppercase">
        God&apos;s Whisper &bull; {currentYear}
      </footer>
    </main>
  );
}

export default App;

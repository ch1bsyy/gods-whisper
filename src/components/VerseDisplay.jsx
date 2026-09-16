/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaCopy, FaCheck } from "react-icons/fa";
import { saveVerse, getSavedVerse, isToday } from "../utils/storage";

const VerseDisplay = ({ verse, theme }) => {
  const [opened, setOpened] = useState(false);
  const [showVerse, setShowVerse] = useState(false);
  const [todaysVerse, setTodaysVerse] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = getSavedVerse();
    if (saved && isToday(saved.date)) {
      setTodaysVerse(saved.verse);
      setOpened(true);
      setShowVerse(true);
    } else if (verse) {
      setTodaysVerse(verse);
    }
  }, [verse]);

  const handleClick = () => {
    if (opened || !todaysVerse) return;

    saveVerse(todaysVerse);
    setOpened(true);

    setTimeout(() => {
      setShowVerse(true);
    }, 1200);
  };

  const handleShareWhatsapp = () => {
    if (!todaysVerse) return;
    const message = `*"${todaysVerse.text}"*\n\n- *${todaysVerse.reference}*\n\n_Diterima melalui God's Whisper_ ✨`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleCopyText = async () => {
    if (!todaysVerse) return;
    const fullText = `"${todaysVerse.text}" - ${todaysVerse.reference}`;
    await navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center w-full max-w-xl px-4 z-10">
      <AnimatePresence>
        {!showVerse && (
          <motion.img
            src="/images/gift-box.png"
            alt="Gift Box"
            onClick={handleClick}
            className="w-36 h-36 md:w-44 md:h-44 cursor-pointer select-none drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)]"
            animate={
              opened
                ? {
                    rotate: [0, -12, 12, -8, 8, -4, 4, 0],
                    scale: [1, 1.1, 0.95, 1.05, 0],
                    transition: { duration: 1.2, ease: "easeInOut" },
                  }
                : {
                    y: [0, -8, 0],
                    transition: {
                      repeat: Infinity,
                      duration: 1.8,
                      ease: "easeInOut",
                    },
                  }
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
          />
        )}
      </AnimatePresence>

      {!opened && (
        <p
          className={`mt-6 text-base md:text-lg animate-pulse font-semibold tracking-wide drop-shadow-md ${theme?.hint || "text-white"}`}
        >
          Klik kotak untuk mendapatkan firman hari ini!
        </p>
      )}

      {showVerse && todaysVerse && (
        <motion.div
          className="w-full flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div
            className={`w-full rounded-2xl p-6 md:p-8 shadow-2xl border border-white/10 ${
              theme?.verseContainer || "bg-white/20 backdrop-blur-md"
            }`}
          >
            <p
              className={`text-lg md:text-2xl font-serif italic mb-4 leading-relaxed tracking-wide ${theme?.verse || "text-white"}`}
            >
              &ldquo;{todaysVerse.text}&rdquo;
            </p>
            <p
              className={`text-base md:text-lg font-bold tracking-wider uppercase ${
                theme?.reference || "text-yellow-300"
              }`}
            >
              {todaysVerse.reference}
            </p>
          </div>

          <div className="flex flex-wrap self-end items-center justify-center gap-3 mt-6">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium shadow-md transition-all bg-white/10 hover:bg-white/5 text-white backdrop-blur-sm active:scale-95 cursor-pointer text-sm md:text-base"
            >
              {copied ? <FaCheck className="text-green-400" /> : <FaCopy />}
              {copied ? "Tersalin!" : "Salin Ayat"}
            </button>

            <button
              onClick={handleShareWhatsapp}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold shadow-md transition-all bg-emerald-600 hover:bg-emerald-500 text-white active:scale-95 cursor-pointer text-sm md:text-base"
            >
              <FaWhatsapp className="text-xl" />
              Bagikan ke WhatsApp
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default VerseDisplay;

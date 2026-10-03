/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { isBefore, isAfter, format } from "date-fns";
import { id } from "date-fns/locale";
import * as htmlToImage from "html-to-image";
import { FaDownload } from "react-icons/fa";
import NameInput from "../components/NameInput";
// import VerseDisplay from "../components/VerseDisplay";

const EventPage = () => {
  const { slug } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventStatus, setEventStatus] = useState("active"); // 'upcoming', 'active', 'ended'

  const [userName, setUserName] = useState("");
  const [verse, setVerse] = useState(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const { data, error: fetchError } = await supabase
          .from("events")
          .select("*")
          .eq("slug", slug)
          .eq("is_active", true)
          .single();

        if (fetchError || !data) throw new Error("Access not found");

        setEventData(data);

        // scheduled Access
        const now = new Date();
        if (data.start_time && isBefore(now, new Date(data.start_time))) {
          setEventStatus("upcoming");
        } else if (data.end_time && isAfter(now, new Date(date.end_time))) {
          setEventStatus("ended");
        } else {
          setEventStatus("active");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [slug]);

  const handleNameSubmit = (name) => {
    setUserName(name);
  };

  const handleGenerateVerse = async () => {
    try {
      const { data: verses, error } = await supabase
        .from("event_verses")
        .select("*")
        .eq("event_id", eventData.id);

      let selectedVerse;
      if (verses && verses.length > 0) {
        selectedVerse = verses[Math.floor(Math.random() * verses.length)];
      } else {
        // Fallback: Panggil fungsi getRandomVerse dari service kamu (sesuaikan path)
        // selectedVerse = await getRandomVerse(eventData.theme);
        // Dummy fallback untuk tes:
        selectedVerse = {
          text: "Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu...",
          reference: "Yeremia 29:11",
        };
      }

      setVerse(selectedVerse);

      await supabase.from("analytics").insert([
        {
          event_id: eventData.id,
          visitor_name: userName,
        },
      ]);
    } catch (err) {
      console.error("Error generating verse", err);
    }
  };

  const handleDownloadCard = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        quality: 0.95,
      });
      const link = document.createElement("a");
      link.download = `gods-whisper-${userName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to Download Image", err);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 tet-white">
        Memuat...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 tet-red-400">
        {error}
      </div>
    );

  if (eventStatus === "upcoming") {
    const startTimeStr = format(
      new Date(eventData.start_time),
      "EEEE, dd MMMM yyyy HH:mm",
      { locale: id },
    );
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">{eventData.title}</h1>
        <p className="text-xl text-yellow-300">Acara ini belum dimulai.</p>
        <p className="mt-2 text-gray-400">
          Silakan kembali pada:
          <br />
          <span className="text-white font-semibold">{startTimeStr} WIB</span>
        </p>
      </div>
    );
  }

  if (eventStatus === "ended") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-6 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-500">
          {eventData.title}
        </h1>
        <p className="text-xl text-red-400">Acara ini telah berakhir.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-br from-indigo-900 to-slate-900 text-white p-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-8 text-center text-yellow-300 drop-shadow-md">
        {eventData.title}
      </h1>

      {!userName ? (
        <NameInput onSubmit={handleNameSubmit} />
      ) : !verse ? (
        <button
          onClick={handleGenerateVerse}
          className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl shadow-lg transition-transform active:scale-95"
        >
          Buka Ayat Emasmu, {userName}!
        </button>
      ) : (
        <div className="flex flex-col items-center gap-6 w-full max-w-md">
          {/* Social Media Card Container */}
          <div
            ref={cardRef}
            className="w-full bg-gradient-to-b from-indigo-800 to-purple-900 p-8 rounded-2xl shadow-2xl flex flex-col items-center text-center border border-white/20"
            style={{ aspectRatio: "9/16" }}
          >
            <h3 className="text-yellow-300 font-semibold mb-6">
              Pesan untuk {userName}
            </h3>
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-xl md:text-2xl font-serif italic mb-6 leading-relaxed">
                "{verse.text}"
              </p>
              <p className="font-bold text-lg">{verse.reference}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/20 w-full">
              <p className="text-sm text-gray-300">{eventData.title}</p>
              <p className="text-xs text-gray-400 mt-1">
                Dibuat di God's Whisper
              </p>
            </div>
          </div>

          <div className="flex gap-4 w-full justify-center">
            <button
              onClick={handleDownloadCard}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg transition"
            >
              <FaDownload /> Unduh Gambar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPage;

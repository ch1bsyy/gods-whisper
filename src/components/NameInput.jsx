import { useState } from "react";

const NameInput = ({ onSubmit, theme }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input.trim());
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 py-8 z-10">
      <h1
        className={`text-3xl sm:text-5xl md:text-6xl font-extrabold mb-8 text-center leading-tight tracking-wide drop-shadow-lg ${theme?.greeting || "text-white"}`}
      >
        Selamat Datang di <br />
        <span
          className={`drop-shadow-md ${theme?.appname || "text-yellow-300"}`}
        >
          God&apos;s Whisper
        </span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center w-full max-w-sm"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tuliskan namamu..."
          maxLength={25}
          required
          className={`w-full px-5 py-3.5 rounded-xl text-center text-lg font-medium shadow-lg backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${theme?.input || "bg-white/20 text-white placeholder-white/70"}`}
        />

        <button
          type="submit"
          className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-8 py-3.5 font-bold text-lg rounded-xl shadow-xl transition-all duration-200 active:scale-95 cursor-pointer"
        >
          Mulai
        </button>
      </form>
    </div>
  );
};

export default NameInput;

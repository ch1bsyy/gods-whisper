/* eslint-disable no-unused-vars */
import { useState } from "react";
import { supabase } from "../lib/supabase";
import {
  FaChurch,
  FaUserAlt,
  FaEnvelope,
  FaInstagram,
  FaPhone,
  FaFileUpload,
  FaDownload,
} from "react-icons/fa";

const RegisterChurch = () => {
  const [formData, setFormData] = useState({
    church_name: "",
    pic_name: "",
    email: "",
    phone: "",
    social_media_url: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let proofDocumentUrl = null;

      if (file) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `surat_tugas/${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from("proof_documents")
          .upload(filePath, file);

        if (uploadError)
          throw new Error("Failed to Upload Document: " + uploadError.message);

        const { data: publicUrlData } = supabase.storage
          .from("proof_documents")
          .getPublicUrl(filePath);

        proofDocumentUrl = publicUrlData.publicUrl;
      }

      const payload = {
        ...formData,
        proof_document_url: proofDocumentUrl,
      };

      const { error: insertError } = await supabase
        .from("registrations")
        .insert([payload]);

      if (insertError) {
        if (insertError.code === "23505")
          throw new Error("This email address has already been registered.");
        throw insertError;
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6">
        <div className="bg-slate-800 p-8 rounded-2xl max-w-lg text-center border border-green-500/30">
          <FaChurch className="text-5xl text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Pendaftaran Berhasil</h2>
          <p className="text-gray-400 mb-6">
            Terima kasih telah mendaftarkan gereja Anda. Tim kami akan melakukan
            verifikasi data (maksimal 2x24 jam). Kami akan menghubungi Anda via
            email jika akun telah disetujui.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="text-yellow-400 hover:underline cursor-pointer"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 to-slate-900 text-white p-4 md:p-6">
      <div className="bg-white/10 backdrop-blur-md p-4 md:p-8 rounded-2xl max-w-lg shadow-2xl border border-white/20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-yellow-300 mb-2">
          Daftar Akun Admin Gereja
        </h2>
        <p className="text-center text-sm  md:text-base text-gray-300 mb-8">
          Sistem ini memerlukan verifikasi manual untuk memastikan keamanan dan
          validitas penggunaan platform.
        </p>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Nama Gereja Resmi
            </label>
            <div className="relative">
              <FaChurch className="absolute left-3 top-4 text-gray-400" />
              <input
                type="text"
                name="church_name"
                required
                className="w-full text-sm md:text-base pl-10 pr-4 py-3 bg-slate-800/50 rounded-xl border border-slate-700 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition"
                placeholder="Contoh: Bethany Nginden Surabaya"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">
                Nama Lengkap PIC
              </label>
              <div className="relative">
                <FaUserAlt className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="text"
                  name="pic_name"
                  required
                  className="w-full text-sm md:text-base pl-10 pr-4 py-3 bg-slate-800/50 rounded-xl border border-slate-700 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition"
                  placeholder="Nama Pengurus"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">
                No. WhatsApp
              </label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="text"
                  name="phone"
                  required
                  className="w-full text-sm md:text-base pl-10 pr-4 py-3 bg-slate-800/50 rounded-xl border border-slate-700 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition"
                  placeholder="0812********"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Email Resmi / PIC
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                className="w-full text-sm md:text-base pl-10 pr-4 py-3 bg-slate-800/50 rounded-xl border border-slate-700 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition"
                placeholder="email@gereja.org"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Link Sosial Media Gereja (Opsional)
            </label>
            <div className="relative">
              <FaInstagram className="absolute left-3 top-4 text-gray-400" />
              <input
                type="url"
                name="social_media_url"
                className="w-full text-sm md:text-base pl-10 pr-4 py-3 bg-slate-800/50 rounded-xl border border-slate-700 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition"
                placeholder="https://instagram.com/..."
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Upload Document Area */}
          <div className="pt-2 border-t border-white/10 mt-6">
            <div className="flex justify-between items-end mb-2">
              <label className="block text-sm font-medium text-gray-300">
                Surat Keterangan Penugasan
              </label>
              <a
                href="/template/Template_Surat_GodsWhisper.docx"
                download
                className="text-xs flex items-center text-center gap-1 md:gap-2 text-yellow-400 hover:text-yellow-300 transition"
              >
                <FaDownload size={14} /> Unduh Template
              </a>
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaFileUpload className="text-gray-400 group-hover:text-yellow-400 transition" />
              </div>
              <input
                type="file"
                name="proof_document"
                accept=".pdf"
                required
                onChange={handleFileChange}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 text-sm text-gray-300 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-50 rounded-xl border border-slate-700 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition cursor-pointer"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              Format didukung: PDF (Maks. 5MB )
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 md:py-3.5 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50 mt-3 md:mt-4 cursor-pointer"
          >
            {loading ? "Mengirim Data..." : "Ajukan Pendaftaran"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterChurch;

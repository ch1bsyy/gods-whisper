import { QRCodeSVG } from "qrcode.react";

// ... (di dalam komponen Dashboard)
const eventUrl = `https://godswhisper.vercel.app/e/${event.slug}`;

return (
  <div className="p-6 bg-white text-black rounded-xl text-center">
    <h3 className="font-bold mb-4">Scan untuk Membuka Ayat</h3>
    <div className="flex justify-center p-4 bg-white">
      <QRCodeSVG
        value={eventUrl}
        size={256}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"H"}
        includeMargin={true}
      />
    </div>
    <p className="mt-4 font-mono text-sm">{eventUrl}</p>
  </div>
);

import { useParams } from "react-router-dom";
import { useEffect } from "react";
// import { useState, useEffect } from "react";
// import { supabase } from "../lib/supabase";

const EventPage = () => {
  const { slug } = useParams();
  //   const [eventData, setEventData] = useState(null);

  useEffect(() => {
    console.log("Fetching Event:", slug);
  }, [slug]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <h1>Memuat Acara: {slug}...</h1>
      {/* Execute Scheduled Access Feature Here */}
    </div>
  );
};

export default EventPage;

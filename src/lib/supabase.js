import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "Supabase credentials have not been configured in the .env file. Using offline fallback mode.",
  );
}

export const supabase = createClient(supabaseUrl || "", supabaseKey || "");

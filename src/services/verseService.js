import { supabase } from "../lib/supabase";
import fallbackVerses from "../data/verses";

export const getRandomVerse = async (categoryKey = "default") => {
  try {
    let categoryFilter = null;
    if (categoryKey === "christmas") categoryFilter = "christmas";
    else if (categoryKey === "easter") categoryFilter = "easter";
    if (categoryKey === "churchBirthday") categoryFilter = "churchBirthday";

    let query = supabase.from("verses").select("id, text, reference, category");

    if (categoryFilter) {
      query = query.or(`category.eq.${categoryFilter},category.eq.general`);
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      throw error || new Error("No data found");
    }

    // Get One Random
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
  } catch (err) {
    console.warn(
      "Failed to retrieve data from Supabase, switching to local data:",
      err.message,
    );
    const randomIndex = Math.floor(Math.random() * fallbackVerses.length);
    return fallbackVerses[randomIndex];
  }
};

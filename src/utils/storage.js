export const VERSE_KEY = "godswhisper_verse";
export const USER_KEY = "godswhisper_username";

export const saveVerse = (verse) => {
  const today = new Date().toISOString().split("T")[0];
  localStorage.setItem(VERSE_KEY, JSON.stringify({ verse, date: today }));
};

export const getSavedVerse = () => {
  const data = localStorage.getItem(VERSE_KEY);
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch (e) {
    console.error("Failed to parse saved verse", e);
    return null;
  }
};

export const saveUserName = (name) => {
  localStorage.setItem(USER_KEY, name);
};

export const getSavedUserName = () => {
  return localStorage.getItem(USER_KEY) || "";
};

export const isToday = (dateStr) => {
  const today = new Date().toISOString().split("T")[0];
  return dateStr === today;
};

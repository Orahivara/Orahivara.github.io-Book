import { useEffect, useState } from "react";
const STORAGE_KEY = "movie-watchlist-1";
function readFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved)
      ? saved.filter((id) => Number.isInteger(id))
      : [];
  } catch {
    return [];
  }
}
export default function useFavorities() {
  const [favorities, setFavorites] = useState(readFavorites);
  const [storageError, setStorageError] = useState("");
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorities));
      setStorageError("");
    } catch {
      setStorageError("Браузер запретил сохранение");
    }
  }, [favorities]);
  function toggleFavorites(id) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }
  return { favorities, toggleFavorites, storageError };
}

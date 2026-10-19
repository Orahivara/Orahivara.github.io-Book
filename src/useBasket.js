import { useEffect, useState } from "react";
const STORAGE_KEY = "buy-list";
function readBuys() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved)
      ? saved.filter((id) => Number.isInteger(id))
      : [];
  } catch {
    return [];
  }
}
export default function pushInBusket() {
  const [buyitem, setBuyItem] = useState(readBuys);
  const [storageError, setStorageError] = useState("");
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(buyitem));
      setStorageError("");
    } catch {
      setStorageError("Браузер запретил сохранение");
    }
  }, [buyitem]);
  function toggleBuy(id) {
    setBuyItem((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }
  return { buyitem, toggleBuy, setStorageError };
}

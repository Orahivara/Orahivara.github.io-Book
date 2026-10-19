import { useEffect, useState } from "react";

export default function useBaners() {
  const [baners, setBaners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attemp, setAttemp] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    async function load() {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}baners.json`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Не удалось загрузить банер");
        const data = await response.json();

        if (!controller.signal.aborted) setBaners(data);
      } catch (err) {
        if (!controller.signal.aborted) setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [attemp]);
  return {
    baners,
    loading,
    error,
    retry: () => setAttemp((value) => value + 1),
  };
}

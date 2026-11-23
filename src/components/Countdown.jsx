import { useEffect, useState } from "react";
import { data } from "../config";

const calc = () => {
  const diff = Math.max(0, new Date(data.weddingDate) - new Date());
  return {
    Hari: Math.floor(diff / 864e5),
    Jam: Math.floor(diff / 36e5) % 24,
    Menit: Math.floor(diff / 6e4) % 60,
    Detik: Math.floor(diff / 1e3) % 60,
  };
};

export default function Countdown() {
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="countdown">
      {Object.entries(t).map(([k, v]) => (
        <div key={k} className="cd-box">
          <b>{String(v).padStart(2, "0")}</b>
          <span>{k}</span>
        </div>
      ))}
    </div>
  );
}

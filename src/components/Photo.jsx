import { useState } from "react";

// Foto dengan fallback placeholder jika file belum ada
export default function Photo({ src, alt = "", className, style }) {
  const [err, setErr] = useState(false);
  return <img className={className} style={style} src={err ? "/images/placeholder.svg" : src} alt={alt} onError={() => setErr(true)} loading="lazy" />;
}

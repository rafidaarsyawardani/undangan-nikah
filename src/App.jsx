import { useEffect, useState } from "react";
import Cover from "./components/Cover";
import Hero from "./components/Hero";
import Couple from "./components/Couple";
import Events from "./components/Events";
import Story from "./components/Story";
import Gallery from "./components/Gallery";
import Wishes from "./components/Wishes";
import Closing from "./components/Closing";
import MusicButton from "./components/MusicButton";

export default function App() {
  // fase: "cover" -> "opening" (pintu terbuka, animasi otomatis) -> "open" (bisa scroll)
  const [phase, setPhase] = useState("cover");
  const opened = phase === "open";
  const playing = phase !== "cover";
  const startOpening = () => {
    setPhase("opening");
    setTimeout(() => setPhase("open"), 2800);
  };
  // Nama tamu dari link: https://situs-anda.com/?to=Budi+Santoso
  const guest = new URLSearchParams(window.location.search).get("to") || "Tamu Undangan";

  // Auto-scroll pelan seperti di video: mulai 2,5 detik setelah undangan dibuka.
  // Berhenti saat tamu menyentuh/scroll sendiri, bisa dilanjutkan lewat tombol.
  const [auto, setAuto] = useState(false);
  const SPEED = 45; // px per detik, ubah di sini untuk lebih cepat/lambat

  useEffect(() => {
    if (!opened) return;
    const t = setTimeout(() => setAuto(true), 2000);
    return () => clearTimeout(t);
  }, [opened]);

  useEffect(() => {
    if (!auto) return;
    let raf;
    let last = performance.now();
    let pos = window.scrollY;
    const step = (now) => {
      pos += SPEED * ((now - last) / 1000);
      last = now;
      window.scrollTo(0, Math.round(pos));
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (pos >= max) return setAuto(false);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    const stop = () => setAuto(false);
    const opt = { passive: true };
    window.addEventListener("wheel", stop, opt);
    window.addEventListener("touchstart", stop, opt);
    window.addEventListener("keydown", stop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", stop, opt);
      window.removeEventListener("touchstart", stop, opt);
      window.removeEventListener("keydown", stop);
    };
  }, [auto]);

  useEffect(() => {
    document.body.style.overflow = opened ? "auto" : "hidden";
    if (opened) window.scrollTo(0, 0);
  }, [opened]);

  return (
    <>
      {!opened && <Cover guest={guest} opening={phase === "opening"} onOpen={startOpening} />}
      <main className="app">
        <Hero play={playing} />
        <Couple />
        <Events />
        <Story />
        <Gallery />
        <Wishes guest={guest} />
        <Closing />
      </main>
      {opened && (
        <button className="music auto" onClick={() => setAuto((a) => !a)} aria-label="Auto scroll">
          {auto ? "❚❚" : "▼"}
        </button>
      )}
      <MusicButton play={playing} />
    </>
  );
}

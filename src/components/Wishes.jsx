import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { data } from "../config";
import Reveal from "./Reveal";
import { Float } from "./Parallax";

const KEY = "wishes-v1";

export default function Wishes({ guest }) {
  const [name, setName] = useState(guest === "Tamu Undangan" ? "" : guest);
  const [msg, setMsg] = useState("");
  const [att, setAtt] = useState("Hadir");
  const [list, setList] = useState([]);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    try { setList(JSON.parse(localStorage.getItem(KEY)) || []); } catch {}
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;
    const next = [{ id: Date.now(), name, msg, att }, ...list];
    setList(next);
    localStorage.setItem(KEY, JSON.stringify(next)); // demo: simpan di browser. Ganti dengan API/Firebase/Supabase untuk produksi
    setMsg("");
  };

  const copy = (n) => {
    navigator.clipboard?.writeText(n);
    setCopied(n);
    setTimeout(() => setCopied(""), 1800);
  };

  return (
    <section className="section rosewhite">
      <Float src="/images/flora-left.webp" depth={60} className="f-side l" />
      <div className="sec-in">
      <Reveal><h2 className="script title">Wedding Gift</h2></Reveal>
      {data.gifts.map((g) => (
        <Reveal key={g.number}>
          <div className="card light-card">
            <p className="strong">{g.bank}</p>
            <p className="acc">{g.number}</p>
            <p className="muted">a.n. {g.name}</p>
            <motion.button whileTap={{ scale: 0.95 }} className="btn small" onClick={() => copy(g.number)}>
              {copied === g.number ? "✓ Tersalin" : "Salin No. Rekening"}
            </motion.button>
          </div>
        </Reveal>
      ))}

      <Reveal><h2 className="script title" style={{ marginTop: 40 }}>RSVP & Ucapan</h2></Reveal>
      <Reveal>
        <form className="form" onSubmit={submit}>
          <input placeholder="Nama" value={name} onChange={(e) => setName(e.target.value)} />
          <textarea placeholder="Ucapan & doa" rows={4} value={msg} onChange={(e) => setMsg(e.target.value)} />
          <select value={att} onChange={(e) => setAtt(e.target.value)}>
            <option>Hadir</option><option>Tidak Hadir</option><option>Masih Ragu</option>
          </select>
          <motion.button whileTap={{ scale: 0.96 }} className="btn" type="submit">Kirim Ucapan</motion.button>
        </form>
      </Reveal>

      <div className="wish-list">
        <AnimatePresence initial={false}>
          {list.map((w) => (
            <motion.div key={w.id} layout initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="wish">
              <b>{w.name}</b> <span className="chip">{w.att}</span>
              <p>{w.msg}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      </div>
      <Float src="/images/flora-bottom.webp" depth={30} className="f-bottom" />
    </section>
  );
}

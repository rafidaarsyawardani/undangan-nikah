import { data } from "../config";
import Reveal from "./Reveal";
import { motion } from "motion/react";
import { ParallaxBg, Float } from "./Parallax";

export default function Events() {
  return (
    <section className="section rose">
      <ParallaxBg src="/images/frame.webp" position="center 30%" />
      <div className="veil rose-veil" />
      <Float src="/images/flora-left.webp" depth={70} className="f-side l" />
      <div className="sec-in">
        <Reveal><h2 className="script title white">Save The Date</h2></Reveal>
        {data.events.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.15}>
            <div className="card">
              <h3 className="script">{e.title}</h3>
              <p className="strong">{e.date}</p>
              <p>{e.time}</p>
              <p className="strong" style={{ marginTop: 12 }}>{e.place}</p>
              <p className="muted">{e.address}</p>
              <motion.a whileTap={{ scale: 0.95 }} className="btn small" href={e.map} target="_blank" rel="noreferrer">📍 Lihat Lokasi</motion.a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

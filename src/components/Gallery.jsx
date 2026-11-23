import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { data } from "../config";
import Reveal from "./Reveal";
import Photo from "./Photo";
import { Float } from "./Parallax";

export default function Gallery() {
  const [open, setOpen] = useState(null);
  return (
    <section className="section cream">
      <Float src="/images/flora-bottom.webp" depth={30} flip="y" className="f-bottom top" />
      <div className="sec-in">
      <Reveal><h2 className="script title">Gallery</h2></Reveal>
      <div className="grid">
        {data.gallery.map((src, i) => (
          <Reveal key={src} delay={(i % 2) * 0.12} scale={0.9} className={i % 3 === 0 ? "tall" : ""}>
            <motion.div whileTap={{ scale: 0.96 }} onClick={() => setOpen(src)} className="g-item">
              <Photo src={src} />
            </motion.div>
          </Reveal>
        ))}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.img src={open} onError={(e) => (e.currentTarget.src = "/images/placeholder.svg")} initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} />
          </motion.div>
        )}
      </AnimatePresence>
      </div>
      <Float src="/images/flora-bottom.webp" depth={30} className="f-bottom" />
    </section>
  );
}

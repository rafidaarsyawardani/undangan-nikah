import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { data } from "../config";
import Countdown from "./Countdown";
import { Petals } from "./Parallax";

// play = true begitu pintu cover mulai terbuka -> memicu animasi pembuka otomatis:
// kastil zoom-out -> bunga masuk dari kiri/kanan -> teks muncul -> pasangan berjalan masuk.
export default function Hero({ play }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // parallax saat scroll
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const leftX = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const rightX = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const coupleY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const ease = [0.22, 1, 0.36, 1];
  const show = (delay, dur = 1) => (play ? { opacity: 1, y: 0, transition: { delay, duration: dur, ease } } : {});

  return (
    <section className="hero" ref={ref}>
      <motion.div
        className="hero-bgwrap"
        initial={{ scale: 1.6 }}
        animate={{ scale: play ? 1 : 1.6 }}
        transition={{ duration: 3.6, ease }}
      >
        <motion.img src="/images/castle.webp" alt="" className="hero-bg" style={{ y: bgY, scale: bgScale }} />
      </motion.div>
      <div className="hero-fade" />

      <motion.div className="hero-layer" initial={{ x: "-70%", opacity: 0 }} animate={play ? { x: 0, opacity: 1 } : {}} transition={{ delay: 1.2, duration: 1.8, ease }}>
        <motion.img src="/images/flora-left.webp" alt="" className="hero-flora l" style={{ x: leftX }} />
      </motion.div>
      <motion.div className="hero-layer" initial={{ x: "70%", opacity: 0 }} animate={play ? { x: 0, opacity: 1 } : {}} transition={{ delay: 1.2, duration: 1.8, ease }}>
        <motion.img src="/images/flora-left.webp" alt="" className="hero-flora r" style={{ x: rightX, scaleX: -1 }} />
      </motion.div>

      {play && <Petals />}

      <motion.div className="hero-text" style={{ y: textY, opacity: textOpacity }}>
        <motion.p className="script small" initial={{ opacity: 0, y: 20 }} animate={show(2.0)}>The Wedding Of</motion.p>
        <motion.h1 className="names big" initial={{ opacity: 0, y: 30 }} animate={show(2.3, 1.2)}>
          {data.groom.nick}
          <span className="amp">&</span>
          {data.bride.nick}
        </motion.h1>
        <motion.p className="date" initial={{ opacity: 0, y: 20 }} animate={show(2.9)}>
          {new Date(data.weddingDate).toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" }).replaceAll("/", " . ")}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={show(3.2)}>
          <Countdown />
        </motion.div>
      </motion.div>

      <motion.div className="hero-layer couple-layer" initial={{ opacity: 0, y: 120 }} animate={show(2.2, 1.8)}>
        <motion.img src="/images/couple-walk.webp" alt="" className="hero-couple" style={{ y: coupleY }} />
      </motion.div>
    </section>
  );
}

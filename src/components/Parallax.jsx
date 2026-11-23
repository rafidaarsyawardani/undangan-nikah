import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

// Gambar latar yang bergeser lebih lambat dari scroll (efek parallax)
export function ParallaxBg({ src, range = 10, position = "center", className = "", style }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`]);
  return (
    <div ref={ref} className={`px-wrap ${className}`} style={style}>
      <motion.img src={src} alt="" className="px-img" style={{ y, objectPosition: position }} />
    </div>
  );
}

// Elemen dekorasi (bunga, dll) yang melayang berbeda kecepatan saat scroll.
// depth positif = bergerak naik lebih cepat (terasa di depan), negatif = lebih lambat (terasa di belakang)
export function Float({ src, depth = 60, className = "", style, rotate = 0, flip = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [depth, -depth]);
  const r = useTransform(scrollYProgress, [0, 1], [-rotate, rotate]);
  return <motion.img ref={ref} src={src} alt="" className={`float ${className}`} style={{ y, rotate: r, scaleX: flip.includes("x") ? -1 : 1, scaleY: flip.includes("y") ? -1 : 1, ...style }} />;
}

// Kelopak yang jatuh pelan (ambient)
const PETALS = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 73) % 100,
  size: 8 + ((i * 5) % 10),
  dur: 9 + ((i * 7) % 8),
  delay: -((i * 3) % 12),
  sway: 20 + ((i * 11) % 40),
}));

export function Petals() {
  return (
    <div className="petals" aria-hidden>
      {PETALS.map((p, i) => (
        <motion.span
          key={i}
          className="petal"
          style={{ left: `${p.left}%`, width: p.size, height: p.size * 1.3 }}
          initial={{ y: "-10vh", opacity: 0 }}
          animate={{ y: "110vh", x: [0, p.sway, -p.sway, 0], rotate: [0, 180, 360], opacity: [0, 0.9, 0.9, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

import { motion } from "motion/react";

// Pembungkus animasi muncul saat di-scroll
export default function Reveal({ children, delay = 0, y = 40, x = 0, scale = 1, className, style }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y, x, scale: scale === 1 ? 1 : 0.85 }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

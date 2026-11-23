import { motion } from "motion/react";
import { data } from "../config";
import { Petals } from "./Parallax";

// Cover berupa "pintu" kembar. Saat tombol ditekan (opening = true):
// isi cover memudar -> pintu terbelah ke kiri & kanan membawa bunga -> kastil di belakangnya terlihat.
const DOOR = { duration: 2, ease: [0.76, 0, 0.24, 1], delay: 0.55 };

export default function Cover({ guest, opening, onOpen }) {
  return (
    <section className="cover">
      <motion.div
        className="cover-stage"
        initial={{ scale: 1.2 }}
        animate={{ scale: opening ? 1.12 : 1 }}
        transition={opening ? { duration: 2.6, ease: "easeInOut" } : { duration: 2.8, ease: "easeOut" }}
      >
        <motion.div className="door l" animate={{ x: opening ? "-104%" : "0%" }} transition={DOOR}>
          <img src="/images/frame.webp" alt="" className="door-img" />
          <motion.img
            src="/images/flora-left.webp" alt="" className="door-flora"
            style={{ scaleX: -1 }}
            animate={{ opacity: opening ? 1 : 0 }} transition={{ duration: 0.4, delay: 0.25 }}
          />
        </motion.div>
        <motion.div className="door r" animate={{ x: opening ? "104%" : "0%" }} transition={DOOR}>
          <img src="/images/frame.webp" alt="" className="door-img" />
          <motion.img
            src="/images/flora-left.webp" alt="" className="door-flora"
            animate={{ opacity: opening ? 1 : 0 }} transition={{ duration: 0.4, delay: 0.25 }}
          />
        </motion.div>
      </motion.div>

      {!opening && <Petals />}

      <motion.div
        className="cover-center"
        animate={{ opacity: opening ? 0 : 1, scale: opening ? 0.92 : 1 }}
        transition={{ duration: 0.5 }}
        style={{ pointerEvents: opening ? "none" : "auto" }}
      >
        <motion.p className="script small" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9 }}>
          The Wedding Of
        </motion.p>
        <motion.img
          src="/images/couple-pose.webp" alt="" className="cover-couple"
          initial={{ opacity: 0, scale: 0.85, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.8, duration: 1 }}
        />
        <motion.h1 className="names" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}>
          {data.groom.nick} <span className="amp">&</span> {data.bride.nick}
        </motion.h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          <p className="muted">Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <p className="guest">{guest}</p>
          <p className="tiny">Mohon maaf apabila ada kesalahan penulisan nama dan gelar</p>
          <motion.button className="btn" whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }} onClick={onOpen}>
            ✉ Buka Undangan
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

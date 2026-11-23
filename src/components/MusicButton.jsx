import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { data } from "../config";

export default function MusicButton({ play }) {
  const audio = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (play && audio.current) audio.current.play().then(() => setOn(true)).catch(() => {});
  }, [play]);

  const toggle = () => {
    if (!audio.current) return;
    on ? audio.current.pause() : audio.current.play().catch(() => {});
    setOn(!on);
  };

  return (
    <>
      <audio ref={audio} src={data.music} loop />
      <motion.button className="music" onClick={toggle} animate={{ rotate: on ? 360 : 0 }} transition={on ? { repeat: Infinity, duration: 6, ease: "linear" } : {}}>
        {on ? "♫" : "♪"}
      </motion.button>
    </>
  );
}

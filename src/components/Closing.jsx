import { data } from "../config";
import Reveal from "./Reveal";
import { motion } from "motion/react";
import { ParallaxBg, Float, Petals } from "./Parallax";

export default function Closing() {
  return (
    <section className="section closing">
      <ParallaxBg src="/images/castle.webp" position="center 20%" />
      <div className="veil closing-veil" />
      <Petals />
      <div className="sec-in">
        <Reveal><h2 className="script title">Terima Kasih</h2></Reveal>
        <Reveal delay={0.15}>
          <p className="muted center dark">Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.</p>
        </Reveal>
        <Reveal delay={0.3}><img src="/images/couple-walk.webp" alt="" className="closing-couple" /></Reveal>
        <Reveal delay={0.4}><p className="script" style={{ fontSize: 42, textAlign: "center", color: "var(--rose-d)" }}>{data.groom.nick} & {data.bride.nick}</p></Reveal>
      </div>
      <Float src="/images/flora-bottom.webp" depth={20} className="f-bottom" />
    </section>
  );
}

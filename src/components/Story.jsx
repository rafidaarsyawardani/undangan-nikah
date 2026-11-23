import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { data } from "../config";
import Reveal from "./Reveal";
import Photo from "./Photo";
import { Float } from "./Parallax";

export default function Story() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const h = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <section className="section deep" ref={ref}>
      <Float src="/images/corner.webp" depth={60} className="f-corner tl dim" />
      <Float src="/images/corner.webp" depth={-30} flip="xy" className="f-corner br dim" />
      <div className="sec-in">
      <Reveal><h2 className="script title white">Our Story</h2></Reveal>
      <div className="timeline">
        <div className="line-bg" />
        <motion.div className="line" style={{ scaleY: h, transformOrigin: "top" }} />
        {data.story.map((s, i) => (
          <Reveal key={s.title} y={50} className="story-item">
            <div className="dot" />
            <div className="frame"><Photo src={s.photo} alt={s.title} /></div>
            <p className="story-date">{s.date}</p>
            <h4>{s.title}</h4>
            <p className="story-text">{s.text}</p>
          </Reveal>
        ))}
      </div>
      </div>
    </section>
  );
}

import { data } from "../config";
import Reveal from "./Reveal";
import Photo from "./Photo";
import { ParallaxBg, Float } from "./Parallax";

function Person({ p, from }) {
  return (
    <Reveal x={from} className="person">
      <div className="arch-photo oval"><Photo src={p.photo} alt={p.nick} /></div>
      <h3 className="script">{p.nick}</h3>
      <p className="full">{p.full}</p>
      <p className="muted">{p.parents}</p>
    </Reveal>
  );
}

export default function Couple() {
  return (
    <section className="section cream">
      <ParallaxBg src="/images/garden.webp" />
      <div className="veil" />
      <Float src="/images/corner.webp" depth={50} className="f-corner tl" />
      <Float src="/images/corner.webp" depth={-40} flip="xy" className="f-corner br" />
      <div className="sec-in">
        <Reveal><h2 className="script title">Kedua Mempelai</h2></Reveal>
        <Reveal delay={0.1}>
          <p className="muted center">Assalamu'alaikum Warahmatullahi Wabarakatuh.<br />Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Dengan memohon rahmat dan ridho-Nya, kami mengundang Anda di hari bahagia kami.</p>
        </Reveal>
        <Person p={data.groom} from={-60} />
        <Reveal><span className="script amp-big">&</span></Reveal>
        <Person p={data.bride} from={60} />
        <Reveal><p className="ayat">“{data.ayat}”<br /><b>{data.ayatSrc}</b></p></Reveal>
      </div>
    </section>
  );
}

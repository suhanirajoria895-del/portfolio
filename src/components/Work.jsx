import { services } from "../data/projects.js";
import useReveal from "../hooks/useReveal.js";

export default function Work() {
  const ref = useReveal();
  return (
    <section id="work" className="work reveal" ref={ref}>
      <h2>
        Here are some of the <em>dreams</em> I've brought to life...
      </h2>
      <ul className="work-grid">
        {services.map((s) => (
          <li key={s.title}>
            <div className="work-img">
              <img src={s.image} alt="" loading="lazy" width="600" height="760" />
              {s.sticker && (
                <div className="sticker">
                  <p>{s.sticker}</p>
                </div>
              )}
            </div>
            <span>{s.title}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

import { tools } from "../data/projects.js";
import useReveal from "../hooks/useReveal.js";

export default function Tools() {
  const ref = useReveal();
  return (
    <section className="tools reveal" ref={ref}>
      <h2>I work with...</h2>
      <ul>
        {tools.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </section>
  );
}

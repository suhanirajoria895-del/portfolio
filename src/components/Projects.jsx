import { projects } from "../data/projects.js";
import useReveal from "../hooks/useReveal.js";

export default function Projects() {
  const ref = useReveal();
  return (
    <section id="projects" className="projects reveal" ref={ref}>
      <h2>What I'm making</h2>
      <div className="project-grid">
        {projects.map((p) => (
          <a className="project" href={p.link} key={p.title}>
            <img src={p.image} alt="" loading="lazy" width="900" height="600" />
            <h3>{p.title}</h3>
            <p>{p.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

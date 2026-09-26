import { projects } from "../data/projects.js";

export default function Projects() {
  return (
    <section id="projects">
      <h2>Projects</h2>
      <div className="grid">
        {projects.map((p) => (
          <article className="card" key={p.title}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <a href={p.link}>View project →</a>
          </article>
        ))}
      </div>
    </section>
  );
}

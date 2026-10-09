import useReveal from "../hooks/useReveal.js";

export default function Contact() {
  const ref = useReveal();
  return (
    <section id="contact" className="contact reveal" ref={ref}>
      <h2>Let's make something together.</h2>
      <a className="btn" href="mailto:suhanirajoria19@gmail.com">
        Work with me
      </a>
    </section>
  );
}

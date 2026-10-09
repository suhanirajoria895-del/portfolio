import Collage from "./components/Collage.jsx";
import Statement from "./components/Statement.jsx";
import Work from "./components/Work.jsx";
import Tools from "./components/Tools.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Collage />
      <main>
        <Statement />
        <Work />
        <Tools />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

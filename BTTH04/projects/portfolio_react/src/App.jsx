// Bài 4.1 — App compose tất cả components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { skills, socialLinks } from './data/portfolio';

function App() {
  return (
    <>
      <Header />
      <Hero name="Tiến Bảo" title="Sinh viên Kỹ thuật phần mềm — yêu thích Frontend & React" />
      <About />
      <Skills skills={skills} />
      <Portfolio />
      <Contact />
      <Footer socialLinks={socialLinks} />
    </>
  );
}

export default App;

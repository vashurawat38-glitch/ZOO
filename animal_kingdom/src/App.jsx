import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Animals from "./pages/Animals";
import Testimonials from "./pages/Testimonials";
import Stats from "./pages/Stats";
import FAQ from "./pages/FAQ";
import Tickets from "./pages/Tickets";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import Map from "./pages/Map";

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <Animals />
      <Testimonials />
      <Stats />
      <FAQ />
      <Map />        {/* ✅ New Map Section */}
      <Tickets />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;

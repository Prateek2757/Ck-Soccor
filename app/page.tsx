import GalleryUrl from "./archive/bring_form_db";
import AboutSection from "./component/Aboutsection/aboutsection";
import AnimatedTestimonialsDemo from "./component/CoachSection/coachsection";
 import ContactForm from "./component/contact form/ContactForm";

import Footer from "./component/Footer/fotter";
import Gallery from "./component/Gallery/gallery";
import Hero from "./component/Herosection/herosection";
import Header from "./component/Navbar/navbar";
import Index from "./component/TrainingProgram/training";
export default function page() {
  return (
    <div>
      <Header />
      <Hero />
      <AboutSection />
      <AnimatedTestimonialsDemo/>
      <Index/>
      <Gallery/>
      {/* <GalleryUrl/> */}
      <ContactForm/>
      {/* <Footer/> */}
    </div>
  );
}

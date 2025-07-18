import About from "./About";
import AllProducts from "./AllProducts/AllProducts";
import CallToAction from "./CallToAction";
import CarServicesShowcase from "./CarServiceShowcase";
import Features from "./Features";
import ServicesSection from "./ServicesSection/ServicesSection";
import Slider from "./Slider";
import Testimonials from "./Testimonials/Testimonials";
import Filter from "./Filter"
import SpotlightText from "./Spotlight";
import WhyChooseUs from "./WhyChooseUs";
import MarqueeText from "./Marquee";
const Home = () => {
    return (
        <div className="container barlow-regular">
            <Slider />
            <Filter/>
            <About />
            <WhyChooseUs/>
             <div className="h-24 flex items-center justify-center">
      <MarqueeText />
    </div>
            <ServicesSection />
            <CallToAction />
             <CarServicesShowcase/>
          
            <SpotlightText/>
            <Testimonials />
        </div>
    );
};

export default Home;

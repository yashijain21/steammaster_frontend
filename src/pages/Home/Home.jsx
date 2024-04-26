import About from "./About";
import CallToAction from "./CallToAction";
import ServicesSection from "./ServicesSection/ServicesSection";
import Slider from "./Slider";

const Home = () => {
    return (
        <div className="container mx-auto px-3 md:px-6">
            <Slider />
            <About />
            <ServicesSection />
            <CallToAction />
        </div>
    );
};

export default Home;

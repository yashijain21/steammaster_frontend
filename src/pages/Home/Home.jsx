import About from "./About";
import ServicesSection from "./ServicesSection/ServicesSection";
import Slider from "./Slider";

const Home = () => {
    return (
        <div className="container mx-auto px-3 md:px-6">
            <Slider />
            <About />
            <ServicesSection />
        </div>
    );
};

export default Home;

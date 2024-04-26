import About from "./About";
import AllProducts from "./AllProducts/AllProducts";
import CallToAction from "./CallToAction";
import Features from "./Features";
import ServicesSection from "./ServicesSection/ServicesSection";
import Slider from "./Slider";

const Home = () => {
    return (
        <div className="container mx-auto px-3 md:px-6">
            <Slider />
            <About />
            <ServicesSection />
            <CallToAction />
            <AllProducts />
            <Features />
        </div>
    );
};

export default Home;

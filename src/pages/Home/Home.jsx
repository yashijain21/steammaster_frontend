import About from "./About";
import AllProducts from "./AllProducts/AllProducts";
import CallToAction from "./CallToAction";
import Features from "./Features";
import ServicesSection from "./ServicesSection/ServicesSection";
import Slider from "./Slider";
import Testimonials from "./Testimonials/Testimonials";

const Home = () => {
    return (
        <div className="container mx-auto px-3 md:px-6">
            <Slider />
            <About />
            <ServicesSection />
            <CallToAction />
            <AllProducts />
            <Features />
            <Testimonials />
        </div>
    );
};

export default Home;

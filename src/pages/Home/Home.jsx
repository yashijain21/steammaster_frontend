import About from "./About";
import Slider from "./Slider";

const Home = () => {
    return (
        <div className="container mx-auto px-3 md:px-6">
            <Slider />
            <About />
        </div>
    );
};

export default Home;

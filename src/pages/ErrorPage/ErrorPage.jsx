import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const ErrorPage = () => {
    return (
        <>
            <Header />
            <div className="container mx-auto px-3 md:px-6 flex justify-center items-center py-10">
                <img src="/icons/404.svg" alt="404" />
            </div>
            <Footer />
        </>
    );
};

export default ErrorPage;

import "./PageTitle.css";
import PropTypes from "prop-types";

const PageTitle = ({ title, breadcrumb }) => {
    return (
        <div
            className="hero h-[200px] sm:h-[300px] rounded-xl overflow-hidden relative"
            style={{
                backgroundImage: "url(/images/checkout/checkout.png)",
            }}
        >
            <div className="h-full w-full bg-gradient-to-r from-[#151515] to-[#15151544]"></div>
            <div className="text-white w-full px-4 sm:px-10 md:pr-0 md:pl-20">
                <h4 className="text-4xl font-bold">{title}</h4>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 min-w-56 px-2 sm:px-7 trapezoid">
                    <p className="text-sm w-full sm:text-xl font-medium text-transparent">
                        Home/{breadcrumb}
                    </p>
                    <p className="text-sm w-full sm:text-xl font-medium absolute left-0 right-0 -bottom-9 sm:-bottom-10 text-center">
                        Home/{breadcrumb}
                    </p>
                </div>
            </div>
        </div>
    );
};

PageTitle.propTypes = {
    title: PropTypes.string.isRequired,
    breadcrumb: PropTypes.string.isRequired,
};

export default PageTitle;

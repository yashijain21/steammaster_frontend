import PropTypes from "prop-types";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";

const SingleService = ({ service }) => {
    return (
        <Link className="p-6 border border-gray-300 rounded-lg space-y-3">
            <div>
                <img
                    src={service.img}
                    alt={service.title}
                    className="max-h-72 sm:max-h-full sm:h-80 md:h-52 lg:h-48 xl:h-60 2xl:h-72 w-full"
                />
            </div>
            <div className="space-y-2">
                <h3 className="text-2xl font-bold">{service.title}</h3>
                <div className="text-primary flex items-center justify-between">
                    <h4 className="text-xl font-semibold">
                        Price : ${service.price}
                    </h4>
                    <IoIosArrowRoundForward size={30} />
                </div>
            </div>
        </Link>
    );
};

SingleService.propTypes = {
    service: PropTypes.object.isRequired,
};

export default SingleService;

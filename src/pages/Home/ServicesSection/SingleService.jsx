import PropTypes from "prop-types";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";

const SingleService = ({ service }) => {
    return (
        <Link
            to={`/service/${service._id}`}
            className="p-6 border border-gray-300 rounded-lg space-y-3 hover:shadow-lg transition"
        >
            <div>
                <img
                    src={service.image || "/images/placeholder.jpg"}
                    alt={service.name}
                    className="max-h-72 sm:max-h-full sm:h-80 md:h-52 lg:h-48 xl:h-60 2xl:h-72 w-full object-cover rounded-md"
                />
            </div>
            <div className="space-y-2">
                <h3 className="text-2xl font-bold">{service.name}</h3>
                <div className="text-primary flex items-center justify-between">
                    <h4 className="text-xl font-semibold">
                        Pris: {service.price} kr
                    </h4>
                    <IoIosArrowRoundForward size={30} />
                </div>
            </div>
        </Link>
    );
};

SingleService.propTypes = {
    service: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string,
        price: PropTypes.number.isRequired,
    }).isRequired,
};

export default SingleService;

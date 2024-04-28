import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SingleProduct = ({ product }) => {
    return (
        <Link
            to={`/product/${product._id}/checkout`}
            className="h-full border border-gray-300 p-5 rounded-lg space-y-4"
        >
            <div className="bg-[#F3F3F3] h-[350px] md:h-[300px] 2xl:h-[350px] flex justify-center items-center rounded-lg">
                <img
                    src={product.img}
                    alt={product.title}
                    className="max-w-xs w-11/12 sm:max-w-full sm:w-1/2 md:w-2/3"
                />
            </div>
            <div className="text-center space-y-2">
                <div className="rating">
                    <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                        checked
                    />
                </div>
                <h2 className="text-dark2 font-bold text-2xl">
                    {product.title}
                </h2>
                <p className="font-semibold text-xl text-primary">
                    &#36;{product.price}
                </p>
            </div>
        </Link>
    );
};

SingleProduct.propTypes = {
    product: PropTypes.object.isRequired,
};

export default SingleProduct;

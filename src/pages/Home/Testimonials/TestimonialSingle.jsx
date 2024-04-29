import PropTypes from "prop-types";

const TestimonialSingle = ({ testimonial }) => {
    return (
        <div className="border border-gray-200 p-8 sm:p-12 rounded-lg flex flex-col gap-4 relative">
            <img
                src="/icons/quote.svg"
                alt="quote"
                className="w-14 absolute right-6 top-14 sm:right-32 lg:right-20 xl:right-32 sm:top-12"
            />
            <div className="flex items-center gap-4">
                <div>
                    <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full"
                    />
                </div>
                <div>
                    <h3 className="text-dark2 font-bold text-2xl">
                        {testimonial.name}
                    </h3>
                    <p className="text-dark3 font-semibold text-xl">
                        {testimonial.designation}
                    </p>
                </div>
            </div>
            <p className="text-dark3 flex-grow">{testimonial.description}</p>
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
                />
            </div>
        </div>
    );
};

TestimonialSingle.propTypes = {
    testimonial: PropTypes.object.isRequired,
};

export default TestimonialSingle;

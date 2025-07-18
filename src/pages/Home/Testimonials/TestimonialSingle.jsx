import PropTypes from "prop-types";

const TestimonialSingle = ({ testimonial }) => {
    const getInitials = (name) => {
        if (!name) return "";
        const names = name.trim().split(" ");
        return names.map((n) => n[0].toUpperCase()).slice(0, 2).join("");
    };

    return (
        <div className="border border-gray-200 p-8 sm:p-12 rounded-lg flex flex-col gap-4 relative h-80 mx-2 barlow-regular">
            <img
                src="/icons/quote.svg"
                alt="quote"
                className="w-14 absolute right-6 top-14 sm:right-32 lg:right-20 xl:right-32 sm:top-12"
            />
            <div className="flex items-center gap-4">
                <div>
                    <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold barlow-regular">
                        {getInitials(testimonial.name)}
                    </div>
                </div>
                <div>
                    <h3 className="text-dark2 font-bold text-2xl barlow-regular">
                        {testimonial.name}
                    </h3>
                    <p className="text-dark3 font-semibold text-xl barlow-regular">
                        {testimonial.designation}
                    </p>
                </div>
            </div>
            <p className="text-dark3 flex-grow barlow-regular">{testimonial.description}</p>
            <div className="rating">
                <input
                    type="radio"
                    name={`rating-${testimonial._id}`}
                    className="mask mask-star-2 bg-orange-400"
                    defaultChecked
                />
                <input
                    type="radio"
                    name={`rating-${testimonial._id}`}
                    className="mask mask-star-2 bg-orange-400"
                    defaultChecked
                />
                <input
                    type="radio"
                    name={`rating-${testimonial._id}`}
                    className="mask mask-star-2 bg-orange-400"
                    defaultChecked
                />
                <input
                    type="radio"
                    name={`rating-${testimonial._id}`}
                    className="mask mask-star-2 bg-orange-400"
                    defaultChecked
                />
                <input
                    type="radio"
                    name={`rating-${testimonial._id}`}
                    className="mask mask-star-2 bg-orange-400"
                    defaultChecked
                />
            </div>
        </div>
    );
};

TestimonialSingle.propTypes = {
    testimonial: PropTypes.object.isRequired,
};

export default TestimonialSingle;

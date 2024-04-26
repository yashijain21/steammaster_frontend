import PropTypes from "prop-types";

const SectionTitle = ({ section, title, description }) => {
    return (
        <div className="space-y-4 text-center">
            <h4 className="font-bold text-xl text-primary">{section}</h4>
            <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
            <p className="w-2/3 mx-auto">{description}</p>
        </div>
    );
};

SectionTitle.propTypes = {
    section: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default SectionTitle;

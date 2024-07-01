import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
    return (
        <div className="min-h-[20vh] flex justify-center items-center">
            <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#403F3F"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

export default Loader;

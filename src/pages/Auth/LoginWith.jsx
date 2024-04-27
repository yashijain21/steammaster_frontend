import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import formatFirebaseError from "../../utils/formatFirebaseError";
import { Bounce, toast } from "react-toastify";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const LoginWith = ({ location }) => {
    const navigate = useNavigate();
    const { googleLogin, twitterLogin, githubLogin } = useContext(AuthContext);

    const successTost = (result) => {
        console.log(result.user);
        toast.success("Login Successful", {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
        // navigate
        location.state ? navigate(location.state) : navigate("/");
    };

    const errorTost = (err) => {
        console.log(err.message);
        const errorMessage = formatFirebaseError(err);
        toast.error(errorMessage, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    };

    const handleGoogle = () => {
        googleLogin()
            .then((result) => {
                successTost(result);
            })
            .catch((err) => {
                errorTost(err);
            });
    };

    const handleTwitter = () => {
        twitterLogin()
            .then((result) => {
                successTost(result);
            })
            .catch((err) => {
                errorTost(err);
            });
    };

    const handleGithub = () => {
        githubLogin()
            .then((result) => {
                successTost(result);
            })
            .catch((err) => {
                errorTost(err);
            });
    };

    return (
        <div className="flex gap-2 justify-center">
            <button
                onClick={handleGoogle}
                className="bg-[#F5F5F8] w-12 h-12 sm:w-14 sm:h-14 flex justify-center items-center rounded-full hover:bg-[#e8e8ec]"
            >
                <img
                    src="/icons/login/google.svg"
                    alt="google"
                    className="w-6 h-6 sm:w-7 sm:h-7"
                />
            </button>

            <button
                onClick={handleTwitter}
                className="bg-[#F5F5F8] w-12 h-12 sm:w-14 sm:h-14 flex justify-center items-center rounded-full hover:bg-[#e8e8ec]"
            >
                <img
                    src="/icons/login/twitter.svg"
                    alt="twitter"
                    className="w-6 h-6 sm:w-7 sm:h-7"
                />
            </button>
            <button
                onClick={handleGithub}
                className="bg-[#F5F5F8] w-12 h-12 sm:w-14 sm:h-14 flex justify-center items-center rounded-full hover:bg-[#e8e8ec]"
            >
                <img
                    src="/icons/login/github.svg"
                    alt="github"
                    className="w-6 h-6 sm:w-7 sm:h-7"
                />
            </button>
        </div>
    );
};

LoginWith.propTypes = {
    location: PropTypes.object.isRequired,
};

export default LoginWith;

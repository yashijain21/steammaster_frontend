import { Link } from "react-router-dom";

const Register = () => {
    const handleRegister = (e) => {
        e.preventDefault();
    };

    return (
        <div className="container mx-auto px-3 md:px-6 py-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center">
                <img
                    src="/images/login/login.svg"
                    alt="login"
                    className="mx-auto"
                />
            </div>
            <div className="border border-gray-200 rounded-lg px-4 py-10 sm:p-14 md:p-8 lg:p-12 xl:p-16 space-y-5">
                <h2 className="text-center font-semibold text-3xl sm:text-4xl">
                    Sign Up
                </h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-lg font-semibold text-gray-900 dark:text-white"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5  sm:y-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 py-3 sm:py-4 px-5"
                            placeholder="Your name"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-lg font-semibold text-gray-900 dark:text-white"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5  sm:y-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 py-3 sm:py-4 px-5"
                            placeholder="Your email"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-lg font-semibold text-gray-900 dark:text-white"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5  sm:y-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 py-3 sm:py-4 px-5"
                            placeholder="Your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-primary hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300  rounded-lg w-full px-5 py-3 sm:py-4 text-lg sm:text-xl font-semibold text-center  sm:d-700 dark:hover:bg-red-800 dark:focus:ring-red-800"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-dark2 font-medium">
                    Or Sign Up with
                </p>
                <div className="flex gap-2 justify-center">
                    <button className="bg-[#F5F5F8] w-12 h-12 sm:w-14 sm:h-14 flex justify-center items-center rounded-full hover:bg-[#e8e8ec]">
                        <img
                            src="/icons/login/facebook.svg"
                            alt="facebook"
                            className="w-6 h-6 sm:w-7 sm:h-7"
                        />
                    </button>
                    <button className="bg-[#F5F5F8] w-12 h-12 sm:w-14 sm:h-14 flex justify-center items-center rounded-full hover:bg-[#e8e8ec]">
                        <img
                            src="/icons/login/linkedin.svg"
                            alt="linkedin"
                            className="w-6 h-6 sm:w-7 sm:h-7"
                        />
                    </button>
                    <button className="bg-[#F5F5F8] w-12 h-12 sm:w-14 sm:h-14 flex justify-center items-center rounded-full hover:bg-[#e8e8ec]">
                        <img
                            src="/icons/login/google.svg"
                            alt="google"
                            className="w-6 h-6 sm:w-7 sm:h-7"
                        />
                    </button>
                </div>
                <p className="text-center text-[#737373]">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary font-semibold">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

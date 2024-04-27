import { Link, useNavigate } from "react-router-dom";
import LoginWith from "./LoginWith";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import formatFirebaseError from "../../utils/formatFirebaseError";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { createUser, updateInfo } = useContext(AuthContext);

    const handleRegister = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get("name");
        const email = form.get("email");
        const password = form.get("password");

        if (name === "") {
            setError("Please enter your name");
            return;
        } else if (email === "") {
            setError("Please enter your email address.");
            return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Invalid email");
            return;
        } else if (password === "") {
            setError("Please fill in the password");
            return;
        } else if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        } else if (!/[a-z]/.test(password) && !/[A-Z]/.test(password)) {
            setError("Password must contain at least one letter");
            return;
        } else if (!/[a-z]/.test(password)) {
            setError("Password must contain at least one lowercase letter");
            return;
        } else if (!/[A-Z]/.test(password)) {
            setError("Password must contain at least one uppercase letter");
            return;
        } else if (!/[0-9]/.test(password)) {
            setError("Password must contain at least one number");
            return;
        } else if (
            !/(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).*$/.test(password)
        ) {
            setError("Password must contain at least one special character");
            return;
        }
        setError(""); // clear the error message
        createUser(email, password)
            .then((result) => {
                const profile = {
                    displayName: name,
                };
                updateInfo(result.user, profile)
                    .then(() => {
                        console.log("profile updated", result.user);
                        navigate("/login");
                    })
                    .catch((error) => {
                        console.error(error.message);
                    });
            })
            .catch((err) => {
                setError(formatFirebaseError(err));
            });
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
                    <div className="mb-5 relative">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-lg font-semibold text-gray-900 dark:text-white"
                        >
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5  sm:y-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 py-3 sm:py-4 px-5"
                            placeholder="Your password"
                        />
                        <span
                            className="cursor-pointer absolute right-4 bottom-3 sm:bottom-4"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <IoEyeOff className="w-5 h-5" />
                            ) : (
                                <IoEye className="w-5 h-5" />
                            )}
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-primary hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300  rounded-lg w-full px-5 py-3 sm:py-4 text-lg sm:text-xl font-semibold text-center  sm:d-700 dark:hover:bg-red-800 dark:focus:ring-red-800"
                    >
                        Sign Up
                    </button>
                </form>
                {error && <p className="text-red-600 pt-2">{error}</p>}
                <p className="text-center text-dark2 font-medium">
                    Or Sign Up with
                </p>
                <LoginWith />
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

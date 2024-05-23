import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginWith from "./LoginWith";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from "react";
import formatFirebaseError from "../../utils/formatFirebaseError";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const emailRef = useRef();

    const { signInWithPassword, firebaseError, passwordReset } =
        useContext(AuthContext);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (firebaseError) {
            setError(formatFirebaseError(firebaseError));
        }
    }, [firebaseError]);

    const handleLogin = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get("email");
        const password = form.get("password");

        if (email === "") {
            setError("Please fill in the email address");
            return;
        } else if (!/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setError("Invalid email");
            return;
        } else if (password === "") {
            setError("Please fill in the password");
            return;
        }
        setError("");
        signInWithPassword(email, password)
            .then((result) => {
                console.log(result.user);
                if (!result.user.emailVerified) {
                    setError("Please verify your email");
                } else {
                    location.state ? navigate(location.state) : navigate("/");

                    toast.success("Login Successful");
                }
            })
            .catch((err) => {
                setError(formatFirebaseError(err));
            });
    };

    const handleForgotPass = () => {
        const email = emailRef.current.value;
        console.log(email);
        if (email === "") {
            setError("Please fill in the email address");
            return;
        } else if (!/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setError("Please enter a valid email address");
            return;
        }
        setError("");
        passwordReset(email)
            .then(() => {
                Swal.fire({
                    title: "Please check your email",
                    text: `Please check your ${email} for a link to reset your password.`,
                    imageUrl: "/images/email/mail.png",
                    imageWidth: 128,
                    imageHeight: 128,
                    imageAlt: "Email",
                });
            })
            .catch((err) => {
                console.log(err);
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
                    Login
                </h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-lg font-semibold text-gray-900 dark:text-white"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-grasm:y-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 py-3 sm:py-4 px-5"
                            placeholder="Your email"
                            ref={emailRef}
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
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-grasm:y-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 py-3 sm:py-4 px-5"
                            placeholder="Your password"
                        />
                        <span
                            className="cursor-pointer absolute right-4 bottom-11 sm:bottom-12"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <IoEyeOff className="w-5 h-5" />
                            ) : (
                                <IoEye className="w-5 h-5" />
                            )}
                        </span>
                        <label className="label">
                            <span
                                onClick={handleForgotPass}
                                className="label-text-alt link link-hover cursor-pointer"
                            >
                                Forgot password?
                            </span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-primary hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300  rounded-lg w-full px-5 py-3 sm:py-4 text-lg sm:text-xl font-semibold text-center dark:bg-resm:d-700 dark:hover:bg-red-800 dark:focus:ring-red-800"
                    >
                        Sign In
                    </button>
                </form>
                {error && <p className="text-red-600 pt-2">{error}</p>}
                <p className="text-center text-dark2 font-medium">
                    Or Sign In with
                </p>
                <LoginWith location={location} />
                <p className="text-center text-[#737373]">
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="text-primary font-semibold">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

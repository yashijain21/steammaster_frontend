import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import userDefaultPicture from "/images/login/user.png";
import { Bounce, toast } from "react-toastify";
import formatFirebaseError from "../../utils/formatFirebaseError";

const SingleNav = ({ pageTitle, path, setIsMobileMenuOpen }) => {
    return (
        <NavLink
            className={({ isActive }) =>
                isActive
                    ? "font-medium lg:font-semibold text-lg text-primary dark:text-primary"
                    : "font-medium lg:font-semibold text-lg text-[#444444] dark:text-gray-200"
            }
            to={path}
            onClick={() => setIsMobileMenuOpen(false)}
        >
            {pageTitle}
        </NavLink>
    );
};

const SingleScroll = ({ ScrollTitle, id, setIsMobileMenuOpen }) => {
    const navigate = useNavigate();
    const handleScroll = () => {
        navigate("/");
        setIsMobileMenuOpen(false);
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    duration: 500,
                    offset: 15,
                });
            } else {
                console.error(`Element with id ${id} not found`);
            }
        }, 150);
    };
    return (
        <button
            onClick={handleScroll}
            className="font-medium lg:font-semibold text-lg text-left text-[#444444] dark:text-gray-200 cursor-pointer"
        >
            {ScrollTitle}
        </button>
    );
};

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext);
    const dropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsMobileMenuOpen(false);
            }
        };
        if (isMobileMenuOpen) {
            document.addEventListener("click", handleClickOutside);
        }
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    const navLinks = (
        <>
            <SingleNav
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                pageTitle="Home"
                path="/"
            />
            <SingleScroll
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                id="services"
                ScrollTitle="Services"
            />
            <SingleScroll
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                id="products"
                ScrollTitle="Products"
            />
            <SingleScroll
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                id="about"
                ScrollTitle="About"
            />
            <SingleScroll
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                id="contact"
                ScrollTitle="Contact"
            />
            {user && (
                <div className="sm:hidden">
                    <SingleNav
                        setIsMobileMenuOpen={setIsMobileMenuOpen}
                        pageTitle="My Orders"
                        path="/orders"
                    />
                </div>
            )}
        </>
    );

    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log("LogOut successful");
                toast.success("LogOut Successful", {
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
            })
            .catch((err) => {
                console.error(err);
                toast.error(formatFirebaseError(err), {
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
            });
    };

    return (
        <div className="container mx-auto px-3 md:px-6 py-2">
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <Link to="/">
                        <img
                            className="w-20 sm:w-24"
                            src="/logo.svg"
                            alt="logo"
                        />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <nav className="flex gap-7">{navLinks}</nav>
                </div>
                <div className="navbar-end">
                    <div className="flex items-center gap-3 mr-4">
                        {user && (
                            <NavLink
                                to="/orders"
                                className={({ isActive }) =>
                                    isActive
                                        ? "font-semibold text-primary dark:text-primary hidden sm:block"
                                        : "font-semibold text-[#444444] dark:text-gray-200 hidden sm:block"
                                }
                            >
                                My Orders
                            </NavLink>
                        )}
                        <div
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User Image"
                                    src={
                                        user
                                            ? user.photoURL
                                                ? user.photoURL
                                                : userDefaultPicture
                                            : userDefaultPicture
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    {user ? (
                        <button
                            onClick={handleLogOut}
                            className="btn bg-transparent border border-primary text-primary hover:bg-primary hover:text-white transition-all md:px-5"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="btn bg-transparent border border-primary text-primary hover:bg-primary hover:text-white transition-all md:px-5"
                        >
                            Login
                        </Link>
                    )}

                    <div className="dropdown" ref={dropdownRef}>
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        {isMobileMenuOpen && (
                            <nav
                                tabIndex={0}
                                className="flex flex-col absolute right-0 mt-3 z-[1] p-4 gap-2 shadow bg-base-100 rounded-box w-52"
                            >
                                {navLinks}
                            </nav>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

SingleNav.propTypes = {
    pageTitle: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    setIsMobileMenuOpen: PropTypes.func.isRequired,
};

SingleScroll.propTypes = {
    ScrollTitle: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    setIsMobileMenuOpen: PropTypes.func.isRequired,
};

export default Header;

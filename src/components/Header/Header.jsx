import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SlHandbag } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";

const SingleNav = ({ pageTitle, path, setIsMobileMenuOpen }) => {
    return (
        <NavLink
            className={({ isActive }) =>
                isActive
                    ? "font-medium lg:font-semibold text-lg text-[#FF3811] dark:text-[#FF3811]"
                    : "font-medium lg:font-semibold text-lg text-[#444444] dark:text-gray-200"
            }
            to={path}
            onClick={() => setIsMobileMenuOpen(false)}
        >
            {pageTitle}
        </NavLink>
    );
};

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
            <SingleNav
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                pageTitle="About"
                path="/about"
            />
            <SingleNav
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                pageTitle="Services"
                path="/services"
            />
            <SingleNav
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                pageTitle="Contact"
                path="/contact"
            />
        </>
    );

    return (
        <div className="container mx-auto px-3 md:px-6 py-2">
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <Link to="/">
                        <img className="w-24" src="/logo.svg" alt="logo" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <nav className="flex gap-7">{navLinks}</nav>
                </div>
                <div className="navbar-end gap-1">
                    <div className="mr-4">
                        <button className="btn btn-ghost btn-circle">
                            <SlHandbag size={20} />
                        </button>
                        <button className="btn btn-ghost btn-circle">
                            <IoIosSearch size={20} />
                        </button>
                    </div>
                    <button className="btn bg-transparent border border-[#FF3811] text-[#FF3811] hover:bg-[#FF3811] hover:text-white transition-all px-5">
                        Appointment
                    </button>
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

export default Header;

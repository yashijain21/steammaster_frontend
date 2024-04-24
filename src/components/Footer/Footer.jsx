import { FaGoogle, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-[#151515]">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 text-center lg:text-left text-dark6 container mx-auto px-3 md:px-6 py-20">
                <aside className="space-y-3">
                    <div>
                        <Link>
                            <img
                                className="w-24 mx-auto lg:mx-0"
                                src="/logo-white.svg"
                                alt="logo"
                            />
                        </Link>
                    </div>
                    <p>
                        Edwin Diaz is a software and web technologies engineer,
                        a life coach trainer who is also a serial .
                    </p>
                    <div className="space-x-2">
                        <a
                            href="#"
                            className="bg-[#2d2d2d] hover:bg-[#535353] transition-all w-10 h-10 rounded-full inline-flex justify-center items-center"
                        >
                            <FaGoogle />
                        </a>
                        <a
                            href="#"
                            className="bg-[#2d2d2d] hover:bg-[#535353] transition-all w-10 h-10 rounded-full inline-flex justify-center items-center"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="#"
                            className="bg-[#2d2d2d] hover:bg-[#535353] transition-all w-10 h-10 rounded-full inline-flex justify-center items-center"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="#"
                            className="bg-[#2d2d2d] hover:bg-[#535353] transition-all w-10 h-10 rounded-full inline-flex justify-center items-center"
                        >
                            <FaLinkedin />
                        </a>
                    </div>
                </aside>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 col-span-3 ">
                    <nav className="flex flex-col gap-2 lg:ml-12">
                        <h6 className="font-semibold text-xl text-white mb-1">
                            About
                        </h6>
                        <Link to="/">Home</Link>
                        <Link to="/services">Service</Link>
                        <Link to="/contact">Contact</Link>
                    </nav>
                    <nav className="flex flex-col gap-2">
                        <h6 className="font-semibold text-xl text-white mb-1">
                            Company
                        </h6>
                        <Link>Why Car Doctor</Link>
                        <Link to="/about">About</Link>
                    </nav>
                    <nav className="flex flex-col gap-2">
                        <h6 className="font-semibold text-xl text-white mb-1">
                            Support
                        </h6>
                        <Link>Support Center</Link>
                        <Link>Feedback</Link>
                        <Link>Accessability</Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import { FaGoogle, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Footer = () => {
    return (
        <footer className="bg-[#151515] barlow-regular">
            <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-4 text-center lg:text-left text-dark6 container mx-auto px-3 md:px-6 py-20">
                <aside className="space-y-3 mb-6 lg:mb-0">
                    <div>
                        <Link to="/">
                            <img
                                className="w-24 mx-auto lg:mx-0"
                                src="/logo.png"
                                alt="Steam Master Logo"
                            />
                        </Link>
                    </div>
                    <p>
                        Steam Master är din pålitliga partner för professionell bilvård i Göteborg. Vi erbjuder tjänster av högsta kvalitet med fokus på detaljer, kundservice och hållbarhet.
                    </p>
                    <div className="space-x-2">
                        <a
                            href="https://www.google.com/search?q=steam+master+bilv%C3%A5rd+g%C3%B6teborg"
                            target="_blank"
                            rel="noopener noreferrer"
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
                            href="https://www.instagram.com/steammastergbg/"
                            target="_blank"
                            rel="noopener noreferrer"
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

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 col-span-3">
                    <nav className="flex flex-col gap-2 lg:ml-12">
                        <h6 className="font-semibold text-xl text-white mb-1">
                            Sidor
                        </h6>
                        <Link to="/">Start</Link>
                        <ScrollLink className="cursor-pointer" to="services">
                            Tjänster
                        </ScrollLink>
                        <ScrollLink className="cursor-pointer" to="contact">
                            Kontakt
                        </ScrollLink>
                    </nav>

                    <nav className="flex flex-col gap-2">
                        <h6 className="font-semibold text-xl text-white mb-1">
                            Företaget
                        </h6>
                        <Link to="/about">Om Oss</Link>
                        <ScrollLink className="cursor-pointer" to="why-us">
                            Varför Välja Oss
                        </ScrollLink>
                    </nav>

                    <nav className="flex flex-col gap-2">
                        <h6 className="font-semibold text-xl text-white mb-1">
                            Support
                        </h6>
                        <Link to="/support">Supportcenter</Link>
                        <Link to="/feedback">Lämna Feedback</Link>
                        <Link to="/accessibility">Tillgänglighet</Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

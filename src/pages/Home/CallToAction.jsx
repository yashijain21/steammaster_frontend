const CallToAction = () => {
    return (
        <div
            className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-5 px-6 md:px-10 lg:px-16 py-12 md:p-14 lg:py-16 xl:py-24 my-10 bg-[#151515] text-white rounded-xl"
            id="contact"
        >
            <div className="flex items-center justify-center md:justify-start gap-4">
                <div>
                    <img src="/icons/cta/calender.svg" alt="" />
                </div>
                <div>
                    <p className="font-medium">We are open saturday-thursday</p>
                    <h3 className="font-bold text-xl xl:text-2xl">
                        9:00 am - 10:00 pm
                    </h3>
                </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4">
                <div>
                    <img src="/icons/cta/phone.svg" alt="" />
                </div>
                <div>
                    <p className="font-medium">Have a question?</p>
                    <a
                        href="tel:+8801712885964"
                        className="font-bold text-xl xl:text-2xl"
                    >
                        +880 1712 885964
                    </a>
                </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4">
                <div>
                    <img src="/icons/cta/location.svg" alt="" />
                </div>
                <div>
                    <p className="font-medium">Need a repair? our address</p>
                    <a
                        href="https://maps.app.goo.gl/Gc2k2J4BXyEHCnZH8"
                        target="_blank"
                        className="font-bold text-xl xl:text-2xl"
                    >
                        East Mira Bazar, Sylhet
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CallToAction;

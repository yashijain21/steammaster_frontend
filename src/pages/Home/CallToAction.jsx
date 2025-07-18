const CallToAction = () => {
    return (
        <div
            className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-5 p-14 py-16 bg-[#151515] text-white rounded-xl barlow-regular"
            id="contact"
        >
            {/* Öppettider */}
            <div className="flex items-center justify-center md:justify-start gap-4">
                <div>
                    <img src="/icons/cta/calender.svg" alt="Kalenderikon" />
                </div>
                <div>
                    <p className="font-medium">Öppet måndag–lördag</p>
                    <h3 className="font-bold text-xl">
                        09:00 – 18:00
                    </h3>
                    <p className="text-sm text-gray-300">Söndag: Stängt</p>
                </div>
            </div>

            {/* Telefonnummer */}
            <div className="flex items-center justify-center md:justify-start gap-4">
                <div>
                    <img src="/icons/cta/phone.svg" alt="Telefonikon" />
                </div>
                <div>
                    <p className="font-medium">Har du en fråga?</p>
                    <a
                        href="tel:+46765566775"
                        className="font-bold text-xl "
                    >
                        +46 76 556 67 75
                    </a>
                </div>
            </div>

            {/* Adress */}
            <div className="flex items-center justify-center md:justify-start gap-4">
                <div>
                    <img src="/icons/cta/location.svg" alt="Platsikon" />
                </div>
                <div>
                    <p className="font-medium">Behöver du bilvård? Vår adress:</p>
                    <h3 className="font-bold text-xl ">
                        Bleckvarugatan 3, 417 07 Göteborg
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default CallToAction;

const About = () => {
    return (
        <div className="py-10" id="about">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex items-center">
                    <div className="relative pb-20 sm:h-[430px] md:h-[500px] lg:h-[330px] xl:h-[420px] 2xl:h-[500px]">
                        <img
                            src="/images/about_us/person.jpg"
                            className="w-4/5 rounded-lg shadow-2xl"
                        />
                        <img
                            src="/images/about_us/parts.jpg"
                            className="w-1/2 rounded-lg absolute right-0 top-1/2 sm:top-52 md:top-60 lg:top-40 xl:top-48 2xl:top-60 border-8 border-white"
                        />
                    </div>
                </div>
                <div className="space-y-5">
                    <h4 className="font-bold text-xl text-primary">About Us</h4>
                    <h1 className="text-4xl md:text-5xl font-bold">
                        We are qualified & of experience in this field
                    </h1>
                    <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form, by injected humour, or randomised words which
                        don&apos;t look even slightly believable.
                    </p>
                    <p>
                        the majority have suffered alteration in some form, by
                        injected humour, or randomised words which don&apos;t
                        look even slightly believable.
                    </p>
                    <button className="btn bg-primary text-white border-primary hover:bg-transparent hover:border-primary hover:text-primary px-7">
                        Get More Info
                    </button>
                </div>
            </div>
        </div>
    );
};

export default About;

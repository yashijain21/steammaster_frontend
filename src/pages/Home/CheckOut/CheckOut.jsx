import { useLoaderData, useLocation } from "react-router-dom";
import PageTitle from "../../../components/PageTitle/PageTitle";

const CheckOut = () => {
    const location = useLocation();
    const checkout = useLoaderData();
    return (
        <div className="container mx-auto px-3 md:px-6 space-y-10">
            <PageTitle
                title="Check Out"
                breadcrumb={`${
                    location.pathname.includes("service")
                        ? "Service"
                        : location.pathname.includes("product")
                        ? "Product"
                        : "Undefined"
                }/Check Out`}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 bg-[#F3F3F3] order-2 md:order-1 p-20 rounded-lg">
                    <form className="space-y-5">
                        
                    </form>
                </div>
                <div className="space-y-3 order-1 md:order-2">
                    <div className="rounded-xl overflow-hidden">
                        <img src={checkout.img} alt={checkout.title} />
                    </div>
                    <h2 className="text-3xl font-bold">{checkout.title}</h2>
                    <p className="text-xl font-semibold text-dark2">
                        Price : ${checkout.price}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;

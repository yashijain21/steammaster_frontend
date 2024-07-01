import SectionTitle from "../SectionTitle/SectionTitle";
import SingleProduct from "./SingleProduct";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/Loader/Loader";

const AllProducts = () => {
    const axiosSecure = useAxiosSecure();

    const { data: products, isPending } = useQuery({
        queryKey: ["home-products"],
        queryFn: async () => {
            const res = await axiosSecure.get("/products");
            return res.data;
        },
    });

    return (
        <div className="py-10 space-y-10" id="products">
            <SectionTitle
                section="Popular Products"
                title="Browse Our Products"
                description="the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. "
            />
            {!isPending ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products?.map((product) => (
                        <SingleProduct key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <Loader />
            )}
            <div className="text-center">
                <button className="btn bg-transparent border border-primary text-primary hover:bg-primary hover:text-white transition-all md:px-5">
                    More Products
                </button>
            </div>
        </div>
    );
};

export default AllProducts;

import { Link, NavLink, useLoaderData } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaStar, FaShieldAlt, FaClock } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const CategoryDetails = () => {
  const category = useLoaderData();
  const [allCategories, setAllCategories] = useState([]);
  const [services, setServices] = useState([]);
  const axios = useAxiosPublic();

  const isSubCategory = category?.parent !== null && category?.parent !== undefined;


  useEffect(() => {
    axios.get("/categories").then((res) => setAllCategories(res.data));
  }, [axios]);

  useEffect(() => {
    if (isSubCategory) {
      axios.get(`/services/category/${category._id?.$oid || category._id}`)
.then((res) => {
        setServices(res.data);
      });
    }
  }, [category, axios, isSubCategory]);

  return (
    <div className="bg-gray-50 min-h-screen barlow-regular">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={
            category.image ||
            "https://images.unsplash.com/photo-1603575448878-868a20723f5d?auto=format&fit=crop&w=2070&q=80"
          }
          alt={category.name}
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 barlow-regular">
            {category.name}
          </h1>
          <div className="flex items-center gap-4">
            <span className="bg-primary px-4 py-1 rounded-full text-white font-medium barlow-regular">
              Featured
            </span>
            <div className="flex items-center text-yellow-400">
              <FaStar className="mr-1" />
              <span className="text-white barlow-regular">
                4.8 (200+ reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Description */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-10  space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary barlow-bold">
            Möbeltvätt för företag som privatpersoner.
          </h2>
          <p className="text-lg barlow-regular">
            Vi på Steam Master hjälper både privat som företagskunder att
            djuprengöra och fräscha upp deras lösa som fasta möbler. 
            Fläckborttagning och dålig lukt borttagning är två av våra egenskaper.
          </p>
          <ul className="flex flex-col md:flex-row gap-4 text-primary font-semibold barlow-regular">
            <li className="flex items-center gap-2">✅ Modernt teknik</li>
            <li className="flex items-center gap-2">✅ Miljövänligt</li>
            <li className="flex items-center gap-2">✅ Nöjd kund-garanti</li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 m-5 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Category Info */}
          <div className="bg-white rounded-xl shadow-xl p-8 flex-1">
            <div className="flex flex-col md:flex-row gap-8 mb-12">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 barlow-bold">
                  Category Information
                </h2>
                <p className="text-secondary leading-relaxed barlow-regular">
                  {category.description}
                </p>
              </div>
              <div className="md:w-1/2">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent barlow-bold">
                    Why Choose Us
                  </h3>
                  <ul className="space-y-3 text-secondary">
                    <li className="flex items-start gap-3">
                      <FaShieldAlt className="text-primary mt-1 flex-shrink-0" />
                      <span className="barlow-regular">
                        Quality guaranteed across all services
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaClock className="text-primary mt-1 flex-shrink-0" />
                      <span className="barlow-regular">
                        Timely service delivery and support
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaStar className="text-primary mt-1 flex-shrink-0" />
                      <span className="barlow-regular">
                        Trusted by thousands of customers
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Subcategories Section */}
            {!isSubCategory && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 barlow-bold">
                  Våra Tjänsteområden inom {category.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allCategories
                    .filter((cat) => {
                      const parentId =
                        typeof cat.parent === "object" && cat.parent !== null
                          ? cat.parent.$oid || cat.parent.toString()
                          : cat.parent;
                      return parentId === category._id;
                    })
                    .map((sub) => (
                      <Link
                        key={sub._id}
                        to={`/category/${sub._id}`}
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                      >
                        <img
                          src={
                            sub.image ||
                            "https://via.placeholder.com/400x250?text=Service"
                          }
                          alt={sub.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-800 barlow-bold">
                            {sub.name}
                          </h3>
                          <p className="text-sm text-secondary mt-1 barlow-regular">
                            {sub.description?.slice(0, 80)}...
                          </p>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            )}

            {/* Services Section */}
           {isSubCategory && services.length > 0 && (
  <div className="mt-12">
    <h2 className="text-2xl font-bold text-gray-800 mb-4 barlow-bold">Tjänster</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <Link to={`/service/${service._id}`} key={service._id}>
          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-all">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{service.name}</h3>
            <p className="text-sm text-secondary mt-1">{service.description}</p>
            <div className="text-primary font-bold mt-2">{service.price} kr</div>
          </div>
        </Link>
      ))}
    </div>
  </div>
)}
          </div>

          {/* Sidebar - Other Categories */}
          <div className="lg:w-96 space-y-6">
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                Explore Other Categories
              </h3>
              <div className="space-y-4">
                {allCategories
                  .filter((cat) => cat.parent === null)
                  .map((item) => (
                    <NavLink
                      key={item._id}
                      to={`/category/${item._id}`}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-all"
                    >
                      <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                      </div>
                      <IoIosArrowForward className="text-secondary" />
                    </NavLink>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;

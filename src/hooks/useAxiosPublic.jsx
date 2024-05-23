import axios from "axios";

export const baseUrl = "https://car-doctor-server-orpin-one.vercel.app";
// export const baseUrl = "http://localhost:5000";

const axiosPublic = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;

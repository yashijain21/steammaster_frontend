import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
});

const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.response.use(
            (res) => {
                return res;
            },
            (err) => {
                console.log(err.response);
                if (err.response.status === 401) {
                    logOut()
                        .then(() => {
                            console.log("user not verified");
                        })
                        .catch((err) => {
                            console.log(err.message);
                        });
                }
                if (err.response.status === 403) {
                    navigate("/");
                }
            }
        );
    }, [logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;

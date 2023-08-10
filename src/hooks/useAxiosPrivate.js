import { axiosPrivate } from "api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useCookies } from "react-cookie";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const [cookies] = useCookies()

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      
        async (config) => {

          if (!config.headers["Authorization"]) {
            // @ts-ignore
            config.headers["Authorization"] = `Bearer ${cookies.get('accessToken')}`;
            // @ts-ignore
            config.headers["_id"] = `${cookies.get('userId')}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );
  
      const responseIntercept = axiosPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
          const prevRequest = error?.config;
          if (error?.response?.status === 403 && !prevRequest?.sent) {
            prevRequest.sent = true;
            const newToken =await refresh();
            prevRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return axiosPrivate(prevRequest);
          }
          return Promise.reject(error);
        }
      );
  
      return () => {
        axiosPrivate.interceptors.request.eject(requestIntercept);
        axiosPrivate.interceptors.response.eject(responseIntercept);
      }
  },[refresh])
      
  return axiosPrivate;
}


export default useAxiosPrivate
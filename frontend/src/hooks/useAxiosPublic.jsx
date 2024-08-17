// import axios from 'axios';
// import { useCookies } from 'react-cookie';

// const useAxiosPublic = () => {

//   const axiosInstance = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
//   });

//   return axiosInstance;
// };

// export default useAxiosPublic;

// hooks/useAxiosPublic.js
import axios from 'axios';

const useAxiosPublic = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // replace with your API base URL
    // other configurations if needede
  });

  return instance;
};

export default useAxiosPublic;

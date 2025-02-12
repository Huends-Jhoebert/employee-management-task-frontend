import axios from "axios";

const domain =
  import.meta.env.VITE_NODE_ENV === "production"
    ? import.meta.env.VITE_PROD_DOMAIN
    : import.meta.env.VITE_DEV_DOMAIN;

const UseAxios = async (method, url, data = {}, headers = {}) => {
  const response = await axios({
    method,
    url: `${domain}${url}`,
    data,
    headers,
  });

  return response.data;
};

export default UseAxios;

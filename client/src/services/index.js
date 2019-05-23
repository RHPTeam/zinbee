import axios from "axios";

export default () => {
  return axios.create( { baseURL: "http://localhost:8881/api/v1" } );
};

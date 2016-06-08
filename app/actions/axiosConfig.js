import axios from "axios";
export default axios.create(
  {
    baseURL: 'http://52.31.144.145/api/v1',
  }
)

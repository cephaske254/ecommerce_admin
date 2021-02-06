import axios from "axios";

export const apiGetPerformanceStats = () => {
  return axios.get("/order/stats/");
};

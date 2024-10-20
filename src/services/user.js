import api from "configs/api";
// if res is undefind return false instead of undefind.
const getProfile = () => api.get("/user/whoami").then((res) => res || false);
export { getProfile };

import { getCookie } from "utils/cookie";
import api from "configs/api";

const getNewToken = async () => {
  const refreshToken = getCookie("refreshToken");
  // refreshToken might be expired or not exist
  if (!refreshToken) return;
  try {
    const response = await api.post("/auth/check-refresh-token",{refreshToken});
    return { response };
  } catch (error) {
    return {error}
  }
};
export { getNewToken };

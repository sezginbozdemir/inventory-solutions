import { jwtDecode } from "jwt-decode";
export const isTokenExpired = (): boolean => {
  const token = localStorage.getItem("token");
  if (!token) {
    return true;
  }
  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    const isExpired = decodedToken.exp < currentTime;
    return isExpired;
  } catch (error) {
    return true;
  }
};

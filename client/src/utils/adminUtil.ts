import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
  role: string;
}

const isUserAdmin = (): boolean => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    return decodedToken.role === "admin";
  } catch (error) {
    return false;
  }
};

export default isUserAdmin;

import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
  id: string;
}

const userId = (): string | null => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    return decodedToken.id || null;
  } catch (error) {
    return null;
  }
};

export default userId;

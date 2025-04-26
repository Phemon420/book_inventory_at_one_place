import {jwtDecode} from "jwt-decode";

interface TokenPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

// Get token from cookie
function getTokenFromCookie(): string | null {
  const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
  return match ? match[2] : null;
}

export function getUserInfoFromToken(): TokenPayload | null {
  const token = getTokenFromCookie();
  console.log(token);
  if (!token) return null;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

import cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { sessionTokenCookiesName } from "./config";

/** Removes 'session_token' from localStorage */
export function removeSessionToken() {
  cookies.remove(sessionTokenCookiesName);
}

/** Checks for 'session' in cookies, takes jwt from it, parses and returns */
export function checkSessionToken() {
  const token = cookies.get(sessionTokenCookiesName);
  if (!token) {
    return null;
  }
  let decodedData;
  try {
    decodedData = jwtDecode(token);
  } catch (e) {
    removeSessionToken();
    return null;
  }
  return { token, decodedData };
}

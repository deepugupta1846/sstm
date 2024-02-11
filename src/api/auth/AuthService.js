import CookieHandler from "../CookieHandler";

const AuthService = {
  getAuthToken: () => {
    return CookieHandler.getCookie("sstm");
  },
  setAuthToken: (token) => {
    CookieHandler.setCookie("sstm", token);
  },

  logoutUser: () => {
    CookieHandler.eraseCookie("sstm");
  },
};

export default AuthService;

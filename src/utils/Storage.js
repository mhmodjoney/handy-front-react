export const TOKEN = "token-key";
export const USERNAME = "username-key";
export const EMAIL = "email-key";
export const BIRTH = "birth-key";
export const GENDER = "gender-key";

export const Login = (token, username, email, birth, gender) => {
  localStorage.setItem(TOKEN, token);
  localStorage.setItem(USERNAME, username);
  localStorage.setItem(EMAIL, email);
  localStorage.setItem(BIRTH, birth);
  localStorage.setItem(GENDER, gender);
};

export const Logout = () => {
  localStorage.setItem(TOKEN, null);
  localStorage.setItem(USERNAME, null);
  localStorage.setItem(EMAIL, null);
  localStorage.setItem(BIRTH, null);
  localStorage.setItem(GENDER, null);
};

export const getData = (key) => {
  return localStorage.getItem(key);
};

export const isLoggedIn = () => {
  return Boolean(getData(TOKEN));
};

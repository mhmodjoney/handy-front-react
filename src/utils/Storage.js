export const TOKEN = "token-key";
export const USERNAME = "username-key";
export const EMAIL = "email-key";
export const BIRTH = "birth-key";
export const GENDER = "gender-key";
export const ADMIN_TOKEN = "admin-token-key";
export const ADMIN_USERNAME = "admin-username-key";
export const ADMIN_EMAIL = "admin-email-key";
export const ADMIN_BIRTH = "admin-birth-key";
export const ADMIN_GENDER = "admin-gender-key";
export const ADMIN_STATE = "admin-state-key";
export const DATE_WRONG = "date_wrong";
export const Trys = "Trys";
export const loginerr = "loginerr";


export const Wrong_pass = (date, trys) => {
  localStorage.setItem(DATE_WRONG, date);
  localStorage.setItem(Trys, trys);
};

export const Rest_pass = () => {
  localStorage.setItem(DATE_WRONG, null);
  localStorage.setItem(Trys, null);
};


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

export const setData = (key, value) => {
  return localStorage.setItem(key, value);
};


export const adminLogin = (token, username, email, birth, gender, state) => {
  localStorage.setItem(ADMIN_TOKEN, token);
  localStorage.setItem(ADMIN_USERNAME, username);
  localStorage.setItem(ADMIN_EMAIL, email);
  localStorage.setItem(ADMIN_BIRTH, birth);
  localStorage.setItem(ADMIN_GENDER, gender);
  localStorage.setItem(ADMIN_STATE, state);
};

export const adminLogout = () => {
  localStorage.setItem(ADMIN_TOKEN, null);
  localStorage.setItem(ADMIN_USERNAME, null);
  localStorage.setItem(ADMIN_EMAIL, null);
  localStorage.setItem(ADMIN_BIRTH, null);
  localStorage.setItem(ADMIN_GENDER, null);
  localStorage.setItem(ADMIN_STATE, null);
};

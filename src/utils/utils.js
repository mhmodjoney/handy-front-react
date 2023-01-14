export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
export const validatePassword = (password) => {
  return String(password)
    .toLowerCase()
    .match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{12,}$/);
};

export const ParseDate = (date) => {
  const day = date._d.getDate();
  const month = date._d.getMonth() + 1;
  const year = date._d.getYear() + 1900;
  return `${day < 10 ? "0" : ""}${day}/${
    month < 10 ? "0" : ""
  }${month}/${year}`;
};

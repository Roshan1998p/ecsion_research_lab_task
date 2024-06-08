export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateAlphaNumeric = (e, length = 50) => {
  return (e.target.value = e.target.value
    .replace(/[^a-z0-9]/gi, "")
    .slice(0, length));
};

// getting the sessionStorage data
export const getAuthData = () => {
  const initialState = {
    isAuthenticatedAdmin: false,
    role: "",
    isAuthenticatedUser: false,
  };
  const sessionDetail = sessionStorage.getItem("sessionDetail") || initialState;
  return typeof sessionDetail == "string"
    ? JSON.parse(sessionDetail)
    : sessionDetail;
};

// storing the data
export const setAuthData = (obj) => {
  sessionStorage.setItem("sessionDetail", JSON.stringify(obj));
};

import { FIREBASE_APIKEY } from "../../constants/ApiKey";

export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/` +
        `accounts:signInWithPassword?key=${FIREBASE_APIKEY}`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const responseData = await response.json();

    dispatch({ type: SIGNUP });
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/` +
        `accounts:signUp?key=${FIREBASE_APIKEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const responseData = await response.json();

    dispatch({ type: SIGNUP });
  };
};

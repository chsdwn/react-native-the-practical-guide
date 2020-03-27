import { AsyncStorage } from "react-native";

import { FIREBASE_APIKEY } from "../../constants/ApiKey";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const authenticate = (userId, token) => {
  return { type: AUTHENTICATE, userId, token };
};

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
      const errorResponseData = await response.json();
      const errorId = errorResponseData.error.message;

      let message;

      switch (errorId) {
        case "EMAIL_NOT_FOUND":
          message = "This email not registered";
          throw new Error(message);
        case "INVALID_PASSWORD":
          message = "Your email or password wrong";
          throw new Error(message);
        case "USER_DISABLED":
          message = "This user is disabled";
          throw new Error(message);
        default:
          message = "Something went wrong";
          throw new Error(message);
      }
    }

    const responseData = await response.json();

    dispatch(authenticate(responseData.localId, responseData.idToken));

    const expirationDate = new Date(
      new Date().getTime() + parseInt(responseData.expiresIn) * 1000
    ).toISOString();
    saveDataToStorage(
      responseData.idToken,
      responseData.localId,
      expirationDate
    );
  };
};

export const logout = () => {
  return { type: LOGOUT };
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
      const errorResponseData = await response.json();
      const errorId = errorResponseData.error.message;

      let message;

      switch (errorId) {
        case "EMAIL_EXISTS":
          message = "This email already registered.";
          throw new Error(message);
        case "OPERATION_NOT_ALLOWED":
          message = "Authentication disabled.";
          throw new Error(message);
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          message = "Too many attempts in a short time. Try later.";
          throw new Error(message);
        default:
          message = "Something went wrong";
          throw new Error(message);
      }
    }

    const responseData = await response.json();

    dispatch(authenticate(responseData.localId, responseData.idToken));

    const expirationDate = new Date(
      new Date().getTime() + parseInt(responseData.expiresIn) * 1000
    ).toISOString();
    saveDataToStorage(
      responseData.idToken,
      responseData.localId,
      expirationDate
    );
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({ token, userId, expiryDate: expirationDate })
  );
};

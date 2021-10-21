import React from "react";

export const getAuthToken = () => {
  if (localStorage.token) {
    let auth = localStorage.token;
    if (auth) return auth;
    return false;
  }
  return false;
};

export const getUserData = () => {
  if (localStorage.user) {
    let user = JSON.parse(localStorage.user);
    if (user) return user;
    return false;
  }
  return false;
};

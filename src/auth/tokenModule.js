// src/auth/tokenModule.js
let _token = null;

export function getAccessTokenModule() {
  return _token;
}

export function setAccessTokenModule(token) {
  _token = token;
}
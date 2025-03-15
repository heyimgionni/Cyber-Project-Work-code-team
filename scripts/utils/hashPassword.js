// npm install crypto-js

import CryptoJS from "crypto-js";

function hashPassword(password) {
  // SHA1 -- trasforma input in una str di 40char , SHA1() restituisce un wordArrayy quindi usiamo toString(...)
  // usiamo toUpperCase perchè have you been pawned usa hash in MAIUSCOLO
  var hash = CryptoJS.SHA1(password).toString(CryptoJS.enc.Hex).toUpperCase();
  return hash;
}

export default hashPassword;

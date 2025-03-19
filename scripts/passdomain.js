// take the password and the domain
// converto to hash for some time
// make it HEX and the take the first 16 char of the hash

import CryptoJS, { enc, PBKDF2 } from "crypto-js";
import handleOverlayAnimation from "./utils/overlayMsg";

const masterInput = document.querySelector(".master input");
const domainInput = document.querySelector(".domain input");
const generateBtn = document.querySelector(".btn-generate");
const output = document.querySelector(".output p");
const overlay = document.querySelector(".overlay");
const overlayText = document.querySelector(".overlay p");

const isValidDomain = (domain) => {
  const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return domainRegex.test(domain);
};

const handleDeterministicHash = () => {
  const master = masterInput.value;
  let domain = domainInput.value.trim();

  try {
    // in case the doamin is a full url line www.netflix.com
    // let url = new URL(domain);
    // // this will extract only the domain
    // domain = url.hostname;
    domain = domain.replace(/^www\./, ""); // Remove 'www.'
    domain = domain.replace(/^http:\/\//, ""); // Remove 'http://'
    domain = domain.replace(/^https:\/\//, ""); // Remove 'https://'
  } catch (error) {
    if (!isValidDomain(domain)) {
      handleOverlayAnimation(overlay);
      overlayText.textContent = "❌ Insert a valid domain ( es netflix.com )";
      return;
    }
  }

  // convert the domain into base 64
  const encodedDomain = btoa(domain);
  // we could use SHA256 but it easier to brute force
  // we will use PBKDF2Hash
  // funzione che deriva una chiave sicura da una password
  // l'output sara 256(bit)/32(byte) -> puo essere anche piu o meno grande 128/32 o 512/32
  // iterazioni --> 10000 minimo 10000000 molto sicuro ma dipende dalla cpu
  let key = CryptoJS.PBKDF2(master, encodedDomain, {
    keySize: 256 / 32,
    iterations: 10000,
  });
  return key.toString(CryptoJS.enc.Hex).toUpperCase().slice(0, 16);
};

generateBtn.addEventListener("click", () => {
  if (masterInput.value && domainInput.value)
    output.textContent = handleDeterministicHash();
});

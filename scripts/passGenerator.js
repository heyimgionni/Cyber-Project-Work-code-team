import handleOverlayAnimation from "./utils/overlayMsg";

const generateBtn = document.querySelector("button");
const passwordOutput = document.querySelector(".password");
const copyBtn = document.querySelector(".copy");
const inputRange = document.querySelector(".range");
const overlay = document.querySelector(".overlay");
const overlayText = document.querySelector(".overlay p");

const handleGeneratePasswordPolicy = (n) => {
  const isLowerCheck = document.querySelector(".lower").checked;
  const isUpperCheck = document.querySelector(".upper").checked;
  const isDigitCheck = document.querySelector(".digit").checked;
  const isSpecialCheck = document.querySelector(".special").checked;

  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digit = "0123456789";
  const special = `!@#$%^&()_+-={}|:;"'<>.,?/`;
  let allCases = "";
  let password = [];

  if (isLowerCheck) {
    allCases += lower;
    password.push(lower[Math.floor(Math.random() * lower.length)]);
  }
  if (isUpperCheck) {
    allCases += upper;
    password.push(upper[Math.floor(Math.random() * upper.length)]);
  }
  if (isDigitCheck) {
    allCases += digit;
    password.push(digit[Math.floor(Math.random() * digit.length)]);
  }
  if (isSpecialCheck) {
    allCases += special;
    password.push(special[Math.floor(Math.random() * special.length)]);
  }
  if (!allCases) {
    passwordOutput.textContent =
      "⚠️ Please select at least one character type.";
    return;
  }

  // Fill the rest of the password length with random characters
  for (let i = password.length; i < n; i++) {
    password.push(allCases[Math.floor(Math.random() * allCases.length)]);
  }

  password = password
    .sort(() => Math.random() - 0.5) // Shuffle array randomly
    .join(""); // Join the array back to string

  passwordOutput.textContent = password;
};

const handleCopy = () => {
  const textToCopy = passwordOutput.textContent;
  navigator.clipboard.writeText(textToCopy);
};

generateBtn.addEventListener("click", () => {
  const len = Number(inputRange.value);
  handleGeneratePasswordPolicy(len);
});
copyBtn.addEventListener("click", () => {
  handleCopy();
  handleOverlayAnimation(overlay);
  overlayText.textContent = "✅ Password Copied To The clipboard";
});

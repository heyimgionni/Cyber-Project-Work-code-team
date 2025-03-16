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

  let password = "";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digit = "0123456789";
  const special = `!@#$%^&()_+-={}|:;"'<>.,?/`;
  let allCases = "";

  if (isLowerCheck) allCases += lower;
  if (isUpperCheck) allCases += upper;
  if (isDigitCheck) allCases += digit;
  if (isSpecialCheck) allCases += special;

  if (!allCases) {
    passwordOutput.textContent = "Please select at least one character type.";
    return;
  }

  for (let i = 0; i < n; i++) {
    password += allCases[Math.floor(Math.random() * allCases.length)];
  }

  password = password
    .split("") // Convert string to array
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

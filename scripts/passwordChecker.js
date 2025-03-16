import costrains from "./utils/constrains";
import levels from "./utils/level";
import fetchData from "./utils/fetchHYBP";
import gsap from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  const seePasswordBtn = document.querySelector(".input__zone i");
  const input = document.querySelector(".input__zone input");
  const listOfConditions = document.querySelectorAll(".conditions li");
  const entropyBtn = document.querySelector(".btn-entropy");
  const securityBar = document.querySelector(".security");
  const securityPar = document.querySelector(".security p");
  const checkBtn = document.querySelector(".btn-check");
  const overlay = document.querySelector(".overlay");
  const overlayText = document.querySelector(".overlay p");

  const handleVisibilityPassword = () => {
    const isVisible = seePasswordBtn.classList.contains("fa-eye");
    seePasswordBtn.classList.toggle("fa-eye", !isVisible);
    seePasswordBtn.classList.toggle("fa-eye-slash", isVisible);
    input.type = isVisible ? "text" : "password";
  };

  const handlePasswordValidation = () => {
    const password = input.value;
    costrains.forEach((condition, i) => {
      const listCondition = listOfConditions[i];
      const isValid = condition.regex.test(password);
      const icon = listCondition.querySelector("i");
      icon.classList.toggle("fa-times", !isValid);
      if (isValid) {
        icon.classList.remove("fa-circle");
        icon.classList.add("fa-check");
      }
    });
  };

  const calculateSetChar = (password) => {
    let hasLower = false;
    let hasUpper = false;
    let hasDigits = false;
    let hasSpecial = false;
    let charForEntropy = 0;
    const reLower = /[a-z]/;
    const reUpper = /[A-Z]/;
    const reDigits = /\d/;
    const reSpecial = /[!@#$%^&*(),.?":{}|<>]/;

    for (let letter of password) {
      if (reLower.test(letter)) hasLower = true;
      if (reUpper.test(letter)) hasUpper = true;
      if (reDigits.test(letter)) hasDigits = true;
      if (reSpecial.test(letter)) hasSpecial = true;
    }
    hasLower ? (charForEntropy += 26) : null;
    hasUpper ? (charForEntropy += 26) : null;
    hasDigits ? (charForEntropy += 10) : null;
    hasSpecial ? (charForEntropy += 32) : null;
    return charForEntropy || 1;
  };

  const handleCalculationEntropy = () => {
    const password = input.value;
    const lenPass = password.length;
    const set = calculateSetChar(password);
    let entropy = Math.floor(lenPass * Math.log2(set));
    return entropy;
  };

  const handleSecurityBar = () => {
    const entropy = handleCalculationEntropy();
    const level = levels.find((l) => entropy <= l.max);
    securityPar.innerHTML = level.text;
    securityBar.style.width = level.width;
    securityBar.style.backgroundColor = level.color;
    securityPar.style.color = level.color;
  };

  seePasswordBtn.addEventListener("click", handleVisibilityPassword);
  input.addEventListener("input", () => {
    handlePasswordValidation();
    handleSecurityBar();
  });
  entropyBtn.addEventListener("click", handleCalculationEntropy);
  checkBtn.addEventListener("click", () => {
    const password = input.value;
    const tl = gsap.timeline();
    gsap.set(overlay, { display: "none", y: -100 });
    if (password) {
      tl.to(overlay, {
        display: "block",
        opacity: 1,
        y: 0,
      }).to(overlay, {
        delay: 2,
        y: -100,
        opacity: 0,
        display: "none",
      });
    }
    // dobbiamo usare o una funzione async await oppure una then() perche
    // altrimenti ritorna una oggetto promise
    fetchData(password)
      .then((found) => {
        if (password) {
          overlayText.textContent = found
            ? "⚠️ Password has been found in data breaches!"
            : "✅ Password is safe to use.";
        } else {
          return;
        }
      })
      .catch((error) => {
        overlayText.textContent =
          "❌ Error checking password. Please try again.";
        console.error(error);
      });
  });
});

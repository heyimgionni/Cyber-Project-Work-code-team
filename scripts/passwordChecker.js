import costrains from "./utils/constrains";
import levels from "./utils/level";
import fetchData from "./utils/fetchHYBP";
import handleOverlayAnimation from "./utils/overlayMsg";
import handleTime from "./utils/handleTIme";
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
  const entropyBox = document.querySelector(".entropy__box");

  const handleVisibilityPassword = () => {
    const isVisible = seePasswordBtn.classList.contains("fa-eye");
    seePasswordBtn.classList.toggle("fa-eye", !isVisible);
    seePasswordBtn.classList.toggle("fa-eye-slash", isVisible);
    input.type = isVisible ? "password" : "text";
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

  const handleCalculationEntropy = () => {
    const password = input.value;
    const lenPass = password.length;
    let charSet = 0;

    if (/[a-z]/.test(password)) charSet += 26; // Lettere minuscole
    if (/[A-Z]/.test(password)) charSet += 26; // Lettere maiuscole
    if (/[0-9]/.test(password)) charSet += 10; // Numeri
    if (/[^a-zA-Z0-9]/.test(password)) charSet += 32; // Simbolo standard ASCII

    if (charSet === 0) return 0;
    let entropy = Math.floor(lenPass * Math.log2(charSet));
    return entropy;
  };

  const handleTimeToCrack = (entropy, attemps) => {
    /*
      come funziona l'entropia 
      totaleCombinazioni  = 2 alla entrpia n
      un attaccante in forza bruta ci impiega una media di totale / 2
      e per stimare il tempo si calcola mediaTentativi / tentativiPerSecondi
    */
    let totalCombination = Math.pow(2, entropy);
    let avgAttemps = totalCombination / 2;
    let time = avgAttemps / attemps;

    return handleTime(time);
  };

  const handleSecurityBar = () => {
    const entropy = handleCalculationEntropy();
    // .find(l (of levels) => cb of entropy minore uguale a l.max)
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
  entropyBtn.addEventListener("click", () => {
    const entropy = handleCalculationEntropy();
    let combination = {
      "PC Normale": handleTimeToCrack(entropy, 10 ** 6),
      "GPU Avanzata ( Aka Per Ricchi ) ": handleTimeToCrack(entropy, 10 ** 9),
      SuperComputer: handleTimeToCrack(entropy, 10 ** 12),
    };

    let messageEntropy = `
      <div class="entropy__container">
        <p><strong>Entropy: ${entropy}</strong></p>
        <ul>
          <li>PC NORMALE : ${combination["PC Normale"]}</li>
          <li>GPU AVANZATA : ${combination["GPU Avanzata ( Aka Per Ricchi ) "]}</li>
          <li>SUPERCOMPUTER : ${combination["SuperComputer"]}</li>
        </ul>
        <img class="close" src="./assets/x.svg" alt="close button" />
      </div>
    `;
    gsap.to(entropyBox, { display: "block", ease: "power1.inOut" });
    entropyBox.innerHTML = messageEntropy;
    const close = document.querySelector(".entropy__box .close");
    if (close) {
      close.addEventListener("click", () => {
        gsap.to(entropyBox, { display: "none" });
      });
    }
  });
  checkBtn.addEventListener("click", () => {
    const password = input.value;
    if (password) handleOverlayAnimation(overlay);
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

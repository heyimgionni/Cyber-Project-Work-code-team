import word from "./utils/word";

const input = document.querySelector(".input__zone input");
const output = document.querySelector(".output");
const btnGenerate = document.querySelector(".btn__generate");

const handleGenerataion = (n) => {
  let arrPhrases = [];
  let len = word.length;
  for (let i = 0; i < n; i++) {
    arrPhrases.push(word[Math.floor(Math.random() * len)]);
  }
  output.innerHTML = "";
  output.innerHTML = `<p class="phrase">${arrPhrases.join("-")}</p>`;
};

btnGenerate.addEventListener("click", () => {
  handleGenerataion(Number(input.value));
});

import hashPassword from "./hashPassword";

async function fetchData(password) {
  const hash = hashPassword(password);
  var prefix = hash.slice(0, 5);
  var suffix = hash.slice(5);

  try {
    const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    // we use .text() and not .json() because the response is not a json file
    const txt = await res.text();
    // txt.split("\n") --> divide il fetch in linee
    // .some() metodo array che controlla se almeno un elemento soddisfa una condizione
    // line.split(":")[0] --> parte sinistra hash da confrontare parte destra n volte trovate
    const found = txt.split("\n").some((line) => line.split(":")[0] === suffix);
    return found;
  } catch (error) {
    console.error("Error fetching data ...", error);
    return false;
  }
}

export default fetchData;

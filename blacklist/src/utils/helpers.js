export function focusOnFirstError() {
  const firstErrorInput = document.querySelector(".is-danger");
  if (!firstErrorInput) {
    return;
  }
  setTimeout(() => {
    firstErrorInput.scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
    firstErrorInput.focus({ preventScroll: true });
  }, 150);
}

export function getUnitsDeclension(val, titles) {
  const cases = [2, 0, 1, 1, 1, 2];
  const number = Math.abs(val);
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
}

export function translitText(str) {
  const keys = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "e",
    ж: "j",
    з: "z",
    и: "i",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "c",
    ч: "ch",
    ш: "sh",
    ь: "",
    ы: "y",
    э: "e",
    ю: "u",
    я: "ya",
    щ: "shch",
    ъ: "",
    " ": "-",
    ".": "-"
  };

  return str
    .toLowerCase()
    .split("")
    .map(char => (typeof keys[char] === "undefined" ? char : keys[char]))
    .join("");
}

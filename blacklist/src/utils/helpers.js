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

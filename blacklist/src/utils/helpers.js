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

export function setNoActiveButton() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((btn) => btn.classList.remove("selected"));
}
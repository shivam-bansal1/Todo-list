export function setNoActiveButton() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((btn) => btn.classList.remove("selected"));
}

export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
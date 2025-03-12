document.addEventListener("DOMContentLoaded", function () {
    const motherboardSelection = document.getElementById("motherboard-selection");
    const motherboardButton = document.getElementById("motherboard-button");
    const motherboardLink = document.getElementById("motherboard-link");

    const selectedmotherboard = localStorage.getItem("selectedmotherboard");

    if (selectedmotherboard) {
        motherboardSelection.innerText = selectedmotherboard;

        motherboardButton.innerText = "-";
        motherboardButton.classList.remove("add-button");
        motherboardButton.classList.add("remove-button");

        motherboardLink.removeAttribute("href");

        motherboardButton.onclick = function () {
            localStorage.removeItem("selectedmotherboard");
            motherboardSelection.innerText = "Select Motherboard";
            motherboardButton.innerText = "+";
            motherboardButton.classList.remove("remove-button");
            motherboardButton.classList.add("add-button");
            motherboardLink.setAttribute("href", "/motherboard");
        };
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const psuSelection = document.getElementById("psu-selection");
    const psuButton = document.getElementById("psu-button");
    const psuLink = document.getElementById("psu-link");

    const selectedPsu = localStorage.getItem("selectedPsu");

    if (selectedPsu) {
        psuSelection.innerText = selectedPsu;

        psuButton.innerText = "-";
        psuButton.classList.remove("add-button");
        psuButton.classList.add("remove-button");

        psuLink.removeAttribute("href");

        psuButton.onclick = function () {
            localStorage.removeItem("selectedPsu");
            psuSelection.innerText = "Select PowerSupply";
            psuButton.innerText = "+";
            psuButton.classList.remove("remove-button");
            psuButton.classList.add("add-button");
            psuLink.setAttribute("href", "/powersupply");
        };
    }
});
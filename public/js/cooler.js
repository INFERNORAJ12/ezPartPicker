document.addEventListener("DOMContentLoaded", function () {
    const coolerSelection = document.getElementById("cooler-selection");
    const coolerButton = document.getElementById("cooler-button");
    const coolerLink = document.getElementById("cooler-link");

    const selectedcooler = localStorage.getItem("selectedcooler");

    if (selectedcooler) {
        coolerSelection.innerText = selectedcooler;

        coolerButton.innerText = "-";
        coolerButton.classList.remove("add-button");
        coolerButton.classList.add("remove-button");

        coolerLink.removeAttribute("href");

        coolerButton.onclick = function () {
            localStorage.removeItem("selectedcooler");
            coolerSelection.innerText = "Select Cooler";
            coolerButton.innerText = "+";
            coolerButton.classList.remove("remove-button");
            coolerButton.classList.add("add-button");
            coolerLink.setAttribute("href", "/cooler");
        };
    }
});
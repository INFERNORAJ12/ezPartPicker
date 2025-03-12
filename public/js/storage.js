document.addEventListener("DOMContentLoaded", function () {
    const storageSelection = document.getElementById("storage-selection");
    const storageButton = document.getElementById("storage-button");
    const storageLink = document.getElementById("storage-link");

    const selectedstorage = localStorage.getItem("selectedstorage");

    if (selectedstorage) {
        storageSelection.innerText = selectedstorage;

        storageButton.innerText = "-";
        storageButton.classList.remove("add-button");
        storageButton.classList.add("remove-button");

        storageLink.removeAttribute("href");

        storageButton.onclick = function () {
            localStorage.removeItem("selectedstorage");
            storageSelection.innerText = "Select SSD";
            storageButton.innerText = "+";
            storageButton.classList.remove("remove-button");
            storageButton.classList.add("add-button");
            storageLink.setAttribute("href", "/storage");
        };
    }
});
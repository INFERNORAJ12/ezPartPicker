document.addEventListener("DOMContentLoaded", function () {
    const storageSelection = document.getElementById("storage-selection");
    const storageButton = document.getElementById("storage-button");
    const storageLink = document.getElementById("storage-link");

    const selectedstorage = localStorage.getItem("selectedstorage");
    const selectedstoragePrice = localStorage.getItem("selectedstoragePrice");

    if (selectedstorage && selectedstoragePrice) {
        storageSelection.innerText = `${selectedstorage} - $${selectedstoragePrice}`;

        storageButton.innerText = "-";
        storageButton.classList.remove("add-button");
        storageButton.classList.add("remove-button");

        storageLink.removeAttribute("href");

        storageButton.onclick = function () {
            localStorage.removeItem("selectedstorage");
            localStorage.removeItem("selectedstoragePrice");
            storageSelection.innerText = "Select SSD";
            storageButton.innerText = "+";
            storageButton.classList.remove("remove-button");
            storageButton.classList.add("add-button");
            storageLink.setAttribute("href", "/storage");
        };
    }
});
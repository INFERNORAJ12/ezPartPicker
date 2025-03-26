document.addEventListener("DOMContentLoaded", function () {
    const memorySelection = document.getElementById("memory-selection");
    const memoryButton = document.getElementById("memory-button");
    const memoryLink = document.getElementById("memory-link");

    const selectedmemory = localStorage.getItem("selectedmemory");
    const selectedmemoryPrice = localStorage.getItem("selectedmemoryPrice");

    if (selectedmemory && selectedmemoryPrice) {
        memorySelection.innerText = `${selectedmemory} - $${selectedmemoryPrice}`;

        memoryButton.innerText = "-";
        memoryButton.classList.remove("add-button");
        memoryButton.classList.add("remove-button");

        memoryLink.removeAttribute("href");

        memoryButton.onclick = function () {
            localStorage.removeItem("selectedmemory");
            localStorage.removeItem("selectedmemoryPrice");
            memorySelection.innerText = "Select Memory";
            memoryButton.innerText = "+";
            memoryButton.classList.remove("remove-button");
            memoryButton.classList.add("add-button");
            memoryLink.setAttribute("href", "/memory");
        };
    }
});
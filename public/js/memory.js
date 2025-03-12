document.addEventListener("DOMContentLoaded", function () {
    const memorySelection = document.getElementById("memory-selection");
    const memoryButton = document.getElementById("memory-button");
    const memoryLink = document.getElementById("memory-link");

    const selectedmemory = localStorage.getItem("selectedmemory");

    if (selectedmemory) {
        memorySelection.innerText = selectedmemory;

        memoryButton.innerText = "-";
        memoryButton.classList.remove("add-button");
        memoryButton.classList.add("remove-button");

        memoryLink.removeAttribute("href");

        memoryButton.onclick = function () {
            localStorage.removeItem("selectedmemory");
            memorySelection.innerText = "Select Memory";
            memoryButton.innerText = "+";
            memoryButton.classList.remove("remove-button");
            memoryButton.classList.add("add-button");
            memoryLink.setAttribute("href", "/memory");
        };
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const cabinetSelection = document.getElementById("cabinet-selection");
    const cabinetButton = document.getElementById("cabinet-button");
    const cabinetLink = document.getElementById("cabinet-link");

    const selectedCabinet = localStorage.getItem("selectedCabinet");
    const selectedcasePrice = localStorage.getItem("selectedcasePrice");


    if (selectedCabinet && selectedcasePrice) {

        cabinetSelection.innerText = `${selectedCabinet} - $${selectedcasePrice}`;


        cabinetButton.innerText = "-";
        cabinetButton.classList.remove("add-button");
        cabinetButton.classList.add("remove-button");

      
        cabinetLink.removeAttribute("href");

        cabinetButton.onclick = function () {
            localStorage.removeItem("selectedCabinet");
            localStorage.removeItem("selectedcasePrice");
            cabinetSelection.innerText = "Select Cabinet";
            cabinetButton.innerText = "+";
            cabinetButton.classList.remove("remove-button");
            cabinetButton.classList.add("add-button");
            cabinetLink.setAttribute("href", "/cabinet");
        };
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const cpuSelection = document.getElementById("cpu-selection");
    const cpuButton = document.getElementById("cpu-button");
    const cpuLink = document.getElementById("cpu-link");

    const selectedcpu = localStorage.getItem("selectedcpu");
    const selectedcpuPrice = localStorage.getItem("selectedcpuPrice");

    if (selectedcpu && selectedcpuPrice) {
        cpuSelection.innerText = `${selectedcpu} - $${selectedcpuPrice}`;

        cpuButton.innerText = "-";
        cpuButton.classList.remove("add-button");
        cpuButton.classList.add("remove-button");

        cpuLink.removeAttribute("href");

        cpuButton.onclick = function () {
            localStorage.removeItem("selectedcpu");
            localStorage.removeItem("selectedcpuPrice");
            cpuSelection.innerText = "Select Processor";
            cpuButton.innerText = "+";
            cpuButton.classList.remove("remove-button");
            cpuButton.classList.add("add-button");
            cpuLink.setAttribute("href", "/processor");
        };
    }
});
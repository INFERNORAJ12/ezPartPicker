document.addEventListener("DOMContentLoaded", function () {
    const gpuSelection = document.getElementById("gpu-selection");
    const gpuButton = document.getElementById("gpu-button");
    const gpuLink = document.getElementById("gpu-link");

    const selectedgpu = localStorage.getItem("selectedgpu");
    const selectedgpuPrice = localStorage.getItem("selectedgpuPrice");

    if (selectedgpu && selectedgpuPrice) {
        gpuSelection.innerText = `${selectedgpu} - $${selectedgpuPrice}`;

        gpuButton.innerText = "-";
        gpuButton.classList.remove("add-button");
        gpuButton.classList.add("remove-button");

        gpuLink.removeAttribute("href");

        gpuButton.onclick = function () {
            localStorage.removeItem("selectedgpu");
            localStorage.removeItem("selectedgpuPrice");
            gpuSelection.innerText = "Select Graphic Card";
            gpuButton.innerText = "+";
            gpuButton.classList.remove("remove-button");
            gpuButton.classList.add("add-button");
            gpuLink.setAttribute("href", "/gpu");
        };
    }
});
// effects.js

// Flicker text animation
function addFlickerEffect(element) {
  element.classList.add("flicker");
}

// Add scanline effect to terminal
function addScanlineEffect() {
  const scanline = document.createElement("div");
  scanline.classList.add("scanline");
  document.getElementById("terminal").appendChild(scanline);
  setInterval(() => {
    const scanlineClone = scanline.cloneNode();
    document.getElementById("terminal").appendChild(scanlineClone);
  }, 1000);
}

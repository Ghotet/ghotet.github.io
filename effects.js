// effects.js

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

// Blinking cursor animation
function blinkCursor() {
  const cursor = document.createElement("span");
  cursor.classList.add("cursor");
  document.getElementById("output").appendChild(cursor);
}

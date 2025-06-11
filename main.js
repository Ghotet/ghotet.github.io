const output = document.getElementById("output");
const cursor = document.getElementById("cursor");

const lines = [
  "Welcome to ghotet.com",
  "Initializing system...",
  "Boot complete.",
  "Launching terminal...",
  "Loading AI stack...",
  "Ready."
];

let index = 0;

function typeLine(lineIndex = 0, charIndex = 0) {
  if (lineIndex >= lines.length) {
    cursor.style.display = "inline-block";
    return;
  }

  const line = lines[lineIndex];
  if (charIndex === 0) {
    const newLine = document.createElement("div");
    newLine.className = "line";
    output.appendChild(newLine);
  }

  const currentLine = output.lastChild;
  currentLine.textContent += line[charIndex];
  cursor.style.display = charIndex % 2 === 0 ? "none" : "inline-block";

  if (charIndex < line.length - 1) {
    setTimeout(() => typeLine(lineIndex, charIndex + 1), 50);
  } else {
    setTimeout(() => typeLine(lineIndex + 1, 0), 300);
  }
}

typeLine();

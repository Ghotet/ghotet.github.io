// utils.js

// slowPrint function that types out text character by character
function slowPrint(text, callback, speed = 10) {
  let index = 0;
  const lines = text.split("\n");
  function nextLine() {
    if (index < lines.length) {
      const line = document.createElement("div");
      output.appendChild(line);
      let charIndex = 0;
      function typeChar() {
        if (charIndex < lines[index].length) {
          line.textContent += lines[index][charIndex];
          charIndex++;
          setTimeout(typeChar, speed);
        } else {
          index++;
          setTimeout(nextLine, speed);
        }
      }
      typeChar();
    } else if (callback) {
      callback();
    }
  }
  nextLine();
}

// utils.js (now a module)

let outputRef = null;

export function setOutputRef(ref) {
  outputRef = ref;
}

export function printLine(text = "", flicker = false) {
  if (!outputRef) return;
  const line = document.createElement("div");
  line.innerHTML = text || "&nbsp;";
  if (flicker) line.classList.add("flicker");
  outputRef.appendChild(line);
  outputRef.scrollTop = outputRef.scrollHeight;
}

export function slowPrint(text, callback, speed = 10) {
  if (!outputRef) return;
  let index = 0;
  const lines = text.split("\n");

  function nextLine() {
    if (index < lines.length) {
      const line = document.createElement("div");
      outputRef.appendChild(line);
      let charIndex = 0;

      function typeChar() {
        if (charIndex < lines[index].length) {
          line.textContent += lines[index][charIndex++];
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

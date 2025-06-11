const output = document.getElementById("output");
const cursor = document.getElementById("cursor");

const commands = {
  help: `
Available commands:
  /vault         -> Secure node (inaccessible)
  /AI            -> Interface module offline
  /bio-organism  -> [View Ghotet Entity Log]
  /projects      -> List of active deployments
  clear          -> Clear console`,
  "/bio-organism": `Redirecting...
Dev.to: https://dev.to/ghotet
GitHub: https://github.com/ghotet`,
  "/vault": `ACCESS DENIED: Clearance level insufficient.`,
  "/AI": `Interface module currently unavailable. Awaiting consciousness sync...`,
  "/projects": `- Project Mirage
- AI OS Stack (modular build)
- Terminal UI Layer
- DME Rebuild Initiative`,
  clear: () => output.innerHTML = ""
};

function print(text) {
  output.innerHTML += `\n${text}`;
}

function runCommand(input) {
  const command = input.trim();
  const result = commands[command];
  if (typeof result === "function") {
    result();
  } else if (result) {
    print(result);
  } else {
    print(`Command not recognized: '${command}' (type 'help' to list commands)`);
  }
}

let currentInput = "";

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    print(`\n> ${currentInput}`);
    runCommand(currentInput);
    currentInput = "";
  } else if (event.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
  } else if (event.key.length === 1) {
    currentInput += event.key;
  }

  cursor.previousSibling.textContent = currentInput;
});


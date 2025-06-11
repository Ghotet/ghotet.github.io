const output = document.getElementById("output");
const cursor = document.getElementById("cursor");

// Terminal setup
let commandBuffer = "";

// Boot sequence
const bootMessages = [
  "Welcome to ghotet.com",
  "Initializing system...",
  "Boot complete.",
  "Launching terminal...",
  "Loading AI stack...",
  "Ready.\n"
];

// Simulate boot sequence
let bootIndex = 0;
function runBootSequence() {
  if (bootIndex < bootMessages.length) {
    output.innerHTML += bootMessages[bootIndex++] + "\n";
    setTimeout(runBootSequence, 500);
  } else {
    printPrompt();
  }
}

// Print prompt
function printPrompt() {
  output.innerHTML += "> ";
}

// Handle command input
document.addEventListener("keydown", function (e) {
  if (e.key === "Backspace") {
    commandBuffer = commandBuffer.slice(0, -1);
    output.innerHTML = output.innerHTML.slice(0, -1);
  } else if (e.key === "Enter") {
    output.innerHTML += "\n";
    handleCommand(commandBuffer.trim());
    commandBuffer = "";
    printPrompt();
  } else if (e.key.length === 1) {
    commandBuffer += e.key;
    output.innerHTML += e.key;
  }

  // Scroll to bottom
  window.scrollTo(0, document.body.scrollHeight);
});

function handleCommand(cmd) {
  const commands = {
    help: "Available commands:\nhelp\nls\nbio-organism",
    ls: "/vault\n/AI\n/bio-organism",
    "bio-organism": "Ghotet – Systems dev\nhttps://github.com/ghotet\nhttps://dev.to/ghotet"
  };

  if (commands[cmd]) {
    output.innerHTML += commands[cmd] + "\n";
  } else {
    output.innerHTML += `Command not found: ${cmd}\n`;
  }
}

// Kick off
runBootSequence();


  cursor.previousSibling.textContent = currentInput;
});


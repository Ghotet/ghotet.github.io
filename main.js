const output = document.getElementById("output");
let currentState = "main";

// Function to print line to terminal with optional flicker effect
function printLine(text = "", flicker = false) {
  const line = document.createElement("div");
  line.textContent = text;
  if (flicker) {
    line.classList.add("flicker");
  }
  output.appendChild(line);
  window.scrollTo(0, document.body.scrollHeight);
}

// Slow print function for typing text slowly
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

// Initial intro sequence
function printIntro() {
  const introText = `Welcome to ghotet.com\nInitializing system...\nBoot complete.\nLaunching terminal...\nLoading AI stack...\nReady.`;
  slowPrint(introText, () => {
    printLine();
    printMainMenu();
    const inputArea = document.getElementById("terminal-input");
    inputArea.focus();

    // Attach Enter key handler
    inputArea.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        const command = inputArea.value.trim();
        inputArea.value = ""; // Clear input field
        if (currentState === "main") {
          handleMainInput(command);
        } else if (currentState === "bio") {
          handleBioInput(command);
        }
      }
    });
  });
}

// Main menu options
function printMainMenu() {
  printLine("/AI      /Vault      /Bio      /Project [REDACTED]      /EchoNode");
  printLine();
  printLine("Press 'x' or 'c' to clear the terminal.");
  printLine("Enter a number:");
  printLine("1. Access /AI");
  printLine("2. Open /Vault");
  printLine("3. Read /Bio");
  printLine("4. Investigate /Project [REDACTED]");
  printLine("5. Connect to /EchoNode");
  printLine();
}

// Handle input in main state
function handleMainInput(command) {
  clearTerminal();
  printLine(`> ${command}`, true);

  switch (command) {
    case "1":
      printLine("Accessing /AI... (not yet wired)", true);
      break;
    case "2":
      printLine("Opening /Vault... (coming soon)", true);
      break;
    case "3":
      printLine("Reading /Bio...", true);
      setTimeout(() => {
        printLine("File system scan complete.");
        printLine("Fragmented record detected. Limited data recovered:");
        printLine("1. Dev.to Profile");
        printLine("2. GitHub Profile");
        printLine("Type 1 or 2 to open a link.");
        currentState = "bio";
      }, 500);
      return;
    case "4":
      printLine("Attempting to access /Project [REDACTED]...", true);
      printLine("Clearance level insufficient. Returning to main menu.", true);
      break;
    case "5":
      printLine("Connecting to /EchoNode...");
      setTimeout(() => {
        if (typeof loadEchoNode === 'function') {
          loadEchoNode();
        } else {
          printLine("[Error] EchoNode module missing.", true);
        }
      }, 500);
      break;
    case "x":
    case "c":
      clearTerminal();
      break;
    default:
      printLine("Unknown command.", true);
  }

  currentState = "main";
  printLine();
  printMainMenu();
}

// Handle input in bio state
function handleBioInput(command) {
  clearTerminal();
  printLine(`> ${command}`, true);

  switch (command) {
    case "1":
      printLine("Opening Dev.to in a new tab...");
      setTimeout(() => {
        window.open("https://dev.to/ghotet", "_blank");
      }, 1000);
      break;
    case "2":
      printLine("Opening GitHub in a new tab...");
      setTimeout(() => {
        window.open("https://github.com/ghotet", "_blank");
      }, 1000);
      break;
    default:
      printLine("Invalid selection.", true);
  }

  currentState = "main";
  printLine();
  printMainMenu();
}

// Clear terminal with 'x' or 'c' globally
document.addEventListener("keydown", (e) => {
  if (e.key === "x" || e.key === "c") {
    clearTerminal();
  }
});

// Start everything
document.addEventListener("DOMContentLoaded", () => {
  printIntro();
});

// Clear terminal and reset menu
function clearTerminal() {
  output.innerHTML = '';
  printMainMenu();
}

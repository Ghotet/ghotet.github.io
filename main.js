// main.js

const output = document.getElementById("output");
const inputWrapper = document.createElement("div");
const inputArea = document.createElement("input");

inputWrapper.style.marginTop = "1em";
inputWrapper.appendChild(inputArea);

inputArea.setAttribute("type", "text");
inputArea.setAttribute("id", "terminal-input");
inputArea.setAttribute("autocomplete", "off");
inputArea.setAttribute("autocorrect", "off");
inputArea.setAttribute("autocapitalize", "off");
inputArea.setAttribute("spellcheck", "false");
inputArea.style.background = "black";
inputArea.style.color = "#33ff33";
inputArea.style.border = "none";
inputArea.style.outline = "none";
inputArea.style.font = "inherit";
inputArea.style.width = "100%";
inputArea.style.caretColor = "#33ff33";

let currentState = "main";

// Print line to terminal with optional flicker effect
function printLine(text = "", flicker = false) {
  const line = document.createElement("div");
  line.textContent = text;
  
  // If flicker is true, add the flicker effect
  if (flicker) {
    line.classList.add("flicker");
  }
  
  output.appendChild(line);
  window.scrollTo(0, document.body.scrollHeight); // Scroll to bottom
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
    document.body.appendChild(inputWrapper);
    inputArea.focus();
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
  switch (command) {
    case "1":
      printLine("> 1");
      printLine("Accessing /AI... (not yet wired)", true); // Flicker effect added
      break;
    case "2":
      printLine("> 2");
      printLine("Opening /Vault... (coming soon)", true); // Flicker effect added
      break;
    case "3":
      printLine("> 3");
      printLine("Reading /Bio...", true); // Flicker effect added
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
      printLine("> 4");
      printLine("Attempting to access /Project [REDACTED]...", true); // Flicker effect added
      printLine("Clearance level insufficient. Returning to main menu.", true); // Flicker effect added
      break;
    case "5":
      printLine("> 5");
      printLine("Pinging /EchoNode...", true); // Flicker effect added
      printLine("No response. Ghost protocol active.", true); // Flicker effect added
      break;
    case "x":
    case "c":
      clearTerminal();
      break;
    default:
      printLine(`> ${command}`);
      printLine("Unknown command.", true); // Flicker effect added
  }
  currentState = "main";
  printLine();
  printMainMenu();
}

// Handle bio input
function handleBioInput(command) {
  clearTerminal();
  switch (command) {
    case "1":
      printLine("> 1");
      printLine("Opening Dev.to in a new tab...");
      setTimeout(() => {
        window.open("https://dev.to/ghotet", "_blank");
      }, 1000); // Simulate loading time
      break;
    case "2":
      printLine("> 2");
      printLine("Opening GitHub in a new tab...");
      setTimeout(() => {
        window.open("https://github.com/ghotet", "_blank");
      }, 1000);
      break;
    default:
      printLine(`> ${command}`);
      printLine("Invalid selection.", true); // Flicker effect added
  }
  currentState = "main";
  printLine();
}

// Add key listener to clear terminal with a single key (x or c)
document.addEventListener("keydown", (e) => {
  if (e.key === "x" || e.key === "c") {
    clearTerminal();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  printIntro();
});

// Capture user input
inputArea.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const command = inputArea.value.trim();
    inputArea.value = "";
    if (currentState === "main") {
      handleMainInput(command);
    } else if (currentState === "bio") {
      handleBioInput(command);
    }
  }
});

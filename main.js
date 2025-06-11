// main.js

const output = document.getElementById("output");
const cursor = document.getElementById("cursor");
const inputArea = document.createElement("input");

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
inputArea.style.width = "90%";
inputArea.style.caretColor = "transparent";

let currentState = "main";
let bioMenuActive = false;

function printLine(text = "") {
  const line = document.createElement("div");
  line.textContent = text;
  output.appendChild(line);
  window.scrollTo(0, document.body.scrollHeight);
}

function slowPrint(text, callback, speed = 20) {
  let index = 0;
  function printChar() {
    if (index < text.length) {
      output.lastChild.textContent += text.charAt(index);
      index++;
      setTimeout(printChar, speed);
    } else if (callback) {
      callback();
    }
  }
  const line = document.createElement("div");
  output.appendChild(line);
  printChar();
}

function printIntro() {
  const introText = `Welcome to ghotet.com\nInitializing system...\nBoot complete.\nLaunching terminal...\nLoading AI stack...\nReady.`;
  slowPrint(introText, () => {
    printMainMenu();
    if (!document.body.contains(inputArea)) {
      document.body.appendChild(inputArea);
    }
    inputArea.focus();
  }, 10);
}

function printMainMenu() {
  printLine("/AI      /Vault      /Bio      /Project [REDACTED]      /EchoNode");
  printLine("Enter a number:");
  printLine("1. Access /AI");
  printLine("2. Open /Vault");
  printLine("3. Read /Bio");
  printLine("4. Investigate /Project [REDACTED]");
  printLine("5. Connect to /EchoNode");
}

function handleMainInput(command) {
  switch (command) {
    case "1":
      printLine("> 1");
      printLine("Accessing /AI... (not yet wired)");
      break;
    case "2":
      printLine("> 2");
      printLine("Opening /Vault... (coming soon)");
      break;
    case "3":
      printLine("> 3");
      printLine("Reading /Bio...");
      setTimeout(() => {
        printLine("File system scan complete.");
        printLine("Fragmented record detected. Limited data recovered:");
        printLine("1. Dev.to Profile");
        printLine("2. GitHub Profile");
        printLine("Type 1 or 2 to open a link.");
        currentState = "bio";
      }, 500);
      break;
    case "4":
      printLine("> 4");
      printLine("Attempting to access /Project [REDACTED]...");
      printLine("Clearance level insufficient. Returning to main menu.");
      break;
    case "5":
      printLine("> 5");
      printLine("Pinging /EchoNode...");
      printLine("No response. Ghost protocol active.");
      break;
    default:
      printLine(`> ${command}`);
      printLine("Unknown command.");
  }
  if (currentState === "main") {
    printLine();
    printMainMenu();
  }
}

function handleBioInput(command) {
  switch (command) {
    case "1":
      printLine("> 1");
      printLine("Opening Dev.to in a new tab...");
      window.open("https://dev.to/ghotet", "_blank");
      break;
    case "2":
      printLine("> 2");
      printLine("Opening GitHub in a new tab...");
      window.open("https://github.com/ghotet", "_blank");
      break;
    default:
      printLine(`> ${command}`);
      printLine("Invalid selection.");
  }
  currentState = "main";
  printLine();
  printMainMenu();
}

document.addEventListener("DOMContentLoaded", () => {
  printIntro();
});

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


    printIntro(introLines);
});


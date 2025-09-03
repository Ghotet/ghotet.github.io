// main.js
import { slowPrint, printLine, setOutputRef } from './utils.js';
import { goToMainMenu, setMenuOutput } from './menuUtils.js';

// ----- STATE MANAGEMENT -----
let currentState = "intro";
let awaitingEnter = true;
let currentSubState = null;

let inputArea;
let output;

// ----- INTRO -----
function printIntro() {
  const introText = `Welcome to ghotet.dev
Initializing system...
Boot complete.
Launching terminal...
Loading AI stack...
Ready.`;
  slowPrint(introText, () => {
    printLine("<br>");
    printLine("Press Enter to continue...");
  }, 20);
}

// ----- SUBMENU HANDLERS -----
function handleMainInput(command) {
  printLine(`> ${command}`, true);

  switch (command) {
    case "1":
      currentSubState = "bio";
      printBioLinks();
      break;

    case "2":
      currentSubState = "ai";
      printAIOptions();
      break;

    case "3":
      currentSubState = "web_ai";
      printLine("Launching Web_AI...");
      setTimeout(() => {
        if (typeof window.loadEchoNode === 'function') {
          window.loadEchoNode();
        } else {
          printLine("[Error] Web_AI module missing.", true);
        }
      }, 500);
      break;

    case "4":
    case "5":
      printLine("Accessing /[unknown]... (feature unassigned)", true);
      break;

    case "x":
    case "c":
      goToMainMenu();
      currentState = "main";
      currentSubState = null;
      break;

    default:
      if (command.toLowerCase() === "ghost debug 6660") {
        printLine(">> Ghost Protocol handshake accepted. Redirecting...");
        setTimeout(() => {
          window.location.href = "ghost_debug_tool.html";
        }, 1500);
      } else {
        printLine("Unknown command.", true);
      }
  }
}

function handleBioInput(command) {
  printLine(`> ${command}`, true);

  switch (command) {
    case "1":
      printLine("Opening Dev.to in a new tab...");
      setTimeout(() => window.open("https://dev.to/ghotet", "_blank"), 1000);
      break;
    case "2":
      printLine("Opening GitHub in a new tab...");
      setTimeout(() => window.open("https://github.com/ghotet", "_blank"), 1000);
      break;
    case "x":
    case "c":
      goToMainMenu();
      currentSubState = null;
      break;
    default:
      printLine("Invalid selection.", true);
  }
}

function handleAIInput(command) {
  printLine(`> ${command}`, true);

  switch (command) {
    case "1":
      printLine("Redirecting to ghotet.com...");
      setTimeout(() => window.open("https://ghotet.com", "_blank"), 1000);
      break;
    case "2":
      printLine("Loading internal system tools... (not implemented)", true);
      break;
    case "x":
    case "c":
      goToMainMenu();
      currentSubState = null;
      break;
    default:
      printLine("Invalid selection.", true);
  }
}

// ----- BIO & AI PRINT LOGIC -----
function printBioLinks() {
  output.innerHTML = '';
  printLine("Accessing /Bio-links...", true);
  setTimeout(() => {
    printLine("<br>");
    printLine("File system scan complete.");
    printLine("Fragmented record detected. Limited data recovered:");
    printLine("<br>");
    printLine("1. Dev.to Profile");
    printLine("2. GitHub Profile");
    printLine("<br>");
    printLine("Press 'x' or 'c' then Enter to return to main menu.");
  }, 500);
}

function printAIOptions() {
  output.innerHTML = '';
  printLine("Accessing /AI Stack...", true);
  setTimeout(() => {
    printLine("1. Redirect to full-stack host (ghotet.com)");
    printLine("2. View internal system (coming soon)");
    printLine("Press 'x' or 'c' then Enter to return to main menu.");
  }, 500);
}

// ----- ENTRY POINT -----
window.addEventListener("DOMContentLoaded", () => {
  output = document.getElementById("output");
  inputArea = document.getElementById("terminal-input");

  setOutputRef(output);
  setMenuOutput(output); // for goToMainMenu()

  printIntro();

  inputArea.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const command = inputArea.value.trim();
    inputArea.value = "";

    if (awaitingEnter) {
      awaitingEnter = false;
      goToMainMenu();
      currentState = "main";
      return;
    }

    if (currentState === "main") handleMainInput(command);
    else if (currentSubState === "bio") handleBioInput(command);
    else if (currentSubState === "ai") handleAIInput(command);
    else if (currentSubState === "web_ai") {
      // Let Web_AI handle its own input internally
    }
  });
});

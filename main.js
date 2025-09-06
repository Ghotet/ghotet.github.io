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
      currentSubState = "documents";
      printDocuments(); // Dev.to RSS feed
      break;

    case "2":
      currentSubState = "bio";
      printBioLinks();
      break;

    case "3":
      currentSubState = "ai";
      printAIOptions();
      break;

    case "x":
    case "c":
      goToMainMenu();
      currentState = "main";
      currentSubState = null;
      break;

    default:
      if (command.toLowerCase() === "sys_check 6660") {
        printLine(">>sys_check handshake accepted. Redirecting...");
        setTimeout(() => {
          window.location.href = "sys_check.html";
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
      printLine("Launching EchoNode...");
      setTimeout(() => {
        if (typeof window.loadEchoNode === 'function') {
          window.loadEchoNode();
        } else {
          printLine("[Error] EchoNode module missing or not loaded.", true);
        }
      }, 500);
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

// ----- AI PRINT LOGIC -----
function printAIOptions() {
  output.innerHTML = '';
  printLine("Accessing /AI Stack...", true);
  setTimeout(() => {
    printLine("1. Redirect to full-stack host (ghotet.com)");
    printLine("2. Launch EchoNode (AI interface)");
    printLine("Press 'x' or 'c' then Enter to return to main menu.");
  }, 500);
}

// ----- DOCUMENTS / DEV.TO RSS -----
async function printDocuments() {
  output.innerHTML = '';
  printLine("Accessing /Documents...", true);
  setTimeout(async () => {
    printLine("Fetching Dev.to posts...");
    const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
    const feedUrl = encodeURIComponent('https://dev.to/ghotet/feed');

    try {
      const res = await fetch(`${CORS_PROXY}${feedUrl}`);
      if (!res.ok) throw new Error(`Network error: ${res.status}`);
      const text = await res.text();

      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "application/xml");
      const items = xml.querySelectorAll("item");

      if (!items.length) {
        printLine("> No posts found or feed could not be parsed.");
        console.warn("Parsed XML:", xml);
      } else {
        items.forEach((item, i) => {
          const title = item.querySelector("title")?.textContent || "No title";
          const link = item.querySelector("link")?.textContent || "#";
          printLine(`${i + 1}. ${title} (${link})`);
        });
      }

      printLine("<br>");
      printLine("Press 'x' or 'c' then Enter to return to main menu.");
    } catch (err) {
      printLine("> Failed to fetch posts. Check console for details.");
      console.error("Dev.to fetch error:", err);
    }
  }, 500);
}

// ----- BIO PRINT LOGIC -----
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

// ----- ENTRY POINT -----
window.addEventListener("DOMContentLoaded", () => {
  output = document.getElementById("output");
  inputArea = document.getElementById("terminal-input");

  setOutputRef(output);
  setMenuOutput(output);

  printIntro();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => console.log('Service Worker registered'))
      .catch(err => console.error('SW registration failed:', err));
  }

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

    // --- FIXED: reliable submenu routing ---
    switch (currentSubState) {
      case "documents":
        handleDocumentsInput(command);
        break;
      case "bio":
        handleBioInput(command);
        break;
      case "ai":
        handleAIInput(command);
        break;
      default:
        handleMainInput(command);
        break;
    }
  });
});

// Optional: handleDocumentsInput for future interactive feed actions
function handleDocumentsInput(command) {
  if (command.toLowerCase() === "x" || command.toLowerCase() === "c") {
    goToMainMenu();
    currentSubState = null;
  } else {
    printLine("Type 'x' or 'c' then Enter to return to main menu.", true);
  }
}




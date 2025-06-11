document.addEventListener("DOMContentLoaded", () => {
  const consoleEl = document.getElementById("console");

  const introLines = [
    "Welcome to ghotet.com",
    "Initializing system...",
    "Boot complete.",
    "Launching terminal...",
    "Loading blacksite index...",
    "Ready.\n"
  ];

  let lineIndex = 0;

  function typeLine(line, i = 0, callback) {
    if (i < line.length) {
      consoleEl.innerHTML += line[i];
      setTimeout(() => typeLine(line, i + 1, callback), 30);
    } else {
      consoleEl.innerHTML += "\n";
      callback();
    }
  }

  function runIntro(callback) {
    if (lineIndex < introLines.length) {
      typeLine(introLines[lineIndex], 0, () => {
        lineIndex++;
        runIntro(callback);
      });
    } else {
      showMenu();
    }
  }

  function showMenu() {
    const options = [
      "1. /vault",
      "2. /AI",
      "3. /bio-organism"
    ];
    consoleEl.innerHTML += "\nDirectory listing:\n";
    options.forEach(line => consoleEl.innerHTML += line + "\n");
    consoleEl.innerHTML += "\nEnter a number to access a file:\n";
    showPrompt();
  }

  function showPrompt() {
    const input = document.createElement("input");
    input.autofocus = true;

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const choice = input.value.trim();
        consoleEl.removeChild(input);
        consoleEl.innerHTML += `> ${choice}\n`;
        processChoice(choice);
      }
    });

    consoleEl.appendChild(input);
    input.focus();
  }

  function processChoice(choice) {
    switch (choice) {
      case "1":
        consoleEl.innerHTML += "Accessing /vault...\n[DATA ENCRYPTED — CLEARANCE LEVEL REDACTED]\n";
        break;
      case "2":
        consoleEl.innerHTML += "Launching /AI...\n[UNSTABLE BUILD — ACCESS LOCKED]\n";
        break;
      case "3":
        consoleEl.innerHTML += "Searching /bio-organism...\n2 files found:\n";
        consoleEl.innerHTML += "1. [DEVLOG.TERMINAL] https://dev.to/ghotet\n";
        consoleEl.innerHTML += "2. [SOURCE.MIRROR] https://github.com/ghotet\n";
        break;
      default:
        consoleEl.innerHTML += "Invalid selection.\n";
    }
    consoleEl.innerHTML += "\n";
    showMenu();
  }

  // Kick things off
  runIntro();
});


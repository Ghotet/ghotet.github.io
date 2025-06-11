const output = document.getElementById("output");
const cursor = document.getElementById("cursor");

const commands = {
    "/help": () => {
        printLine("Available commands:");
        printLine(" /AI");
        printLine(" /vault");
        printLine(" /bio");
    },
    "/AI": () => {
        printLine("Accessing /AI...");
        printLine(">> system status: idle");
    },
    "/vault": () => {
        printLine("Accessing /vault...");
        printLine(">> access denied. clearance required.");
    },
    "/bio": () => {
        printLine("Scanning /bio-organism...");
        printLine("2 files found.");
        printLine(" 1. github");
        printLine(" 2. dev.to");
        printLine("Enter file number to open:");
        waitingForFileInput = true;
    }
};

let waitingForFileInput = false;

document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        const inputLine = document.getElementById("input-line");
        const command = inputLine.innerText.trim();
        inputLine.remove();
        cursor.remove();

        printLine(`> ${command}`);

        if (waitingForFileInput) {
            handleBioCommand(command);
        } else {
            const cmd = commands[command];
            if (cmd) {
                cmd();
            } else {
                printLine("Unknown command. Try /help.");
            }
        }

        addNewInputLine();
    }
});

function handleBioCommand(input) {
    waitingForFileInput = false;
    if (input === "1") {
        confirmLink("https://github.com/ghotet");
    } else if (input === "2") {
        confirmLink("https://dev.to/ghotet");
    } else {
        printLine("Invalid file number.");
    }
}

function confirmLink(url) {
    printLine(`Open ${url}? (y/n)`);
    const confirmInput = document.createElement("div");
    confirmInput.id = "input-line";
    confirmInput.contentEditable = true;
    confirmInput.spellcheck = false;
    output.appendChild(confirmInput);
    confirmInput.focus();

    confirmInput.addEventListener("keydown", function handler(e) {
        if (e.key === "Enter") {
            const val = confirmInput.innerText.trim().toLowerCase();
            confirmInput.remove();
            if (val === "y") {
                window.open(url, "_blank");
                printLine("Opening in new tab...");
            } else {
                printLine("Cancelled.");
            }
            addNewInputLine();
            confirmInput.removeEventListener("keydown", handler);
        }
    });
}

function printLine(text) {
    const line = document.createElement("div");
    line.textContent = text;
    output.appendChild(line);
    window.scrollTo(0, document.body.scrollHeight);
}

function addNewInputLine() {
    const newLine = document.createElement("div");
    newLine.id = "input-line";
    newLine.contentEditable = true;
    newLine.spellcheck = false;
    output.appendChild(newLine);
    output.appendChild(cursor);
    newLine.focus();
}

printLine("Welcome to ghotet.com");
printLine("Initializing system...");
printLine("Boot complete.");
printLine("Launching terminal...");
printLine("Loading AI stack...");
printLine("Ready.");
addNewInputLine();


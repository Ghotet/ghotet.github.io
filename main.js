document.addEventListener("DOMContentLoaded", () => {
    const consoleEl = document.getElementById("console");
    const outputEl = document.getElementById("output");
    const cursorEl = document.getElementById("cursor");

    const introLines = [
        "Welcome to ghotet.com",
        "Initializing system...",
        "Boot complete.",
        "Launching terminal...",
        "Loading AI stack...",
        "Ready.",
        "",
        "/AI      /Vault      /Bio",
        "",
        "Enter a number:",
        "1. Access /AI",
        "2. Open /Vault",
        "3. Read /Bio"
    ];

    let inputBuffer = "";

    function printLine(text = "") {
        const line = document.createElement("div");
        line.textContent = text;
        outputEl.appendChild(line);
        consoleEl.scrollTop = consoleEl.scrollHeight;
    }

    async function printIntro(lines, delay = 200) {
        for (const line of lines) {
            printLine(line);
            await new Promise(r => setTimeout(r, delay));
        }
        showPrompt();
    }

    function showPrompt() {
        const inputLine = document.createElement("div");
        inputLine.textContent = "█ ";
        const inputSpan = document.createElement("span");
        inputSpan.setAttribute("id", "input-span");
        inputLine.appendChild(inputSpan);
        outputEl.appendChild(inputLine);
        cursorEl.style.display = "inline";
    }

    function handleCommand(cmd) {
        printLine(`> ${cmd}`);
        switch (cmd) {
            case "1":
                printLine("Accessing /AI... (not yet wired)");
                break;
            case "2":
                printLine("Opening /Vault... (coming soon)");
                break;
            case "3":
                printLine("Reading /Bio...");
                printLine("2 files found:");
                printLine("1. Dev.to Profile");
                printLine("2. GitHub Profile");
                printLine("Type 1 or 2 to open a link.");
                break;
            case "1.1":
                window.open("https://dev.to/ghotet", "_blank");
                break;
            case "1.2":
                window.open("https://github.com/ghotet", "_blank");
                break;
            default:
                printLine("Unknown command.");
                break;
        }
        showPrompt();
    }

    document.addEventListener("keydown", (e) => {
        const inputSpan = document.getElementById("input-span");

        if (!inputSpan) return;

        if (e.key === "Backspace") {
            inputBuffer = inputBuffer.slice(0, -1);
        } else if (e.key === "Enter") {
            handleCommand(inputBuffer.trim());
            inputBuffer = "";
            inputSpan.textContent = "";
            return;
        } else if (e.key.length === 1) {
            inputBuffer += e.key;
        }

        inputSpan.textContent = inputBuffer;
    });

    printIntro(introLines);
});


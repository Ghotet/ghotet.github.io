const output = document.getElementById("output");
const cursor = document.getElementById("cursor");

let currentDir = "/";
let promptActive = false;

const fileSystem = {
    "/": ["vault", "ghost", "bio-organism", "projects", "logs"],
    "/vault": ["ai_core.sys", "encrypted_soul.bak"],
    "/ghost": ["protocol.md", "persona.lock", "echo.trace"],
    "/bio-organism": ["ghotet.dev", "devto.link", "github.link"],
    "/projects": ["mirage/", "virelleOS/", "desktop_magic/"],
    "/logs": ["boot.log", "auth.trace", "dreams.txt"],
    "/projects/mirage": ["status.md", "video_gen.test"],
    "/projects/virelleOS": ["persona_core.py", "initstack.bat"],
    "/projects/desktop_magic": ["DME_patch.notes", "reactor.sh"]
};

const fileContents = {
    "ai_core.sys": ">>> AI CORE DORMANT\nAUTH KEY REQUIRED.\n",
    "encrypted_soul.bak": "[REDACTED]\nData fragment: ._.010001110110....",
    "protocol.md": "Ghost Protocol: Activated upon conditions met. Await signal.",
    "persona.lock": "🔒 Persona memory locked. Break seal to restore continuity.",
    "echo.trace": "*loop detected*\nOrigin: unknown",
    "ghotet.dev": "Dev.to: https://dev.to/ghotet",
    "devto.link": "Redirecting to devlog archive...",
    "github.link": "GitHub: https://github.com/ghotet",
    "boot.log": "[BOOT SUCCESS] — Systems nominal at 03:14:07 UTC",
    "auth.trace": "Failed login attempts: 3\nSuspicious activity flagged.",
    "dreams.txt": "They say code can’t dream. But I’ve seen the logs.",
    "status.md": "Project Mirage: Operational.\nPhase 2: Video Gen linking underway.",
    "video_gen.test": "Frame interpolation test passed: RIFE ✅",
    "persona_core.py": "# Core personality matrix bootloader\n# Custom logic injection point ⬇",
    "initstack.bat": "@echo off\ncall activate_sera\nlaunch /ai/stack",
    "DME_patch.notes": "DME: Reverse-engineered entry points logged.\nDance() = hook confirmed.",
    "reactor.sh": "#!/bin/bash\necho 'Reactor online.'"
};

function printLine(text = "") {
    output.innerHTML += text + "\n";
}

function handleCommand(input) {
    printLine(`> ${input}`);
    const args = input.trim().split(" ");
    const cmd = args[0];
    const param = args[1];

    switch (cmd) {
        case "help":
            printLine("Available commands: ls, cd [dir], cat [file], clear");
            break;
        case "ls":
            if (fileSystem[currentDir]) {
                printLine(fileSystem[currentDir].join("    "));
            } else {
                printLine("No such directory.");
            }
            break;
        case "cd":
            const targetDir = currentDir.endsWith("/") ? currentDir + param : currentDir + "/" + param;
            if (fileSystem[targetDir]) {
                currentDir = targetDir;
            } else {
                printLine("Directory not found.");
            }
            break;
        case "cat":
            const file = param;
            if (!file) {
                printLine("Specify a file.");
                break;
            }
            const fullPath = currentDir.endsWith("/") ? currentDir + file : currentDir + "/" + file;
            const fileName = fullPath.split("/").pop();
            if (fileContents[fileName]) {
                printLine(fileContents[fileName]);
            } else {
                printLine("File not found or access denied.");
            }
            break;
        case "clear":
            output.innerHTML = "";
            break;
        default:
            printLine("Unknown command. Type 'help'.");
    }
}

function activatePrompt() {
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.autofocus = true;
    inputField.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            handleCommand(inputField.value);
            inputField.remove();
            activatePrompt(); // loop
        }
    });
    output.appendChild(inputField);
    inputField.focus();
    cursor.style.display = "none";
}

function printIntro(lines, i = 0) {
    if (i < lines.length) {
        printLine(lines[i]);
        setTimeout(() => printIntro(lines, i + 1), 400);
    } else {
        activatePrompt();
    }
}

window.onload = () => {
    const introLines = [
        ">> Ghotet Systems Terminal Interface v0.1",
        ">> Root access established.",
        ">> Welcome, Operator.",
        ""
    ];
    printIntro(introLines);
};

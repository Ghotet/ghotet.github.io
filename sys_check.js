window.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("vault-output");
  const input = document.createElement("input");

  let files = [];

  function addLine(text) {
    const line = document.createElement("div");
    line.textContent = text;
    output.appendChild(line);
  }

  function addSpacer() {
    output.appendChild(document.createElement("br"));
  }

  function showList() {
    addLine("System Protocol v0.2");
    addLine("> Decryption complete. Archive index:");
    files.forEach((file, i) => {
      addLine(`  [${i + 1}] ${file.title}`);
    });
    addSpacer();
    addLine("> Type a number and press Enter to load.");
    addLine("> Press 'x' or 'c' then Enter to return to the terminal.");
  }

  function loadVideo(index) {
    const file = files[index];
    addLine(`> Loading: ${file.title}`);
    addSpacer();

    const iframe = document.createElement("iframe");
    iframe.src = file.url;
    iframe.width = "100%";
    iframe.height = "480";
    iframe.frameBorder = "0";
    iframe.allowFullscreen = true;
    output.appendChild(iframe);
  }

  function setupInput() {
    input.type = "text";
    input.style.width = "100%";
    input.style.marginTop = "1em";
    input.style.background = "black";
    input.style.color = "#33ff33";
    input.style.border = "1px solid #33ff33";
    input.style.fontFamily = "monospace";
    input.autofocus = true;
    output.appendChild(input);

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const command = input.value.trim().toLowerCase();
        input.value = "";

        // Terminal-style back to main menu
        if (command === "x" || command === "c") {
          window.location.href = "index.html";
          return;
        }

        const val = parseInt(command);
        input.disabled = true;

        if (!isNaN(val) && val >= 1 && val <= files.length) {
          loadVideo(val - 1);
          // Keep input enabled after loading video
          setTimeout(() => {
            input.disabled = false;
            input.focus();
          }, 500);
        } else {
          addLine("> Invalid selection.");
          input.disabled = false;
          input.focus();
        }
      }
    });
  }

  fetch("sys_manifest.json")
    .then(res => res.json())
    .then(json => {
      files = json;
      showList();
      setupInput();
    })
    .catch(err => {
      addLine("> Failed to load secure archive.");
      console.error("System manifest load error:", err);
    });
});

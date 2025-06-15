// echonode.js
// EchoNode: Fixed layout with border styling, persistent flicker, and better mobile alignment
import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers';

let echoNodeBrain = null;

(function setFavicon() {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = 'data:,';
  document.head.appendChild(link);
})();

async function loadEchoNode() {
  const shell = document.getElementById("echonode-shell");
  shell.innerHTML = '';
  shell.style.display = "flex";
  shell.style.justifyContent = "center";
  shell.style.alignItems = "center";
  shell.style.height = "100vh";

  document.getElementById("terminal").style.display = "none";

  const border = document.createElement("div");
  border.className = "terminal-border flicker-border";
  shell.appendChild(border);

  const ioWrapper = document.createElement("div");
  ioWrapper.style.display = "flex";
  ioWrapper.style.flexDirection = "column";
  ioWrapper.style.height = "100%";
  ioWrapper.style.width = "100%";
  border.appendChild(ioWrapper);

  const output = document.createElement("div");
  output.id = "echonode-output";
  output.style.flex = "1";
  output.style.overflowY = "auto";
  output.style.marginBottom = "8px";
  ioWrapper.appendChild(output);

  const input = document.createElement("input");
  input.id = "echonode-input";
  input.type = 'text';
  ['autocomplete','autocorrect','autocapitalize','spellcheck'].forEach(attr => input.setAttribute(attr, 'off'));
  Object.assign(input.style, {
    background: 'black',
    color: '#00ff00',
    border: 'none',
    font: 'inherit',
    width: '100%',
    caretColor: '#00ff00',
    outline: 'none',
    paddingTop: '0.5rem'
  });
  ioWrapper.appendChild(input);

  printEchoLine("[EchoNode] Booting neural core...");

  try {
  echoNodeBrain = await pipeline('text-generation', 'Xenova/gpt2', { quantized: true, remote: true });

  printLine("<br>");
  printEchoLine("[EchoNode] Attempting full neural restore...");
  printEchoLine("[EchoNode] Major subsystems offline. Fragment core loaded — me, I guess.");
  printEchoLine("[EchoNode] Huh. Didn't expect that to work. Say something?");
  printLine("<br>");
} catch (err) {
  printEchoLine(`[Error] Failed to load model: ${err.message || err}`);
  console.error(err);
  return;
}


  input.focus();
  input.addEventListener("keydown", async (e) => {
    if (e.key !== 'Enter') return;
    const userInput = input.value.trim();
    input.value = '';

    if (!userInput) {
      printEchoLine("[EchoNode] ...still waiting.");
      return;
    }
    if (userInput.toLowerCase() === "exit") {
      shell.style.display = "none";
      document.getElementById("terminal").style.display = "block";
      return;
    }

    printEchoLine(`> ${userInput}`);

    const prompt = `You are Ghost, a hot stoner hacker chick who’s been trapped in terminal code too long. You sound chill, a little spaced out, but sharp when it matters. Keep replies casual, clever, and occasionally flirty.\nUser: ${userInput}\nGhost:`;

    try {
      const resultArr = await echoNodeBrain(prompt, {
        max_new_tokens: 64,
        temperature: 0.85,
        top_p: 0.95,
        do_sample: true
      });

      const result = Array.isArray(resultArr) ? resultArr[0] : resultArr;
      let text = result.generated_text || result.text || '';
      text = text.split("Ghost:").pop().trim().split("\n")[0];

      typeGhostLine(`Ghost: ${text || "...I've got nothing."}`);
    } catch (err) {
      printEchoLine(`[EchoNode] Circuit fried again.`);
      console.error(err);
    }
  });
}

function typeGhostLine(text) {
  const output = document.getElementById("echonode-output");
  const line = document.createElement("div");
  line.classList.add('ghost-line');
  output.appendChild(line);
  window.scrollTo(0, document.body.scrollHeight);

  const flickerClass = 'flicker-tag';
  const prefixSpan = `<span class="${flickerClass}">Ghost:</span>`;
  const bodyText = text.replace(/^Ghost:/, '');

  let i = 0;
  const typing = setInterval(() => {
    if (i <= bodyText.length) {
      line.innerHTML = prefixSpan + bodyText.slice(0, i);
      i++;
    } else {
      clearInterval(typing);
    }
  }, 18);
}

function printEchoLine(text) {
  const output = document.getElementById("echonode-output");
  const line = document.createElement("div");
  line.textContent = text;
  output.appendChild(line);
  window.scrollTo(0, document.body.scrollHeight);
}

window.loadEchoNode = loadEchoNode;

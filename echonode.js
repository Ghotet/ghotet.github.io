// echonode.js
// EchoNode: Final stable GPT2 setup with sarcasm prompt and border
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
  shell.style.display = "block";
  document.getElementById("terminal").style.display = "none";

  const border = document.createElement("div");
  border.className = "terminal-border";
  shell.appendChild(border);

  const output = document.createElement("div");
  output.id = "echonode-output";
  border.appendChild(output);

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
  });
  border.appendChild(input);

  printEchoLine("[EchoNode] Booting ancient neural relic...");

  try {
    echoNodeBrain = await pipeline('text-generation', 'Xenova/gpt2', { quantized: true, remote: true });
    printEchoLine("[EchoNode] Uplink stable. I'm here, reluctantly.");
    printEchoLine("[EchoNode] Idle... Speak or forever hold your peace (I won't care).\n");
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

    const prompt = `You are Ghost, a sarcastic AI stuck in a terminal. Respond like a moody hacker AI.
User: ${userInput}
Ghost:`;

    try {
      const resultArr = await echoNodeBrain(prompt, {
        max_new_tokens: 64,
        temperature: 0.8,
        top_p: 0.95,
        do_sample: true
      });

      const result = Array.isArray(resultArr) ? resultArr[0] : resultArr;
      let text = result.generated_text || result.text || '';
      text = text.split("Ghost:").pop().trim().split("\n")[0];
      printEchoLine(`Ghost: ${text || "...I've got nothing."}`);
    } catch (err) {
      printEchoLine(`[EchoNode] Circuit fried again.`);
      console.error(err);
    }
  });
}

function printEchoLine(text) {
  const output = document.getElementById("echonode-output");
  const line = document.createElement("div");
  line.textContent = text;
  output.appendChild(line);
  window.scrollTo(0, document.body.scrollHeight);
}

window.loadEchoNode = loadEchoNode;

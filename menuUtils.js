// menuUtils.js
import { printLine, setOutputRef } from './utils.js';

let output = null;

export function setMenuOutput(ref) {
  output = ref;
}

export function goToMainMenu() {
  if (!output) return;
  output.innerHTML = '';

  printLine("~Blacksite Terminal Initialized~");
  printLine("<br>");
  printLine("~/Directories:");
  printLine("<br>");
  printLine("/Bio-links      /AI      /Web_AI      /[unknown]      /[unknown]");
  printLine("<br>");
  printLine("Enter a number:");
  printLine("<br>");
  printLine("1. /Bio-links");
  printLine("2. /AI");
  printLine("3. /Web_AI [experimental]");
  printLine("4. /[unknown]");
  printLine("5. /[unknown]");
  printLine("<br>");
  printLine("Press 'x' or 'c' then Enter to return to this menu from any submenu.");
  printLine("<br>");
}
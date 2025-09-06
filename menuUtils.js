// menuUtils.js
import { printLine, setOutputRef } from './utils.js';

let output = null;

export function setMenuOutput(ref) {
  output = ref;
}

export function goToMainMenu() {
  output.innerHTML = '';
  printLine("~Blacksite Terminal Initialized~");
  printLine("<br>");
  printLine("~/Directories:");
  printLine("");
  printLine("/Documents /Bio-links /AI");
  printLine("");
  printLine("Enter a number:");
  printLine("");
  printLine("1. /Documents");
  printLine("2. /Bio-links");
  printLine("3. /AI");
  printLine("");
  printLine("Press 'x' or 'c' then Enter to return to this menu from any submenu.");
}

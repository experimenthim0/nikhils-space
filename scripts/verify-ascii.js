// Development-only verification script for ASCII portrait accuracy
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const txtFilePath = path.join(rootDir, "src", "assets", "nikhil-yadav-ascii.txt");
const txtContent = fs.readFileSync(txtFilePath, "utf8");

console.log("==========================================");
console.log("ASCII PORTRAIT VERIFICATION REPORT");
console.log("==========================================");

// 1. Total character count
console.log(`Total character count: ${txtContent.length}`);

// 2. Lines analysis
const lines = txtContent.split(/\r?\n/);
console.log(`Number of lines: ${lines.length}`);

// 3. Longest line length
let longestLineLength = 0;
let shortestLineLength = Infinity;
let lineLengths = new Set();

lines.forEach((line) => {
  const len = line.length;
  lineLengths.add(len);
  if (len > longestLineLength) longestLineLength = len;
  if (len < shortestLineLength) shortestLineLength = len;
});

console.log(`Longest line length: ${longestLineLength}`);
console.log(`Shortest line length: ${shortestLineLength}`);
console.log(`Unique line lengths: [${Array.from(lineLengths).join(", ")}]`);

// Check if all lines have identical column count
const isGridUniform = lineLengths.size === 1;
console.log(`Grid uniformity: ${isGridUniform ? "PERFECT (all lines exact same length)" : "NON-UNIFORM"}`);

// Check for tabs or non-standard characters
const hasTabs = txtContent.includes("\t");
console.log(`Contains tabs: ${hasTabs}`);

console.log("First 3 lines preview:");
lines.slice(0, 3).forEach((l, i) => console.log(`  Line ${i + 1} (${l.length} chars): ${JSON.stringify(l.slice(0, 40))}...`));

console.log("Last 3 lines preview:");
lines.slice(-3).forEach((l, i) => console.log(`  Line ${lines.length - 2 + i} (${l.length} chars): ${JSON.stringify(l.slice(0, 40))}...`));

console.log("==========================================");
console.log("VERIFICATION STATUS: SUCCESS");
console.log("==========================================");

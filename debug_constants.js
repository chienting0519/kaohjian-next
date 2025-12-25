const fs = require('fs');
const content = fs.readFileSync('c:/Users/tujm/Desktop/kaohjian-clinic/kaohjian-next/lib/constants.ts', 'utf8');
const lines = content.split('\n');

// Check line 333 (Article 7 start)
// Note: array is 0-indexed, file line is 1-indexed. Line 333 is index 332.
const startLineIdx = 332;
console.log(`Line ${startLineIdx + 1} content: [${lines[startLineIdx]}]`);
console.log(`Line ${startLineIdx + 1} char codes:`, lines[startLineIdx].split('').map(c => c.charCodeAt(0)));

// Check line 389 (Article 7 end)
const endLineIdx = 388;
if (lines[endLineIdx]) {
    console.log(`Line ${endLineIdx + 1} content: [${lines[endLineIdx]}]`);
    console.log(`Line ${endLineIdx + 1} char codes:`, lines[endLineIdx].split('').map(c => c.charCodeAt(0)));
} else {
    console.log(`Line ${endLineIdx + 1} does not exist! Total lines: ${lines.length}`);
}

// Check for unclosed backticks manually
let backtickCount = 0;
for (let i = 0; i < content.length; i++) {
    if (content[i] === '`') backtickCount++;
}
console.log(`Total backticks in file: ${backtickCount}`);

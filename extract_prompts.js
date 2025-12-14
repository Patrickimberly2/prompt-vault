import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';
import { fileURLToPath } from 'url';

// --- CONFIGURATION ---
// Update this path to where your PDFs are actually located on your computer
const pdfFolderPath = "C:\\Users\\KLHst\\Downloads\\PDF_files"; 

// This saves the file directly into your source code data folder
const outputFilePath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'src', 'data', 'prompts.json');

const files = [
    { category: "Personal Growth", filename: "The Personal Growth Bible to ChatGPT.pdf" },
    { category: "Coaching", filename: "The Coach’s Bible to ChatGPT.pdf" },
    { category: "Business", filename: "The Business Owner's Bible to ChatGPT.pdf" },
    { category: "Marketing", filename: "The Marketer's Bible to CHATGPT.pdf" }
];

async function extractPrompts() {
    console.log("Starting extraction...");
    const allData = [];

    // Ensure src/data exists
    const dir = path.dirname(outputFilePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    for (const file of files) {
        const filePath = path.join(pdfFolderPath, file.filename);
        if (!fs.existsSync(filePath)) {
            console.warn(`⚠️ File not found: ${file.filename} (Skipping)`);
            continue;
        }

        console.log(`Processing: ${file.filename}`);
        const dataBuffer = fs.readFileSync(filePath);
        
        try {
            const data = await pdf(dataBuffer);
            const text = data.text;
            
            // Extract sections based on headers found in your specific PDFs
            const rawSections = text.split(/(?=FILL-IN-THE-BLANK PROMPTS|QUESTIONS-BASED PROMPTS|OPEN-ENDED PROMPTS)/g);
            const prompts = [];

            rawSections.forEach(section => {
                let type = "General";
                let content = section.trim();

                if (content.includes("FILL-IN-THE-BLANK PROMPTS")) {
                    type = "Fill-in-the-Blank";
                    content = content.replace("FILL-IN-THE-BLANK PROMPTS", "");
                } else if (content.includes("QUESTIONS-BASED PROMPTS")) {
                    type = "Questions-Based";
                    content = content.replace("QUESTIONS-BASED PROMPTS", "");
                }

                // Cleanup common PDF artifacts
                content = content
                    .replace(/--- PAGE \d+ ---/g, "")
                    .replace(/THE ULTIMATE CHATGPT BIBLE/g, "")
                    .replace(/DARIUSLUKAS\.ACADEMY\//g, "")
                    .replace(/Unset/g, "")
                    .split('\n').filter(line => line.trim().length > 0).join('\n')
                    .trim();

                if (content.length > 40) {
                    prompts.push({ type, content });
                }
            });

            allData.push({
                category: file.category,
                fileName: file.filename,
                prompts: prompts
            });

        } catch (err) {
            console.error(`Error processing ${file.filename}:`, err);
        }
    }

    fs.writeFileSync(outputFilePath, JSON.stringify(allData, null, 2));
    console.log(`✅ Success! Data saved to: ${outputFilePath}`);
}

extractPrompts();

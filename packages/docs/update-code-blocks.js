// A script to replace code blocks with CodeBlock components
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

// Get current directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Directories to search
const dirs = [path.join(__dirname, "pages"), path.join(__dirname, "pages/docs")]

// Function to extract code content from HTML
function extractCodeContent(content) {
  // This is a simplified extraction - may need adjustments based on actual HTML structure
  const codeLines = []
  const lines = content.split("\n")
  let inCode = false
  let language = "javascript" // Default language

  for (const line of lines) {
    if (
      line.includes('<span class="text-accent">import</span>') ||
      line.includes('<span class="text-accent">const</span>') ||
      line.includes('<span class="text-accent">let</span>') ||
      line.includes('<span class="text-accent">function</span>') ||
      line.includes('<span class="text-accent">for</span>')
    ) {
      inCode = true
    }

    if (inCode) {
      // Remove HTML tags and convert entities
      let cleanLine = line
        .replace(/<span class="[^"]*">/g, "")
        .replace(/<\/span>/g, "")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .trim()

      if (cleanLine) {
        codeLines.push(cleanLine)
      }
    }

    if (inCode && line.includes("</pre>")) {
      inCode = false
      break
    }
  }

  return { code: codeLines.join("\n"), language }
}

// Replace code blocks with CodeBlock components
function replaceCodeBlocks(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8")
    let modified = false

    // Find code blocks
    const codeBlockRegex =
      /<div class="p-6 bg-black overflow-hidden">\s*<pre[^>]*>([\s\S]*?)<\/pre>\s*<\/div>/g

    content = content.replace(codeBlockRegex, (match, codeContent) => {
      const { code, language } = extractCodeContent(match)
      modified = true
      return `<CodeBlock language="${language}" class="fade-in-delayed" :style="{ animationDelay: '0.3s' }">\n${code}\n</CodeBlock>`
    })

    // Remove any stray </pre> tags that might have been left behind
    content = content.replace(/<\/pre>\s*<\/CodeBlock>/g, "</CodeBlock>")

    if (modified) {
      fs.writeFileSync(filePath, content, "utf8")
      console.log(`Updated code blocks in: ${filePath}`)
    }
  } catch (err) {
    console.error(`Error processing file ${filePath}:`, err)
  }
}

// Walk through directories recursively
function walkDir(dir) {
  try {
    const files = fs.readdirSync(dir)

    files.forEach((file) => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        walkDir(filePath)
      } else if (stat.isFile() && filePath.endsWith(".vue")) {
        replaceCodeBlocks(filePath)
      }
    })
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err)
  }
}

// Start processing
dirs.forEach(walkDir)
console.log("Done replacing code blocks")

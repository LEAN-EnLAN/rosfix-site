import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const docsDir = path.join(root, "docs");

if (!fs.existsSync(distDir)) {
  throw new Error("No existe dist/. Ejecuta la build antes de sincronizar Pages.");
}

fs.rmSync(docsDir, { recursive: true, force: true });
fs.mkdirSync(docsDir, { recursive: true });
fs.cpSync(distDir, docsDir, { recursive: true });

console.log("docs/ sincronizado desde dist/");

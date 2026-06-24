const fs = require("fs");
const path = require("path");

const catalog = require("../data/categories.json");

const root = path.join(__dirname, "..");

function copyDirectory(source, target) {
    fs.mkdirSync(target, { recursive: true });

    for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
        const sourcePath = path.join(source, entry.name);
        const targetPath = path.join(target, entry.name);

        if (entry.isDirectory()) {
            copyDirectory(sourcePath, targetPath);
        } else {
            fs.copyFileSync(sourcePath, targetPath);
        }
    }
}

for (const category of catalog) {
    const packageRoot = path.join(root, "packages", category.localPackageFolder);
    const templatesRoot = path.join(packageRoot, "templates");

    fs.mkdirSync(templatesRoot, { recursive: true });

    for (const template of category.templates) {
        const sourceTemplate = path.join(root, "templates", template.id);
        const targetTemplate = path.join(templatesRoot, template.id);

        if (!fs.existsSync(sourceTemplate)) {
            continue;
        }

        if (fs.existsSync(targetTemplate)) {
            fs.rmSync(targetTemplate, { recursive: true, force: true });
        }

        copyDirectory(sourceTemplate, targetTemplate);
    }
}

console.log("Template package folders synced.");

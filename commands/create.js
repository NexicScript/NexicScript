const fs = require("fs");
const path = require("path");
const readline = require("readline-sync");

const {
    findTemplate
} = require("../lib/catalog");

const {
    resolveTemplateSource
} = require("../lib/package-manager");

function listDirectoryEntries(dirPath) {
    return fs.readdirSync(dirPath, { withFileTypes: true })
        .filter(entry => entry.name !== ".git")
        .map(entry => entry.isDirectory() ? `${entry.name}/` : entry.name);
}

function isDirectoryEmpty(dirPath) {
    return listDirectoryEntries(dirPath).length === 0;
}

module.exports = (templateName) => {
    if (!templateName) {
        console.log("Please add a template name. Example: nxs create web-basic");
        return;
    }

    const template = findTemplate(templateName);

    if (!template) {
        console.log(`Template '${templateName}' was not found.`);
        return;
    }

    const templatePath = resolveTemplateSource(template.id);

    if (!templatePath) {
        console.log(`Template '${templateName}' is not available yet.`);
        return;
    }

    const projectName = readline.question(
        "Project name (press Enter to use this folder): "
    );

    let destination;

    if (projectName.trim() === "") {
        destination = process.cwd();

        const existing = listDirectoryEntries(destination);

        console.log(`
⚠️  WARNING: You are about to create the project in this folder.
   Path: ${destination}
`);

        if (existing.length > 0) {
            const preview = existing.slice(0, 8).join(", ");
            const extra = existing.length > 8 ? ` (+${existing.length - 8} more)` : "";

            console.log(`   This folder already has ${existing.length} item(s): ${preview}${extra}
   Template files will be added here and may replace files with the same name.
`);
        }

        const answer = readline.question("Are you sure? Type YES to continue: ");

        if (answer.trim().toUpperCase() !== "YES") {
            console.log("Cancelled.");
            return;
        }
    } else {
        destination = path.join(process.cwd(), projectName);

        if (fs.existsSync(destination) && !isDirectoryEmpty(destination)) {
            const existing = listDirectoryEntries(destination);

            console.log(`
⚠️  WARNING: The folder '${projectName}' already exists and is not empty.
   It has ${existing.length} item(s). Template files will be added here
   and may replace files with the same name.
`);

            const answer = readline.question(
                "Continue anyway? Type YES to confirm: "
            );

            if (answer.trim().toUpperCase() !== "YES") {
                console.log("Cancelled.");
                return;
            }
        }
    }

    fs.cpSync(
        templatePath,
        destination,
        {
            recursive: true
        }
    );

    console.log(`
✅ Project created

📁 ${path.basename(destination)}
`);
};

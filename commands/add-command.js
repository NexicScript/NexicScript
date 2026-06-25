const fs = require("fs");
const path = require("path");

const {
    findAddonByInput
} = require("../lib/addon-catalog");

function listDirectoryEntries(dirPath) {
    return fs.readdirSync(dirPath, { withFileTypes: true })
        .filter(entry => entry.name !== ".git")
        .map(entry => entry.isDirectory() ? `${entry.name}/` : entry.name);
}

function ensureParentDir(filePath) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

module.exports = (addonName) => {
    if (!addonName) {
        console.log("Please add an add-on name. Example: nxs add testing");
        console.log("Use 'nxs list add' to see available add-ons.");
        return;
    }

    const addon = findAddonByInput(addonName);

    if (!addon) {
        console.log(`Add-on '${addonName}' was not found.`);
        console.log("Use 'nxs list add' to see available add-ons.");
        return;
    }

    const destination = process.cwd();
    const existing = listDirectoryEntries(destination);

    if (existing.length > 0) {
        console.log(`\nApplying '${addon.label}' to the current project.`);
        console.log(`Working folder: ${destination}`);
    }

    for (const file of addon.files || []) {
        const filePath = path.join(destination, file.path);
        ensureParentDir(filePath);

        if (fs.existsSync(filePath)) {
            continue;
        }

        fs.writeFileSync(filePath, file.content || "", "utf8");
    }

    console.log(`\n✅ Add-on applied: ${addon.label}`);
};

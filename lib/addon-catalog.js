const fs = require("fs");
const path = require("path");

const ADDONS_PATH = path.join(__dirname, "..", "data", "project-addons.json");

function readAddons() {
    const raw = fs.readFileSync(ADDONS_PATH, "utf8");
    return JSON.parse(raw);
}

function normalize(value) {
    return String(value || "").trim().toLowerCase();
}

function addonMatches(addon, value) {
    const normalized = normalize(value);

    if (!normalized) {
        return false;
    }

    const aliases = Array.isArray(addon.aliases) ? addon.aliases : [];

    return (
        normalize(addon.id) === normalized ||
        normalize(addon.label) === normalized ||
        aliases.some(alias => normalize(alias) === normalized)
    );
}

function getAddons() {
    return readAddons();
}

function findAddonByInput(input) {
    const normalized = normalize(input);

    if (!normalized) {
        return null;
    }

    return getAddons().find(addon => addonMatches(addon, normalized)) || null;
}

module.exports = {
    getAddons,
    findAddonByInput
};

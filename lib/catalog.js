const fs = require("fs");
const path = require("path");

const CATALOG_PATH = path.join(__dirname, "..", "data", "categories.json");

function readCatalog() {
    const raw = fs.readFileSync(CATALOG_PATH, "utf8");
    const categories = JSON.parse(raw);

    return categories.map(category => ({
        ...category,
        templates: category.templates.map(template => ({
            ...template,
            categoryId: category.id,
            categoryLabel: category.label,
            packageName: category.packageName,
            localPackageFolder: category.localPackageFolder
        }))
    }));
}

function normalize(value) {
    return String(value || "").trim().toLowerCase();
}

function templateMatches(template, value) {
    const normalized = normalize(value);

    if (!normalized) {
        return false;
    }

    const aliases = Array.isArray(template.aliases) ? template.aliases : [];

    return (
        normalize(template.id) === normalized ||
        normalize(template.label) === normalized ||
        aliases.some(alias => normalize(alias) === normalized)
    );
}

function getCategories() {
    return readCatalog();
}

function getCategoryById(categoryId) {
    return getCategories().find(category => category.id === categoryId) || null;
}

function findCategoryByInput(input) {
    const normalized = normalize(input);

    if (!normalized) {
        return null;
    }

    return getCategories().find(category => {
        const id = normalize(category.id);
        const label = normalize(category.label);
        const packageName = normalize(category.packageName);
        const folder = normalize(category.localPackageFolder);

        return (
            id === normalized ||
            label === normalized ||
            packageName === normalized ||
            folder === normalized ||
            folder.replace(/^template-/, "") === normalized ||
            packageName.replace("@nexicscript/", "") === normalized
        );
    }) || null;
}

function getAllTemplates() {
    return getCategories().flatMap(category => category.templates);
}

function findTemplate(templateId) {
    const normalized = normalize(templateId);
    return getAllTemplates().find(template => templateMatches(template, normalized)) || null;
}

function findCategoryForTemplate(templateId) {
    const normalized = normalize(templateId);

    return getCategories().find(category =>
        category.templates.some(template => templateMatches(template, normalized))
    ) || null;
}

module.exports = {
    getCategories,
    getCategoryById,
    getAllTemplates,
    findTemplate,
    findCategoryForTemplate,
    findCategoryByInput
};

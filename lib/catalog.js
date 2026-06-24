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

function getCategories() {
    return readCatalog();
}

function getCategoryById(categoryId) {
    return getCategories().find(category => category.id === categoryId) || null;
}

function getAllTemplates() {
    return getCategories().flatMap(category => category.templates);
}

function findTemplate(templateId) {
    return getAllTemplates().find(template => template.id === templateId) || null;
}

function findCategoryForTemplate(templateId) {
    return getCategories().find(category =>
        category.templates.some(template => template.id === templateId)
    ) || null;
}

module.exports = {
    getCategories,
    getCategoryById,
    getAllTemplates,
    findTemplate,
    findCategoryForTemplate
};

const {
    getCategories,
    findCategoryByInput
} = require("../lib/catalog");

const {
    getAddons
} = require("../lib/addon-catalog");

function parseCategoryFilter(input) {
    const value = String(input || "").trim();

    if (!value) {
        return null;
    }

    if (value.startsWith("--category=")) {
        return value.slice("--category=".length);
    }

    return value;
}

function printCategory(category) {
    console.log(`${category.label} (${category.id})`);
    console.log(`  ${category.description}`);
    console.log(`  Package: ${category.packageName}`);

    for (const template of category.templates) {
        console.log(`  - ${template.id} | ${template.label} - ${template.description}`);
    }

    console.log("");
}

function printAddons() {
    const addons = getAddons();

    console.log("Add-ons for existing projects:\n");

    for (const addon of addons) {
        console.log(`- ${addon.id} | ${addon.label} - ${addon.description}`);
    }

    console.log("");
}

module.exports = (args = []) => {
    const tokens = Array.isArray(args) ? args : [];
    const categoryArgIndex = tokens.findIndex(token => token === "--category" || token === "-c");
    const categoryFilter = categoryArgIndex >= 0 ? tokens[categoryArgIndex + 1] : parseCategoryFilter(tokens[0]);
    const showAddons = tokens[0] === "add" || tokens.includes("--addons");

    if (showAddons) {
        printAddons();
        console.log("Usage:\n  nxs list add\n");
        return;
    }

    if (categoryFilter && !String(categoryFilter).startsWith("--")) {
        const category = findCategoryByInput(categoryFilter);

        if (!category) {
            console.log(`Category '${categoryFilter}' was not found.`);
            console.log("Use 'nxs list' to see all categories.");
            return;
        }

        console.log(`\nTemplates in ${category.label}:\n`);
        printCategory(category);
        console.log("Usage:\n  nxs create <template>\n  nxs install <category>\n");
        return;
    }

    const categories = getCategories();

    console.log("\nAvailable template categories:\n");

    for (const category of categories) {
        printCategory(category);
    }

    printAddons();

    console.log("Usage:\n  nxs list\n  nxs list --category backend\n  nxs list add\n  nxs add testing\n");
};

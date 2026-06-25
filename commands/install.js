const {
    getCategories
} = require("../lib/catalog");

const {
    ensureCategoryPackage
} = require("../lib/package-manager");

function findCategoryByInput(input) {
    const value = String(input || "").trim().toLowerCase();

    if (!value) {
        return null;
    }

    const categories = getCategories();

    return categories.find(category => {
        const id = category.id.toLowerCase();
        const label = category.label.toLowerCase();
        const packageName = category.packageName.toLowerCase();
        const folder = String(category.localPackageFolder || "").toLowerCase();

        return (
            id === value ||
            label === value ||
            packageName === value ||
            folder === value ||
            folder.replace(/^template-/, "") === value ||
            packageName.replace("@nexicscript/", "") === value
        );
    }) || null;
}

function listCategories() {
    const categories = getCategories();

    console.log(`
Available categories:
`);

    for (const category of categories) {
        console.log(`- ${category.id} (${category.label}) - ${category.packageName}`);
    }

    console.log(`
Usage:
  nxs install <category>

Examples:
  nxs install web
  nxs install backend
  nxs install scripting
  nxs install games
  nxs install all
`);
}

module.exports = (categoryName) => {
    if (!categoryName) {
        listCategories();
        return;
    }

    if (String(categoryName).toLowerCase() === "all") {
        const categories = getCategories();

        console.log("Installing all template categories...\n");

        for (const category of categories) {
            const state = ensureCategoryPackage(category);
            const status = state.installed ? "installed" : `ready (${state.source})`;
            console.log(`- ${category.label}: ${status}`);
        }

        console.log("\nAll categories are ready.");
        return;
    }

    const category = findCategoryByInput(categoryName);

    if (!category) {
        console.log(`Category '${categoryName}' was not found.`);
        listCategories();
        return;
    }

    const state = ensureCategoryPackage(category);
    const status = state.installed ? "installed" : `ready (${state.source})`;

    console.log(`
Category '${category.label}' is ${status}.`);
    console.log(`Package: ${category.packageName}`);
    console.log(`Templates: ${category.templates.length}`);
};

const inquirer = require("inquirer").default;

const {
    getCategories
} = require("../lib/catalog");

const {
    printBanner
} = require("../lib/display");

const {
    ensureCategoryPackage,
    resolveTemplateSource
} = require("../lib/package-manager");

function formatTemplateChoices(category) {
    return category.templates.map(template => ({
        name: `${template.label} (${template.id})`,
        value: template.id,
        short: template.label
    }));
}

module.exports = async () => {
    console.clear();
    printBanner();

    const categories = getCategories();

    const categoryAnswer = await inquirer.prompt([
        {
            type: "select",
            name: "category",
            message: "Pick a template category",
            choices: categories.map(category => ({
                name: `${category.label} - ${category.description}`,
                value: category.id,
                short: category.label
            }))
        }
    ]);

    const category = categories.find(item => item.id === categoryAnswer.category);

    if (!category) {
        console.log("Category not found.");
        return;
    }

    ensureCategoryPackage(category);

    const templateAnswer = await inquirer.prompt([
        {
            type: "select",
            name: "template",
            message: `Pick a template from ${category.label}`,
            choices: formatTemplateChoices(category)
        }
    ]);

    const template = category.templates.find(item => item.id === templateAnswer.template);
    const templatePath = resolveTemplateSource(template.id);

    if (!templatePath) {
        console.log(`Template '${template.id}' is not available yet.`);
        return;
    }

    console.log("");
    require("./create")(template.id);
};
const fs = require("fs");
const path = require("path");

const {
    findTemplate,
    findCategoryForTemplate
} = require("../lib/catalog");

const {
    resolveTemplateSource
} = require("../lib/package-manager");

module.exports = (templateName) => {
    if (!templateName) {
        console.log("Please add a template name. Example: nxs info web-basic");
        return;
    }

    const template = findTemplate(templateName);
    const category = findCategoryForTemplate(templateName);

    if (!template || !category) {
        console.log(`Template '${templateName}' was not found.`);
        return;
    }

    const templatePath = resolveTemplateSource(template.id);
    const templateJson = path.join(templatePath || "", "template.json");
    let templateDetails = null;

    if (templatePath && fs.existsSync(templateJson)) {
        templateDetails = JSON.parse(fs.readFileSync(templateJson, "utf8"));
    }

    const name = templateDetails?.name || template.label;
    const version = templateDetails?.version || "1.0.0";
    const author = templateDetails?.author || "NXS";
    const description = templateDetails?.description || template.description;

    console.log(`
═══════════════════════════════
         TEMPLATE INFO
═══════════════════════════════

Name:
${name}

Version:
${version}

Author:
${author}

Category:
${category.label}

Package:
${category.packageName}

About:
${description}

`);
};

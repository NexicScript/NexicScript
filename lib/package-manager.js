const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const {
    findCategoryForTemplate
} = require("./catalog");

const CACHE_ROOT = path.join(os.homedir(), ".nexicscript", "template-packages");
const CACHE_NODE_MODULES = path.join(CACHE_ROOT, "node_modules");
const REPO_ROOT = path.join(__dirname, "..");

function getLocalPackageRoot(category) {
    if (!category || !category.localPackageFolder) {
        return null;
    }

    const localRoot = path.join(REPO_ROOT, "packages", category.localPackageFolder);

    return fs.existsSync(localRoot) ? localRoot : null;
}

function getRepositoryTemplateRoot(templateId) {
    const templateRoot = path.join(REPO_ROOT, "templates", templateId);

    return fs.existsSync(templateRoot) ? templateRoot : null;
}

function getInstalledPackageRoot(packageName) {
    try {
        const packageJsonPath = require.resolve(
            `${packageName}/package.json`,
            {
                paths: [CACHE_NODE_MODULES]
            }
        );

        return path.dirname(packageJsonPath);
    } catch {
        return null;
    }
}

function installPackage(packageName) {
    fs.mkdirSync(CACHE_ROOT, { recursive: true });

    const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
    const result = spawnSync(
        npmCommand,
        [
            "install",
            "--silent",
            "--no-audit",
            "--no-fund",
            "--prefer-offline",
            "--prefix",
            CACHE_ROOT,
            packageName
        ],
        {
            stdio: "ignore"
        }
    );

    if (result.status !== 0) {
        throw new Error(`Unable to install ${packageName}.`);
    }

    return getInstalledPackageRoot(packageName);
}

function resolveCategoryPackageRoot(category) {
    const localRoot = getLocalPackageRoot(category);

    if (localRoot) {
        return localRoot;
    }

    const installedRoot = getInstalledPackageRoot(category.packageName);

    if (installedRoot) {
        return installedRoot;
    }

    return installPackage(category.packageName);
}

function resolveTemplateSource(templateId) {
    const category = findCategoryForTemplate(templateId);

    if (!category) {
        return null;
    }

    const repositoryTemplateRoot = getRepositoryTemplateRoot(templateId);

    if (repositoryTemplateRoot) {
        return repositoryTemplateRoot;
    }

    const packageRoot = resolveCategoryPackageRoot(category);

    if (!packageRoot) {
        return null;
    }

    const templateRoot = path.join(packageRoot, "templates", templateId);

    return fs.existsSync(templateRoot) ? templateRoot : null;
}

module.exports = {
    CACHE_ROOT,
    getLocalPackageRoot,
    getInstalledPackageRoot,
    installPackage,
    resolveCategoryPackageRoot,
    resolveTemplateSource
};

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

function readJson(relPath) {
    const raw = fs.readFileSync(path.join(root, relPath), "utf8").replace(/^\uFEFF/, "");
    return JSON.parse(raw);
}

function writeJson(relPath, value) {
    fs.writeFileSync(
        path.join(root, relPath),
        `${JSON.stringify(value, null, 2)}\n`,
        "utf8"
    );
}

function ensureDir(relPath) {
    fs.mkdirSync(path.join(root, relPath), { recursive: true });
}

function writeFile(relPath, content) {
    const fullPath = path.join(root, relPath);
    ensureDir(path.dirname(relPath));
    fs.writeFileSync(fullPath, content, "utf8");
}

function templateManifest(name, description) {
    return {
        name,
        version: "1.0.0",
        author: "NXS",
        description
    };
}

function buildReadme(title, description, structureLines) {
    return `# ${title}\n\n${description}\n\n## Structure\n\n\`\`\`\n${structureLines.join("\n")}\n\`\`\`\n`;
}

function basicPackageJson(name, description, extra = {}) {
    return {
        name,
        private: true,
        version: "0.1.0",
        description,
        scripts: {
            start: extra.start || "node index.js",
            test: extra.test || "echo \"No tests yet\""
        },
        ...extra.override
    };
}

function createTemplate(relDir, files) {
    for (const [filePath, content] of Object.entries(files)) {
        writeFile(path.join("templates", relDir, filePath), content);
    }
}

const categories = [
    {
        id: "web",
        label: "Web",
        description: "Frontend sites and browser-focused starters.",
        packageName: "@nexicscript/template-web",
        localPackageFolder: "template-web",
        templates: [
            {
                id: "web-basic",
                label: "Web Basic",
                description: "Simple HTML, CSS, and JavaScript starter.",
                aliases: ["html", "static-web"]
            },
            {
                id: "react-app",
                label: "React App",
                description: "React single-page app with Vite structure.",
                aliases: ["react", "spa"]
            },
            {
                id: "static-multi-page",
                label: "Static Multi Page",
                description: "Traditional multi-page static website.",
                aliases: ["multi-page", "static-site"]
            },
            {
                id: "vue-app",
                label: "Vue App",
                description: "Vue 3 Vite starter with router and stores folders.",
                aliases: ["vue", "vue3"]
            },
            {
                id: "nextjs-app",
                label: "Next.js App",
                description: "Next.js app router starter with API routes.",
                aliases: ["next", "nextjs"]
            },
            {
                id: "svelte-app",
                label: "Svelte App",
                description: "Svelte starter with a clean Vite structure.",
                aliases: ["svelte"]
            }
        ]
    },
    {
        id: "backend",
        label: "Backend",
        description: "APIs, services, and bot-oriented starters.",
        packageName: "@nexicscript/template-backend",
        localPackageFolder: "template-backend",
        templates: [
            {
                id: "node-api",
                label: "Node API",
                description: "Express-style backend API starter with extra structure options.",
                aliases: ["api", "rest-api", "graphql-api"],
                prompts: [
                    {
                        id: "api_mode",
                        message: "Choose the API style",
                        type: "select",
                        choices: [
                            {
                                name: "REST API",
                                value: "rest",
                                short: "REST"
                            },
                            {
                                name: "GraphQL API",
                                value: "graphql",
                                short: "GraphQL"
                            }
                        ]
                    }
                ],
                variants: {
                    rest: {
                        folders: ["routes", "controllers", "models"],
                        files: [
                            {
                                path: "routes/README.md",
                                content: "# Routes\n\nPlace REST route definitions here.\n"
                            },
                            {
                                path: "controllers/README.md",
                                content: "# Controllers\n\nPlace REST controller logic here.\n"
                            },
                            {
                                path: "models/README.md",
                                content: "# Models\n\nPlace data models here.\n"
                            }
                        ]
                    },
                    graphql: {
                        folders: ["schema", "resolvers", "models"],
                        files: [
                            {
                                path: "schema/README.md",
                                content: "# Schema\n\nPlace GraphQL schema definitions here.\n"
                            },
                            {
                                path: "resolvers/README.md",
                                content: "# Resolvers\n\nPlace GraphQL resolver logic here.\n"
                            },
                            {
                                path: "models/README.md",
                                content: "# Models\n\nPlace shared data models here.\n"
                            }
                        ]
                    }
                }
            },
            {
                id: "fullstack",
                label: "Fullstack",
                description: "Frontend and backend in one structure.",
                aliases: ["full-stack"]
            },
            {
                id: "discord-bot",
                label: "Discord Bot",
                description: "Discord bot project starter.",
                aliases: ["discord", "bot"]
            },
            {
                id: "rest-api-typescript",
                label: "REST API TypeScript",
                description: "TypeScript REST API starter with routes and services.",
                aliases: ["typescript-api", "rest-ts"]
            },
            {
                id: "graphql-api",
                label: "GraphQL API",
                description: "GraphQL API starter with schema and resolvers.",
                aliases: ["graphql"]
            },
            {
                id: "microservice",
                label: "Microservice",
                description: "Docker-ready microservice starter.",
                aliases: ["service", "micro-service"]
            }
        ]
    },
    {
        id: "scripting",
        label: "Scripting",
        description: "Scripts and small command-line tools.",
        packageName: "@nexicscript/template-scripting",
        localPackageFolder: "template-scripting",
        templates: [
            {
                id: "python-script",
                label: "Python Script",
                description: "Python script project starter.",
                aliases: ["python"]
            },
            {
                id: "cli-tool",
                label: "CLI Tool",
                description: "Command-line utility starter.",
                aliases: ["command-line", "tool"]
            }
        ]
    },
    {
        id: "games",
        label: "Games",
        description: "Game-related project starters.",
        packageName: "@nexicscript/template-games",
        localPackageFolder: "template-games",
        templates: [
            {
                id: "roblox-game",
                label: "Roblox Game",
                description: "Roblox project starter using Rojo.",
                aliases: ["roblox", "rojo"]
            },
            {
                id: "unity-game",
                label: "Unity Game",
                description: "Unity project starter with Assets, Scenes, and Scripts.",
                aliases: ["unity"]
            },
            {
                id: "godot-game",
                label: "Godot Game",
                description: "Godot starter for Glunokcraft-style projects.",
                aliases: ["godot", "glunokcraft"]
            },
            {
                id: "pygame-game",
                label: "Pygame Game",
                description: "Python game starter with sprites, sounds, and levels.",
                aliases: ["pygame", "python-game"]
            }
        ]
    },
    {
        id: "mobile",
        label: "Mobile",
        description: "Mobile app starters for native and cross-platform apps.",
        packageName: "@nexicscript/template-mobile",
        localPackageFolder: "template-mobile",
        templates: [
            {
                id: "react-native-app",
                label: "React Native App",
                description: "React Native starter with navigation and assets.",
                aliases: ["react-native", "rn"]
            },
            {
                id: "flutter-app",
                label: "Flutter App",
                description: "Flutter starter with screens, widgets, and models.",
                aliases: ["flutter", "dart"]
            }
        ]
    },
    {
        id: "data",
        label: "Data",
        description: "Data science and machine learning project starters.",
        packageName: "@nexicscript/template-data",
        localPackageFolder: "template-data",
        templates: [
            {
                id: "data-science",
                label: "Data Science",
                description: "Data science project starter with notebooks and models.",
                aliases: ["data", "analysis"]
            },
            {
                id: "ml-model",
                label: "ML Model",
                description: "Machine learning project starter with training and utility files.",
                aliases: ["machine-learning", "ml"]
            }
        ]
    },
    {
        id: "advanced",
        label: "Advanced",
        description: "Specialized starters for extensions, desktop apps, and workspaces.",
        packageName: "@nexicscript/template-advanced",
        localPackageFolder: "template-advanced",
        templates: [
            {
                id: "chrome-extension",
                label: "Chrome Extension",
                description: "Browser extension starter with manifest and content scripts.",
                aliases: ["extension"]
            },
            {
                id: "electron-app",
                label: "Electron App",
                description: "Desktop app starter with main and preload processes.",
                aliases: ["electron", "desktop"]
            },
            {
                id: "monorepo",
                label: "Monorepo",
                description: "Workspace starter with apps and shared packages.",
                aliases: ["workspace", "mono"]
            },
            {
                id: "library-npm",
                label: "Library NPM",
                description: "Publishable npm library starter.",
                aliases: ["library", "package"]
            }
        ]
    }
];

const templateFiles = {
    "web-basic": {
        "template.json": JSON.stringify(templateManifest("web-basic", "Simple HTML, CSS, and JavaScript starter."), null, 2) + "\n",
        "README.md": buildReadme("Web Basic", "Simple HTML, CSS, and JavaScript starter.", [
            "web-basic/",
            "  index.html",
            "  css/style.css",
            "  js/script.js",
            "  assets/images/README.md",
            "  assets/fonts/README.md"
        ])
    },
    "react-app": {
        "template.json": JSON.stringify(templateManifest("react-app", "React SPA project using Vite structure."), null, 2) + "\n",
        "README.md": buildReadme("React App", "React single-page app starter using Vite.", [
            "react-app/",
            "  index.html",
            "  package.json",
            "  vite.config.js",
            "  src/main.jsx",
            "  src/App.jsx"
        ])
    },
    "static-multi-page": {
        "template.json": JSON.stringify(templateManifest("static-multi-page", "Traditional multi-page static website."), null, 2) + "\n",
        "README.md": buildReadme("Static Multi Page", "Traditional multi-page static website starter.", [
            "static-multi-page/",
            "  index.html",
            "  pages/about.html",
            "  pages/contact.html",
            "  css/",
            "  js/"
        ])
    },
    "vue-app": {
        "template.json": JSON.stringify(templateManifest("vue-app", "Vue 3 Vite starter with router and stores folders."), null, 2) + "\n",
        "README.md": buildReadme("Vue App", "Vue 3 Vite starter with router and stores folders.", [
            "vue-app/",
            "  index.html",
            "  package.json",
            "  vite.config.js",
            "  src/main.js",
            "  src/App.vue",
            "  src/components/",
            "  src/views/",
            "  src/router/",
            "  src/stores/",
            "  public/"
        ]),
        "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Vue App</title>\n  </head>\n  <body>\n    <div id=\"app\"></div>\n    <script type=\"module\" src=\"/src/main.js\"></script>\n  </body>\n</html>\n",
        "package.json": JSON.stringify(basicPackageJson("vue-app", "Vue app starter using Vite.", {
            override: {
                type: "module",
                scripts: {
                    dev: "vite",
                    build: "vite build",
                    preview: "vite preview"
                }
            }
        }), null, 2) + "\n",
        "vite.config.js": "import { defineConfig } from 'vite';\nimport vue from '@vitejs/plugin-vue';\n\nexport default defineConfig({\n  plugins: [vue()]\n});\n",
        "src/main.js": "import { createApp } from 'vue';\nimport App from './App.vue';\n\ncreateApp(App).mount('#app');\n",
        "src/App.vue": "<template>\n  <main>\n    <h1>Vue App</h1>\n  </main>\n</template>\n",
        "src/components/README.md": "# Components\n\nPlace shared Vue components here.\n",
        "src/views/README.md": "# Views\n\nPlace route-level Vue views here.\n",
        "src/router/README.md": "# Router\n\nPlace Vue Router configuration here.\n",
        "src/stores/README.md": "# Stores\n\nPlace state stores here.\n",
        "public/README.md": "# Public Assets\n\nPlace static public files here.\n"
    },
    "nextjs-app": {
        "template.json": JSON.stringify(templateManifest("nextjs-app", "Next.js app router starter with API routes."), null, 2) + "\n",
        "README.md": buildReadme("Next.js App", "Next.js app router starter with API routes.", [
            "nextjs-app/",
            "  package.json",
            "  next.config.js",
            "  app/layout.tsx",
            "  app/page.tsx",
            "  app/api/",
            "  components/",
            "  public/",
            "  styles/"
        ]),
        "package.json": JSON.stringify(basicPackageJson("nextjs-app", "Next.js app router starter.", {
            override: {
                scripts: {
                    dev: "next dev",
                    build: "next build",
                    start: "next start"
                }
            }
        }), null, 2) + "\n",
        "next.config.js": "const nextConfig = {};\n\nmodule.exports = nextConfig;\n",
        "app/layout.tsx": "export default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang=\"en\">\n      <body>{children}</body>\n    </html>\n  );\n}\n",
        "app/page.tsx": "export default function Page() {\n  return <main>Next.js App</main>;\n}\n",
        "app/api/README.md": "# API Routes\n\nPlace route handlers here.\n",
        "components/README.md": "# Components\n\nPlace reusable components here.\n",
        "public/README.md": "# Public Assets\n\nPlace static files here.\n",
        "styles/README.md": "# Styles\n\nPlace shared style files here.\n"
    },
    "svelte-app": {
        "template.json": JSON.stringify(templateManifest("svelte-app", "Svelte starter with a clean Vite structure."), null, 2) + "\n",
        "README.md": buildReadme("Svelte App", "Svelte starter with a clean Vite structure.", [
            "svelte-app/",
            "  package.json",
            "  vite.config.js",
            "  src/main.js",
            "  src/App.svelte",
            "  src/lib/",
            "  src/routes/",
            "  public/"
        ]),
        "package.json": JSON.stringify(basicPackageJson("svelte-app", "Svelte app starter using Vite.", {
            override: {
                type: "module",
                scripts: {
                    dev: "vite",
                    build: "vite build",
                    preview: "vite preview"
                }
            }
        }), null, 2) + "\n",
        "vite.config.js": "import { defineConfig } from 'vite';\nimport { svelte } from '@sveltejs/vite-plugin-svelte';\n\nexport default defineConfig({\n  plugins: [svelte()]\n});\n",
        "src/main.js": "import App from './App.svelte';\n\nconst app = new App({ target: document.body });\n\nexport default app;\n",
        "src/App.svelte": "<main>\n  <h1>Svelte App</h1>\n</main>\n",
        "src/lib/README.md": "# Lib\n\nPlace reusable Svelte modules here.\n",
        "src/routes/README.md": "# Routes\n\nPlace page route modules here.\n",
        "public/README.md": "# Public Assets\n\nPlace static files here.\n"
    },
    "node-api": {
        "template.json": JSON.stringify(templateManifest("node-api", "Express-style backend API starter with extra structure options."), null, 2) + "\n",
        "README.md": buildReadme("Node API", "Express-style backend API starter with extra structure options.", [
            "node-api/",
            "  package.json",
            "  server.js",
            "  .env",
            "  controllers/",
            "  middleware/",
            "  models/",
            "  routes/"
        ]),
        "package.json": JSON.stringify(basicPackageJson("node-api", "Express-style API starter.", {
            override: {
                scripts: {
                    start: "node server.js",
                    dev: "node server.js"
                }
            }
        }), null, 2) + "\n",
        "server.js": "console.log('Node API starter');\n",
        ".env": "PORT=3000\n",
        "controllers/README.md": "# Controllers\n\nPlace controller functions here.\n",
        "middleware/README.md": "# Middleware\n\nPlace middleware here.\n",
        "models/README.md": "# Models\n\nPlace models here.\n",
        "routes/README.md": "# Routes\n\nPlace route files here.\n"
    },
    "fullstack": {
        "template.json": JSON.stringify(templateManifest("fullstack", "Frontend and backend in one structure."), null, 2) + "\n",
        "README.md": buildReadme("Fullstack", "Frontend and backend in one structure.", [
            "fullstack/",
            "  client/",
            "  server/",
            "  package.json"
        ])
    },
    "discord-bot": {
        "template.json": JSON.stringify(templateManifest("discord-bot", "Discord bot project starter."), null, 2) + "\n",
        "README.md": buildReadme("Discord Bot", "Discord bot project starter.", [
            "discord-bot/",
            "  package.json",
            "  index.js",
            "  commands/",
            "  events/",
            "  config.json"
        ])
    },
    "rest-api-typescript": {
        "template.json": JSON.stringify(templateManifest("rest-api-typescript", "TypeScript REST API starter with routes and services."), null, 2) + "\n",
        "README.md": buildReadme("REST API TypeScript", "TypeScript REST API starter with routes and services.", [
            "rest-api-typescript/",
            "  package.json",
            "  tsconfig.json",
            "  src/index.ts",
            "  src/routes/",
            "  src/controllers/",
            "  src/services/",
            "  src/types/",
            "  .env"
        ]),
        "package.json": JSON.stringify(basicPackageJson("rest-api-typescript", "TypeScript REST API starter.", {
            override: {
                scripts: {
                    dev: "ts-node src/index.ts",
                    build: "tsc"
                }
            }
        }), null, 2) + "\n",
        "tsconfig.json": JSON.stringify({
            compilerOptions: {
                target: "ES2020",
                module: "commonjs",
                outDir: "dist",
                rootDir: "src",
                strict: true
            }
        }, null, 2) + "\n",
        "src/index.ts": "console.log('REST API TypeScript starter');\n",
        "src/routes/README.md": "# Routes\n\nPlace TypeScript route definitions here.\n",
        "src/controllers/README.md": "# Controllers\n\nPlace TypeScript controllers here.\n",
        "src/services/README.md": "# Services\n\nPlace service logic here.\n",
        "src/types/README.md": "# Types\n\nPlace shared types here.\n",
        ".env": "PORT=3000\n"
    },
    "graphql-api": {
        "template.json": JSON.stringify(templateManifest("graphql-api", "GraphQL API starter with schema and resolvers."), null, 2) + "\n",
        "README.md": buildReadme("GraphQL API", "GraphQL API starter with schema and resolvers.", [
            "graphql-api/",
            "  package.json",
            "  src/index.js",
            "  src/schema/",
            "  src/resolvers/",
            "  src/models/"
        ]),
        "package.json": JSON.stringify(basicPackageJson("graphql-api", "GraphQL API starter.", {
            override: {
                scripts: {
                    start: "node src/index.js",
                    dev: "node src/index.js"
                }
            }
        }), null, 2) + "\n",
        "src/index.js": "console.log('GraphQL API starter');\n",
        "src/schema/README.md": "# Schema\n\nPlace GraphQL schema definitions here.\n",
        "src/resolvers/README.md": "# Resolvers\n\nPlace GraphQL resolver functions here.\n",
        "src/models/README.md": "# Models\n\nPlace shared models here.\n"
    },
    "microservice": {
        "template.json": JSON.stringify(templateManifest("microservice", "Docker-ready microservice starter."), null, 2) + "\n",
        "README.md": buildReadme("Microservice", "Docker-ready microservice starter.", [
            "microservice/",
            "  package.json",
            "  Dockerfile",
            "  docker-compose.yml",
            "  src/index.js",
            "  src/handlers/",
            "  src/config/"
        ]),
        "package.json": JSON.stringify(basicPackageJson("microservice", "Microservice starter.", {
            override: {
                scripts: {
                    start: "node src/index.js",
                    dev: "node src/index.js"
                }
            }
        }), null, 2) + "\n",
        "Dockerfile": "FROM node:20-alpine\nWORKDIR /app\nCOPY . .\nCMD [\"node\", \"src/index.js\"]\n",
        "docker-compose.yml": "services:\n  app:\n    build: .\n    command: node src/index.js\n",
        "src/index.js": "console.log('Microservice starter');\n",
        "src/handlers/README.md": "# Handlers\n\nPlace service handlers here.\n",
        "src/config/README.md": "# Config\n\nPlace config files here.\n"
    },
    "python-script": {
        "template.json": JSON.stringify(templateManifest("python-script", "Python script project starter."), null, 2) + "\n",
        "README.md": buildReadme("Python Script", "Python script project starter.", [
            "python-script/",
            "  main.py",
            "  requirements.txt",
            "  data/",
            "  utils/"
        ])
    },
    "cli-tool": {
        "template.json": JSON.stringify(templateManifest("cli-tool", "Command-line utility starter."), null, 2) + "\n",
        "README.md": buildReadme("CLI Tool", "Command-line utility starter.", [
            "cli-tool/",
            "  package.json",
            "  bin/cli.js",
            "  src/commands/"
        ])
    },
    "roblox-game": {
        "template.json": JSON.stringify(templateManifest("roblox-game", "Roblox project starter using Rojo."), null, 2) + "\n",
        "README.md": buildReadme("Roblox Game", "Roblox project starter using Rojo.", [
            "roblox-game/",
            "  default.project.json",
            "  src/ReplicatedStorage/",
            "  src/ServerScriptService/",
            "  src/StarterGui/",
            "  src/StarterPlayerScripts/"
        ])
    },
    "unity-game": {
        "template.json": JSON.stringify(templateManifest("unity-game", "Unity project starter with Assets, Scenes, and Scripts."), null, 2) + "\n",
        "README.md": buildReadme("Unity Game", "Unity project starter with Assets, Scenes, and Scripts.", [
            "unity-game/",
            "  Assets/Scripts/",
            "  Assets/Scenes/",
            "  Assets/Prefabs/",
            "  Assets/Art/",
            "  Packages/",
            "  ProjectSettings/"
        ]),
        "Assets/Scripts/README.md": "# Scripts\n\nPlace Unity C# scripts here.\n",
        "Assets/Scenes/README.md": "# Scenes\n\nPlace Unity scenes here.\n",
        "Assets/Prefabs/README.md": "# Prefabs\n\nPlace Unity prefabs here.\n",
        "Assets/Art/README.md": "# Art\n\nPlace Unity art assets here.\n",
        "Packages/README.md": "# Packages\n\nPlace Unity package notes here.\n",
        "ProjectSettings/README.md": "# Project Settings\n\nPlace Unity project settings notes here.\n"
    },
    "godot-game": {
        "template.json": JSON.stringify(templateManifest("godot-game", "Godot starter for Glunokcraft-style projects."), null, 2) + "\n",
        "README.md": buildReadme("Godot Game", "Godot starter for Glunokcraft-style projects.", [
            "godot-game/",
            "  project.godot",
            "  scenes/",
            "  scripts/",
            "  assets/sprites/",
            "  assets/audio/",
            "  addons/"
        ]),
        "project.godot": "[application]\nconfig/name=\"Godot Game\"\n",
        "scenes/README.md": "# Scenes\n\nPlace Godot scenes here.\n",
        "scripts/README.md": "# Scripts\n\nPlace Godot scripts here.\n",
        "assets/sprites/README.md": "# Sprites\n\nPlace Godot sprite assets here.\n",
        "assets/audio/README.md": "# Audio\n\nPlace Godot audio assets here.\n",
        "addons/README.md": "# Addons\n\nPlace Godot addons here.\n"
    },
    "pygame-game": {
        "template.json": JSON.stringify(templateManifest("pygame-game", "Python game starter with sprites, sounds, and levels."), null, 2) + "\n",
        "README.md": buildReadme("Pygame Game", "Python game starter with sprites, sounds, and levels.", [
            "pygame-game/",
            "  main.py",
            "  requirements.txt",
            "  sprites/",
            "  sounds/",
            "  levels/",
            "  src/"
        ]),
        "main.py": "print('Pygame Game starter')\n",
        "requirements.txt": "pygame\n",
        "sprites/README.md": "# Sprites\n\nPlace sprite assets here.\n",
        "sounds/README.md": "# Sounds\n\nPlace sound assets here.\n",
        "levels/README.md": "# Levels\n\nPlace level files here.\n",
        "src/README.md": "# Source\n\nPlace game source files here.\n"
    },
    "react-native-app": {
        "template.json": JSON.stringify(templateManifest("react-native-app", "React Native starter with navigation and assets."), null, 2) + "\n",
        "README.md": buildReadme("React Native App", "React Native starter with navigation and assets.", [
            "react-native-app/",
            "  package.json",
            "  App.js",
            "  src/screens/",
            "  src/components/",
            "  src/navigation/",
            "  src/assets/",
            "  android/",
            "  ios/"
        ]),
        "package.json": JSON.stringify(basicPackageJson("react-native-app", "React Native app starter.", {
            override: {
                scripts: {
                    start: "react-native start",
                    android: "react-native run-android",
                    ios: "react-native run-ios"
                }
            }
        }), null, 2) + "\n",
        "App.js": "import React from 'react';\nimport { Text, View } from 'react-native';\n\nexport default function App() {\n  return <View><Text>React Native App</Text></View>;\n}\n",
        "src/screens/README.md": "# Screens\n\nPlace screen components here.\n",
        "src/components/README.md": "# Components\n\nPlace reusable components here.\n",
        "src/navigation/README.md": "# Navigation\n\nPlace navigation setup here.\n",
        "src/assets/README.md": "# Assets\n\nPlace app assets here.\n",
        "android/README.md": "# Android\n\nPlace Android project notes here.\n",
        "ios/README.md": "# iOS\n\nPlace iOS project notes here.\n"
    },
    "flutter-app": {
        "template.json": JSON.stringify(templateManifest("flutter-app", "Flutter starter with screens, widgets, and models."), null, 2) + "\n",
        "README.md": buildReadme("Flutter App", "Flutter starter with screens, widgets, and models.", [
            "flutter-app/",
            "  pubspec.yaml",
            "  lib/main.dart",
            "  lib/screens/",
            "  lib/widgets/",
            "  lib/models/",
            "  assets/"
        ]),
        "pubspec.yaml": "name: flutter_app\nversion: 0.1.0\n",
        "lib/main.dart": "void main() {\n  print('Flutter App starter');\n}\n",
        "lib/screens/README.md": "# Screens\n\nPlace Flutter screens here.\n",
        "lib/widgets/README.md": "# Widgets\n\nPlace reusable widgets here.\n",
        "lib/models/README.md": "# Models\n\nPlace data models here.\n",
        "assets/README.md": "# Assets\n\nPlace Flutter assets here.\n"
    },
    "data-science": {
        "template.json": JSON.stringify(templateManifest("data-science", "Data science project starter with notebooks and models."), null, 2) + "\n",
        "README.md": buildReadme("Data Science", "Data science project starter with notebooks and models.", [
            "data-science/",
            "  requirements.txt",
            "  data/raw/",
            "  data/processed/",
            "  notebooks/",
            "  src/",
            "  models/"
        ]),
        "requirements.txt": "pandas\nnumpy\njupyter\n",
        "data/raw/README.md": "# Raw Data\n\nPlace raw data files here.\n",
        "data/processed/README.md": "# Processed Data\n\nPlace processed data files here.\n",
        "notebooks/README.md": "# Notebooks\n\nPlace analysis notebooks here.\n",
        "src/README.md": "# Source\n\nPlace data processing code here.\n",
        "models/README.md": "# Models\n\nPlace trained models here.\n"
    },
    "ml-model": {
        "template.json": JSON.stringify(templateManifest("ml-model", "Machine learning project starter with training and utility files."), null, 2) + "\n",
        "README.md": buildReadme("ML Model", "Machine learning project starter with training and utility files.", [
            "ml-model/",
            "  requirements.txt",
            "  data/",
            "  train.py",
            "  models/",
            "  notebooks/",
            "  utils/"
        ]),
        "requirements.txt": "scikit-learn\npandas\nnumpy\n",
        "data/README.md": "# Data\n\nPlace datasets here.\n",
        "train.py": "print('Train ML model starter')\n",
        "models/README.md": "# Models\n\nPlace model artifacts here.\n",
        "notebooks/README.md": "# Notebooks\n\nPlace experiment notebooks here.\n",
        "utils/README.md": "# Utilities\n\nPlace helper code here.\n"
    },
    "chrome-extension": {
        "template.json": JSON.stringify(templateManifest("chrome-extension", "Browser extension starter with manifest and content scripts."), null, 2) + "\n",
        "README.md": buildReadme("Chrome Extension", "Browser extension starter with manifest and content scripts.", [
            "chrome-extension/",
            "  manifest.json",
            "  popup.html",
            "  popup.js",
            "  background.js",
            "  content.js",
            "  icons/"
        ]),
        "manifest.json": JSON.stringify({
            manifest_version: 3,
            name: "NexicScript Extension",
            version: "0.1.0",
            action: {
                default_popup: "popup.html"
            }
        }, null, 2) + "\n",
        "popup.html": "<!doctype html>\n<html lang=\"en\"><body><script src=\"popup.js\"></script></body></html>\n",
        "popup.js": "console.log('Popup loaded');\n",
        "background.js": "console.log('Background loaded');\n",
        "content.js": "console.log('Content loaded');\n",
        "icons/README.md": "# Icons\n\nPlace extension icons here.\n"
    },
    "electron-app": {
        "template.json": JSON.stringify(templateManifest("electron-app", "Desktop app starter with main and preload processes."), null, 2) + "\n",
        "README.md": buildReadme("Electron App", "Desktop app starter with main and preload processes.", [
            "electron-app/",
            "  package.json",
            "  main.js",
            "  preload.js",
            "  src/",
            "  assets/"
        ]),
        "package.json": JSON.stringify(basicPackageJson("electron-app", "Electron desktop app starter.", {
            override: {
                main: "main.js",
                scripts: {
                    start: "electron ."
                }
            }
        }), null, 2) + "\n",
        "main.js": "console.log('Electron app starter');\n",
        "preload.js": "console.log('Preload loaded');\n",
        "src/README.md": "# Source\n\nPlace renderer source files here.\n",
        "assets/README.md": "# Assets\n\nPlace desktop assets here.\n"
    },
    "monorepo": {
        "template.json": JSON.stringify(templateManifest("monorepo", "Workspace starter with apps and shared packages."), null, 2) + "\n",
        "README.md": buildReadme("Monorepo", "Workspace starter with apps and shared packages.", [
            "monorepo/",
            "  package.json",
            "  turbo.json",
            "  apps/web/",
            "  apps/api/",
            "  packages/ui/",
            "  packages/config/"
        ]),
        "package.json": JSON.stringify(basicPackageJson("monorepo", "Workspace starter.", {
            override: {
                private: true,
                workspaces: ["apps/*", "packages/*"],
                scripts: {
                    dev: "turbo dev",
                    build: "turbo build"
                }
            }
        }), null, 2) + "\n",
        "turbo.json": JSON.stringify({
            pipeline: {
                build: {},
                dev: {}
            }
        }, null, 2) + "\n",
        "apps/web/README.md": "# Web App\n\nPlace the web app here.\n",
        "apps/api/README.md": "# API App\n\nPlace the API app here.\n",
        "packages/ui/README.md": "# UI Package\n\nPlace shared UI code here.\n",
        "packages/config/README.md": "# Config Package\n\nPlace shared config here.\n"
    },
    "library-npm": {
        "template.json": JSON.stringify(templateManifest("library-npm", "Publishable npm library starter."), null, 2) + "\n",
        "README.md": buildReadme("Library NPM", "Publishable npm library starter.", [
            "library-npm/",
            "  package.json",
            "  tsconfig.json",
            "  src/index.ts",
            "  dist/",
            "  tests/"
        ]),
        "package.json": JSON.stringify(basicPackageJson("library-npm", "Publishable npm library starter.", {
            override: {
                main: "dist/index.js",
                types: "dist/index.d.ts",
                scripts: {
                    build: "tsc",
                    test: "node --test"
                }
            }
        }), null, 2) + "\n",
        "tsconfig.json": JSON.stringify({
            compilerOptions: {
                target: "ES2020",
                module: "commonjs",
                declaration: true,
                outDir: "dist",
                rootDir: "src"
            }
        }, null, 2) + "\n",
        "src/index.ts": "export const libraryNpm = () => 'NexicScript library starter';\n",
        "dist/README.md": "# Dist\n\nBuild output will appear here.\n",
        "tests/README.md": "# Tests\n\nPlace library tests here.\n"
    }
};

const packageMap = {
    "template-web": ["web-basic", "react-app", "static-multi-page", "vue-app", "nextjs-app", "svelte-app"],
    "template-backend": ["node-api", "fullstack", "discord-bot", "rest-api-typescript", "graphql-api", "microservice"],
    "template-scripting": ["python-script", "cli-tool"],
    "template-games": ["roblox-game", "unity-game", "godot-game", "pygame-game"],
    "template-mobile": ["react-native-app", "flutter-app"],
    "template-data": ["data-science", "ml-model"],
    "template-advanced": ["chrome-extension", "electron-app", "monorepo", "library-npm"]
};

for (const category of categories) {
    const packageRoot = path.join(root, "packages", category.localPackageFolder);
    ensureDir(path.join("packages", category.localPackageFolder));
    writeJson(path.join("packages", category.localPackageFolder, "package.json"), {
        name: category.packageName,
        version: "1.0.0",
        description: `${category.label} templates for NexicScript.`,
        license: "MIT",
        private: false,
        files: ["templates/", "README.md", "package.json"],
        nexicscript: {
            category: category.id,
            label: category.label,
            templates: category.templates.map(template => template.id)
        }
    });

    writeFile(
        path.join("packages", category.localPackageFolder, "README.md"),
        `# ${category.label} Templates\n\nThis package contains NexicScript templates for the ${category.label.toLowerCase()} category.\n`
    );
}

for (const [templateId, files] of Object.entries(templateFiles)) {
    createTemplate(templateId, files);
}

writeJson("data/categories.json", categories);

const packageJson = readJson("package.json");
packageJson.version = "2.0.0";
writeJson("package.json", packageJson);

const packageLock = readJson("package-lock.json");
packageLock.version = "2.0.0";
if (packageLock.packages && packageLock.packages[""]) {
    packageLock.packages[""].version = "2.0.0";
}
writeJson("package-lock.json", packageLock);

for (const [packageFolder, templateIds] of Object.entries(packageMap)) {
    const packageFile = path.join("packages", packageFolder, "package.json");
    const packageData = readJson(packageFile);
    packageData.nexicscript.templates = templateIds;
    writeJson(packageFile, packageData);
}

console.log("NexicScript catalog expanded.");

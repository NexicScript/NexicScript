const figlet = require("figlet");
const gradient = require("gradient-string").default;

function printBanner() {
    console.log(
        gradient(["#0F172A", "#7C3AED"])(
            figlet.textSync("NXS")
        )
    );

    console.log("Powered by NexicScript packages\n");
}

module.exports = {
    printBanner
};

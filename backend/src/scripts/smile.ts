const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Hi! What is your name? ", function(name: string) {
    console.log(`\n    _____\n   /     \\\n  | () () |\n   \\  ^  /\n    |||||\n\nSmile ${name}`);
    rl.close();
});

rl.on("close", function() {
    console.log("\n And Have a GREAT Day !!!");
    process.exit(0);
});

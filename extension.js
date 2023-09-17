const vscode = require("vscode");
const errorHighlighting = require("./test/errorHighlighting"); // Import the error highlighting functionality
const tabnineIntegration = require("./test/tabnineIntegration"); // Import Tabnine integration functionality
const prettierIntegration = require("./test/prettierIntegration"); // Import Prettier integration functionality
const eslintIntegration = require("./test/eslintIntegration"); // Import ESLint integration functionality

function activate(context) {
  try {

    console.log('Congratulations, your extension "codecraft" is now active!');

    // Register the "Hello World" command
    let disposableHelloWorld = vscode.commands.registerCommand(
      "codecraft.helloWorld",
      function () {
        vscode.window.showInformationMessage("Hello World from CodeCraft!");
      }
    );

    // Register the Tabnine code completion command
    let disposableTabnineCompletion = vscode.commands.registerCommand(
      "codecraft.triggerTabnineCompletion",
      tabnineIntegration.triggerTabnineCompletion
    );

    // Register the "Format with Prettier" command
    let disposableFormatWithPrettier = vscode.commands.registerCommand(
      "codecraft.formatWithPrettier",
      prettierIntegration.formatWithPrettier
    );

    // Register the "Analyze Code with ESLint" command
    let disposableAnalyzeCodeWithESLint = vscode.commands.registerCommand(
      "codecraft.analyzeCodeWithESLint",
      eslintIntegration.analyzeCodeWithESLint
    );

    // Add all command disposables to the context subscriptions
    context.subscriptions.push(
      disposableHelloWorld,
      disposableTabnineCompletion,
      disposableFormatWithPrettier,
      disposableAnalyzeCodeWithESLint // Add the ESLint analysis command
    );

    // Call error highlighting function from errorHighlighting.js
    errorHighlighting.activate(context); // You may need to pass additional context if required
  } catch (error) {
    console.error('CodeCraft extension activation error:', error);
  }
}

function deactivate() { }

module.exports = {
  activate,
  deactivate,
};

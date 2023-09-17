const vscode = require("vscode");
const eslint = require("eslint");

// Initialize ESLint
const linter = new eslint.ESLint();

// Function to analyze code with ESLint
async function analyzeCodeWithESLint() {
  console.log("Analyzing code with ESLint..."); // Add this line for debugging
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const document = editor.document;
    try {
      const results = await linter.lintText(document.getText(), {
        filePath: document.fileName,
      });

      // Process the ESLint results and display them to the user
      console.log("ESLint analysis results:", results); // Add this line for debugging
    } catch (error) {
      vscode.window.showErrorMessage(
        "ESLint analysis failed. Please check your configuration."
      );
      console.error("ESLint analysis failed:", error);
    }
  }
}

module.exports = {
  analyzeCodeWithESLint,
};

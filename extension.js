const vscode = require('vscode');

const customKeywords = [
    "password",
    "secret",
    "api_key",
    "access_token",
    "private_key",
    "client_secret",
    "client_id",
    "jwt_token",
    "db_password",
    "AccessKey",
    "key",
    "secret",
    "API-Key",
    "APIKey",
    "API_Token",
];

function activate(context) {
    console.log('Hello World! Your extension is now active.');

    // Create a decoration type for sensitive keywords
    const sensitiveInfoDecorationType = vscode.window.createTextEditorDecorationType({
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
    });

    function highlightErrorsAndWarnings(editor) {
        if (!editor) {
            return;
        }

        // Clear any existing decorations
        editor.setDecorations(sensitiveInfoDecorationType, []);

        const diagnostics = vscode.languages.getDiagnostics(editor.document.uri);
        // Iterate through the diagnostics and highlight errors and warnings
        for (const diagnostic of diagnostics) {
            const { range } = diagnostic;
            const decoration = {
                range,
                borderWidth: '1px',
                borderColor: 'red',
                borderStyle: 'solid',
            };
            // Add the error highlight decoration to the editor
            editor.setDecorations(errorDecorationType, [decoration]);
        }
        const { document } = editor;
        const decorations = [];

        for (let i = 0; i < document.lineCount; i++) {
          const line = document.lineAt(i).text;
          for (const keyword of customKeywords) {
            const regex = new RegExp(keyword, 'gi');
            let match;
            while ((match = regex.exec(line))) {
              const startIndex = match.index;
              const endIndex = startIndex + match[0].length;
              const range = new vscode.Range(i, startIndex, i, endIndex);
              decorations.push({ range, hoverMessage: `Confidential Detail found: ${match[0]}` });
            }
          }
        }

        // Apply the sensitive keyword decorations to the editor
        editor.setDecorations(sensitiveInfoDecorationType, decorations);
    }

    // Create a decoration type for errors
    const errorDecorationType = vscode.window.createTextEditorDecorationType({
        borderWidth: '1px',
        borderColor: 'yellow',
        borderStyle: 'solid',
    });

    function isTabnineEnabled() {
        const tabnineExtension = vscode.extensions.getExtension('TabNine.tabnine-vscode');
        return tabnineExtension && tabnineExtension.isActive;
    }

    // Function to trigger Tabnine code completion
    function triggerTabnineCompletion() {
        if (isTabnineEnabled()) {
            vscode.commands.executeCommand('editor.action.triggerSuggest');
        } else {
            vscode.window.showInformationMessage('Tabnine is not installed or enabled. Please configure and enable Tabnine for code completion.');
        }
    }

    let disposable = vscode.commands.registerCommand('extension.sayHello', function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) { 
            highlightErrorsAndWarnings(editor);
        }
        triggerTabnineCompletion();
        vscode.window.showInformationMessage('Hello, World!');
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};



// const vscode = require("vscode");
// const errorHighlighting = require("./test/errorHighlighting"); // Import the error highlighting functionality
// const tabnineIntegration = require("./test/tabnineIntegration"); // Import Tabnine integration functionality
// const prettierIntegration = require("./test/prettierIntegration"); // Import Prettier integration functionality
// const eslintIntegration = require("./test/eslintIntegration"); // Import ESLint integration functionality

// function activate(context) {
//   try {

//     console.log('Congratulations, your extension "codecraft" is now active!');
    
//     // Register the "Hello World" command
//     let disposableHelloWorld = vscode.commands.registerCommand(
//       "codecraft.helloWorld",
//       function () {
//         vscode.window.showInformationMessage("Hello World from CodeCraft!"); 
//       }     
//     );

//     // Register the Tabnine code completion command
//     let disposableTabnineCompletion = vscode.commands.registerCommand(
//       "codecraft.triggerTabnineCompletion",
//         tabnineIntegration.triggerTabnineCompletion
//           );

//     // Register the "Format with Prettier" command
//     let disposableFormatWithPrettier = vscode.commands.registerCommand(
//       "codecraft.formatWithPrettier",
//         prettierIntegration.formatWithPrettier
//           );

//     // Register the "Analyze Code with ESLint" command
//     let disposableAnalyzeCodeWithESLint = vscode.commands.registerCommand(
//       "codecraft.analyzeCodeWithESLint",
//       eslintIntegration.analyzeCodeWithESLint
//     );

//     // Add all command disposables to the context subscriptions
//     context.subscriptions.push(
//        disposableHelloWorld,
//       disposableTabnineCompletion,
//       disposableFormatWithPrettier,
//       disposableAnalyzeCodeWithESLint // Add the ESLint analysis command
//     );

//     // Call error highlighting function from errorHighlighting.js
//     errorHighlighting.activate(context); // You may need to pass additional context if required
//   } catch (error) {
//         console.error('CodeCraft extension activation error:', error);
//   }
// }

// function deactivate() { }

// module.exports = {
//   activate,
//   deactivate,
// };















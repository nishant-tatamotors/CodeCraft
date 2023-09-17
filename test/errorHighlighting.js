const vscode = require('vscode');

// Create a function to highlight errors and warnings
function highlightErrorsAndWarnings(editor) {
    if (!editor) {
        return;
    }

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
}

// Create a decoration type for errors
const errorDecorationType = vscode.window.createTextEditorDecorationType({
    borderWidth: '1px',
    borderColor: 'red',
    borderStyle: 'solid',
});

// Export the functions and objects you want to use in extension.js
module.exports = {
    activate: function (context) {
        console.log('Extension activated Error Detection.')
        
        // Register an event listener for editor changes
        vscode.window.onDidChangeActiveTextEditor((editor) => {
            highlightErrorsAndWarnings(editor);
        });

        // Trigger the highlighting when the extension is activated
        highlightErrorsAndWarnings(vscode.window.activeTextEditor);
    },
};

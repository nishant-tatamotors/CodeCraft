const vscode = require('vscode');
const prettier = require('prettier');

// Function to format the active editor's content using Prettier
async function formatWithPrettier() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const { document } = editor;

        try {
            const options = await prettier.resolveConfig(document.fileName) || {};
            const formattedCode = await prettier.format(document.getText(), { ...options, filepath: document.fileName });

            editor.edit((editBuilder) => {
                const documentStart = new vscode.Position(0, 0);
                const lastLine = document.lineAt(document.lineCount - 1);
                const documentEnd = new vscode.Position(document.lineCount - 1, lastLine.text.length);
                editBuilder.replace(new vscode.Range(documentStart, documentEnd), formattedCode);
            });

            vscode.window.showInformationMessage('Code formatted with Prettier.');
        } catch (error) {
            vscode.window.showErrorMessage('Prettier formatting failed. Please check your Prettier configuration.');
            console.error('Prettier formatting failed:', error);
        }
    }
}

module.exports = {
    formatWithPrettier
};

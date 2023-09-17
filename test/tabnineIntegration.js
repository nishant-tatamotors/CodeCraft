const vscode = require('vscode');

// Function to check if Tabnine is enabled
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

module.exports = {
    isTabnineEnabled,
    triggerTabnineCompletion
};

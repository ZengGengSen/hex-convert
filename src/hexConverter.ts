import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('配置hex-convert成功');

    let disposable = vscode.commands.registerCommand('hex-converter.convert', () => {
    const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selections = editor.selections;
            editor.edit((builder) => {
                selections.forEach((selection) => {
                    const selectedText = editor.document.getText(selection);
                    const re = /[0-9A-F]{4}/g;
                    const replacedText = selectedText.replace(re, (match, p1) => `0x${match}`);
                    builder.replace(selection, replacedText);
                });
            });
        }
    });

    context.subscriptions.push(disposable);
}
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = [
		vscode.commands.registerCommand(
			'hex-convert.convert', () => {
				const editor = vscode.window.activeTextEditor;
				if (editor) {
					const selections = editor.selections;
					editor.edit((builder) => {
						selections.forEach((selection) => {
							const selectedText = editor.document.getText(selection);
							const re = /[0-9A-F]{4}/g;
							const replacedText = selectedText.replace(re, (match, p1) => `0x${match}, `);
							builder.replace(selection, replacedText);
						});
					});
				}
			}
		),
		vscode.commands.registerCommand(
			'hex-convert.switch', () => {
				const editor = vscode.window.activeTextEditor;
				if (editor) {
					const selections = editor.selections;
					editor.edit((builder) => {
						selections.forEach((selection) => {
							const selectedText = editor.document.getText(selection);
							const re = /[0-9A-F]{4}/g;
							// 4位16进制字符串，前两位和后两位交换，高低字节交换
							const replacedText = selectedText.replace(re, (match, p1) => `${match.slice(2, 4)}${match.slice(0, 2)}`);
							builder.replace(selection, replacedText);
						});
					});
				}
			}
		),							
	]

	// 循环注册命令
	disposable.forEach((item) => {
		context.subscriptions.push(item);
	});
}

// This method is called when your extension is deactivated
export function deactivate() {}

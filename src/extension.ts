/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/


// import * as vscode from 'vscode';
// import { add } from './math';

// export function activate(context: vscode.ExtensionContext) {

// 	const disposable = vscode.commands.registerCommand('extension.helloWebpack', () => {
// 		vscode.window.showInformationMessage(`41 + 1 = ${add(41, 1)}`);
// 	});

// 	context.subscriptions.push(disposable);
// }

import * as vscode from 'vscode';

let lineStart = 0;
const highlightCount = 10;
const decoration : vscode.TextEditorDecorationType[] = [];

const refreshHighlights = () => {
	lineStart++;
	if (lineStart > highlightCount) {
		lineStart = 0;
	}
	for (let i = 0; i < highlightCount; i++) {
		const line = lineStart+i;
		const startChar = 0;

		const start = new vscode.Position(line, startChar);
		const end = start.translate(0, 10);

		vscode.window.activeTextEditor?.setDecorations(
			decoration[i],
			[new vscode.Range(start, end)]
		);
	}
};

export const activate = (context : vscode.ExtensionContext) => {
	for (let i = 0; i < highlightCount; i++) {
		const calculatedColor = `rgba(255, 0, 0, ${Math.log10((highlightCount+1) - i) / 2})`;
		decoration[i] = vscode.window.createTextEditorDecorationType({
			backgroundColor: calculatedColor
		});
	}
	console.log('Activated extension: highlight-lines');

	const disposable = vscode.workspace.onDidChangeTextDocument(refreshHighlights);

	context.subscriptions.push(disposable);
};

export const deactivate = () => {
	(0);
};
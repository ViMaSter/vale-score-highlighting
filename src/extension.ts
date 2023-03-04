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

const convertCharacterOffsetToLineAndCharacter = (characterOffset : number, text : string) : vscode.Position => {
	let line = 0;
	let character = 0;
	for (let i = 0; i < characterOffset; i++) {
		if (text[i] === '\n') {
			line++;
			character = 0;
		} else {
			character++;
		}
	}
	return new vscode.Position(
		line,
		character
	);
};

const refreshHighlights = () => {
	lineStart++;
	if (lineStart > highlightCount) {
		lineStart = 0;
	}
	
	const formula = (wordCount : number, sentencesCount : number, charactersCount : number) => (0.0588 * (charactersCount / wordCount) * 100) - (0.296 * (sentencesCount / wordCount) * 100) - 15.8;

	// get all current text
	const text = vscode.window.activeTextEditor?.document.getText();
	// count sentences in text
	const sentences = text?.split(/(?<=[^\\.][\w\d]+[.!?\r\n])(?=[\s\r\n]+)/g) || [];
	const sentencesCount = sentences.length;
	// count words in text
	const wordCount = text?.split(/\s/g).length || 0;
	// count characters not inside
	const charactersCount = text?.match(/(?![^(]*\))\w/g)?.length || 0;

	// generate worst offenders by sentence
	const tenWorstOffenders = sentences.map((sentence) => {
		const words = sentence.split(/\s/g);
		const wordCount = words.length;
		const charactersCount = sentence.match(/[\w\d]/g)?.length || 0;
		const ratio = formula(wordCount, 1, charactersCount);
		return {
			ratio,
			sentence,
			characterOffset: text?.indexOf(sentence) || 0
		};
	}).sort((a, b) => b.ratio - a.ratio).slice(0, highlightCount);
	
	decoration.forEach((decoration) => {
		vscode.window.activeTextEditor?.setDecorations(
			decoration,
			[new vscode.Range(new vscode.Position(0, 0), new vscode.Position(0, 0))]
		);
	});

	decoration.length = 0;
	for (let i = 0; i < tenWorstOffenders.length; i++) {
		const calculatedColor = `rgba(255, 0, 0, ${Math.log10((tenWorstOffenders.length+1) - i) / 2})`;
		decoration[i] = vscode.window.createTextEditorDecorationType({
			backgroundColor: calculatedColor
		});
	}

	tenWorstOffenders.forEach((sentence, index) => {
		const start = convertCharacterOffsetToLineAndCharacter(sentence.characterOffset, text || '');
		const end = convertCharacterOffsetToLineAndCharacter(sentence.characterOffset + sentence.sentence.length, text || '');

		vscode.window.activeTextEditor?.setDecorations(
			decoration[index],
			[new vscode.Range(start, end)]
		);
	});
	const totalTextRatio = formula(wordCount, sentencesCount, charactersCount);
	console.log(1);
};

export const activate = (context : vscode.ExtensionContext) => {
	console.log('Activated extension: highlight-lines');

	const disposable = vscode.workspace.onDidChangeTextDocument(refreshHighlights);

	context.subscriptions.push(disposable);
};

export const deactivate = () => {
	(0);
};
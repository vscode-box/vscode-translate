import * as vscode from 'vscode';
import { languages } from './languages';

export function getSelectedText(document: vscode.TextDocument, selection: vscode.Selection) {
  const charRange = new vscode.Range(
    selection.start.line,
    selection.start.character,
    selection.end.line,
    selection.end.character
  );
  return document.getText(charRange);
}

export function LRUList(
  recentlyUsed: Array<{ name: string; value: string }>,
  selectedLanguage: { name: string; value: string }
) {
  if (recentlyUsed.find(r => r.value === selectedLanguage.value)) {
    const index = recentlyUsed.findIndex(r => r.value === selectedLanguage.value);
    recentlyUsed.splice(index, 1);
  }
  if (languages.find(r => r.value === selectedLanguage.value)) {
    const index = languages.findIndex(r => r.value === selectedLanguage.value);
    languages.splice(index, 1);
  }
  recentlyUsed.splice(0, 0, selectedLanguage);
  return recentlyUsed;
}

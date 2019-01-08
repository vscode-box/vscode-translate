// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import translate from './translateApi';
import { getLanguages, LRUList } from './languages';
import { getSelectedText } from './utils';

class TranslateProgress implements vscode.ProgressOptions {
  location: vscode.ProgressLocation = vscode.ProgressLocation.Window;
}
const RECENTLY_USED = '(recently used)';
const COMMAND_TRANSLATE = 'translate.action.translateText';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(COMMAND_TRANSLATE, async function() {
    try {
      const editor = vscode.window.activeTextEditor;
      const quickPickData = LRUList()
        .map(r => ({
          name: r.name.includes(RECENTLY_USED) ? r.name : `${r.name} ${RECENTLY_USED}`,
          value: r.value,
        }))
        .concat(getLanguages());

      const languageName = await vscode.window.showQuickPick(quickPickData.map(l => l.name));
      const selectedLanguage = quickPickData.find(t => t.name === languageName);

      if (selectedLanguage && editor) {
        const { document, selections } = editor;
        LRUList(selectedLanguage);
        const results = await vscode.window.withProgress(
          new TranslateProgress(),
          (progress: vscode.Progress<{ message?: string; increment?: number }>) => {
            return Promise.all(
              selections.map(selection => {
                const selectionText = getSelectedText(document, selection);
                return translate(selectionText, selectedLanguage.value).then(({ translation }) => {
                  progress.report({ message: 'translate' });
                  return { selection, selectionText, translation };
                });
              })
            );
          }
        );
        editor.edit(builder => {
          results.forEach(({ translation, selectionText, selection }) => {
            if (!!translation) {
              builder.replace(selection, translation);
              if (selectionText === translation) {
                vscode.window.showWarningMessage(`[${selectionText}] translate equal`);
              }
            } else {
              vscode.window.showWarningMessage(`[${selectionText}] translate fail`);
            }
          });
        });
        vscode.window.showInformationMessage('translate done');
      }
    } catch (error) {
      vscode.window.showErrorMessage(error);
    }
  });
  context.subscriptions.push(disposable);
}

export function deactivate() {}

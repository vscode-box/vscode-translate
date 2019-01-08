// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import translate from './translateApi';
import { getLanguages, LRUList } from './languages';
import { getSelectedText } from './utils';

let recentlyUsed: Array<{ name: string; value: string }> = [];
class TranslateProgress implements vscode.ProgressOptions {
  location: vscode.ProgressLocation = vscode.ProgressLocation.Window;
}
const RECENTLY_USED = '(recently used)';
const COMMAND_TRANSLATE = 'translate.action.translateText';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(COMMAND_TRANSLATE, async function() {
    try {
      const editor = vscode.window.activeTextEditor;
      const quickPickData = recentlyUsed
        .map(r => ({
          name: r.name.includes(RECENTLY_USED) ? r.name : `${r.name} ${RECENTLY_USED}`,
          value: r.value,
        }))
        .concat(getLanguages());

      const languageName = await vscode.window.showQuickPick(quickPickData.map(l => l.name));
      const selectedLanguage = quickPickData.find(t => t.name === languageName);

      if (selectedLanguage && editor) {
        const { document, selections } = editor;
        recentlyUsed = LRUList(recentlyUsed, selectedLanguage);
        
        const results = await vscode.window.withProgress(
          new TranslateProgress(),
          (progress: vscode.Progress<{ message?: string; increment?: number }>) => {
            return Promise.all(
              selections.map(selection =>
                translate(getSelectedText(document, selection), selectedLanguage.value).then(
                  ({ translation }) => {
                    progress.report({ message: 'translate' });
                    return { selection, translation };
                  }
                )
              )
            );
          }
        );
        editor.edit(builder => {
          results.forEach(r => {
            if (!!r.translation) {
              builder.replace(r.selection, r.translation);
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

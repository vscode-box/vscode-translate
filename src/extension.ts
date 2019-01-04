// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import translate from "./translateApi";
import { languages } from "./languages";
import { getSelectedText, LRUList } from "./utils";
let recentlyUsed: Array<{ name: string; value: string }> = [];

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "translate.action.translateText",
    async function() {
      try {
        const editor = vscode.window.activeTextEditor;
        const quickPickData = recentlyUsed
          .map(r => ({
            name: r.name.includes("(recently used)")
              ? r.name
              : `${r.name} (recently used)`,
            value: r.value
          }))
          .concat(languages);
        const languageName = await vscode.window.showQuickPick(
          quickPickData.map(l => l.name)
        );
        const selectedLanguage = quickPickData.find(
          t => t.name === languageName
        );
        if (selectedLanguage && editor) {
          const { document, selections } = editor;
          recentlyUsed = LRUList(recentlyUsed, selectedLanguage);
          const results = await Promise.all(
            selections.map(selection =>
              translate(
                getSelectedText(document, selection),
                selectedLanguage.value
              ).then(({ translation }) => ({
                selection,
                translation
              }))
            )
          );
          editor.edit(builder => {
            results.forEach(r => {
              if (!!r.translation) {
                builder.replace(r.selection, r.translation);
              }
            });
          });
          vscode.window.showInformationMessage("translate done");
        }
      } catch (error) {
        vscode.window.showErrorMessage(error);
      }
    }
  );
  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

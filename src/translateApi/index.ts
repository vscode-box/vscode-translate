import { default as google } from "./google";
import { default as sougou } from "./sougou";
import * as vscode from 'vscode';

export default (word: string, toLanguage: string) => {
  const channel = vscode.workspace.getConfiguration('translate').get<string>('muti-channel');
  return {
    google: google(word, toLanguage),
    sougou: sougou(word, toLanguage),
  }[channel]
}
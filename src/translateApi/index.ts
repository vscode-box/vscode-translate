import { default as google } from './google';
import { default as sougou } from './sougou';
import * as vscode from 'vscode';

export enum TranslateChannel {
  google,
  sougou,
}

export default function translate (word: string, toLanguage: string):Promise<any>{
  const channel =
    vscode.workspace.getConfiguration('translate').get<TranslateChannel>('muti-channel') ||
    TranslateChannel.google;
  return {
    [TranslateChannel.google]: google,
    [TranslateChannel.sougou]: sougou,
  }[channel](word, toLanguage);
};
import { default as google } from './google';
import { default as sougou } from './sougou';
import * as vscode from 'vscode';

export enum TranslateChannel {
  google = 'google',
  sougou = 'sougou',
}

export const getChannel = () => vscode.workspace.getConfiguration('translate').get<TranslateChannel>('muti-channel') ||
TranslateChannel.google

export default (word: string, toLanguage: string): Promise<any> => ({
  [TranslateChannel.google]: google,
  [TranslateChannel.sougou]: sougou,
}[getChannel()](word, toLanguage))
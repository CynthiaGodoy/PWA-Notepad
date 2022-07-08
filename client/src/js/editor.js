//IMPORT METHODS TO SAVE AND GET DATA FROM THE INDEXEDDB DATABASE IN './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    const localData = localStorage.getItem('content');

    //CHECK IF CODEMIRROR IS LOADED
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    //WHEN EDITOR IS READY, SET THE VALUE TO WHATEVER IS STORED IN INDEXEDDB
    //FALL BACKTO LOCALSTORAGE IF NOTHING IS STORED IN INDEXEDDB, AND IF AVAILABLE SET THE VALUE TO HEADER
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      this.editor.setValue(data || localData || header);
    });

    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    //SAVE THE CONTENT OF THE EDITOR WHEN THE EDITOR ITSELF IS LOSES FOCUS
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'));
    });
  }
}

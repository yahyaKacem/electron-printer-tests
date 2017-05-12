(function(window, console, document) {
  "use strict";
  const
    textareaInput       = document.querySelector('#text'),
    filePrintButton     = document.querySelector('.file'),
    textPrintButton     = document.querySelector('.text'),
    textJavaPrintButton = document.querySelector('.text-java'),
    ipcRenderer         = window['require']('electron').ipcRenderer;
  ipcRenderer.on('showPrinters', (event, args) => {
    console.log(args);
  });
  ipcRenderer.on('log', (event, args) => console.log(args));
  filePrintButton.addEventListener('click', () => ipcRenderer.send('printFile', {file: '/Users/admin/Desktop/Print.pdf'}));
  textPrintButton.addEventListener('click', () => ipcRenderer.send('printText', {text: textareaInput.value}));
  textJavaPrintButton.addEventListener('click', () => ipcRenderer.send('printTextJava', {text: textareaInput.value}));
}(window, console, document));

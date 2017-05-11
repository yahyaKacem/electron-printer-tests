(function(window, console, document) {
  "use strict";
  const
    textareaInput   = document.querySelector('#text'),
    filePrintButton = document.querySelector('.btn.btn-primary.file'),
    textPrintButton = document.querySelector('.btn.btn-primary.text'),
    ipcRenderer = window['require']('electron').ipcRenderer;
  ipcRenderer.on('showPrinters', (event, args) => {
    console.log(args);
  });
  ipcRenderer.on('log', (event, args) => console.log(args));
  filePrintButton.addEventListener('click', () => ipcRenderer.send('printFile', {file: '/Users/admin/Desktop/Print.pdf'}));
  textPrintButton.addEventListener('click', () => ipcRenderer.send('printText', {text: textareaInput.value}));
}(window, console, document));

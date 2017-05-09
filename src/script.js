(function(window, console, document) {
  "use strict";
  const
    printButton = document.querySelector('.btn.btn-primary'),
    ipcRenderer = window['require']('electron').ipcRenderer;
  ipcRenderer.on('showPrinters', (event, args) => {
    console.log(args);
  });
  ipcRenderer.on('log', (event, args) => console.log(args));
  printButton.addEventListener('click', () => ipcRenderer.send('print', {file: '/Users/admin/Desktop/Print.pdf'}));
}(window, console, document));

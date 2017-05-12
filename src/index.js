import * as path from 'path';
import * as lodash from 'lodash';
import { execSync } from 'child_process';
import * as electronPrinter from 'electron-printer2';
import { app, ipcMain, BrowserWindow } from 'electron';

const
  javaLib              = path.join(__dirname, `../assets/libs/regkassen-loyalcraft-1.0.0.jar`),
  javaPrintTextCommand = [
    'java',
    '-cp',
    `"${javaLib}"`,
    '"com.loyalcraft.core.Runner"',
    '-t',
    '"print"',
    '-g'
  ];
let mainWindow;
ipcMain.on('printFile', (event, args) => {
  console.log(args.file);
  electronPrinter.printFile({
    filename: args.file,
    error:    (err) => console.log(err),
    printer:  electronPrinter.getPrinters().filter((printer) => /^EPSON/.test(printer.name))[0].name,
    success:  (jobID) => console.log(`sent to printer with ID: ${jobID}`)
  });
});
ipcMain.on('printText', (event, args) => {
  electronPrinter.printDirect({
    type:    'TEXT',
    data:    args.text,
    error:   (err) => console.log(err),
    printer: electronPrinter.getPrinters().filter((printer) => /^EPSON/.test(printer.name))[0].name,
    success: (jobID) => console.log(`sent to printer with ID: ${jobID}`)
  });
});
ipcMain.on('printTextJava', (event, args) => {
  console.log('printing through java');
  execSync(lodash.concat(
    javaPrintTextCommand,
    [
      `"${electronPrinter.getPrinters().filter((printer) => /^EPSON/.test(printer.name))[0].name}"`,
      '-h',
      `"${args.text}"`
    ]
  ).join(' '));
});
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.webContents.on(
    'did-finish-load',
    () => {
      // mainWindow.webContents.send('log', {electronPrinter: electronPrinter});
      mainWindow.webContents.send('showPrinters', {
        printers: electronPrinter.getPrinters(),
        printer: electronPrinter.getPrinter(electronPrinter.getPrinters().filter((printer) => /^EPSON/.test(printer.name))[0].name)
      });
    }
  );
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

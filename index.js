const TrayWindow = require("electron-tray-window");
const ipc = require("electron").ipcMain;
const { ipcMain, Tray, app, BrowserWindow } = require("electron");
var isDev = require('electron-is-dev')
const path = require("path");
const setupEvents = require('./installers/setupEvents')
require('update-electron-app')({
  repo: 'sneakypanda99/PengKlocka90',
  updateInterval: '1 hour',
})

if (setupEvents.handleSquirrelEvent()) {
   // squirrel event handled and app will exit in 1000ms, so don't do anything else
   return;
}



if(!isDev) {
  app.setLoginItemSettings({
    openAtLogin:true
  })
}


app.on("ready", () => {
  
 
  var timeout = 10;
  if (process.platform === "linux") {
    timeout = 200;
  }
  setTimeout(function () {
    TrayWindow.setOptions({
      trayIconPath:`${path.join(__dirname, "/shrek.ico")}`,
      windowUrl: `file://${path.join(__dirname, "resources/index.html")}`,
      width: 340,
      height: 350,
    });
  }, timeout);
});


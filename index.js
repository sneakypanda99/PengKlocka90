const TrayWindow = require("electron-tray-window");
const ipc = require("electron").ipcMain;
const { ipcMain, Tray, app, BrowserWindow } = require("electron");
var isDev = require('electron-is-dev')
const path = require("path");
const setupEvents = require('./installers/setupEvents')
const squirrelUrl = "http://10.80.72.11:3333";
const electron = require('electron');
var request = require('request');



var link = squirrelUrl;



const checkIfAlive = () => {return request(`${link}/releases?` , function (error, response, body) {

  if(error){
    console.log('Err: '+ error);
    return false;
  }

if(response.statusCode == 200 || response.statusCode == 201 || response.statusCode == 202){
  console.log(link + ' is up!!');
  electron.autoUpdater.checkForUpdates();
  return true;
}

if(response.statusCode == 301 || response.statusCode == 302){
  console.log(link + ' is redirecting us!!');
  return false;
}

if(response.statusCode == 401){
  console.log("you are unauthorized to " + link);
  return false;

}else{
  console.log(link + ' is down!!');
  return false
}

});}


const startAutoUpdater = (squirrelUrl) => {
  // The Squirrel application will watch the provided URL
  electron.autoUpdater.setFeedURL(`${squirrelUrl}/`);

  // Display a success message on successful update
  electron.autoUpdater.addListener("update-downloaded", (event, releaseNotes, releaseName) => {
    electron.autoUpdater.quitAndInstall()
  });

  // Display an error message on update error
  electron.autoUpdater.addListener("error", (error) => {
    electron.dialog.showMessageBox({"message": "Auto updater error: " + error});
  });

  // tell squirrel to check for updates
  try {
    checkIfAlive()
  }
  catch {
    return null
  }
}



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
  
  if(!isDev) {
    startAutoUpdater(squirrelUrl)
    setInterval(() => {
      startAutoUpdater(squirrelUrl)
  }, 60*1000*15)
  }
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


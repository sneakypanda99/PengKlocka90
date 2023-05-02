const createWindowsInstaller =
  require("electron-winstaller").createWindowsInstaller;
const path = require("path");

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error);
    process.exit(1);
  });

function getInstallerConfig() {
  console.log("creating windows installer");
  const rootPath = path.join("./");
  const outPath = path.join(rootPath, "release-builds");

  return Promise.resolve({
    appDirectory: path.join(outPath, "PengKlocka90-win32-x64/"),
    authors: "VPL Thörnblom",
    noMsi: true,
    outputDirectory: path.join(outPath, "windows-installer"),
    exe: "PengKlocka90.exe",
    setupExe: "PengKlocka90.exe",
    setupIcon: path.join(rootPath, "shrek.ico"),
    loadingGif: path.join(rootPath, "shrek.gif"),
  });
}

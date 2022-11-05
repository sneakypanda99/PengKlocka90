

async function Install() {
  const electronInstaller = require('electron-winstaller');

  try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: 'C:/Users/CY-PC-206/Documents/PengKlocka 90/examples/PengKlocka90-win32-x64',
      outputDirectory: '/tmp/build/installer64',
      authors: 'VPL Thörnblom',
      exe: 'PengKlocka90.exe'
    });
    console.log('Finished!');
  } catch (e) {
    console.log(`No dice: ${e.message}`);
  }


}

Install()
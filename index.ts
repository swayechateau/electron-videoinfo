const ffmpeg = require('fluent-ffmpeg')
const { app, BrowserWindow, ipcMain } = require('electron')

let mainWindow
app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    mainWindow.loadFile('index.html')
})


ipcMain.on('video:submit', (event, path) => {
    ffmpeg.ffprobe(path, (err, metadata) => {
        // console.log(`Video Duration is: ${}`)
        mainWindow.webContents.send('video:metadata', metadata.format.duration);
    })
})

function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    win.loadFile('index.html')

}
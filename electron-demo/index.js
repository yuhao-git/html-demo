//引入两个模块：app 和 BrowserWindow

//app 模块，控制整个应用程序的事件生命周期。
//BrowserWindow 模块，它创建和管理程序的窗口。

const { app, BrowserWindow } = require('electron')

//在 Electron 中，只有在 app 模块的 ready 事件被激发后才能创建浏览器窗口
app.on('ready', () => {

    //创建一个窗口
    const mainWindow = new BrowserWindow()

    //窗口加载html文件
    mainWindow.loadFile('./src/index.html')
})

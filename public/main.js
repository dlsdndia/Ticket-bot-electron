const { app, BrowserWindow } = require('electron');
const path = require('path');

// 윈도우를 생성하는 함수
function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // React 개발 서버를 로드 (개발 중일 때)
  win.loadURL('http://localhost:3000');

  // 창이 닫혔을 때 이벤트 처리
  win.on('closed', () => {
    win = null;
  });
}

// 애플리케이션이 준비되면 창을 생성
app.whenReady().then(createWindow);

// 모든 창이 닫혔을 때 애플리케이션 종료
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 앱이 다시 활성화될 때 창을 재생성 (macOS 특성)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
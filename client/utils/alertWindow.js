import { BrowserWindow } from 'electron';

export function createAlertWindow(message) {
    let alertWindow = new BrowserWindow({
        width: 400,
        height: 200,
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false
        }
    });

    const alertHTML = `
    <html>
    <head>
      <style>
        body {
          font-size: 18px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          margin: 0;
          font-family: Arial, sans-serif;
        }
        .alert-box {
          text-align: center;
          user-select: text;
        }
        button {
          background-color: #3b93f8;
          color: #fff;
          border: none;
          padding: 6px 12px;
          font-size: 14px;
          cursor: pointer;
          border-radius: 6px;
          margin-top: 20px;
        }
        button:hover {
          background-color: #357ae8;
        }
      </style>
    </head>
    <body>
      <div class="alert-box">
        <div id="message">${message}</div>
        <button onclick="window.close()">OK</button>
      </div>
    </body>
    </html>`;
    alertWindow.loadURL(`data:text/html,${encodeURIComponent(alertHTML)}`);

    alertWindow.on('closed', () => {
        alertWindow = null;
    });
}
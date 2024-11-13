const { app, BrowserWindow } = require('electron');
const express = require('express');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    win.loadFile('login.html');
};

app.whenReady().then(() => {
    createWindow();

    // Express 서버 설정
    const server = express();
    server.get('/callback', (req, res) => {
        const accessToken = req.query.access_token;
        console.log("받은 액세스 토큰:", accessToken);

        // Java 서버로 토큰 전달
        sendTokenToJava(accessToken);

        res.send("로그인 성공! 이제 창을 닫아도 됩니다.");
    });

    server.listen(3000, () => {
        console.log("로컬 서버가 http://localhost:3000 에서 실행 중입니다.");
    });
});

function sendTokenToJava(token) {
    fetch(`http://localhost:8080/?access_token=${token}`)
        .then(response => response.text())
        .then(data => console.log("Java 서버 응답:", data))
        .catch(error => console.error("Java 서버 요청 오류:", error));
}

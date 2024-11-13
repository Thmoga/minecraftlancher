function handleLogin() {
    // Microsoft 로그인 페이지 URL 설정
    const authUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?' +
    'client_id=61882f3e-c8d8-4c44-b44b-6e1ac37b972c&' +
    'response_type=token&' +
    'redirect_uri=http://localhost:3000/callback&' +
    'scope=openid profile email';

    // 로그인 창 열기
    const authWindow = window.open(authUrl, "_blank", "width=500,height=600");

    // 로그인 성공 후 토큰을 Java 서버로 전송 (여기서는 테스트용으로 직접 토큰을 입력 가능)
    // 실제로는 로그인 성공 후 토큰을 추출해야 함
    authWindow.onload = function() {
        // 실제 토큰을 추출해야 하지만, 테스트로 임시 토큰 전달
        sendTokenToJava("YOUR_ACCESS_TOKEN");
    };
}

function sendTokenToJava(token) {
    const url = `http://localhost:8080/?access_token=${token}`;
    fetch(url)
        .then(response => response.text())
        .then(data => console.log("Java 서버 응답:", data))
        .catch(error => console.error("Java 서버 요청 오류:", error));
}

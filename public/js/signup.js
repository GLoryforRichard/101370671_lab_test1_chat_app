document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // 获取表单数据
        const username = document.getElementById('username').value;
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const password = document.getElementById('password').value;

        // 构造请求体
        const requestBody = { username, firstname, lastname, password };

        try {
            // 发送请求到后端的注册API
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.status === 201) {
                const responseData = await response.json();
                alert('Registration successful');
                window.location.href = '/login.html'; // 注册成功后重定向到登录页面
            } else {
                let errorMessage = 'Registration failed. Please try again.';
                if (response.headers.get('Content-Type')?.includes('application/json')) {
                    const errorResponse = await response.json();
                    errorMessage = errorResponse.message || errorMessage;
                }
    alert(errorMessage);
            }
        } catch (error) {
            // 网络或解析错误的处理
            console.error('Registration error:', error);
            alert('Registration failed. Please try again.');
        }
    });
});

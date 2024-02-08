document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Access the form data
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Build the request body
        const requestBody = { username, password };

        try {
            // Send the request
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                alert('Login successful');
                window.location.href = '/chat.html'; // Redirect to chat page
            } else {
                // Failed to login
                alert('Login failed. Please check your username and password.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        }
    });
});

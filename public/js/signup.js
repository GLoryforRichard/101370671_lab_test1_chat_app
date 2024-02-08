document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Access the form data
        const username = document.getElementById('username').value;
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const password = document.getElementById('password').value;

        // Build the request body
        const requestBody = { username, firstname, lastname, password };

        try {
            // Send the request
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
                window.location.href = '/login.html'; // Redirect to login page
            } else {
                let errorMessage = 'Registration failed. Please try again.';
                if (response.headers.get('Content-Type')?.includes('application/json')) {
                    const errorResponse = await response.json();
                    errorMessage = errorResponse.message || errorMessage;
                }
    alert(errorMessage);
            }
        } catch (error) {
            // Network errors, CORS errors, etc.
            console.error('Registration error:', error);
            alert('Registration failed. Please try again.');
        }
    });
});

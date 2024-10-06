document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = {
        username: document.getElementById('username').value,
        userPassword: document.getElementById('userPassword').value
    };

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(`Error: ${data.error}`);
        } else {
            alert('Login successful!');
            window.location.href = 'admin/index.html'; 
        }
    })
    .catch(error => console.error('Error:', error));
});

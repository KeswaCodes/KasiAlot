document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); 

    const formData = {
        fullname: document.getElementById('fullname').value,
        email: document.getElementById('email').value,
        username: document.getElementById('username').value,
        contactNumber: document.getElementById('contactNumber').value,
        userPassword: document.getElementById('userPassword').value,
        confirmPassword: document.getElementById('confirmPassword').value
    };

    fetch('http://localhost:3000/register', { // Use the full URL here
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: formData.fullname,
            email: formData.email,
            username: formData.username,
            contactNumber: formData.contactNumber,
            userPassword: formData.userPassword,
            confirmPassword: formData.confirmPassword
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.log('Registration failed!')
            alert(`Error: ${data.error}`);
        } else {
            console.log('Registration successful!');
            alert('Registration successful!');
        }
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('schedule-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this);
    const jsonFormData = JSON.stringify(Object.fromEntries(formData.entries()));

    fetch('/schedule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonFormData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('form-result').innerText = data;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('form-result').innerText = 'Form submission failed';
    });
});

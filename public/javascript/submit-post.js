async function publishPostHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const body = document.querySelector('#post-content').value.trim();

    if (title && body) {
        const response = await fetch('/api/posts', {
            method: 'post',
            body: JSON.stringify({
                title,
                body
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            // Should bring user to dashboard
            console.log(response);
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }   
    }
}

document.querySelector("#publish").addEventListener('submit', publishPostHandler);
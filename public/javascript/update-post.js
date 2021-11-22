async function publishPostHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const body = document.querySelector('#post-content').value.trim();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (title && body) {
        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'put',
            body: JSON.stringify({
                title,
                body
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            // Should bring user to dashboard
            console.log(response);
            document.location.replace(`/single-post/${post_id}`);
        } else {
            alert(response.statusText);
        }   
    }
}

document.querySelector("#publish").addEventListener('submit', publishPostHandler);
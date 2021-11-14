
async function leaveCommentHandler(event) {
    event.preventDefault();

    const body = document.querySelector('#reply').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (body) {
        const response = await fetch('/api/reply', {
            method: 'POST',
            body: JSON.stringify({
                body,
                post_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }

    }

};


document.querySelector('#reply-form').addEventListener('submit', leaveCommentHandler);
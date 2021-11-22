async function deleteHandler(event) {
    event.preventDefault();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

function editHandler(event) {
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    document.location.replace(`/edit-post/${post_id}`);
}

document.querySelector('#edit-post').addEventListener('click', editHandler);
document.querySelector('#delete-post').addEventListener('click', deleteHandler);
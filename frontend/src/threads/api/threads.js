export const getPostsByTopicId = async ({ queryKey }) => {
    const posts = queryKey[1];
    console.log("api call")
    console.log(posts);
    const res = await fetch(
        `https://localhost:5000/api/posts/byTopic/${posts.topic_id}`
    );
    return await res.json();
}

export const getPostById = async ({ queryKey }) => {
    const posts = queryKey[1];
    console.log("api call")
    console.log(posts);
    const res = await fetch(
        `https://localhost:5000/api/posts/get/${posts.id}`,
    );
    //var log = console.log(await res.json());
    return await res.json();
};

export const createPost = async ({ name, token }) => {
    const res = await fetch(
        `https://localhost:5000/api/posts/create`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                name
            })
        }
    );

    return await res.json();
};

export const EditPost = async ({ id, token }) => {
    const res = await fetch(
        `https://localhost:5000/api/posts/${id}/edit`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                body
            })
        }
    );

    return await res.json();
};

export const deletePosts = async ({ id, token }) => {
    const res = await fetch(
        `https://localhost:5000/api/posts/delete/${id}`,
        {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    );

    return await res.json();
};

export const deleteByTopicId = async ({ id, token }) => {
    const res = await fetch(
        `https://localhost:5000/api/posts/del-by-topic/${id}`,
        {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    );

    return await res.json();
};
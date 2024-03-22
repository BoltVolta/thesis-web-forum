export const getPostsByTopicId = async ({ queryKey }) => {
    const posts = queryKey[1];
    console.log("api call")
    console.log(posts.topic_id);
    const res = await fetch(
        `http://localhost:5000/api/threads/byTopic/${posts.topic_id}`
    );
    return await res.json();
}

export const getPostById = async ({ queryKey }) => {
    const posts = queryKey[1];
    console.log("api call")
    console.log(posts);
    const res = await fetch(
        `http://localhost:5000/api/threads/get/${posts.id}`,
    );
    //var log = console.log(await res.json());
    return await res.json();
};

export const createPost = async ({ body, token }) => {
    const res = await fetch(
        `http://localhost:5000/api/threads/create`,
        {
            method: 'POST',
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

export const editPost = async ({ id, token }) => {
    const res = await fetch(
        `http://localhost:5000/api/threads/${id}/edit`,
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
        `http://localhost:5000/api/threads/delete/${id}`,
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
        `http://localhost:5000/api/threads/del-by-topic/${id}`,
        {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    );

    return await res.json();
};
export const getTopics = async () => {
    const res = await fetch(
        `http://localhost:5000/api/topics/`
    );
    return await res.json();
}

export const getTopicById = async ({ queryKey }) => {
    const topicId = queryKey[1];
    console.log("api call");
    console.log(topicId);
    const res = await fetch(
        `http://localhost:5000/api/topics/get/${topicId.id}`,
    );
    //var log = console.log(await res.json());
    return await res.json();
};
export const getTopicsByName = async ({ queryKey }) => {
    const topic = queryKey[1];
    console.log("api call");
    console.log(topic.name);
    const res = await fetch(
        `http://localhost:5000/api/topics/search/${topic.name}`,
    );
    //var log = console.log(await res.json());
    return await res.json();
};

export const createTopic = async ({ name, created_by, token }) => {
    const res = await fetch(
        `http://localhost:5000/api/topics/create`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                name,
                created_by
            })
        }
    );

    return await res.json();
};

export const deleteTopic = async ({ id, token }) => {
    const res = await fetch(
        `http://localhost:5000/api/topics/delete/${id}`,
        {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    );

    return await res.json();
};

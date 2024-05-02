export const getReports = async () => {
    const res = await fetch(
        `http://localhost:5000/api/reports/`
    );
    return await res.json();
}

export const getReportByPostId = async ({ queryKey }) => {
    const post = queryKey[1];
    const res = await fetch(
        `http://localhost:5000/api/reports/get/byPost/${post.id}`,
    );
    //var log = console.log(await res.json());
    return await res.json();
};

export const createReport = async ({ post_id, reason, user_id, token }) => {
    const res = await fetch(
        `http://localhost:5000/api/reports/create`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                post_id,
                reason,
                user_id
            })
        }
    );

    return await res.json();
};

export const deleteReport = async ({ id, token }) => {
    const res = await fetch(
        `http://localhost:5000/api/reports/delete/${id}`,
        {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    );

    return await res.json();
};

export const deleteReportByPostId = async ({ id, token }) => {
    const res = await fetch(
        `http://localhost:5000/api/reports/delete/post/${id}`,
        {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    );

    return await res.json();
};

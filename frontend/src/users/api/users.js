export const getUsers = async () => {
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/`
    );
    return await res.json();
}

export const getUserEmail = async ({ queryKey }) => {
    const userInfo = queryKey[1];
    console.log("api call")
    console.log(userInfo);
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${userInfo.id}`,
    );
    //var log = console.log(await res.json());
    return await res.json();
};

export const signUpUser = async ({ name, email, password }) => {
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/signup`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        }
    );

    return await res.json();
};

export const loginUser = async ({ email, password }) => {
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }
    );

    return await res.json();
};
export const getUsers = async () => {
    const res = await fetch(
        `https://localhost:5000/api/users/`
    );
    return await res.json();
}

export const getUserEmail = async ({ queryKey }) => {
    const userInfo = queryKey[1];
    console.log("api call")
    console.log(userInfo);
    const res = await fetch(
        `https://localhost:5000/api/users/${userInfo.id}`,
    );
    //var log = console.log(await res.json());
    return await res.json();
};

export const signUpUser = async ({ name, email, password }) => {
    const res = await fetch(
        `https://localhost:5000/api/users/signup`,
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
        `https://localhost:5000/api/users/login`,
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
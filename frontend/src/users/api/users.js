export const getUsers = async () => {
    const res = await fetch(
        `http://localhost:5000/api/users/`
    );
    return await res.json();
}

export const getUserById = async ({ queryKey }) => {
    const user = queryKey[1];
    const res = await fetch(
        `http://localhost:5000/api/users/get/${user.userId}`,
    );
    //var log = console.log(await res.json());
    return await res.json();
}

export const signUpUser = async ({ username, email, admin, password }) => {
    const res = await fetch(
        `http://localhost:5000/api/users/signup`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password,
                admin
            })
        }
    );

    return await res.json();
};

export const loginUser = async ({ email, password }) => {
    console.log(email);
    console.log(password);
    const res = await fetch(
        `http://localhost:5000/api/users/login`,
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
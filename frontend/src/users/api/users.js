export const getUsers = async () => {
    const res = await fetch(
        `http://localhost:5000/api/users/`
    );
    return await res.json();
}

export const getUserById = async ({ queryKey }) => {
    const uid = queryKey[1];
    console.log("here?");
    const res = await fetch(
        `http://localhost:5000/api/users/get/${uid.id}`,
    );
    //var log = console.log(await res.json());
    return await res.json();
}

export const signUpUser = async ({ username, email, password }) => {
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
                password
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
    console.log(res);

    return await res.json();
};
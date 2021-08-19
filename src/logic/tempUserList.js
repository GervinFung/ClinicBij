const userList = [
    {email: 'TayMingLiang123@gmail.com', password: 'TayMingLiang123!@#'},
    {email: 'NgKheeLong123!@gmail.com', password: 'NgKheeLong123!@#'},
    {email: 'KohRongSoon123!@gmail.com', password: 'KohRongSoon123!@#'},
    {email: 'WongYeeJing123!@gmail.com', password: 'WongYeeJing123!@#'},
    {email: 'GervinFungDaXuen123!@gmail.com', password: 'GervinFungDaXuen123!@#'},
    {email: '1', password: '1'},
];

export const getUserFromUserList = (email, password) => {
    return userList.find((user) => {
        return user.email === email && user.password === password;
    });
};

export const emailTaken = (email) => {
    return userList.find((user) => {
        return user.email === email;
    }) !== undefined;
};

export const addUser = (fullName, password, identityCard, email) => {
    const newUser = {
        fullName: fullName,
        password: password,
        identityCard: identityCard,
        email: email,
    };
    userList.push(newUser);
};

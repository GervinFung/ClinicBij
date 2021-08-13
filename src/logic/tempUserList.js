const userList = [
    {userName: 'TayMingLiang123!@#', password: 'TayMingLiang123!@#'},
    {userName: 'NgKheeLong123!@#', password: 'NgKheeLong123!@#'},
    {userName: 'KohRongSoon123!@#', password: 'KohRongSoon123!@#'},
    {userName: 'WongYeeJing123!@#', password: 'WongYeeJing123!@#'},
    {userName: 'GervinFungDaXuen123!@#', password: 'GervinFungDaXuen123!@#'},
    {userName: '1', password: '1'},
];

export const getUserFromUserList = (userName, password) => {
    return userList.find((user) => {
        return user.userName === userName && user.password === password;
    });
};

export const userNameTaken = (userName) => {
    return userList.find((user) => {
        return user.userName === userName;
    }) !== undefined;
};

export const addUser = (userName, password, identityCard, email) => {
    const newUser = {
        userName: userName,
        password: password,
        identityCard: identityCard,
        email: email,
    };
    userList.push(newUser);
};

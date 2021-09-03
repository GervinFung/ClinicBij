const userList = [
    {email: 'jane.doe@example.com', password: 'SuperSecretPassword!', fullName: 'Jane Doe', uuid: 'vRuUbKBKWZV6F360zRrNwEWCuoF3', userType:'doctor'},
    {email: 'TayMingLiang123@gmail.com', password: 'TayMingLiang123!@#', fullName: 'Tay Ming Liang', userType:'patient'},
    {email: 'NgKheeLong123!@gmail.com', password: 'NgKheeLong123!@#', fullName: 'Ng Khee Long', userType:'patient'},
    {email: 'KohRongSoon123!@gmail.com', password: 'KohRongSoon123!@#', fullName: 'Koh Rong Soon', userType:'patient'},
    {email: 'WongYeeJing123!@gmail.com', password: 'WongYeeJing123!@#', fullName: 'Wong Yee Jing', userType:'patient'},
    {email: 'gervinfungdaxuen@gmail.com', password: '123456A$', fullName: 'Gervin', uuid: 'YxwIkQ72lHf6KV62JDbfFE5tZBp2', userType:'patient'},
    {email: 'rongsoon2000@icloud.com', password: '123456789A?', fullName: 'RS', uuid: 'vhsmG4aiSCUl2GrVTgV0wJyM0Ku2', userType:'patient'},
    {email: 'drakon@gm.com', password: '123456A$', fullName: 'Drakon', uuid: 'ObYeGFHVLXgjcGgJaYf3FLeu6cP2', userType:'patient'},
];

export const getUserFromUserList = (email, password) => {
    return userList.find((user) => {
        return user.email === email && user.password === password;
    });
};

export const getUserFromUserListUUID = (uuid) => {
    return userList.find((user) => {
        return user.uuid === uuid;
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

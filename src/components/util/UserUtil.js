import {getUserFromUserListUUID} from '../../logic/tempUserList';
import auth from '@react-native-firebase/auth';
import {checkNullOrUndefined, validateInput} from '../../logic/nullOrUndefinedInput';

export const getUser = () => {
    const currentUser = auth().currentUser;
    if (checkNullOrUndefined(currentUser)) {
        throw new Error('current user cannot be null at this point');
    }
    const userFound = getUserFromUserListUUID(currentUser.uid);
    if (checkNullOrUndefined(userFound)) {
        throw new Error('user found cannot be null at this point');
    }
    return userFound;
};

export const getCurrentUser = () => auth().currentUser;

export const hasCurrentUser = () => getCurrentUser() !== null;

export const getAuth = () => auth();

export const getCredential = (password) =>  {
    const credential = auth.EmailAuthProvider.credential(getCurrentUser().email, password);
    return getCurrentUser().reauthenticateWithCredential(credential);
};

export const deleteCurrentUser = () => {
    getCurrentUser().delete().then(() => {
        console.log('deleted user');
    }).catch((error) => {
        console.log(error);
    });
};

export const updateCurrentUserName = (fullName) => {
    const user = getUser();
    const finalizedFullName = validateInput(fullName) ? fullName : user.fullName;
    console.log(finalizedFullName);
    // sqlite update
};

export const updateCurrentUserEmail = (email) => {
    const user = getUser();
    const finalizedEmail = validateInput(email) ? email : user.email;
    getCurrentUser().updateEmail(finalizedEmail).then(() => {
        console.log('changed email');
    }).catch((error) => {
        console.log(error);
    });
};

export const updateCurrentUserPassword = (newPassword) => {
    const user = getUser();
    const finalizedPassword = validateInput(newPassword) ? newPassword : user.password;
    getCurrentUser().updatePassword(finalizedPassword).then(() => {
        console.log('changed password');
    }).catch((error) => {
        console.log(error);
    });
};

export const signOutCurrentUser = () => {
    getAuth().signOut().then(() => {
        console.log('sign out user');
    }).catch((error) => {
        console.log(error);
    });
};

import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, ScrollView, Image, Alert } from 'react-native';
import { stringIsEmpty } from '../../logic/nullOrUndefinedInput';
import {validateEmail} from '../../logic/email';
import {validateFullName} from '../../logic/fullName';
import {validatePassword} from '../../logic/password';
import {getUser, getCredential, updateCurrentUserEmail, updateCurrentUserPassword, updateCurrentUserName} from '../util/UserUtil';
import {ConfirmPasswordTextInput, RegistryTextInput, PasswordTextInput, CurrentPasswordTextInput} from '../reusable/TextInput';
import TouchableButton, {buttonStyleDict} from '../reusable/TouchableButton';
import HorizontalLine from '../reusable/HorizontalLine';

const UpdateProfileScreen = ({ navigation }) => {

    const user = getUser();

    const [email, setEmail] = useState('');
    const [emailMessage, setEmailMessage] = useState('');

    const [fullName, setFullName] = useState('');
    const [fullNameMessage, setFullNameMessage] = useState('');

    const [newPassword, setNewPassword] = useState('');
    const [newPasswordMessage, setNewPasswordMessage] = useState('');

    const [password, setPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [confirmNewPasswordMessage, setConfirmNewPasswordMessage] = useState('');

    const updatedAccountAlert = () => {
        Alert.alert(
            'Account successfully updated', 'Your account has been updated', [{
                    text: 'OK', onPress: () => navigation.navigate('ProfileScreen'),
                },
            ]
        );
    };

    const authenticate = () => {
        if (stringIsEmpty(password)) {
            setPasswordMessage('Invalid password entered!');
            return;
        }
        getCredential(password).then(() => {
            setPasswordMessage('');
            if (stringIsEmpty(fullNameMessage)) {
                updateCurrentUserName(fullName);
            }
            if (stringIsEmpty(emailMessage)) {
                updateCurrentUserEmail(email);
            }
            if (stringIsEmpty(newPasswordMessage)) {
                updateCurrentUserPassword(newPassword);
            }
            updatedAccountAlert();
        }).catch(error => {
            if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found') {
                throw new Error('User should have logged in UpdateProfileScreen');
            }
            if (error.code === 'auth/wrong-password') {
                setPasswordMessage('Invalid password entered!');
            }
        });
    };

    useEffect(() => {
        const empty = (stringIsEmpty(validatePassword(newPassword)) && newPassword === confirmNewPassword) || stringIsEmpty(newPassword);
        setConfirmNewPasswordMessage(empty ? '' : 'Both passwords are not the same');
    }, [newPassword, confirmNewPassword]);

    const fullNameInput = useRef(TextInput);
    const emailInput = useRef(TextInput);
    const newPasswordInput = useRef(TextInput);
    const confirmPasswordInput = useRef(TextInput);

    const CurrentValue = ({value, type}) => {
        return (
            <Text style={styles.currentValue}>
                <Text style={styles.boldText}>Current {type}: </Text>{value}
            </Text>
        );
    };

    const Zone = ({color, text}) => {
        return (
            <View style={[styles.zoneView, color]}>
                <Text style={[styles.boldText, color]}>{text} Zone</Text>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView behavior="height" style={styles.container}>
            <ScrollView behavior="height" contentContainerStyle={styles.scrollView}>
                <View style={styles.imageTextView}>
                    <Image source={require('../../../img/update.jpg')} style={styles.image}/>
                </View>
                <View style={[styles.generalView, styles.inputView]}>
                    <Zone
                        color={{
                            color: '#059862',
                            borderColor: '#059862',
                        }}
                        text="Safe"
                    />
                    <CurrentValue
                        type="full name"
                        value={user.fullName}
                    />
                    <RegistryTextInput
                        value={fullName}
                        propsRef={fullNameInput}
                        nextRef={emailInput.current}
                        placeholder="New Full Name"
                        validationFunction={validateFullName}
                        setValue={setFullName}
                        inputMessage={fullNameMessage}
                        setInputMessage={setFullNameMessage}
                        secureTextEntry={false}
                        keyboardType="default"
                    />
                    <CurrentValue
                        type="email"
                        value={user.email}
                    />
                    <RegistryTextInput
                        value={email}
                        propsRef={emailInput}
                        nextRef={newPasswordInput.current}
                        placeholder="New Email"
                        validationFunction={validateEmail}
                        setValue={setEmail}
                        inputMessage={emailMessage}
                        setInputMessage={setEmailMessage}
                        secureTextEntry={false}
                        keyboardType="email-address"
                    />
                    <HorizontalLine/>
                    <Zone
                        color={{
                            color: '#DC143C',
                            borderColor: '#DC143C',
                        }}
                        text="Danger"
                    />
                    <PasswordTextInput
                        value={newPassword}
                        propsRef={newPasswordInput}
                        nextRef={confirmPasswordInput.current}
                        placeholder="New Password"
                        validationFunction={validatePassword}
                        setValue={setNewPassword}
                        inputMessage={newPasswordMessage}
                        setInputMessage={setNewPasswordMessage}
                    />
                    <ConfirmPasswordTextInput
                        propsRef={confirmPasswordInput}
                        value={confirmNewPassword}
                        placeholder="Confirm New Password"
                        setValue={setConfirmNewPassword}
                        inputMessage={confirmNewPasswordMessage}
                    />
                </View>
                <HorizontalLine/>
                <View style={{marginTop: 15}}>
                    <Text style={[styles.boldText, styles.italicText]}>Not all fields have to be filled in</Text>
                    <Text style={[styles.boldText, styles.italicText]}>We will use your current value for the one you did not field in</Text>
                </View>
                <CurrentPasswordTextInput
                    password={password}
                    setPassword={setPassword}
                    passwordMessage={passwordMessage}
                />
                <TouchableButton
                    onPress={() => authenticate()}
                    buttonStyle={buttonStyleDict.GREEN}
                    text="Update"
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    generalView: {
        padding: 4,
        paddingBottom: 7,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: '#FEFEFE',
    },
    inputView: {
        paddingBottom: 30,
    },
    inputInvalidText: {
        color: '#990000',
        fontSize: 14,
    },
    boldText: {
        fontWeight: 'bold',
    },
    italicText: {
        fontStyle: 'italic',
    },
    currentValue: {
        fontSize: 17,
        alignItems: 'flex-start',
    },
    imageTextView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
    zoneView: {
        marginTop: 15,
        backgroundColor: 'whitesmoke',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 15,
        margin: 5,
        width: '40%',
        borderWidth: 1,
    },
    inputBox: {
        borderColor: '#121212',
        width: '80%',
        color: '#000',
        borderWidth: 1,
        paddingBottom: 7,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 15,
        margin: 5,
        fontSize: 17,
    },
});

export default UpdateProfileScreen;

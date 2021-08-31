import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { stringIsEmpty } from '../logic/nullOrUndefinedInput';
import {validateEmail} from '../logic/email';
import {validateFullName} from '../logic/fullName';
import {validateIdentityCard} from '../logic/identityCard';
import {validatePassword} from '../logic/password';
import {addUser} from '../logic/tempUserList';
import { ADMIN, USER } from '../../App';
import {getAuth} from './util/UserUtil';
import {ConfirmPasswordTextInput, RegistryTextInput, PasswordTextInput} from './reusable/TextInput';
import TouchableButton, {buttonStyleDict} from './reusable/TouchableButton';

const RegistryScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [emailMessage, setEmailMessage] = useState('');

    const [identityCard, setIdentityCard] = useState('');
    const [identityCardMessage, setIdentityCardMessage] = useState('');

    const [fullName, setFullName] = useState('');
    const [fullNameMessage, setFullNameMessage] = useState('');

    const [password, setPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');

    const [invalidLogin, setInvalidLogin] = useState('');

    const signUp = () => {
        getAuth().createUserWithEmailAndPassword(email, password).then(() => {
            setInvalidLogin('');
            addUser(fullName, password, identityCard, email);
            navigation.navigate('LoginScreen', {
                userType: 'user',
            });
        }).catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                setInvalidLogin('That email address is already exist!');
            }
            if (error.code === 'auth/invalid-email') {
                setInvalidLogin('That email address is invalid!');
            }
        });
    };

    const signupButtonPressed = () => {
        if (stringIsEmpty(emailMessage) &&
        stringIsEmpty(identityCardMessage) &&
        stringIsEmpty(fullNameMessage) &&
        stringIsEmpty(passwordMessage) &&
        stringIsEmpty(confirmPasswordMessage)) {
            signUp();
        }
    };

    const showInputInvalid = (message) => {
        if (message.length !== 0) {
            return (
                <Text style={styles.inputInvalidText}>{message}</Text>
            );
        }
    };

    const showInvalidLogin = () => {
        if (stringIsEmpty(invalidLogin)) {
            return;
        }
        return (
            <Text style={styles.inputInvalidText}>{invalidLogin}</Text>
        );
    };

    useEffect(() => {
        const empty = (stringIsEmpty(validatePassword(password)) && password === confirmPassword) || stringIsEmpty(password);
        setConfirmPasswordMessage(empty ? '' : 'Both passwords are not the same');
    }, [password, confirmPassword]);

    const fullNameInput = useRef(TextInput);
    const emailInput = useRef(TextInput);
    const identityCardInput = useRef(TextInput);
    const passwordInput = useRef(TextInput);
    const confirmPasswordInput = useRef(TextInput);

    return (
        <KeyboardAvoidingView behavior="height" style={styles.container}>
            <ScrollView behavior="height" contentContainerStyle={styles.scrollView}>
                <View style={styles.generalView}><Text style={styles.title}>Sign Up</Text></View>
                <View style={[styles.generalView, styles.inputView]}>
                    <RegistryTextInput
                        value={fullName}
                        propsRef={fullNameInput}
                        nextRef={emailInput.current}
                        showInputInvalid={showInputInvalid}
                        placeholder={'Full Name'}
                        validationFunction={validateFullName}
                        setValue={setFullName}
                        inputMessage={fullNameMessage}
                        setInputMessage={setFullNameMessage}
                        secureTextEntry={false}
                        keyboardType="default"
                    />
                    <RegistryTextInput
                        value={email}
                        propsRef={emailInput}
                        nextRef={identityCardInput.current}
                        showInputInvalid={showInputInvalid}
                        placeholder={'Email'}
                        validationFunction={validateEmail}
                        setValue={setEmail}
                        inputMessage={emailMessage}
                        setInputMessage={setEmailMessage}
                        secureTextEntry={false}
                        keyboardType="email-address"
                    />
                    <RegistryTextInput
                        value={identityCard}
                        propsRef={identityCardInput}
                        nextRef={passwordInput.current}
                        showInputInvalid={showInputInvalid}
                        placeholder={'Identity Card'}
                        validationFunction={validateIdentityCard}
                        setValue={setIdentityCard}
                        inputMessage={identityCardMessage}
                        setInputMessage={setIdentityCardMessage}
                        secureTextEntry={false}
                        keyboardType="numeric"
                    />
                    <PasswordTextInput
                        value={password}
                        propsRef={passwordInput}
                        nextRef={confirmPasswordInput.current}
                        showInputInvalid={showInputInvalid}
                        placeholder="New Password"
                        validationFunction={validatePassword}
                        setValue={setPassword}
                        inputMessage={passwordMessage}
                        setInputMessage={setPasswordMessage}
                    />
                    <ConfirmPasswordTextInput
                        value={confirmPassword}
                        propsRef={confirmPasswordInput}
                        showInputInvalid={showInputInvalid}
                        placeholder="Confirm New Password"
                        setValue={setConfirmPassword}
                        inputMessage={confirmPasswordMessage}
                    />
                </View>
                <View style={[styles.generalView]}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('MainScreen', {
                            admin: ADMIN,
                            user: USER,
                        })}
                    ><Text style={styles.loginText}>Already haven an account? Login</Text>
                    </TouchableOpacity>
                    {showInvalidLogin()}
                    <TouchableButton
                        onPress={signupButtonPressed}
                        text="Sign Up"
                        buttonStyle={buttonStyleDict.GREEN}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
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
    title: {
        color: '#2196F3',
        fontSize: 30,
        paddingBottom: 10,
    },
    inputView: {
        paddingBottom: 30,
    },
    inputInvalidText: {
        color: '#990000',
        fontSize: 14,
    },
    loginText: {
        color: '#121212',
        paddingBottom: 10,
        fontSize: 17,
    },
});

export default RegistryScreen;

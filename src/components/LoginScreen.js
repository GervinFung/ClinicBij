import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import {getUserFromUserList} from '../logic/tempUserList';
import auth from '@react-native-firebase/auth';
import { ADMIN, USER } from '../../App';

const LoginScreen = ({ route, navigation }) => {

    const { userType } = route.params;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inputInvalid, setInputInvalid] = useState(false);
    const [user, setUser] = useState({});
    // maybe user can use props, pass down to another components

    const emailInput = useRef(TextInput);
    const passwordInput = useRef(TextInput);
    const loginButton = useRef(TouchableOpacity);

    useEffect(() => {   
            setUser(auth().currentUser);                
    }, []);

    const loginButtonPressed = () => {
        auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            alert('Welcome!')
            setUser(auth().currentUser);
            navigation.navigate('HomeScreen', {
                user: {email: 'NgKheeLong123!@gmail.com', password: 'NgKheeLong123!@#'},
            });       
        })
        .catch(error => {
            if (error.code === 'auth/invalid-email') {
                console.log('Invalid email entered! Please try again.');
            }
            if(error.code === 'auth/user-not-found') {
                console.log('Invalid email/password entered! Please try again.');
            }
            if(error.code === 'auth/wrong-password') {
                console.log('Invalid password entered! Please try again.');
            }
           
            console.error(error);
        });
        
    };

    const showInputInvalidText = () => {
        if (inputInvalid) {
            return (
                <View style={styles.inputInvalid}>
                    <Text style={styles.inputInvalidText}>Invalid email/password</Text>
                    <Text style={styles.inputInvalidText}>Please try again</Text>
                </View>
            );
        }
    };

    const getImage = () => {
        if (userType === ADMIN.toLowerCase()) {
            return require('../../img/admin.jpg');
        } else if (userType === USER.toLowerCase()) {
            return require('../../img/user.jpg');
        }
        throw new Error('userType can only be ADMIN or USER only');
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.generalView}>
                <Image style={styles.image} source={getImage()}/>
                <Text style={styles.title}>{userType.toUpperCase()}</Text>
            </View>
            <View style={[styles.generalView, styles.inputView]}>
                <TextInput
                    ref={emailInput}
                    style={styles.inputBox}
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                    onSubmitEditing={() => passwordInput.current.focus()}
                />
                <TextInput
                    ref={passwordInput}
                    secureTextEntry={true}
                    style={styles.inputBox}
                    placeholder="Password"
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={() => loginButton.current.focus()}
                />
                <View style={styles.generalView}>
                    {showInputInvalidText()}
                </View>
            </View>
            <View style={[styles.generalView]}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('RegistryScreen')}
                >
                    <Text style={styles.signupText}>Don't have an account? Signup</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    ref={loginButton}
                    style={styles.loginButton}
                    onPress={() => loginButtonPressed()}
                >
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    generalView: {
        padding: 4,
        paddingBottom: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: '#FEFEFE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#2196F3',
        fontSize: 30,
        paddingBottom: 10,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    inputBox: {
        // backgroundColor: '#121212',
        borderColor: '#121212',
        width: '80%',
        color: '#000',//'#FFFFFF99',
        borderWidth: 1,
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 15,
        margin: 5,
        fontSize: 17,
    },
    inputView: {
        paddingBottom: 40,
    },
    inputInvalid: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputInvalidText: {
        color: '#990000',
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: '#059862',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 15,
        margin: 5,
    },
    loginText: {
        color: '#FFFFFFE3',
        fontSize: 17,
    },
    signupText: {
        color: '#121212',
        paddingBottom: 10,
        fontSize: 17,
    },
});

export default LoginScreen;

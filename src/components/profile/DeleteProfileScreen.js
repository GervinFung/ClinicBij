import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Alert } from 'react-native';
import {deleteCurrentUser, getCredential} from '../util/UserUtil';
import TouchableButton, {buttonStyleDict} from '../reusable/TouchableButton';
import {CurrentPasswordTextInput} from '../reusable/TextInput';

const DeleteProfileScreen = ({ navigation }) => {

    const [password, setPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    const showPasswordInvalid = () => {
        if (passwordMessage.length !== 0) {
            return (
                <Text style={styles.inputInvalidText}>{passwordMessage}</Text>
            );
        }
    };

    const deletedAccountAlert = () => {
        Alert.alert(
            'Account successfully deleted', 'Your account has been deleted', [{
                    text: 'OK', onPress: () => deleteCurrentUser(navigation),
                },
            ]
        );
    };

    const authenticate = () => {
        getCredential(password).then(() => {
            setPasswordMessage('');
            Alert.alert(
                'Delete Account Confirmation', 'This action cannot be undone', [{
                        text: 'Cancel', style: 'cancel',
                    }, {
                        text: 'OK', onPress: () => deletedAccountAlert(),
                    },
                ]
            );
        }).catch(error => {
            if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found') {
                throw new Error('User should have logged in DeleteProfileScreen');
            }
            if (error.code === 'auth/wrong-password') {
                setPasswordMessage('Invalid password entered!');
            }
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageTextView}>
                <Image source={require('../../../img/delete.jpg')} style={styles.image}/>
            </View>
            <CurrentPasswordTextInput
                password={password}
                setPassword={setPassword}
                showInputInvalid={showPasswordInvalid}
                passwordMessage={passwordMessage}
            />
            <TouchableButton
                onPress={navigation.goBack}
                buttonStyle={buttonStyleDict.GREEN}
                text="Go Back"
            />
            <TouchableButton
                onPress={authenticate}
                buttonStyle={buttonStyleDict.RED}
                text="Delete Account"
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    generalView: {
        paddingTop: 10,
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
    inputInvalidText: {
        color: '#990000',
        fontSize: 14,
    },
    imageTextView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
});

export default DeleteProfileScreen;

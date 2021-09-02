import React, {useState} from 'react';
import { StyleSheet, View, SafeAreaView, Image, Alert, ScrollView } from 'react-native';
import {deleteCurrentUser, getCredential} from '../util/UserUtil';
import TouchableButton, {buttonStyleDict} from '../reusable/TouchableButton';
import {CurrentPasswordTextInput} from '../reusable/TextInput';

const DeleteProfileScreen = ({ navigation }) => {

    const [password, setPassword] = useState('');
    const [validatePasswordMessage, setValidatePasswordMessage] = useState('');

    const deletedAccountAlert = () => {
        Alert.alert('Account successfully deleted', 'Your account has been deleted', [{
                    text: 'OK', onPress: () => deleteCurrentUser(),
                },
            ]
        );
    };

    const authenticate = () => {
        getCredential(password).then(() => {
            setValidatePasswordMessage('');
            Alert.alert('Delete Account Confirmation', 'This action cannot be undone', [{
                    text: 'Cancel', style: 'cancel',
                }, {
                    text: 'OK', onPress: () => deletedAccountAlert(),
                },
            ]);
        }).catch(error => {
            if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found') {
                throw new Error('User should have logged in DeleteProfileScreen');
            }
            if (error.code === 'auth/wrong-password') {
                setValidatePasswordMessage('Invalid password entered!');
            }
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.imageTextView}>
                    <Image source={require('../../../img/delete.jpg')} style={styles.image}/>
                </View>
                <CurrentPasswordTextInput
                    password={password}
                    setPassword={setPassword}
                    passwordMessage={validatePasswordMessage}
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
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
    },
    generalView: {
        paddingTop: 10,
        paddingBottom: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#FEFEFE',
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

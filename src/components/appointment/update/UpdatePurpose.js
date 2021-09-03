import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Image, Alert, ScrollView } from 'react-native';

import {updatePurposeOfAppointment} from '../../../logic/tempAppointmentList';
import TouchableButton, {buttonStyleDict} from '../../reusable/TouchableButton';

import alertSuccess from './UpdateSuccessAlert';

const PurposeTextView = ({type, purpose}) => {

    const purposeStyle = StyleSheet.create({
        currentPurposeView: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 25,
            marginTop: 25,
        },
        boldText: {
            fontWeight: 'bold',
        },
    });

    return (
        <View style={purposeStyle.currentPurposeView}>
            <Text style={styles.purpose}>Your {type} purpose of appointment</Text>
            <Text style={[styles.purpose, purposeStyle.boldText]}>{purpose}</Text>
        </View>
    );
};

const UpdatePurposeScreen = ({ route, navigation }) => {

    const { purpose, id } = route.params;

    const [newPurpose, setNewPurpose] = useState('');

    const confirmUpdatePurpose =  () => {

        Alert.alert('Update Appointment Purpose Confirmation', 'Are you sure new purpose is correct?\nYou can always change the information later should you need to', [{
                text: 'No', style: 'cancel',
            }, {
                text: 'Yes', onPress: () => {
                    updatePurposeOfAppointment(undefined, id, newPurpose);
                    alertSuccess(navigation);
                },
            },
        ]);
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.generalView}>
                    <Image source={require('../../../../img/update/changeDoctor.jpg')} style={styles.image}/>
                </View>
                <PurposeTextView
                    type="current"
                    purpose={purpose}
                />
                <View style={styles.generalView}>
                    <Text style={styles.purpose}>Update of appointment</Text>
                    <TextInput
                        value={newPurpose}
                        style={styles.inputBox}
                        placeholder="Purpose of Appointment"
                        keyboardType="ascii-capable"
                        onChangeText={setNewPurpose}
                    />
                    <PurposeTextView
                        type="new"
                        purpose={newPurpose}
                    />
                </View>
                <TouchableButton
                    onPress={confirmUpdatePurpose}
                    text="Update Appointment"
                    buttonStyle={buttonStyleDict.GREEN}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
    },
    container: {
        padding: 4,
        paddingBottom: 7,
        flex: 1,
        backgroundColor: '#FEFEFE',
    },
    generalView: {
        width: '100%',
        backgroundColor: '#FEFEFE',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 25,
    },
    image: {
        width: 150,
        height: 150,
    },
    inputTitle: {
        fontSize: 17,
    },
    text: {
        textAlign: 'center',
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
    purpose: {
        color: '#000',
        fontSize: 20,
        paddingBottom: 10,
    },
});

export default UpdatePurposeScreen;

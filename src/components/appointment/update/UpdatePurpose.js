import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Image, Alert } from 'react-native';

import {updatePurposeOfAppointment} from '../../../logic/tempAppointmentList';

const PurposeTextView = (props) => {

    const purposeStyle = StyleSheet.create({
        currentPurposeView: {
            width: '100%',
            backgroundColor: '#FEFEFE',
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
            <Text style={styles.purpose}>Your {props.type} purpose of appointment</Text>
            <Text style={[styles.purpose, purposeStyle.boldText]}>{props.purpose}</Text>
        </View>
    );
};

const UpdatePurposeScreen = ({ route, navigation }) => {

    const { purpose, id } = route.params;

    const [newPurpose, setNewPurpose] = useState('');

    const updateButton = useRef(TouchableOpacity);

    const confirmUpdatePurpose =  () => {

        Alert.alert(
            'Update Appointment Purpose Confirmation', 'Are you sure new purpose is correct?\nYou can always change the information later should you need to', [{
                    text: 'No', style: 'cancel',
                }, {
                    text: 'Yes', onPress: () => {
                        updatePurposeOfAppointment(undefined, id, newPurpose);
                        navigation.navigate('UpdateAppointmentScreen');
                    },
                },
            ]
        );
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
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
                    onSubmitEditing={() => updateButton.current.focus()}
                />
                <PurposeTextView
                    type="new"
                    purpose={newPurpose}
                />
            </View>
            <View style={styles.generalView}>
                <TouchableOpacity
                    ref={updateButton}
                    style={styles.confirmButton}
                    onPress={confirmUpdatePurpose}
                >
                    <Text style={styles.confirmText}>Update Appointment</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 4,
        paddingBottom: 7,
        width: '100%',
        flex: 1,
        backgroundColor: '#FEFEFE',
        alignItems: 'center',
        justifyContent: 'center',
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
    confirmButton: {
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
    confirmText: {
        color: '#FFFFFFE3',
        fontSize: 17,
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

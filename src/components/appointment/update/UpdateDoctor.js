import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Alert, SafeAreaView } from 'react-native';

import {Picker} from '@react-native-picker/picker';

import {updateDoctorOfAppointment} from '../../../logic/tempAppointmentList';
import {getAvailableDoctor} from '../../../logic/tempDoctorList';


const ChooseDoctorView = (props) => {

    const doctorImageList = [require('../../../../img/doctor/doctor1.jpg'), require('../../../../img/doctor/doctor2.jpg'), require('../../../../img/doctor/doctor3.jpg')];

    const [doctorImage, setDoctorImage] = useState(doctorImageList[0]);

    const pickerStyle = StyleSheet.create({
        pickerView: {
            color: '#121212',
            height: 30,
            width: 200,
            borderColor: 'black',
            borderWidth: 1,
        },
        doctorText: {
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 25,
        },
        doctorBold: {
            fontWeight: 'bold',
        },
        inputView: {
            marginTop: 25,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

    const getDoctorImage = (selectedDoctor) => {
        const index = props.doctorList.indexOf(selectedDoctor);
        if (index >= 0 && index <= 2) {
            return doctorImageList[index];
        }
        throw new Error('Selected Doctor does not exist in list available');
    };

    return (
        <View style={pickerStyle.inputView}>
            <Text style={styles.inputTitle}>Pick a Doctor</Text>
            <Image source={doctorImage} style={styles.image}/>
            <Picker
                style={pickerStyle.pickerView}
                selectedValue={props.selectedDoctor}
                onValueChange={(itemValue) => {
                    props.setSelectedDoctor(itemValue);
                    setDoctorImage(getDoctorImage(itemValue));
                }}
            >
                {props.doctorList.map((doctor, i) => {return <Picker.Item key={i + doctor} value={doctor} label={doctor} />;})}
            </Picker>
            <View style={styles.chosenText}>
                <Text style={styles.inputTitle}><Text style={styles.chosenBold}>New Doctor Chosen: </Text>{props.selectedDoctor.replace('Doctor', '')}</Text>
            </View>
        </View>
    );
};

const UpdateDoctorScreen = ({ route, navigation }) => {

    const doctorImageList = [require('../../../../img/doctor/doctor1.jpg'), require('../../../../img/doctor/doctor2.jpg'), require('../../../../img/doctor/doctor3.jpg')];

    const { doctor, id } = route.params;

    const doctorList = getAvailableDoctor();

    const getDoctorImage = (selectedDoctor) => {
        const index = doctorList.indexOf(selectedDoctor);
        if (index >= 0 && index <= 2) {
            return doctorImageList[index];
        }
        throw new Error('Selected Doctor does not exist in list available');
    };

    const doctorImage = getDoctorImage(doctor);
    const [selectedDoctor, setSelectedDoctor] = useState(doctor);


    const confirmUpdateDoctor =  () => {
        Alert.alert(
            'Update Appointment Doctor Confirmation', 'Are you sure newly selected doctor is correct?\nYou can always change the information later should you need to', [{
                    text: 'No', style: 'cancel',
                }, {
                    text: 'Yes', onPress: () => {
                        updateDoctorOfAppointment(undefined, id, selectedDoctor);
                        navigation.navigate('UpdateAppointmentScreen');
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.generalView}>
                    <Image source={require('../../../../img/update/changeDateTime.jpg')} style={styles.titleImage}/>
                </View>
                <View style={styles.generalView}>
                    <Text style={styles.purpose}>Update of appointment</Text>
                    <View style={styles.generalView}>
                        <Image source={doctorImage} style={styles.image}/>
                        <Text style={styles.inputTitle}><Text style={styles.chosenBold}>Current Doctor Chosen: </Text>{doctor.replace('Doctor', '')}</Text>
                    </View>
                    <ChooseDoctorView
                        selectedDoctor={selectedDoctor}
                        setSelectedDoctor={setSelectedDoctor}
                        doctorList={doctorList}
                    />
                </View>
                <View style={styles.generalView}>
                    <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={confirmUpdateDoctor}
                    >
                        <Text style={styles.confirmText}>Update Appointment</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
    },
    container: {
        padding: 4,
        paddingBottom: 7,
        width: '100%',
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
    titleImage: {
        width: 150,
        height: 150,
    },
    image: {
        width: 80,
        height: 80,
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
    inputTitle: {
        fontSize: 17,
    },
    chosenText: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 17,
        marginBottom: 25,
    },
    chosenBold: {
        fontWeight: 'bold',
    },
    purpose: {
        color: '#000',
        fontSize: 20,
        paddingBottom: 10,
    },
});

export default UpdateDoctorScreen;
